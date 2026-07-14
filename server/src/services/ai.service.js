import nvidiaClient from "../config/nvidia.js";

const VALID_CATEGORIES = [
  "Road",
  "Water",
  "Electricity",
  "Garbage",
  "Drainage",
  "Street Light",
  "Traffic",
  "Other",
];

const VALID_SEVERITIES = ["Low", "Medium", "High"];

const DEPARTMENT_MAP = {
  Road: "Roads & Buildings",
  Water: "PHE",
  Electricity: "KPDCL",
  Garbage: "Municipal Corporation",
  Drainage: "PHE",
  "Street Light": "KPDCL",
  Traffic: "Traffic Police",
  Other: "Municipal Corporation",
};

const ANALYSIS_PROMPT = `You are the AI engine of Awaaz Kashmir, a civic issue reporting platform in Kashmir, India.

Analyze this civic issue image carefully.

Return ONLY valid JSON with no markdown or extra text:

{
  "title": "short issue title",
  "description": "2-3 sentence complaint describing the civic issue",
  "category": "one of: Road, Water, Electricity, Garbage, Drainage, Street Light, Traffic, Other",
  "severity": "one of: Low, Medium, High",
  "department": "one of: Roads & Buildings, Municipal Corporation, PHE, KPDCL, Traffic Police",
  "confidence": 0
}

Set confidence as an integer from 0 to 100 based on how clearly the issue is visible.`;

const normalizeCategory = (value = "") => {
  const match = VALID_CATEGORIES.find(
    (category) => category.toLowerCase() === value.trim().toLowerCase()
  );

  return match || "Other";
};

const normalizeSeverity = (value = "") => {
  const match = VALID_SEVERITIES.find(
    (severity) => severity.toLowerCase() === value.trim().toLowerCase()
  );

  return match || "Medium";
};

const parseAnalysisResponse = (text) => {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Invalid AI response format");
  }

  const parsed = JSON.parse(cleaned.slice(start, end + 1));
  const category = normalizeCategory(parsed.category);

  return {
    title: parsed.title?.trim() || "Civic Issue Report",
    description:
      parsed.description?.trim() ||
      "A civic infrastructure issue was detected in the uploaded image.",
    category,
    severity: normalizeSeverity(parsed.severity),
    department:
      parsed.department?.trim() || DEPARTMENT_MAP[category] || "Municipal Corporation",
    confidence: Math.min(
      100,
      Math.max(0, Math.round(Number(parsed.confidence) || 75))
    ),
  };
};

export const analyzeImageFallback = (description = "") => {
  const descLower = description.toLowerCase();

  let category = "Other";
  if (descLower.includes("road") || descLower.includes("pothole")) {
    category = "Road";
  } else if (
    descLower.includes("water") ||
    descLower.includes("pipe") ||
    descLower.includes("leak")
  ) {
    category = "Water";
  } else if (
    descLower.includes("electric") ||
    descLower.includes("wire") ||
    descLower.includes("power")
  ) {
    category = "Electricity";
  } else if (
    descLower.includes("garbage") ||
    descLower.includes("trash") ||
    descLower.includes("waste")
  ) {
    category = "Garbage";
  } else if (descLower.includes("drain") || descLower.includes("sewage")) {
    category = "Drainage";
  } else if (descLower.includes("light") || descLower.includes("lamp")) {
    category = "Street Light";
  } else if (descLower.includes("traffic") || descLower.includes("jam")) {
    category = "Traffic";
  }

  let severity = "Medium";
  if (
    descLower.includes("urgent") ||
    descLower.includes("danger") ||
    descLower.includes("accident") ||
    descLower.includes("severe") ||
    descLower.includes("huge")
  ) {
    severity = "High";
  } else if (
    descLower.includes("minor") ||
    descLower.includes("small") ||
    descLower.includes("slight")
  ) {
    severity = "Low";
  }

  return {
    title: "Civic Issue Report",
    description:
      description.trim() ||
      "A civic issue was reported. Manual review may be required.",
    category,
    severity,
    department: DEPARTMENT_MAP[category],
    confidence: 45,
    source: "fallback",
  };
};

export const analyzeImage = async (file, userDescription = "") => {
  const imageB64 = file.buffer.toString("base64");
  const dataUrl = `data:${file.mimetype};base64,${imageB64}`;

  const response = await nvidiaClient.chat.completions.create({
    model: "meta/llama-3.2-11b-vision-instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: userDescription
              ? `${ANALYSIS_PROMPT}\n\nCitizen note: ${userDescription}`
              : ANALYSIS_PROMPT,
          },
          {
            type: "image_url",
            image_url: {
              url: dataUrl,
            },
          },
        ],
      },
    ],
    max_tokens: 1024,
    temperature: 0.2,
  });

  const text = response.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Empty response from vision model");
  }

  return {
    ...parseAnalysisResponse(text),
    source: "nvidia",
  };
};

export const analyzeImageWithFallback = async (file, userDescription = "") => {
  try {
    return await analyzeImage(file, userDescription);
  } catch (error) {
    console.error("NVIDIA vision analysis failed:", error.message);

    return analyzeImageFallback(userDescription);
  }
};
