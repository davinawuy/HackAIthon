const disallowedPatterns = [
  'solve this math',
  'math question',
  'calculate',
  'equation',
  'code this',
  'write code',
  'python code',
  'javascript code',
  'java code',
  'c++',
  'debug this',
  'physics question',
  'chemistry question',
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

  for (const pattern of disallowedPatterns) {
    if (lower.includes(pattern)) {
      return {
        ok: false,
        reason:
          "I’m Informative Ibis, so I can only help with living in Australia, newcomer support, culture, and related events.",
      }
    }
  }

  return { ok: true }
}