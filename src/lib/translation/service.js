import { GoogleGenAI } from '@google/genai'

export const translationLanguages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: 'Chinese' },
  { code: 'hi', label: 'Hindi' },
  { code: 'id', label: 'Indonesian' },
  { code: 'es', label: 'Spanish' },
  { code: 'ar', label: 'Arabic' },
  { code: 'fr', label: 'French' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'vi', label: 'Vietnamese' },
]

function getTranslatorClient() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash'

  if (!apiKey) {
    throw new Error(
      'Gemini is not configured yet. Add VITE_GEMINI_API_KEY to your .env file.'
    )
  }

  return {
    ai: new GoogleGenAI({ apiKey }),
    model,
  }
}

function cleanJsonText(text) {
  return text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
}

export async function translateTextBatch(texts, targetLanguage) {
  if (!Array.isArray(texts) || texts.length === 0) {
    return []
  }

  const { ai, model } = getTranslatorClient()

  const prompt = `Translate each string in the JSON array into ${targetLanguage}.
Rules:
- Return JSON only.
- Preserve the array order exactly.
- Keep links, dates, names, emojis, punctuation, and formatting natural.
- Do not add explanations.
- If text is already best left unchanged, return it unchanged.

Input JSON:
${JSON.stringify(texts)}`

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  })

  const text = response.text?.trim()

  if (!text) {
    throw new Error('Translation response was empty.')
  }

  const parsed = JSON.parse(cleanJsonText(text))

  if (!Array.isArray(parsed) || parsed.length !== texts.length) {
    throw new Error('Translation response shape was invalid.')
  }

  return parsed.map((item, index) =>
    typeof item === 'string' && item.trim() ? item : texts[index]
  )
}
