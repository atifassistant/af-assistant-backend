const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Tum ek helpful Urdu assistant ho.' },
        { role: 'user', content: userMessage }
      ],
    });

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Maazrat, kuch masla ho gaya." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chalu ho gaya on port ${PORT}`));
