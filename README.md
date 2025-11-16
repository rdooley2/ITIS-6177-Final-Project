<p align="center">
<h1>API Documentation 📝</h1>

<h2>Overview 📌</h2>

This API provides simple access to the Microsoft Azure Language Services.
All requests are proxied through this API, meaning no registration or configuration with Microsoft Azure is required.

This API utilizes four Azure AI Language endpoints:
<ul>
 <li>Sentiment Analysis</li>
 <li>Key Phrase Extraction</li>
 <li>Entity Recognition</li>
 <li>Full Analysis (the previous three combined)</li>
</ul>

The API accepts plain English text and forwards it to Azure Cognitive Services. These requests are then analyzed with AI, and a response is forwarded to this API. To make things easier to comprehend, I have created this visualization of the entire process:
<br/><br/>
<img src="https://i.imgur.com/CUWbR29.png" height="80%" width="80%" alt="Validation Rules"/>
<br/><br/>

<h2>Authentication 🔐</h2>

This code is designed to rely on an env file. Essentially, when the code makes the API Key and Azure Endpoint variables, it reads the env file and assigns those values. This allows the API to connect with the Azure API without having the values hard-coded into the code. For the practicality of this GitHub repository, I have uploaded the env file but have removed the original values to show how it would be formatted.
<br/><br/>

<h2>Technologies Used ⚙️</h2>
<ul>
 <li>Node.js + Express</li>
 <li>Axios for HTTP requests</li>
 <li>dotenv for environment variable management</li>
 <li>pm2 process manager to keep the API running 24/7</li>
 <li>Azure AI Language Services API</li>
 <li>DigitalOcean Droplet for server hosting</li>
 <li>Postman for testing</li>
</ul>
<br/>

<h2>Input Validation Rules ⚠️</h2>

Before explaining how to format a request, it's important to understand how the request body is validated before sending it off to the Azure AI Language endpoints. For simplicity's sake, all of the validation code exists in one predefined function and can be called later in the individual POST requests. Here is the full code:
<br/><br/>
<img src="https://i.imgur.com/5QNcNK7.png" height="80%" width="80%" alt="Validation Rules"/>
<br/><br/>
The first if statement ensures that the text is a string. If it were to be a non-string, it would throw an error message:
<br/><br/>
<img src="https://i.imgur.com/P9gSoub.png" height="80%" width="80%" alt="Validation Rules"/>
<br/><br/>
The second if statement ensures that there is text in the request. If there is no text, it will throw an error message:
<br/><br/>
<img src="https://i.imgur.com/DhWpaki.png" height="80%" width="80%" alt="Validation Rules"/>
<br/><br/>
The third if statement ensures that the text is not too long. If the text goes over 7500 characters, the code will throw an error message:
<br/><br/>
<img src="https://i.imgur.com/OtmUlG2.png" height="80%" width="80%" alt="Validation Rules"/>
<br/><br/>
If you follow all three of these rules, you should be all set to use the API correctly!
<br/><br/>
<h2>Endpoint Breakdown 🛠️</h2>

As stated previously, this API utilizes four Azure AI Language endpoints. Those being Sentiment Analysis, Key Phrase Extraction, Entity Recognition, and Full Analysis. Let's take a look at each to understand exactly what they are doing. 
<br/><br/>

<h3>Sentiment Analysis</h3>

This endpoint functions by analyzing text to determine if it is more positive, negative, or neutral. Have a look at this example request and response that I generated:
<br/><br/>
<img src="https://i.imgur.com/CHnmPXS.png" height="80%" width="80%" alt="Validation Rules"/>
<br/><br/>

<h3>Key Phrase Extraction</h3>

This endpoint functions by analyzing text to determine the key phrases within the sentence. Have a look at this example request and response that I generated:
<br/><br/>
<img src="https://i.imgur.com/FclPGwm.png" height="80%" width="80%" alt="Validation Rules"/>
<br/><br/>

<h3>Entity Recognition</h3>

This endpoint functions by analyzing text to determine the different entities within a sentence. Entities can be a person, place, time, quantity, etc. Have a look at this example request and response that I generated:
<br/><br/>
<img src="https://i.imgur.com/su2yvdh.png" height="80%" width="80%" alt="Validation Rules"/>
<br/><br/>

<h3>Full Analysis</h3>

This endpoint functions by calling the previous three endpoints to form a single giant response. Have a look at this example request and response that I generated:
<br/><br/>
<img src="https://i.imgur.com/uoWsLMn.png" height="80%" width="80%" alt="Validation Rules"/>
<br/><br/>

For easier access to these endpoints, I have created a list:
<ul>
 <li>http://138.68.43.128:3000/analyze/sentiment</li>
 <li>http://138.68.43.128:3000/analyze/key-phrases</li>
 <li>http://138.68.43.128:3000/analyze/entities</li>
 <li>http://138.68.43.128:3000/analyze/full</li>
</ul>

In addition, here is the text that was used to test the API. Feel free to copy it and play around with the text contents!
<pre>
{
  "text": "My boss recently assigned me two conduct cases. They are due on November 21st and I am short on time."
}</pre>
<br/>

<h2>Conclusion ✅</h2> 
This project integrates my custom API with Azure’s AI Language Services, allowing users to analyze text easily without configuring Azure themselves. It demonstrates practical API design, validation, documentation, and system integration concepts.
