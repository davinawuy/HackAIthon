const DAY_IN_MS = 24 * 60 * 60 * 1000

function isInDateRange(eventDate, days) {
  if (days === 'any') {
    return true
  }

  const now = new Date()
  const date = new Date(eventDate)
  const diff = date.getTime() - now.getTime()

  return diff >= 0 && diff <= Number(days) * DAY_IN_MS
}

export function applyEventFilters(events, filters) {
  const {
    interest = 'all',
    type = 'all',
    dateWindow = 'any',
    groupSize = 'all',
    comfort = 'all',
    search = '',
  } = filters

  const searchTerm = search.trim().toLowerCase()

  return events
    .filter((event) => {
      const matchesInterest =
        interest === 'all' || event.interestCategories.includes(interest)
      const matchesType = type === 'all' || event.type === type
      const matchesDate = isInDateRange(event.date, dateWindow)
      const matchesGroup = groupSize === 'all' || event.groupSize === groupSize
      const matchesComfort =
        comfort === 'all' || event.comfortLevel === comfort
      const matchesSearch =
        searchTerm.length === 0 ||
        `${event.title} ${event.description} ${event.location} ${event.tags.join(' ')}`
          .toLowerCase()
          .includes(searchTerm)

      return (
        matchesInterest &&
        matchesType &&
        matchesDate &&
        matchesGroup &&
        matchesComfort &&
        matchesSearch
      )
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}
