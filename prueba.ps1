$predictionUrl="https://aivision12.cognitiveservices.azure.com/customvision/v3.0/Prediction/6ccc0d04-9cbe-48cc-b6d7-a2cfec737b8e/classify/iterations/IAvision/image"
$predictionKey = "a70a0724e695415eb19dfa11dcb6ffc3"


# Code to call Custom Vision service for image classification

$img_num = 1
if ($args.count -gt 0 -And $args[0] -in (1..3))
{
    $img_num = $args[0]
}

$img = "/imagenes/perros/Coat_types_3.jpg"

$headers = @{}
$headers.Add( "Prediction-Key", $predictionKey )
$headers.Add( "Content-Type","application/octet-stream" )

$body = "{'url' : '$img'}"

write-host "Analyzing image..."
$result = Invoke-RestMethod -Method Post `
          -Uri $predictionUrl `
          -Headers $headers `
          -Body $body | ConvertTo-Json -Depth 5

$prediction = $result | ConvertFrom-Json

$predicted = $prediction.predictions[0].tagName
Write-Host ("`n", $predicted , "`n")

#Add your key here
$key="65f18186e9794c71ba3b29f7e0449c5b"

#You need to add your resource location if you use a Cognitive Services resource
$location="eastus"

#The endpoint is global for the Translator service, DO NOT change it 
$endpoint="https://api.cognitive.microsofttranslator.com/"

#Text to be translated 
$text = $predicted

# Code to call Text Analytics service to analyze sentiment in text
$headers = @{}
$headers.Add( "Ocp-Apim-Subscription-Key", $key )
$headers.Add( "Ocp-Apim-Subscription-Region", $location )
$headers.Add( "Content-Type","application/json" )

$body = "[{'text': '$text'}]" 

write-host "Translating text..."
$result = Invoke-Webrequest -Method Post `
          -Uri "$endpoint/translate?api-version=3.0&from=en&to=fr&to=it&to=pt-Hans" `
          -Headers $headers `
          -Body $body 

$analysis = $result.content | ConvertFrom-Json
$french = $analysis.translations[0] 
$italian = $analysis.translations[1] 
$chinese = $analysis.translations[2] 
Write-Host ("Original Text: $text`nFrench Translation: $($french.text)`nItalian Translation: $($italian.text)`nChinese Translation: $($chinese.text)`n")