document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("predictionForm");

    if (!form) return;

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const data = {
            age: document.getElementById("age").value,
            confidence: document.getElementById("confidence").value,
            emotion: document.getElementById("emotion").value,
            pressure: document.getElementById("pressure").value,
            satisfaction: document.getElementById("satisfaction").value
        };

        const resultDiv = document.getElementById("result");

        resultDiv.innerHTML = "Analyzing...";
        resultDiv.style.color = "#00f5ff";

        try {
            const response = await fetch("/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.result === 1) {
                resultDiv.innerHTML = "⚠️ High Regret Risk";
                resultDiv.style.color = "red";
            } else {
                resultDiv.innerHTML = "✅ Low Regret Risk";
                resultDiv.style.color = "green";
            }

        } catch (error) {
            resultDiv.innerHTML = "❌ Error connecting to server";
            resultDiv.style.color = "red";
        }

    });

});