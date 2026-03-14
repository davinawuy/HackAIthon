import { GoogleGenAI } from '@google/genai'
import { buildCultureChatPrompt } from './prompt'
import { validateChatInput } from './guardrails'

export async function answerChatQuestion(userMessage, eventId) {
  const validation = validateChatInput(userMessage)

  if (!validation.ok) {
    return {
      answer: validation.reason,
      showEvents: false,
      events: [],
    }
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash'

  if (!apiKey) {
    throw new Error(
      'Gemini is not configured yet. Add VITE_GEMINI_API_KEY to your .env file.'
    )
  }

  const ai = new GoogleGenAI({ apiKey })
  const prompt = buildCultureChatPrompt(userMessage, eventId)

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    })

    const text = response.text?.trim()

    if (!text) {
      return {
        answer: 'Sorry, I couldn’t generate a response right now.',
        showEvents: false,
        events: [],
      }
    }

    const parsed = JSON.parse(text)

    return {
      answer: parsed.answer || 'Sorry, I could not understand that.',
      showEvents: Boolean(parsed.showEvents),
      events: Array.isArray(parsed.events) ? parsed.events : [],
    }
  } catch (error) {
    console.error('Gemini error:', error)

    return {
      answer:
        'Sorry, I had trouble answering that. Try asking about living in Australia, local culture, or events.',
      showEvents: false,
      events: [],
    }
  }
}