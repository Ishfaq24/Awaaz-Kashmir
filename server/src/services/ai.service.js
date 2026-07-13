import axios from "axios";
import env from "../config/env.js";

export const analyzeImage = async (file) => {
  const imageB64 = file.buffer.toString("base64");

  const prompt = `
You are the AI engine of Awaaz Kashmir.

Analyze this civic issue image.

Return ONLY valid JSON.

{
  "title":"",
  "description":"",
  "category":"",
  "severity":"",
  "department":"",
  "confidence":0
}

Categories:
Road
Water
Electricity
Garbage
Drainage
Street Light
Traffic
Other

Severity:
Low
Medium
High

Departments:
Roads & Buildings
Municipal Corporation
PHE
KPDCL
Traffic Police

Confidence:
0-100

<img src="data:${file.mimetype};base64,${imageB64}" />
`;

  const response = await axios.post(
    "https://ai.api.nvidia.com/v1/vlm/google/paligemma",
    {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1024,
      temperature: 0.2,
      top_p: 0.7,
      stream: false,
    },
    {
      headers: {
        Authorization: `Bearer ${env.NVIDIA_API_KEY}`,
        Accept: "application/json",
      },
    }
  );

  const text = response.data.choices[0].message.content;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error(`Invalid AI Response:\n${cleaned}`);
  }

  return JSON.parse(cleaned.slice(start, end + 1));
};