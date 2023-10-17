const axios = require("axios");

// Define your OpenAI API key and endpoint
const { OPENAI_API_KEY } = process.env;
const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAI_API_KEY}`,
};

// Function to generate a response from GPT-3.5 Turbo 
export async function askGPT(prompt: string) {
  try {
    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${prompt}` }],
      },
      {
        headers,
      }
    );

    const responseData = response.data.choices[0].message.content;
    return responseData;
  } catch (error) {
    console.error("Error generating response from GPT-3.5 Turbo:", error);
    return null;
  }
}
