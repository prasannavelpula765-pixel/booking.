let cart = [];
let total = 0;

// Function to add items to cart
function addToCart(item, price) {
  cart.push({item, price});
  total += price;

  // Update cart display
  let cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  cart.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.item} - ₹${c.price}`;
    cartList.appendChild(li);
  });

  document.getElementById("total").textContent = total;
}
document.getElementById('pay-button').onclick = function(e){
  var options = {
    "key": "YOUR_RAZORPAY_KEY_ID", // from Razorpay dashboard
    "amount": 50000, // amount in paise (₹500.00)
    "currency": "INR",
    "name": "Restaurant Order",
    "description": "Food Booking Payment",
    "handler": function (response){
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        window.location.href = "thank.html";
    },
    "prefill": {
        "name": document.getElementById("name").value,
        "email": "customer@example.com",
        "contact": document.getElementById("mobile").value
    },
    "theme": {
        "color": "#3399cc"
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
}

// Handle booking form submit
document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault(); // stop default refresh

  // ✅ Show order details before redirect
  let orderSummary = "Your Order:\n";
  cart.forEach(c => {
    orderSummary += `- ${c.item} (₹${c.price})\n`;
  });
  orderSummary += `Total: ₹${total}`;

  alert(orderSummary); // popup with order details

  // ✅ Redirect to thank.html after showing details
  window.location.href = "together.html";
});

// Get amount from URL
const params = new URLSearchParams(window.location.search);
let amount = params.get("amount");

// If no amount passed, set to 0
if (!amount) {
  amount = 0;
}

// Show amount to pay
document.getElementById("upi-amount").textContent = "Amount to Pay: ₹" + amount;





document.getElementById("confirm-button").onclick = function() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const food = params.get("food");
  const datetime = params.get("datetime");
  const mobile = params.get("mobile");
  const amount = params.get("amount");
  const address = params.get("address")

  const orderMessage = `Order Confirmed!
Name: ${name}
Items: ${food}
Date & Time: ${datetime}
Customer Mobile: ${mobile}
Total Amount: ₹${amount}
address : ${address}`;

  // ✅ Open WhatsApp with pre-filled message to your number
  const whatsappLink = `https://wa.me/918106413016?text=${encodeURIComponent(orderMessage)}`;
  window.location.href = whatsappLink;
};



const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages.create({
  body: `Order Confirmed! Name: ${name}, Items: ${food}, Total: ₹${amount}, Address :${address}`,
  from: '+1234567890', // Twilio number
  to: '+918106413016'  // Your number
});

// ✅ Send total + customer details to UPI page
document.getElementById("pay-button").onclick = function() {
  if (total > 0) {
    const name = document.getElementById("cust-name").value;
    const food = document.getElementById("cust-food").value;
    const datetime = document.getElementById("cust-datetime").value;
    const mobile = document.getElementById("cust-mobile").value;
    const address = document.getElementById("Address").value;
    const pincode = document.getElementById("Pincode").value;

    if (!name || !food || !datetime || !mobile || !address || !pincode) {
      alert("Please fill in all details before paying.");
      return;
    }

    // Pass details + total to payment page
    const url = `together.html?amount=${total}&name=${encodeURIComponent(name)}&food=${encodeURIComponent(food)}&datetime=${encodeURIComponent(datetime)}&mobile=${mobile}&address=${encodeURIComponent(address)}&pincode=${pincode}`;
    window.location.href = url;
  } else {
    alert("Your cart is empty. Please add items before paying.");
  }
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service Worker registered!"))
    .catch((err) => console.error("Service Worker failed:", err));
}


