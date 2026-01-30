// ================= CART STORAGE =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= ADD TO CART =================
function addToCart(name, variant, price) {
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

  card.querySelector(".product-image").src = option.dataset.img;
  card.querySelector(".price").innerText = "₹" + option.dataset.price;
}

// ================= JALI PRODUCT UPDATE =================
function updateJaliProduct(select) {
  const card = select.closest(".product-card");
  const option = select.options[select.selectedIndex];

  card.querySelector(".product-image").src = option.dataset.img;
  card.querySelector(".price").innerText = "₹" + option.dataset.price;
}

// ================= ADD ASH TO CART =================
function addAshToCart(button) {
  const card = button.closest(".product-card");
  const pack = card.querySelector(".pack-select").value;

  const fragranceSelect = card.querySelector(".fragrance-select");
  const fragrance = fragranceSelect ? fragranceSelect.value : "No Fragrance";

  const price = parseInt(
    card.querySelector(".price").innerText.replace("₹", "")
  );

  addToCart("VEER Ash Dishwash", pack + ", " + fragrance, price);
}

// ================= ADD JALI TO CART =================
function addJaliToCart(button) {
  const card = button.closest(".product-card");
  const size = card.querySelector(".jali-select").value;

  const price = parseInt(
    card.querySelector(".price").innerText.replace("₹", "")
  );

  addToCart("VEER Natural Coir Jali", size, price);
}

// ================= LOAD CART PAGE =================
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
        <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
  });

  totalContainer.innerText = "Total: ₹" + total;
}

// ================= REMOVE ITEM =================
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ================= PLACE ORDER (WHATSAPP) =================
function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const note = document.getElementById("note").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill Name, Phone and Address");
    return;
  }

  let message = "";
  message += "NEW ORDER - VEER%0A%0A";
  message += "Name: " + name + "%0A";
  message += "Phone: " + phone + "%0A";
  message += "Address: " + address + "%0A%0A";
  message += "Order Details:%0A";

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    message += "- " + item.name + " (" + item.variant + ") : Rs " + item.price + "%0A";
  });

  message += "%0ATotal Amount: Rs " + total;

  if (note) {
    message += "%0A%0ANote: " + note;
  }

  const whatsappNumber = "917739230783";
 const url =
  "https://api.whatsapp.com/send?phone=" +
  whatsappNumber +
  "&text=" +
  encodeURIComponent(message);

window.open(url, "_blank");

  // clear cart after order
  localStorage.removeItem("cart");
  cart = [];
}

