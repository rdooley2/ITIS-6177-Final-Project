require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT;
const AZURE_API_KEY = process.env.AZURE_API_KEY;
const API_VERSION = "2023-11-15-preview";
const MAX_LENGTH = 5000;


function validateText(text, res) {
  
  if (typeof text !== 'string') {
    res.status(400).json({ error: "Text must be a string." });
    return false;
  }

  const trimmed = text.trim();

  if (trimmed === "") {
    res.status(400).json({ error: "Text must be a non-empty string." });
    return false;
  }

  if (trimmed.length > MAX_LENGTH) {
    res.status(413).json({
      error: `Text is too long. Max length is ${MAX_LENGTH} characters.`
    });
    return false;
  }

  return trimmed; 
}

async function callAzureLanguageAPI(kind, text) {
  const base = AZURE_ENDPOINT.replace(/\/+$/, "");
  const url = `${base}/language/:analyze-text?api-version=2023-04-01`;

  const body = {
    kind, // "SentimentAnalysis", "EntityRecognition", "KeyPhraseExtraction"
    analysisInput: {
      documents: [
        {
          id: "1",
          language: "en",
          text: text
        }
      ]
    },
    parameters: {}
  };

  const headers = {
    "Ocp-Apim-Subscription-Key": AZURE_API_KEY,
    "Content-Type": "application/json"
  };

  const response = await axios.post(url, body, { headers });
  return response.data;
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/analyze/sentiment', async (req, res) => {
    const cleaned = validateText(req.body.text, res);
    if (!cleaned) return;

    const data = await callAzureLanguageAPI("SentimentAnalysis", cleaned);

    res.json({
      sentiment: data.results.documents[0].sentiment,
      confidenceScores: data.results.documents[0].confidenceScores,
      sentences: data.results.documents[0].sentences.map(s => ({
        text: s.text,
        sentiment: s.sentiment
      }))
    });
});

app.post('/analyze/key-phrases', async (req, res) => {
    
  const cleaned = validateText(req.body.text, res);
    if (!cleaned) return;

    const data = await callAzureLanguageAPI("KeyPhraseExtraction", cleaned);

    res.json({
      keyPhrases: data.results.documents[0].keyPhrases
    });
});

app.post('/analyze/entities', async (req, res) => {
    
    const cleaned = validateText(req.body.text, res);
    if (!cleaned) return;

    const data = await callAzureLanguageAPI("EntityRecognition", cleaned);

    res.json({
      entities: data.results.documents[0].entities.map(e => ({
        text: e.text,
        category: e.category,
        confidence: e.confidenceScore
      }))
    });
});

app.post('/analyze/full', async (req, res) => {
    
    const cleaned = validateText(req.body.text, res);
    if (!cleaned) return;

    const sentiment = await callAzureLanguageAPI("SentimentAnalysis", cleaned);
    const entities = await callAzureLanguageAPI("EntityRecognition", cleaned);
    const keyPhrases = await callAzureLanguageAPI("KeyPhraseExtraction", cleaned);

    res.json({
      sentiment: {
        overall: sentiment.results.documents[0].sentiment,
        confidenceScores: sentiment.results.documents[0].confidenceScores
      },
      entities: entities.results.documents[0].entities,
      keyPhrases: keyPhrases.results.documents[0].keyPhrases
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
