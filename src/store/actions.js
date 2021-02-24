import shop from "@/api/shop";

export default {
  //methods
  fetchProducts(context) {
    //context = store
    return new Promise((resolve, reject) => {
      shop.getProducts(products => {
        context.commit("setProducts", products);
        resolve();
      });
    });
  }
};
