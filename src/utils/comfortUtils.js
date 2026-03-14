function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export const comfortCategoryOrder = [
  'Good for newcomers',
  'Best with a friend',
  'Small friendly group',
  'Large lively crowd',
]

export const comfortCategoryMeta = {
  'Good for newcomers': {
    accent: 'sage',
    shortLabel: 'Newcomer-friendly',
    summary: 'Relaxed, structured, and easy for first-time attendees.',
  },
  'Best with a friend': {
    accent: 'blue',
    shortLabel: 'Best with a friend',
    summary: 'Better for students who prefer bringing a friend.',
  },
  'Small friendly group': {
    accent: 'teal',
    shortLabel: 'Small friendly group',
    summary: 'Smaller circle with easier introductions and quieter conversation.',
  },
  'Large lively crowd': {
    accent: 'peach',
    shortLabel: 'Large lively crowd',
    summary: 'More energetic atmosphere with a larger crowd.',
  },
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
      explanation: 'More energetic atmosphere with a larger crowd.',
    }
  }

  if (event.groupSize === 'small' && event.comfortLevel === 'gentle') {
    return {
      label: 'Small friendly group',
      score,
      tone: 'gentle',
      explanation: 'Smaller circle with easier introductions and quieter conversation.',
    }
  }

  if (event.newcomerFriendly && event.verified && score >= 72) {
    return {
      label: 'Good for newcomers',
      score,
      tone: 'trusted',
      explanation: 'Relaxed, structured, and easy for first-time attendees.',
    }
  }

  return {
    label: 'Best with a friend',
    score,
    tone: 'balanced',
    explanation: 'Comfortable overall, and even easier if you bring a friend.',
  }
}

export function getComfortMeter(score) {
  if (score >= 88) {
    return {
      label: 'Very comfortable',
      filled: 5,
    }
  }

  if (score >= 76) {
    return {
      label: 'Comfortable',
      filled: 4,
    }
  }

  if (score >= 58) {
    return {
      label: 'Moderate',
      filled: 3,
    }
  }

  if (score >= 46) {
    return {
      label: 'Socially active',
      filled: 2,
    }
  }

  return {
    label: 'High-energy',
    filled: 1,
  }
}

export function getComfortDistribution(events) {
  return events.reduce(
    (acc, event) => {
      const { label } = getComfortAssessment(event)
      acc[label] = (acc[label] || 0) + 1
      return acc
    },
    comfortCategoryOrder.reduce((initial, label) => {
      initial[label] = 0
      return initial
    }, {}),
  )
}
