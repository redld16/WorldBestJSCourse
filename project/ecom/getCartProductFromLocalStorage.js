import { updateCartValue } from "./updateCartValue.js";
const getCartProductFromLocalStorage = () => {
  let cartProducts = localStorage.getItem("cartProducts");
  if (!cartProducts) {
    return [];
  }
  cartProducts = JSON.parse(cartProducts);
  updateCartValue(cartProducts);
  return cartProducts;
};

export { getCartProductFromLocalStorage };
