// ================= CART STORAGE =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= ADD TO CART =================
function addToCart(name, variant, price) {
  console.log("ADD TO CART CALLED", name, variant, price);

  cart.push({
    name,
    variant,
    price,
    qty: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart");
}

// ================= ASH PRODUCT UPDATE =================
function updateAshProduct(select) {
  const card = select.closest(".product-card");
  const option = select.options[select.selectedIndex];

  const img = option.dataset.img;
  const price = option.dataset.price;

  card.querySelector(".product-image").src = img;
  card.querySelector(".price").innerText = "₹" + price;
}

// ================= JALI PRODUCT UPDATE =================
function updateJaliProduct(select) {
  const card = select.closest(".product-card");
  const option = select.options[select.selectedIndex];

  const img = option.dataset.img;
  const price = option.dataset.price;

  card.querySelector(".product-image").src = img;
  card.querySelector(".price").innerText = "₹" + price;
}

// ================= ADD ASH TO CART =================
function addAshToCart(button) {
  const card = button.closest(".product-card");

  const pack = card.querySelector(".pack-select").value;

  // fragrance optional rakho (safe)
  const fragranceSelect = card.querySelector(".fragrance-select");
  const fragrance = fragranceSelect ? fragranceSelect.value : "No Fragrance";

  const price = parseInt(
    card.querySelector(".price").innerText.replace("₹", "")
  );

  addToCart(
    "VEER Ash Dishwash",
    pack + ", " + fragrance,
    price
  );
}


// ================= ADD JALI TO CART =================
function addJaliToCart(button) {
  const card = button.closest(".product-card");

  const size = card.querySelector(".jali-select").value;
  const price = parseInt(
    card.querySelector(".price").innerText.replace("₹", "")
  );

  addToCart(
    "VEER Natural Coir Jali",
    size,
    price
  );
}

// ================= LOAD CART PAGE =================
function loadCart() {
  const cartBox = document.getElementById("cart-items");
  const totalBox = document.getElementById("total");

  if (!cartBox) return;

  cartBox.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartBox.innerHTML += `
      <div class="cart-item">
        <p><strong>${item.name}</strong></p>
        <p>${item.variant}</p>
        <p>₹${item.price}</p>
      </div>
    `;
  });

  totalBox.innerText = "Total: ₹" + total;
}

// ================= CHECKOUT =================
function placeOrder() {
  let msg = "New Order – VEER%0A%0A";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    msg += `- ${item.name} (${item.variant}) – ₹${item.price}%0A`;
  });

  msg += `%0ATotal: ₹${total}`;

  window.open(
    "https://wa.me/917739230783?text=" + msg,
    "_blank"
  );
}
function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("total");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <div>
          <p><strong>${item.name}</strong></p>
          <p>${item.variant}</p>
          <p>₹${item.price}</p>
        </div>

        <button class="remove-btn" onclick="removeFromCart(${index})">
          ❌
        </button>
      </div>
    `;
  });

  totalContainer.innerText = "Total: ₹" + total;
}
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}
