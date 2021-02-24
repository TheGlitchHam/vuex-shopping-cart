import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //data
    products: [],
    cart: [], //{id, number}
    checkoutStatus: null,
  },

  getters: {
    //computed properties -> Properties that are not set from beginning but are calculated during execution

    availableProducts(state, getters) {
      return state.products.filter((product) => product.inventory > 0);
    },
    cartProducts(state, getters) {
      return state.cart.map((cartItem) => {
        const product = state.products.find(
          (product) => product.id === cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        };
      });
    },
    cartTotal(state, getters) {
      let total = 0;
      getters.cartProducts.forEach(
        (product) => (total += product.price * product.quantity)
      );
      return total;
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    },
  },

  actions: {
    //methods
    fetchProducts(context) {
      //context = store
      return new Promise((resolve, reject) => {
        shop.getProducts((products) => {
          context.commit("setProducts", products);
          resolve();
        });
      });
    },

    addProductToCart(context, product) {
      if (context.getters.productIsInStock(product)) {
        const cartItem = context.state.cart.find(
          (item) => item.id === product.id
        );
        if (!cartItem) {
          context.commit("pushProductToCart", product.id);
        } else {
          context.commit("incrementItemQuantity", cartItem);
        }
        context.commit("decrementProductInventory", product);
      }
    },

    checkOut({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit("emptyCart");
          commit("setCheckoutStatus", "success");
        },
        () => {
          commit("setCheckoutStatus", "failure");
        }
      );
    },
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },

    pushProductToCart(state, productId) {
      state.cart.push({ id: productId, quantity: 1 });
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },

    emptyCart(state) {
      state.cart = [];
    },
  },
});
