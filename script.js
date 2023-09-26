  document.addEventListener("DOMContentLoaded", function() {
    const urlPrediccion = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/02ed81c5-1dee-473b-9c76-06f95a854d45/classify/iterations/senasoft/image";
    const llavePrediccion = "2b1eca95adfe4958b18ba195099f7ab7";

    function cargarImagen() {
      var inputImagen = document.getElementById("imagein");
      var imagen = inputImagen.files[0];
      return imagen;
    }

    const headers = new Headers();
    headers.append("Prediction-key", llavePrediccion);
    headers.append("Content-Type", "multipart/form-data");

    const formData = new FormData();
    formData.append("image", cargarImagen());

    fetch(urlPrediccion, {
      method: "POST",
      headers,
      body: formData
    })
      .then(response => response.json())
      .then(prediction => {
        const firstPrediction = prediction.predictions[0];
        console.log("La imagen es de:", firstPrediction.tagName);
      })
      .catch(error => console.error("Error:", error));
  });


const llave = "5cf133982c9640a5b9701f86cfe7e612";
const locacion = "eastus";
const puntoConexion = "https://api.cognitive.microsofttranslator.com/";

var text = firstPrediction;

headers = {
  "Ocp-Apim-Subscription-Key": llave,
  "Ocp-Apim-Subscription-Region": locacion,
  "Content-Type": "application/json",
};

body = JSON.stringify([{ text }]);

console.log("Translating text...");

fetch(`${puntoConexion}/translate?api-version=3.0&from=es&to=en&to=fr&to=pt-Hans`, {
  method: "POST",
  headers,
  body,
})

  .then(response => response.json())
  .then(analysis => {
    const ingles = analysis[0].translations[0].text;
    const franses = analysis[0].translations[1].text;
    const portugues = analysis[0].translations[2].text;

    eleccion = document.getElementById("SelectLang").value;

    if (eleccion = "En") {
        console.log (`texto original: ${text}\nTexto en ingles: ${ingles}`);
    } else if (eleccion = "Fr") {
        console.log (`texto original: ${text}\nTexto en ingles: ${franses}`);
    } else if (eleccion = "Port") {
        console.log (`texto original: ${text}\nTexto en ingles: ${portugues}`);
    }
  })

  .catch(error => console.error("Error:", error));