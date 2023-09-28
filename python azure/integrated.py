import requests
import sys

# Declaración de variables
prediction_url = "https://aivision12.cognitiveservices.azure.com/customvision/v3.0/Prediction/6ccc0d04-9cbe-48cc-b6d7-a2cfec737b8e/classify/iterations/IAvision/url"
prediction_key = "a70a0724e695415eb19dfa11dcb6ffc3"

# Código para llamar al servicio Custom Vision para la clasificación de imágenes
img_num = 1
if len(sys.argv) > 1 and int(sys.argv[1]) in range(1, 8):
    img_num = int(sys.argv[1])

img = f"https://www.lavanguardia.com/uploads/2021/06/07/60be17e39ecfa.jpeg"

headers = {
    "Prediction-Key": prediction_key,
    "Content-Type": "application/json"
}

body = {
    "url": img
}

print("Analyzing image...")
response = requests.post(prediction_url, headers=headers, json=body)
prediction = response.json()

predicted_tag = prediction['predictions'][0]['tagName']
is_animal = any(animal in predicted_tag for animal in ["perro","pato"])
prediction_type = "Animal" if is_animal else "Humano"

print(f"Type: {prediction_type}")
print(f"Elemento: {predicted_tag}\n")

# Integracion de servicio de translate

# You need to add your resource location if you use a Cognitive Services resource
location = "eastus"

# The endpoint is global for the Translator service, DO NOT change it 
endpoint = "https://api.cognitive.microsofttranslator.com/"

# Text to be translated 
text = predicted_tag 

headers = {
    "Ocp-Apim-Subscription-Key": prediction_key,
    "Ocp-Apim-Subscription-Region": location,
    "Content-Type": "application/json"
}

body = [{"text": text}] 

print("Traduciendo imagen seleccionada...")
response = requests.post(
    f"{endpoint}/translate?api-version=3.0&from=es&to=fr&to=it&to=zh-Hans",
    headers=headers,
    json=body
)

analysis = response.json()
french = analysis[0]["translations"][0] 
italian = analysis[0]["translations"][1] 
chinese = analysis[0]["translations"][2] 
print(f"Traduccion original: {text}\nTraduccion frances: {french['text']}\nTraduccion italiano: {italian['text']}\nTraduccion chino: {chinese['text']}")
