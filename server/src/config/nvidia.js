import OpenAI from "openai";
import env from "./env.js";

const client = new OpenAI({
  apiKey: env.NVIDIA_API_KEY,
  baseURL: env.NVIDIA_BASE_URL,
});

export default client;