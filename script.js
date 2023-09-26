const urlPrediccion = "introduccir la url del servivicio";
const keyPrediccion = "introducir la llave del servicio";

let numImg = 1;

let imagen = document.getElementById("lol");

const headers = new Headers();
headers.append("Prediction-Key", predictionKey);
headers.append("Content-Type", "application/json");

const body = JSON.stringify({ url: imgUrl });

fetch(predictionUrl, {
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