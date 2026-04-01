from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load model
model = joblib.load("my_trained_model.pkl")

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

    # Create input dictionary (same as training)
    new_person = {
        '1️⃣ Age': int(data["age"]),
        '7️⃣ How confident were you when making this decision?': int(data["confidence"]),
        '8️⃣ How emotionally stable were you at that time?': int(data["emotion"]),
        '9️⃣ How much external pressure did you feel (family, society, friends)?': int(data["pressure"]),
        '1️⃣2️⃣ How satisfied are you with the outcome of this decision?': int(data["satisfaction"])
    }

    # Convert to DataFrame
    new_df = pd.DataFrame([new_person])

    # Apply same preprocessing
    new_df = pd.get_dummies(new_df)

    # 🔥 VERY IMPORTANT LINE (this fixes your main problem)
    new_df = new_df.reindex(columns=model.feature_names_in_, fill_value=0)

    # Prediction
    prediction = model.predict(new_df)[0]
    probability = model.predict_proba(new_df)[0][1]

    return jsonify({
        "result": int(prediction),
        "probability": float(probability)
    })

# Run app
if __name__ == "__main__":
    app.run(debug=True)