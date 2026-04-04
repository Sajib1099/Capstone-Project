from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib

# ✅ STEP 1: Create app FIRST
app = Flask(_name_)

# ✅ STEP 2: Load model
model = joblib.load("my_trained_model.pkl")

# ✅ HOME PAGE
@app.route('/')
def home():
    return render_template("index.html")

# ✅ PREDICT PAGE
@app.route('/predict-page')
def predict_page():
    return render_template("predict.html")

# ✅ PREDICTION API
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    try:
        age = int(data['age'])
        confidence = int(data['confidence'])
        emotion = int(data['emotion'])
        pressure = int(data['pressure'])
        satisfaction = int(data['satisfaction'])

        # Create DataFrame
        input_df = pd.DataFrame([{
            '1️⃣ Age': age,
            '7️⃣ How confident were you when making this decision?': confidence,
            '8️⃣ How emotionally stable were you at that time?': emotion,
            '9️⃣ How much external pressure did you feel (family, society, friends)?': pressure,
            '1️⃣2️⃣ How satisfied are you with the outcome of this decision?': satisfaction
        }])

        # Add missing columns
        for col in model.feature_names_in_:
            if col not in input_df.columns:
                input_df[col] = 0

        # Match column order
        input_df = input_df[model.feature_names_in_]

        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]

        return jsonify({
            "result": int(prediction),
            "probability": float(probability)
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# ✅ RUN APP
if _name_ == '_main_':
    app.run(debug=True)