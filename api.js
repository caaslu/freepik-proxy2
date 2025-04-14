const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const apiKey = process.env.FREEPIK_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API Key not found" });
  }

  try {
    const response = await axios.post(
      "https://api.freepik.com/v1/ai/text-to-image/flux-dev",
      {
        prompt,
        aspect_ratio: "widescreen_16_9",
        styling: {
          effects: {
            color: "vibrant",
            framing: "wideshot",
            lightning: "goldenhour"
          }
        }
      },
      {
        headers: {
          "x-freepik-api-key": apiKey,
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Erro ao gerar imagem" });
  }
});

module.exports = app;
