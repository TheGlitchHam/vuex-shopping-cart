export default {
  state: {
    cart: [],
    checkoutStatus: null
  },

  getters: {
    cartProducts(state, getters) {
      return state.cart.map(cartItem => {
        const product = state.products.find(
          product => product.id === cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },
    cartTotal(state, getters) {
      let total = 0;
      getters.cartProducts.forEach(
        product => (total += product.price * product.quantity)
      );
      return total;
    }
  },

  actions: {
    addProductToCart(context, product) {
      if (context.getters.productIsInStock(product)) {
        const cartItem = context.state.cart.find(
          item => item.id === product.id
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
    }
  },

  mutations: {
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
    }
  }
};
