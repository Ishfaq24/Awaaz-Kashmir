import { Router } from "express";
import ai from "../config/gemini.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Reply with exactly: Gemini is working",
    });

    res.json({
      success: true,
      text: response.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

export default router;