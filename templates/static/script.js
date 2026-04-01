// Wait until page fully loads
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("predictionForm");

    // Only run if form exists (important for multi-page setup)
    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const age = document.getElementById("age").value;
        const confidence = document.getElementById("confidence").value;
        const emotion = document.getElementById("emotion").value;
        const pressure = document.getElementById("pressure").value;
        const satisfaction = document.getElementById("satisfaction").value;
        const resultDiv = document.getElementById("result");

        // =============================
        // 1️⃣ Validation Check
        // =============================

        if (!age || !confidence || !emotion || !pressure || !satisfaction) {
            resultDiv.innerHTML = "⚠️ Please fill in all fields before prediction.";
            resultDiv.style.color = "#f87171";
            return;
        }

        if (age < 15 || age > 80) {
            resultDiv.innerHTML = "⚠️ Age must be between 15 and 80.";
            resultDiv.style.color = "#f87171";
            return;
        }

        // =============================
        // 2️⃣ Show Loading Effect
        // =============================

        resultDiv.innerHTML = "Analyzing decision data...";
        resultDiv.style.color = "#38bdf8";

        setTimeout(function () {

            // Convert values to numbers
            const c = parseInt(confidence);
            const e = parseInt(emotion);
            const p = parseInt(pressure);
            const s = parseInt(satisfaction);

            // =============================
            // 3️⃣ Simple Prediction Logic
            // (Temporary until Flask integration)
            // =============================

            let score = (c + e + s) - p;

            // Calculate fake probability percentage
            let probability = Math.min(Math.max((score * 10), 5), 95);

            // =============================
            // 4️⃣ Show Result
            // =============================

            if (score < 10) {
                resultDiv.innerHTML = `
                    ⚠️ <strong>High Regret Risk Detected</strong><br>
                    Estimated Probability: ${probability}% 
                `;
                resultDiv.style.color = "#f87171";
            } else {
                resultDiv.innerHTML = `
                    ✅ <strong>Low Regret Risk</strong><br>
                    Estimated Probability: ${probability}% 
                `;
                resultDiv.style.color = "#4ade80";
            }

        }, 1200); // 1.2 second delay for professional effect

    });

});