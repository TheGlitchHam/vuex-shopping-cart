import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop";
import actions from "./actions"
import cart from "./modules/cart"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{cart},


  state: {
    //data
    products: [],
     //{id, number}
  },

  getters: {
    //computed properties -> Properties that are not set from beginning but are calculated during execution

    availableProducts(state, getters) {
      return state.products.filter((product) => product.inventory > 0);
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    },
  },

  //actions: actions,
  actions, 

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
});
