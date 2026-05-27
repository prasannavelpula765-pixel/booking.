function placeOrder(item, price) {
  fetch("http://127.0.0.1:5000/order", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({food: item, price: price})
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message); // shows "Thank you for ordering!"
  });
}
 // When Pay button clicked → go to payment page with total
  document.getElementById("pay-button").onclick = function() {
    window.location.href = "upi.html?amount=" + total;
  };
   <p>Total: ₹<span id="total amount">0</span></p>
  </section>