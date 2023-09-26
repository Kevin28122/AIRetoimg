const urlPrediccion = "introduccir la url del servivicio";
const llavePrediccion = "introducir la llave del servicio";

let numImg = 1;

let imagen = document.getElementById("imagein");

const headers = new Headers();
headers.append("llave-prediccion", llavePrediccion);
headers.append("tipo-contenido", "application/json");

const body = JSON.stringify({ url: imagen });

fetch(urlPrediccion, {
    method: "POST",
    headers,
    body
  })
    .then(response => response.json())
    .then(prediction => {
      const firstPrediction = prediction.predictions[0];
      console.log("La imagen es de:", firstPrediction.tagName);
    })
    .catch(error => console.error("Error:", error));

const llave = "YOUR_KEY";
const locacion = "YOUR_LOCATION";
const puntoConexion = "https://api.cognitive.microsofttranslator.com/";

let text = firstPrediction;

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
