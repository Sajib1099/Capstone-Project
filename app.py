from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib

app = Flask(__name__)

# Load model
model = joblib.load("my_trained_model.pkl")

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict-page')
def predict_page():
    return render_template("predict.html")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    try:
        # Get values
        age = int(data['age'])
        confidence = int(data['confidence'])
        emotion = int(data['emotion'])
        pressure = int(data['pressure'])
        satisfaction = int(data['satisfaction'])

        # Create input
        input_df = pd.DataFrame([{
            '1️⃣ Age': age,
            '7️⃣ How confident were you when making this decision?': confidence,
            '8️⃣ How emotionally stable were you at that time?': emotion,
            '9️⃣ How much external pressure did you feel (family, society, friends)?': pressure,
            '1️⃣2️⃣ How satisfied are you with the outcome of this decision?': satisfaction
        }])

        # Ensure all columns match model
        input_df = input_df.reindex(columns=model.feature_names_in_, fill_value=0)

        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]

        return jsonify({
            "result": int(prediction),
            "probability": float(probability)
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)