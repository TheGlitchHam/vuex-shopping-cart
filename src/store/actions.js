import shop from "@/api/shop"

export default {
    
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
    }
