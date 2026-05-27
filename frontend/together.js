function initTogetherPage() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") || "";
  const food = params.get("food") || "";
  const datetime = params.get("datetime") || "";
  const mobile = params.get("mobile") || "";
  const amount = params.get("amount") || "0";
  const address = params.get("address") || "";
  const pincode = params.get("pincode") || "";

  // Show amount
  const upiEl = document.getElementById("upi-amount");
  if (upiEl) upiEl.textContent = "Amount to Pay: ₹" + amount;

  // Show order details
  const orderDetailsEl = document.getElementById("order-details");
  if (orderDetailsEl) {
    orderDetailsEl.innerHTML = `
      <h3>Order Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Items:</strong> ${food}</p>
      <p><strong>Date & Time:</strong> ${datetime}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Pincode:</strong> ${pincode}</p>
    `;
  }

  // Build UPI link and QR
  const upiLink = `upi://pay?pa=8106413016@ptyes&pn=SR%20Homes%20Foods&tn=Order%20Payment&am=${encodeURIComponent(amount)}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;
  const qrSection = document.getElementById("qr-section");
  if (qrSection) qrSection.innerHTML = `<img src="${qrUrl}" alt="UPI QR Code">`;

  const payBtn = document.getElementById("pay-button");
  const desktopNote = document.getElementById("desktop-note");
  const txnSection = document.getElementById("txn-section");
  const txnInput = document.getElementById("txn-id");
  const submitTxn = document.getElementById("submit-txn");
  let paymentStarted = false;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);

  if (desktopNote) {
    desktopNote.textContent = isMobile
      ? "If you are on mobile, tap Pay Now to open your UPI app. After payment, enter the transaction ID and WhatsApp will open automatically."
      : "If you are on desktop, scan the QR code with your phone to pay. After payment, enter the transaction ID and WhatsApp will open automatically.";
  }

  if (payBtn) {
    payBtn.onclick = function() {
      paymentStarted = true;
      if (txnSection) txnSection.style.display = 'block';
      if (isMobile) {
        try {
          window.open(upiLink, '_blank');
        } catch (e) {
          window.location.href = upiLink;
        }
      } else {
        alert("Scan the QR code with your phone to complete payment. Then enter the transaction ID to open WhatsApp automatically.");
      }
    };
  }

  if (submitTxn) {
    submitTxn.addEventListener('click', function() {
      if (!paymentStarted) {
        alert("Please pay the amount first before submitting the transaction ID.");
        return;
      }
      const val = txnInput ? txnInput.value.trim() : '';
      if (!val) {
        alert('Please enter the transaction ID from your UPI app.');
        if (txnInput) txnInput.focus();
        return;
      }
      const orderMessage = `🛒 New Order Received!\nName: ${name}\nItems: ${food}\nDate & Time: ${datetime}\nCustomer Mobile: ${mobile}\nTotal Amount: ₹${amount}\nAddress: ${address}\nTransaction ID: ${val}\nPayment Status: Paid ✅`;
      const whatsappLink = `https://wa.me/918106413016?text=${encodeURIComponent(orderMessage)}`;
      const opened = window.open(whatsappLink, '_blank');
      if (!opened) {
        window.location.href = whatsappLink;
      }
      setTimeout(() => {
        window.location.href = 'thank.html';
      }, 300);
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTogetherPage);
} else {
  initTogetherPage();
}
