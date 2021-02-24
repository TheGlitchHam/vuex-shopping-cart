import Vuex from "vuex";
import Vue from "vue";
import actions from "./actions";
import cart from "./modules/cart";
import products from "./modules/products";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    products,
  },

  state: {
    //data
  },

  getters: {
    //computed properties -> Properties that are not set from beginning but are calculated during execution
  },

  //actions: actions,
  actions,

  mutations: {},
});
