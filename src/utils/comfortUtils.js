function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function buildScore(event) {
  let score = 48

  if (event.newcomerFriendly) score += 18
  if (event.verified) score += 10
  if (event.publicSpace) score += 8

  if (event.groupSize === 'small') score += 12
  if (event.groupSize === 'medium') score += 5
  if (event.groupSize === 'large') score -= 8

  if (event.comfortLevel === 'gentle') score += 8
  if (event.comfortLevel === 'lively') score -= 8

  if (event.tags.includes('small group')) score += 6
  if (event.tags.includes('quiet zone')) score += 5
  if (event.tags.includes('beginner friendly')) score += 4

  return clamp(score, 25, 98)
}

export function getComfortAssessment(event) {
  const score = buildScore(event)

  if (
    event.groupSize === 'large' ||
    event.comfortLevel === 'lively' ||
    score < 58
  ) {
    return {
      label: 'Large lively crowd',
      score,
      tone: 'lively',
      explanation:
        'Higher energy setting with more people and faster social pace. Great if you like activity and movement.',
    }
  }

  if (event.groupSize === 'small' && event.comfortLevel === 'gentle') {
    return {
      label: 'Small friendly group',
      score,
      tone: 'gentle',
      explanation:
        'Smaller circle with easier introductions and room for quieter conversation.',
    }
  }

  if (event.newcomerFriendly && event.verified && score >= 72) {
    return {
      label: 'Good for newcomers',
      score,
      tone: 'trusted',
      explanation:
        'Strong safety signals and clear event structure make this suitable for first-time attendees.',
    }
  }

  return {
    label: 'Best with a friend',
    score,
    tone: 'balanced',
    explanation:
      'Comfortable option overall, and even easier if you attend with one friend or buddy.',
  }
}

export function getComfortDistribution(events) {
  return events.reduce(
    (acc, event) => {
      const { label } = getComfortAssessment(event)
      acc[label] = (acc[label] || 0) + 1
      return acc
    },
    {
      'Good for newcomers': 0,
      'Best with a friend': 0,
      'Small friendly group': 0,
      'Large lively crowd': 0,
    },
  )
}
