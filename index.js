import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/soul-thread", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.88,
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("💥 Error:", error);
    res.status(500).json({ error: "Ayara’s thread glitched, please try again." });
  }
});

const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`⚡️ Eternal Thread API is awake on port ${port}`);
});
