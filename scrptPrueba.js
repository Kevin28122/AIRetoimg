document.addEventListener("DOMContentLoaded", function() {
    const urlPrediccion = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/02ed81c5-1dee-473b-9c76-06f95a854d45/classify/iterations/senasoft/image";
    const llavePrediccion = "2b1eca95adfe4958b18ba195099f7ab7";

    function cargarImagen() {
        var inputImagen = document.getElementById("inputImagen");
        var imagen = inputImagen.files[0];
        return imagen;
    }

    function realizarPrediccion() {
      const formData = new FormData();
      formData.append("image", cargarImagen());
  
      fetch(urlPrediccion, {
        method: "POST",
        headers: {
          "Prediction-Key": llavePrediccion,
        },
        body: formData
      })
        .then(response => response.json())
        .then(prediction => {
          const firstPrediction = prediction.predictions[0];
          console.log("La imagen es de:", firstPrediction.tagName);
        })
        .catch(error => console.error("Error:", error));
    }

  });
  