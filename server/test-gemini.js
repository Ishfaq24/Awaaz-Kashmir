import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  // console.log(process.env.OPENROUTER_API_KEY),
});

async function test() {
  const response = await client.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [
      {
        role: "user",
        content: "Say hello in one sentence.",
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

test();