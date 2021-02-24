import shop from "@/api/shop";

export default {
  state: {
    products: []
  },

  getters: {
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    },

    productIsInStock() {
      return product => {
        return product.inventory > 0;
      };
    }
  },

  actions: {
    fetchProducts(context) {
      //context = store
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          context.commit("setProducts", products);
          resolve();
        });
      });
    }
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    }
  }
};
