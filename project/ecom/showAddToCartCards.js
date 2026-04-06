import products from "./api/products.json";
import showToast from "./showToast.js";
import { updateCartValue } from "./updateCartValue.js";
import { getCartProductFromLocalStorage } from "./utils.js";

let cartProducts = getCartProductFromLocalStorage();
const productContainer = document.getElementById("productCartContainer");
const productTemplate = document.getElementById("productCartTemplate");

let filteredProducts = products.filter((product) => {
  return cartProducts.some((cartProduct) => cartProduct.id === product.id);
});

// Calculate and update cart totals
const updateCartTotal = () => {
  let productSubTotal = document.querySelector(".productSubTotal");
  let productFinalTotal = document.querySelector(".productFinalTotal");
  let cartProducts = getCartProductFromLocalStorage();

  let subTotal = cartProducts.reduce(
    (acc, product) => acc + product.totalPrice,
    0
  );
  productSubTotal.textContent = `₹${subTotal.toFixed(2)}`;
  productFinalTotal.textContent = `₹${(subTotal + 50).toFixed(2)}`;
};

// Function to update cart product in localStorage
const updateCartProductInLS = (id, quantity, totalPrice) => {
  let cartProducts = getCartProductFromLocalStorage();

  cartProducts = cartProducts.map((product) => {
    if (product.id === id) {
      return { ...product, quantity, totalPrice };
    }
    return product;
  });

  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  updateCartValue(cartProducts);
  updateCartTotal();
};

// Handle quantity increment/decrement
const homeQuantityToggle = (event, id, stock, unitPrice) => {
  const currentCard = document.querySelector(`#card${id}`);
  if (!currentCard) return;

  const productQuantity = currentCard.querySelector(".productQuantity");
  const decrementBtn = currentCard.querySelector(".cartDecrement");
  const incrementBtn = currentCard.querySelector(".cartIncrement");
  const priceElement = currentCard.querySelector(".productPrice");

  let quantity = parseInt(productQuantity.dataset.quantity) || 1;

  // Handle increment
  if (event.target === incrementBtn) {
    quantity = Math.min(quantity + 1, stock);
  }

  // Handle decrement
  if (event.target === decrementBtn) {
    quantity = Math.max(quantity - 1, 1);
  }

  // Update display and data attribute
  productQuantity.textContent = quantity;
  productQuantity.dataset.quantity = quantity;

  // Calculate total price using unit price
  let totalPrice = (quantity * unitPrice).toFixed(2);
  priceElement.textContent = `₹${totalPrice}`;

  // Update localStorage with new quantity and price
  updateCartProductInLS(id, quantity, parseFloat(totalPrice));

  return { quantity, price: totalPrice };
};

// Fetch quantity and price from localStorage
const fetchQuantityFromLocalStorage = (id, price) => {
  let cartProducts = getCartProductFromLocalStorage();
  let lSActualData = cartProducts.find((product) => product.id === id);
  let quantity = 1;
  let totalPrice = price;

  if (lSActualData) {
    quantity = lSActualData.quantity;
    totalPrice = lSActualData.totalPrice;
  }

  return { quantity, price: totalPrice };
};

// Remove product from cart
const removeProduct = (id) => {
  const cartProducts = getCartProductFromLocalStorage();
  const updatedCartProducts = cartProducts.filter(
    (product) => product.id !== id
  );
  localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
  updateCartValue(updatedCartProducts);

  showToast("delete", id); // ✅ Show toast first

  // ✅ FIX: Remove the card from DOM instead of reloading
  const cardToRemove = document.querySelector(`#card${id}`);
  if (cardToRemove) {
    cardToRemove.remove();
  }

  // Update totals after removal
  updateCartTotal();
};

// Display cart products
const showCartProduct = () => {
  filteredProducts.forEach((product) => {
    const { id, name, category, brand, price, stock, image, description } =
      product;

    const clone = document.importNode(productTemplate.content, true);
    clone.querySelector(".productImage").src = image;
    clone.querySelector(".productImage").alt = name;
    clone.querySelector(".productName").textContent = name;
    clone.querySelector(".category").textContent = category;

    const lSActualData = fetchQuantityFromLocalStorage(id, price);

    clone.querySelector(".productQuantity").textContent = lSActualData.quantity;
    clone.querySelector(".productQuantity").dataset.quantity =
      lSActualData.quantity;
    clone.querySelector(".productPrice").textContent = `₹${lSActualData.price}`;

    clone.querySelector(".stockElement").addEventListener("click", (e) => {
      homeQuantityToggle(e, id, stock, price);
    });

    clone
      .querySelector(".add-to-cart-button")
      .addEventListener("click", (event) => {
        removeProduct(id);
      });

    clone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productContainer.appendChild(clone);
  });
};

showCartProduct();
updateCartTotal();
