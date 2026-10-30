// FreshFold laundry booking app
// Add your EmailJS credentials in the EMAILJS_CONFIG object below.
const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceID: "YOUR_EMAILJS_SERVICE_ID",
  templateID: "YOUR_EMAILJS_TEMPLATE_ID"
};

const services = [
  { id: 1, name: "Dry Cleaning", price: 200, icon: "👕" },
  { id: 2, name: "Wash & Fold", price: 100, icon: "🧺" },
  { id: 3, name: "Ironing", price: 30, icon: "♨️" },
  { id: 4, name: "Stain Removal", price: 500, icon: "✨" },
  { id: 5, name: "Leather & Suede Cleaning", price: 999, icon: "🧥" },
  { id: 6, name: "Wedding Dress Cleaning", price: 2800, icon: "👗" }
];

let cart = [];
const serviceList = document.getElementById("serviceList");
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");

function money(value) {
  return `₹${value.toFixed(2)}`;
}

function renderServices() {
  serviceList.innerHTML = services.map(service => {
    const added = cart.some(item => item.id === service.id);
    return `
      <div class="service-row">
        <div class="service-info">
          <span class="service-emoji">${service.icon}</span>
          <span>${service.name} <span class="service-price">· ${money(service.price)}</span></span>
        </div>
        <button class="service-action ${added ? "remove" : "add"}" data-id="${service.id}" data-action="${added ? "remove" : "add"}">
          ${added ? "Remove Item  ⊖" : "Add Item  ⊕"}
        </button>
      </div>`;
  }).join("");
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<tr class="empty-row"><td colspan="4">No items added yet</td></tr>';
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <tr>
        <td>${index + 1}</td><td>${item.name}</td><td>${money(item.price)}</td>
        <td><button class="remove-cart" data-id="${item.id}" aria-label="Remove ${item.name}">×</button></td>
      </tr>`).join("");
  }
  totalAmount.textContent = money(cart.reduce((sum, item) => sum + item.price, 0));
  renderServices();
}

serviceList.addEventListener("click", event => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "add") {
    const service = services.find(item => item.id === id);
    if (service && !cart.some(item => item.id === id)) cart.push(service);
  } else {
    cart = cart.filter(item => item.id !== id);
  }
  renderCart();
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  cart = cart.filter(item => item.id !== Number(button.dataset.id));
  renderCart();
});

function emailJsConfigured() {
  return window.emailjs &&
    !EMAILJS_CONFIG.publicKey.startsWith("YOUR_") &&
    !EMAILJS_CONFIG.serviceID.startsWith("YOUR_") &&
    !EMAILJS_CONFIG.templateID.startsWith("YOUR_");
}

document.getElementById("bookingForm").addEventListener("submit", async event => {
  event.preventDefault();
  const message = document.getElementById("formMessage");
  const button = document.getElementById("bookButton");
  const success = document.getElementById("successState");
  message.textContent = "";
  success.hidden = true;

  if (cart.length === 0) {
    message.textContent = "Please add at least one service to your cart before booking.";
    return;
  }

  const customer = {
    fullName: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim()
  };
  const orderItems = cart.map(item => `${item.name} - ${money(item.price)}`).join("\n");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  button.disabled = true;
  button.textContent = "Booking...";

  try {
    if (emailJsConfigured()) {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, {
        to_email: customer.email,
        customer_name: customer.fullName,
        customer_email: customer.email,
        phone_number: customer.phone,
        order_items: orderItems,
        total_amount: money(total),
        reply_to: customer.email
      });
      message.textContent = "Confirmation email sent successfully.";
      message.style.color = "#15945d";
    } else {
      // Demo mode: the booking still completes locally; configure EmailJS to send real emails.
      message.textContent = "Demo booking completed. Add your EmailJS keys in script.js to send a real email.";
      message.style.color = "#b06a13";
    }
    success.hidden = false;
    cart = [];
    renderCart();
    event.target.reset();
  } catch (error) {
    console.error("EmailJS booking error:", error);
    message.textContent = "Booking could not be emailed. Please check your EmailJS configuration and try again.";
  } finally {
    button.disabled = false;
    button.textContent = "Book now";
  }
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("newsletterName").value.trim();
  document.getElementById("newsletterMessage").textContent = `Thanks ${name}! You're subscribed.`;
  event.target.reset();
});

document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("navLinks");
  const open = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
renderCart();
