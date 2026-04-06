import { getCartProductFromLocalStorage } from "./getCartProductFromLocalStorage.js";
import showToast from "./showToast.js";
import { updateCartValue } from "./updateCartValue.js";

const productContainer = document.getElementById("productContainer");
const productTemplate = document.getElementById("productTemplate");
const showProductContainer = (products) => {
  if (!products) {
    return;
  }
  products.forEach((product) => {
    const { id, name, category, brand, price, stock, image, description } =
      product;

    const clone = document.importNode(productTemplate.content, true);
    clone.querySelector(".productImage").src = image;
    clone.querySelector(".productImage").alt = name;
    clone.querySelector(".productName").textContent = name;
    clone.querySelector(".category").textContent = category;
    clone.querySelector(".productPrice").textContent = `₹${price.toFixed(2)}`;
    clone.querySelector(".productActualPrice").textContent = `₹${(
      price * 1.5
    ).toFixed(2)}`;
    clone.querySelector(".productStock").textContent = stock;
    clone.querySelector(".productDescription").textContent = description;
    clone.querySelector(".stockElement").addEventListener("click", (e) => {
      homeQuantityToggle(e, id, stock);
    });

    clone
      .querySelector(".add-to-cart-button")
      .addEventListener("click", (event) => {
        addToCart(event, id, stock);
      });

    clone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productContainer.append(clone);
  });
};

const homeQuantityToggle = (event, id, stock) => {
  const currentCard = document.querySelector(`#card${id}`);
  if (!currentCard) return; // Safety check

  const productQuantity = currentCard.querySelector(".productQuantity");
  const decrementBtn = currentCard.querySelector(".cartDecrement");
  const incrementBtn = currentCard.querySelector(".cartIncrement");

  // Get current quantity (use data attribute for reliability)
  let quantity = parseInt(productQuantity.dataset.quantity) || 1;

  // Handle increment
  if (event.target === incrementBtn) {
    quantity = Math.min(quantity + 1, stock); // Cleaner way to cap at stock
  }

  // Handle decrement
  if (event.target === decrementBtn) {
    quantity = Math.max(quantity - 1, 1); // Cleaner way to prevent going below 1
  }

  // Update display and data attribute
  productQuantity.textContent = quantity;
  productQuantity.dataset.quantity = quantity;

  return quantity;
};

getCartProductFromLocalStorage();

const addToCart = (event, id, stock) => {
  const currentCard = document.querySelector(`#card${id}`);
  if (!currentCard) return;

  let arrLocalStorageProducts = getCartProductFromLocalStorage();
  const productQuantity = currentCard.querySelector(".productQuantity");
  let quantity = parseInt(productQuantity.dataset.quantity) || 1;
  const price = parseFloat(
    currentCard.querySelector(".productPrice").textContent.replace("₹", "")
  );
  let totalPrice = parseFloat((price * quantity).toFixed(2));

  const existingProduct = arrLocalStorageProducts.find(
    (product) => product.id === id
  );

  if (existingProduct) {
    let newQuantity = existingProduct.quantity + quantity;

    if (newQuantity > stock) {
      alert(`Cannot add more! Only ${stock} items in stock.`);
      return;
    }

    quantity = newQuantity;
    totalPrice = parseFloat(
      (existingProduct.totalPrice + totalPrice).toFixed(2)
    );

    let updatedProduct = arrLocalStorageProducts.map((product) => {
      if (product.id === id) {
        return { id, quantity, totalPrice };
      } else {
        return product;
      }
    });

    localStorage.setItem("cartProducts", JSON.stringify(updatedProduct));
    updateCartValue(updatedProduct); // ✅ This updates the cart count
    console.log("updated cart", updatedProduct);
  } else {
    if (quantity > stock) {
      alert(`Cannot add! Only ${stock} items in stock.`);
      return;
    }

    arrLocalStorageProducts.push({ id, quantity, totalPrice });
    localStorage.setItem(
      "cartProducts",
      JSON.stringify(arrLocalStorageProducts)
    );
    updateCartValue(arrLocalStorageProducts); // ✅ This updates the cart count
    console.log("added to cart", arrLocalStorageProducts);
  }
  showToast("add", id)
};

export {
  showProductContainer,
  addToCart,
  homeQuantityToggle,
  getCartProductFromLocalStorage,
};
