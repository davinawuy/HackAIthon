import { GoogleGenAI } from '@google/genai'
import { buildCultureChatPrompt } from './prompt'
import { validateChatInput } from './guardrails'

export async function answerChatQuestion(userMessage, eventId) {
  const validation = validateChatInput(userMessage)

  if (!validation.ok) {
    return validation.reason
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

    const answer = response.text?.trim()

    if (!answer) {
      return 'Sorry, I couldn’t generate a response right now.'
    }

    return answer
  } catch (error) {
    console.error('Gemini error:', error)
    throw new Error('Gemini request failed')
  }
}