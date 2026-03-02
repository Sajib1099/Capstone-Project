function predictDecision() {

    // Get values from input fields
    const age = document.getElementById("age").value;
    const confidence = document.getElementById("confidence").value;
    const emotion = document.getElementById("emotion").value;
    const pressure = document.getElementById("pressure").value;
    const satisfaction = document.getElementById("satisfaction").value;

    // Basic validation
    if (!age || !confidence || !emotion || !pressure || !satisfaction) {
        alert("Please fill all fields!");
        return;
    }

    const data = {
        age: parseInt(age),
        confidence: parseInt(confidence),
        emotion: parseInt(emotion),
        pressure: parseInt(pressure),
        satisfaction: parseInt(satisfaction)
    };

    // Send data to Flask backend
    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {

        const resultBox = document.getElementById("result");

        if (result.prediction === 1) {
            resultBox.innerHTML =
                "⚠️ High Regret Risk <br> Probability: " + result.probability + "%";
            resultBox.style.color = "red";
        } else {
            resultBox.innerHTML =
                "✅ Low Regret Risk <br> Probability: " + result.probability + "%";
            resultBox.style.color = "green";
        }

    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong!");
    });
}