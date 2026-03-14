const defaultAnswer =
  'That is a great question. For this MVP, I recommend checking newcomer-friendly events, arriving a little early, and preparing one simple opener. I can help you practice if you want.'

function normalizeText(input) {
  return input.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
}

function getKeywordScore(message, item) {
  return item.keywords.reduce((score, keyword) => {
    if (message.includes(keyword.toLowerCase())) {
      return score + 2
    }

    const keywordParts = keyword.toLowerCase().split(' ')
    const partMatches = keywordParts.filter((part) => message.includes(part)).length

    return score + partMatches
  }, 0)
}

export function findFaqResponse(question, faqPrompts) {
  const normalizedQuestion = normalizeText(question)

  const exactMatch = faqPrompts.find(
    (item) => normalizeText(item.question) === normalizedQuestion,
  )

  if (exactMatch) {
    return exactMatch.answer
  }

  const ranked = faqPrompts
    .map((item) => ({
      ...item,
      score: getKeywordScore(normalizedQuestion, item),
    }))
    .sort((a, b) => b.score - a.score)

  if (ranked[0] && ranked[0].score > 0) {
    return ranked[0].answer
  }

  return defaultAnswer
}

export const starterBotMessages = [
  {
    id: 'bot-1',
    role: 'assistant',
    text: 'Hi, I am your Cultural Buddy. Ask me anything about Aussie student life, social etiquette, or event prep.',
  },
]
