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
    <button @click="checkOutCart">Checkout</button>
    <p v-if="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.cartProducts;
    },
    total() {
      return this.$store.getters.cartTotal;
    }
  },
  methods: {
    checkOutCart() {
      this.$store.dispatch("checkOut");
    }
  }
};
</script>

<style></style>
