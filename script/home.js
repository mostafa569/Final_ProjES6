document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("userName") === null) {
    window.location.href = "index.html";
  }
});

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function moveSlide(n) {
  slides[slideIndex].style.display = "none";
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  slides[slideIndex].style.display = "block";
}

function autoSlide() {
  moveSlide(1);
  setTimeout(autoSlide, 3000);
}

slides.forEach((slide) => (slide.style.display = "none"));
slides[0].style.display = "block";
setTimeout(autoSlide, 3000);

const Name = document.getElementById("Name");

Name.innerHTML = `Welcome ${localStorage.getItem("userName")}`;
setTimeout(() => {
    localStorage.removeItem("userName");
}, 5 * 60 * 1000);
let cart = [];

async function fetchProducts(category) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "<h2>Loading...</h2>";

  let url =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;

  try {
    let response = await fetch(url);
    let products = await response.json();

    productsContainer.innerHTML = products
      .map(
        (product) => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id}, '${product.title}', ${
          product.price
        }, '${product.image}')">
                    Add to Cart
                </button>
            </div>
        `
      )
      .join("");
  } catch (error) {
    productsContainer.innerHTML = "<h2>Error loading products</h2>";
    console.error("Error:", error);
  }
}

function addToCart(id, title, price, image) {
  const existingItem = cart.find((item) => item.id === id);
  console.log(existingItem);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, title, price, image, quantity: 1 });
    // console.log(cart);
  }

  updateCart();
  showNotification(`${title} added to cart`);
}

function updateCart() {
  const cartIcon = document.querySelector(".cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  let totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartIcon.textContent = cartCount;
  cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;

  cartItemsContainer.innerHTML =
    cart.length === 0
      ? "<p style='color:red' class='empty-cart'>Your cart is empty</p>"
      : cart
          .map(
            (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">❌</button>
            </div>
        `
          )
          .join("");
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function payNow() {
  if (cart.length === 0) {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML =
      "<p style='color:red' class='empty-cart'>Your cart is empty</p>";
  } else {
    document.getElementById("payment-confirmation").style.display = "block";

    clearCart();

    setTimeout(closePaymentConfirmation, 5000);
  }
}

function closePaymentConfirmation() {
  document.getElementById("payment-confirmation").style.display = "none";
}
function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("show-cart");
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

window.onscroll = function () {
  let scrollButton = document.getElementById("scrollToTop");
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollButton.classList.add("show");
  } else {
    scrollButton.classList.remove("show");
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => fetchProducts("all"));
