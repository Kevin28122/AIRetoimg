const axios = require('axios');

// Declaración de variables
const predictionUrl = "https://aivision12.cognitiveservices.azure.com/customvision/v3.0/Prediction/6ccc0d04-9cbe-48cc-b6d7-a2cfec737b8e/classify/iterations/IAvision/url";
const predictionKey = "a70a0724e695415eb19dfa11dcb6ffc3";

// Código para llamar al servicio Custom Vision para la clasificación de imágenes
let img = "";

function analyzeImage() {
    const headers = {
        "Prediction-Key": predictionKey,
        "Content-Type": "application/json"
    };

    const body = {
        "url": img
    };

    console.log("Analyzing image...");
    axios.post(predictionUrl, body, { headers })
        .then(response => {
            const prediction = response.data;
            const predictedTag = prediction.predictions[0].tagName;
            const isAnimal = ["perro", "pato"].some(animal => predictedTag.includes(animal));
            const predictionType = isAnimal ? "Animal" : "Humano";

            console.log(`Type: ${predictionType}`);
            console.log(`Elemento: ${predictedTag}\n`);

            // Integracion de servicio de translate

            // Necesitas agregar la ubicación de tu recurso si usas un recurso de Cognitive Services
            const location = "eastus";

            // El punto final es global para el servicio Translator, NO lo cambies
            const endpoint = "https://api.cognitive.microsofttranslator.com/";

            // Texto a traducir
            const text = predictedTag;

            const translateHeaders = {
                "Ocp-Apim-Subscription-Key": predictionKey,
                "Ocp-Apim-Subscription-Region": location,
                "Content-Type": "application/json"
            };

            const translateBody = [{ text }];

            console.log("Translating image selected...");
            axios.post(`${endpoint}/translate?api-version=3.0&from=es&to=fr&to=it&to=zh-Hans`, translateBody, { headers: translateHeaders })
                .then(response => {
                    const analysis = response.data;
                    const frenchTranslation = analysis[0].translations[0].text;
                    const italianTranslation = analysis[0].translations[1].text;
                    const chineseTranslation = analysis[0].translations[2].text;

                    console.log(`Traducción original: ${text}`);
                    console.log(`Traducción francesa: ${frenchTranslation}`);
                    console.log(`Traducción italiana: ${italianTranslation}`);
                    console.log(`Traducción china: ${chineseTranslation}`);
                })
                .catch(error => {
                    console.error("Error translating image:", error);
                });
        })
        .catch(error => {
            console.error("Error analyzing image:", error);
        });
}

function handleImageChange(event) {
    img = event.target.value;
}

document.getElementById("image-input").addEventListener("change", handleImageChange);
document.getElementById("analyze-button").addEventListener("click", analyzeImage);
