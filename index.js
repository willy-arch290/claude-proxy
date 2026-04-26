const express = require("express");
const app = express();
app.use(express.json());

app.post("/claude", async (req, res) => {
  const { message } = req.body;
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: message }]
    })
  });
  const data = await response.json();
  res.json({ reply: data.content[0].text });
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
