import { GoogleGenAI } from '@google/genai'
import { mapPlaces } from '../../data/mapPlaces'

const TARGET_RESULTS = 8
const MIN_RESULTS = 6

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function scorePlace(place, queryTokens) {
  const searchable = [
    place.name,
    place.suburb,
    place.type,
    place.description,
    ...(Array.isArray(place.vibes) ? place.vibes : []),
  ]
    .join(' ')
    .toLowerCase()

  let score = 0

  for (const token of queryTokens) {
    if (searchable.includes(token)) {
      score += 2
    }
  }

  if (place.sponsored) {
    score += 0.4
  }

  return score
}

function rankPlacesByQuery(userMessage) {
  const queryTokens = tokenize(userMessage)

  return [...mapPlaces]
    .map((place) => ({
      place,
      score: scorePlace(place, queryTokens),
    }))
    .sort((first, second) => second.score - first.score)
    .map((item) => item.place)
}

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

function sanitizePlaceSelection(ids, userMessage) {
  const idSet = new Set(Array.isArray(ids) ? ids : [])
  const selectedFromAi = mapPlaces.filter((place) => idSet.has(place.id))
  const ranked = rankPlacesByQuery(userMessage)
  const byId = new Map(selectedFromAi.map((place) => [place.id, place]))

  for (const place of ranked) {
    if (byId.size >= TARGET_RESULTS) break
    byId.set(place.id, place)
  }

  const merged = [...byId.values()].slice(0, TARGET_RESULTS)

  if (merged.length < MIN_RESULTS) {
    return ranked.slice(0, TARGET_RESULTS)
  }

  const hasSponsored = merged.some((place) => place.sponsored)

  if (!hasSponsored) {
    const sponsoredCandidate = ranked.find((place) => place.sponsored)
    if (sponsoredCandidate) {
      merged[merged.length - 1] = sponsoredCandidate
    }
  }

  return merged
}

function sanitizeRouteTips(routeTips, selectedPlaces) {
  if (!routeTips || typeof routeTips !== 'object') {
    return {}
  }

  const validIds = new Set(selectedPlaces.map((place) => place.id))

  return Object.entries(routeTips).reduce((accumulator, [id, value]) => {
    if (validIds.has(id) && typeof value === 'string' && value.trim()) {
      accumulator[id] = value.trim()
    }

    return accumulator
  }, {})
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
    sponsored: Boolean(place.sponsored),
  }))

  return `
You are a Brisbane local recommendation assistant for a map app.

TASK:
- The user says what vibe they want today.
- Choose 6 to 8 places ONLY from the provided PLACE DATA.
- Return JSON only.

RULES:
- Do not invent places.
- Prefer places that match mood keywords: chill, lively, quiet, food, study, scenic, night.
- If user message is vague, still return 6 to 8 balanced options.
- Include at least 1 sponsored place when it is reasonably relevant.
- Keep the rationale short and practical.

OUTPUT JSON SHAPE (exact keys):
{
  "intro": "string",
  "places": ["place-id-1", "place-id-2", "place-id-3", "place-id-4", "place-id-5", "place-id-6"],
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

    const selectedPlaces = sanitizePlaceSelection(parsed.places, userMessage)

    if (selectedPlaces.length < MIN_RESULTS) {
      const fallback = rankPlacesByQuery(userMessage).slice(0, TARGET_RESULTS)
      return {
        intro:
          'Here are several Brisbane spots to help you decide your vibe today.',
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
      routeTips: sanitizeRouteTips(parsed.routeTips, selectedPlaces),
    }
  } catch (error) {
    console.error('Gemini map suggestion error:', error)

    const fallback = rankPlacesByQuery(userMessage).slice(0, TARGET_RESULTS)

    return {
      intro: 'I could not reach AI right now, so here are popular fallback spots.',
      places: fallback,
      routeTips: {},
    }
  }
}
