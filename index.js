import { menuArray } from "./data.js";

const productSection = document.getElementById("menu-section");
const modalForm = document.getElementById("modal-form");
const productsInCart = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  }
  if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  }
  if (e.target.id === "order-purchase-btn") {
    document.querySelector(".modal").style.display = "block";
  }
});

modalForm.addEventListener("submit", (e) => {
  handlePayClick(e);
});

function handleAddClick(productId) {
  document.querySelector(".order-section").style.visibility = "visible";
  const targetProductObj = menuArray.filter((product) => {
    return product.id == productId;
  })[0];

  productsInCart.push(targetProductObj);

  renderCart();
}

function handleRemoveClick(productId) {
  const index = productsInCart.findIndex((product) => product.id == productId);
  productsInCart.splice(index, 1);
  renderCart();
}

function handlePayClick(event) {
  event.preventDefault();
  const userData = new FormData(modalForm);
  const userName = userData.get("user-name");
  document.getElementById(
    "order-section"
  ).innerHTML = `<div class="order-complete">Thanks, ${userName}! Your Order is on its way!</div>`;
  document.querySelector(".modal").style.display = "none";
}

function renderCart() {
  const total = productsInCart.reduce((totalPrice, element) => {
    return totalPrice + element.price;
  }, 0);

  const cartHTML = productsInCart
    .map((product) => {
      return `<div class="order-info">
              <h3 class="product zero-margin-b zero-margin-t">${product.name}</h3>
              <i class="fa-solid fa-trash" data-remove="${product.id}"></i>
              <div class="price">$${product.price}</div>
            </div>
            `;
    })
    .join("");

  document.getElementById("order-products").innerHTML = cartHTML;
  document.getElementById("total-price").textContent = `$${total}`;
}

function renderProducts() {
  const productArray = menuArray
    .map((product) => {
      return `
        <div class="menu">
            <div class="emoji">${product.emoji}</div>
            <div class="menu-info">
              <h3 class="product zero-margin-b zero-margin-t">${product.name}</h3>
              <p class="ingredients">${product.ingredients}</p>
              <div class="price">$${product.price}</div>
            </div>
            <i class="fa-regular fa-plus" data-add="${product.id}"></i>
        </div>`;
    })
    .join("");

  productSection.innerHTML = productArray;
}

renderProducts();
