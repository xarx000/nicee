document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        document.getElementById("status").innerText = "⏳ Ottenendo la posizione...";

        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                console.log("📍 Posizione ottenuta:", lat, lon); // Debug

                // Sostituisci con il tuo URL di Google Apps Script
                var url = "https://script.google.com/macros/s/AKfycbyAl9mD6_pFyzd7I8G8C-N0VTPsRKu3ngNe-RXuowLwWMHKG8q3Ur71Nv412VmZob7Z/exec";

                // Invia i dati a Google Sheets
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ lat: lat, lon: lon })
                })
                .then(response => response.text())
                .then(data => {
                    console.log("✅ Risposta da Google Sheets:", data); // Debug
                    document.getElementById("status").innerText = "✅ Posizione inviata con successo!";
                })
                .catch(error => {
                    console.error("❌ Errore nell'invio:", error); // Debug
                    document.getElementById("status").innerText = "❌ Errore nell'invio!";
                });
            },
            function (error) {
                console.error("❌ Errore geolocalizzazione:", error.message);
                document.getElementById("status").innerText = "❌ Errore nella geolocalizzazione: " + error.message;
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    } else {
        document.getElementById("status").innerText = "❌ Geolocalizzazione non supportata!";
    }
});
