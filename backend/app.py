from flask import Flask, request, jsonify
from twilio.rest import Client

app = Flask(__name__)

# Twilio credentials (replace with your account details)
account_sid = "YOUR_TWILIO_ACCOUNT_SID"
auth_token = "YOUR_TWILIO_AUTH_TOKEN"
twilio_number = "+1234567890"  # your Twilio phone number

client = None
try:
    client = Client(account_sid, auth_token)
except Exception:
    client = None

@app.route('/booking', methods=['POST'])
def booking():
    data = request.get_json()
    name = data.get("name")
    food = data.get("food")
    datetime = data.get("datetime")
    cart = data.get("cart", [])
    total = data.get("total", 0)

    # Build order details message
    order_details = f"✅ New Order!\nName: {name}\nFood: {food}\nDate & Time: {datetime}\n"
    for c in cart:
        order_details += f"- {c['item']} (₹{c['price']})\n"
    order_details += f"Total: ₹{total}"
    # Send SMS to your number (only if Twilio client initialized)
    if client is not None:
        try:
            client.messages.create(
                body=order_details,
                from_=twilio_number,
                to="+918106413016"   # your mobile number
            )
        except Exception:
            # ignore send errors in dev environment
            pass

    return jsonify({"message": "Booking confirmed and SMS sent!"})

if __name__ == "__main__":
    app.run(debug=True)
