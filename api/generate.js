export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const response = await fetch("https://api.freepik.com/v1/ai/text-to-image/flux-dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-freepik-api-key": process.env.FREEPIK_API_KEY,
        "User-Agent": "Mozilla/5.0"
      },
      body: JSON.stringify({
        prompt,
        aspect_ratio: "square_1_1"
      })
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
