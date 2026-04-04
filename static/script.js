document.getElementById("predictionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Get values from form
    const age = document.getElementById("age").value;
    const confidence = document.getElementById("confidence").value;
    const emotion = document.getElementById("emotion").value;
    const pressure = document.getElementById("pressure").value;
    const satisfaction = document.getElementById("satisfaction").value;

    const resultDiv = document.getElementById("result");

    // Simple validation
    if (!age || !confidence || !emotion || !pressure || !satisfaction) {
        resultDiv.innerHTML = "⚠️ Please fill all fields correctly.";
        return;
    }

    // Send data to Flask
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
    .then(response => response.json())
    .then(data => {

        // 🔥 Handle error from backend
        if (data.error) {
            resultDiv.innerHTML = "❌ Error: " + data.error;
            return;
        }

        // 🔥 Handle NaN problem safely
        if (!data.probability || isNaN(data.probability)) {
            resultDiv.innerHTML = "⚠️ Prediction failed. Please try again.";
            return;
        }

        // Convert to percentage
        const probability = (data.probability * 100).toFixed(2);

        // Show result
        if (data.result === 1) {
            resultDiv.innerHTML = `
                <h3>⚠️ High Regret Risk</h3>
                <p>Probability: ${probability}%</p>
            `;
        } else {
            resultDiv.innerHTML = `
                <h3>✅ Low Regret Risk</h3>
                <p>Probability: ${probability}%</p>
            `;
        }

    })
    .catch(error => {
        console.error("Error:", error);
        resultDiv.innerHTML = "❌ Server error. Please try again.";
    });
});