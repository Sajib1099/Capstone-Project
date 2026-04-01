from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load your trained model
model = pickle.load(open("my_trained_model.pkl", "rb"))

# Home page
@app.route("/")
def home():
    return render_template("index.html")

# Prediction page
@app.route("/predict-page")
def predict_page():
    return render_template("predict.html")

# Prediction API
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    age = int(data["age"])
    confidence = int(data["confidence"])
    emotion = int(data["emotion"])
    pressure = int(data["pressure"])
    satisfaction = int(data["satisfaction"])

    # Arrange input for model
    input_data = np.array([[age, confidence, emotion, pressure, satisfaction]])

    prediction = model.predict(input_data)[0]

    return jsonify({"result": int(prediction)})

# Run server
if __name__ == "__main__":
    app.run(debug=True)