const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
  window.location.href = "login.html";
}
const products = [
  {
    id: 1,
    name: "Shoes",
    price: 1000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id: 2,
    name: "Watch",
    price: 2000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 3,
    name: "Phone",
    price: 15000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  }
];

const productList = document.getElementById("product-list");
const cartBtn = document.getElementById("cart-btn");
const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DISPLAY PRODUCTS
function displayProducts(list = products) {
  productList.innerHTML = "";

  list.forEach(product => {
    productList.innerHTML += `
      <div class="card">
        <img src="${product.image}">
        <h2>${product.name}</h2>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

// ADD TO CART
function addToCart(id) {
  const item = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// UPDATE CART COUNT
function updateCartCount() {
  cartBtn.innerText = `Cart (${cart.length})`;
}

// SEARCH
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});

// FILTER
filter.addEventListener("change", () => {
  let sorted = [...products];

  if (filter.value === "low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (filter.value === "high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayProducts(sorted);
});
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

displayProducts();
updateCartCount();
