export default function showToast(message, id) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  if (message === "delete") {
    toast.textContent = `Product with id ${id} removed from cart`;
  } else {
    toast.textContent = `Product with id ${id} added to cart`;
  }
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
