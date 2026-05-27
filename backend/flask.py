from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/booking', methods=['POST'])
def booking():
    data = request.get_json()
    print("Booking received:", data)  # shows in terminal
    return jsonify({"message": "✅ Booking confirmed!", "booking": data})

if __name__ == "__main__":
    app.run(debug=True)
