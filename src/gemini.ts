import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function callGemini(prompt: string): Promise<string> {
  try {
    const res = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    return result;
  } catch (error: any) {
    console.error("Gemini API error:", error.response?.data || error.message);
    return "There was an error processing your request.";
  }
}
