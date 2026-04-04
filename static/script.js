document.getElementById("predictionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const age = document.getElementById("age").value;
    const confidence = document.getElementById("confidence").value;
    const emotion = document.getElementById("emotion").value;
    const pressure = document.getElementById("pressure").value;
    const satisfaction = document.getElementById("satisfaction").value;

    const resultDiv = document.getElementById("result");

    if (!age || !confidence || !emotion || !pressure || !satisfaction) {
        resultDiv.innerHTML = "⚠️ Please fill all fields.";
        return;
    }

    resultDiv.innerHTML = "⏳ Analyzing...";

    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            age: parseInt(age),
            confidence: parseInt(confidence),
            emotion: parseInt(emotion),
            pressure: parseInt(pressure),
            satisfaction: parseInt(satisfaction)
        })
    })
    .then(res => res.json())
    .then(data => {

        if (data.error) {
            resultDiv.innerHTML = "❌ " + data.error;
            return;
        }

        if (!data.probability || isNaN(data.probability)) {
            resultDiv.innerHTML = "⚠️ Prediction failed.";
            return;
        }

        const prob = (data.probability * 100).toFixed(2);

        if (data.result === 1) {
            resultDiv.innerHTML = `⚠️ High Regret Risk (${prob}%)`;
        } else {
            resultDiv.innerHTML = `✅ Low Regret Risk (${prob}%)`;
        }

    })
    .catch(() => {
        resultDiv.innerHTML = "❌ Server error.";
    });
});