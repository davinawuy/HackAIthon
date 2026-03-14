import { GoogleGenAI } from '@google/genai'
import { mapPlaces } from '../../data/mapPlaces'

function safeJsonParse(raw) {
  const trimmed = raw.trim()

  try {
    return JSON.parse(trimmed)
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}$/)
    if (!match) return null

    try {
      return JSON.parse(match[0])
    } catch {
      return null
    }
  }
}

function sanitizePlaceSelection(ids) {
  const idSet = new Set(Array.isArray(ids) ? ids : [])
  const selected = mapPlaces.filter((place) => idSet.has(place.id))
  return selected.slice(0, 5)
}

function buildWhereToGoPrompt(userMessage) {
  const lightweightPlaces = mapPlaces.map((place) => ({
    id: place.id,
    name: place.name,
    suburb: place.suburb,
    address: place.address,
    type: place.type,
    vibes: place.vibes,
    description: place.description,
  }))

  return `
You are a Brisbane local recommendation assistant for a map app.

TASK:
- The user says what vibe they want today.
- Choose 3 to 5 places ONLY from the provided PLACE DATA.
- Return JSON only.

RULES:
- Do not invent places.
- Prefer places that match mood keywords: chill, lively, quiet, food, study, scenic, night.
- If user message is vague, still return 3 to 5 balanced options.
- Keep the rationale short and practical.

OUTPUT JSON SHAPE (exact keys):
{
  "intro": "string",
  "places": ["place-id-1", "place-id-2", "place-id-3"],
  "routeTips": {
    "place-id-1": "one short route tip",
    "place-id-2": "one short route tip"
  }
}

PLACE DATA:
${JSON.stringify(lightweightPlaces, null, 2)}

USER MESSAGE:
${userMessage}
`
}

export async function suggestMapPlaces(userMessage) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash'

  if (!apiKey) {
    throw new Error('Gemini is not configured yet. Add VITE_GEMINI_API_KEY to your .env file.')
  }

  const ai = new GoogleGenAI({ apiKey })

  try {
    const response = await ai.models.generateContent({
      model,
      contents: buildWhereToGoPrompt(userMessage),
    })

    const text = response.text?.trim() || ''
    const parsed = safeJsonParse(text)

    if (!parsed) {
      throw new Error('Could not parse map suggestions response.')
    }

    const selectedPlaces = sanitizePlaceSelection(parsed.places)

    if (selectedPlaces.length < 3) {
      const fallback = mapPlaces.slice(0, 4)
      return {
        intro:
          'Here are a few Brisbane spots to help you decide your vibe today.',
        places: fallback,
        routeTips: {},
      }
    }

    return {
      intro:
        typeof parsed.intro === 'string' && parsed.intro.trim().length > 0
          ? parsed.intro.trim()
          : 'These look like strong matches for your mood today.',
      places: selectedPlaces,
      routeTips:
        parsed.routeTips && typeof parsed.routeTips === 'object' ? parsed.routeTips : {},
    }
  } catch (error) {
    console.error('Gemini map suggestion error:', error)

    const fallback = mapPlaces.slice(0, 4)

    return {
      intro: 'I could not reach AI right now, so here are popular fallback spots.',
      places: fallback,
      routeTips: {},
    }
  }
}
