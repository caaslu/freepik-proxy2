const axios = require("axios");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
          "Content-Type": "application/json",
          "x-freepik-api-key": apiKey
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Erro ao gerar imagem:", error.message);
    res.status(500).json({ error: "Erro ao gerar imagem" });
  }
}
