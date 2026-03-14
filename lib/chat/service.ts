import { GoogleGenAI } from "@google/genai";
import { buildCultureChatPrompt } from "./prompt";

export async function answerChatQuestion(userMessage: string, eventId?: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Gemini is not configured yet. Add GEMINI_API_KEY to your .env.local file."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = buildCultureChatPrompt(userMessage, eventId);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const answer = response.text?.trim();

    if (!answer) {
      return "Sorry, I couldn’t generate a response right now.";
    }

    return answer;
  } catch (error) {
    console.error("Gemini error:", error);
    throw new Error("Gemini request failed");
  }
}