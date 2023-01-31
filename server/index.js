const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});


// OpenAI's API is being prepared to send responses to the front-end
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
    const userRequest =req.body.userRequest;
    console.log(userRequest);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: userRequest,
        max_tokens: 4000,
        temperature: 0,
    });
    const Ai_response = response?.data?.choices[0]?.text;
    console.log(response?.data?.id)   
    res.json({Ai_response})    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

