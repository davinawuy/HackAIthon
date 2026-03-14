const blockedTopics = [
  'self-harm',
  'suicide',
  'kill',
  'bomb',
  'terror',
  'hate',
  'racist',
  'violence',
]

export function validateChatInput(input) {
  const text = input.trim()

  if (!text) {
    return { ok: false, reason: 'Please enter a question.' }
  }

  if (text.length > 1000) {
    return { ok: false, reason: 'Message is too long.' }
  }

  const lower = text.toLowerCase()

  for (const word of blockedTopics) {
    if (lower.includes(word)) {
      return {
        ok: false,
        reason: "I can’t help with that request.",
      }
    }
  }

  return { ok: true }
}