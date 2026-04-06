import { getCartProductFromLocalStorage } from "./getCartProductFromLocalStorage.js";

const updateCartValue = (arrLocalStorageProducts) => {
  let cartValue = arrLocalStorageProducts.length;
  document.querySelector("#cartCount").innerText = cartValue;
};

export { updateCartValue };
