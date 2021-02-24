<template>
  <div>
    <h1>
      Shopping Cart
    </h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} -
        {{ product.quantity }}
      </li>
    </ul>
    <h3>Total: {{ total | currency }}</h3>
    <button @click="checkOut()">Checkout</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
export default {
  computed: {
    ...mapGetters("cart",{
      products: "cartProducts",
      total: "cartTotal"
    }),
    ...mapState("cart",{
      checkoutStatus: state => state.checkoutStatus
    }),
  },
  methods: {...mapActions("cart", ["checkOut"])
  }
};
</script>

<style></style>
