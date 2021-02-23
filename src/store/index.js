import Vuex from "vuex";
import Vue from "vue"

Vue.use(Vuex)

export default new Vuex.Store({
    
    state: { //data
        products:[]
    },

    getters: {//computed properties -> Properties that are not set from beginning but are calculated during execution
    
        availableProducts(state, getters) {
            return state.products.filter(
                product => product.inventory > 0
            )
        }

    },

    actions: {//methods
        fetchProducts() {
            
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products
        }
    },
    
})