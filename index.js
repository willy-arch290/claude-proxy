const express = require("express");
const app = express();
app.use(express.json());

app.post("/claude", async (req, res) => {
  const { message } = req.body;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: message }] }]
    })
  });
  const data = await response.json();
  res.json({ reply: data.candidates[0].content.parts[0].text });
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
