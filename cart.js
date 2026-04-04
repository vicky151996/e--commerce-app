const cartItemsDiv = document.getElementById("cart-items");
const totalDiv = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItemsDiv.innerHTML += `
      <div class="card">
        <img src="${item.image}">
        <h2>${item.name}</h2>
        <p>₹${item.price}</p>

        <div>
          <button onclick="decrease(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increase(${index})">+</button>
        </div>

        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalDiv.innerText = "Total: ₹" + total;
}

function increase(index) {
  cart[index].quantity++;
  updateCart();
}

function decrease(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();