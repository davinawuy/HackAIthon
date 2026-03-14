import { useMemo, useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { StarterCard } from '../components/StarterCard'
import { events } from '../data/events'
import { starterSets } from '../data/starterSets'

function matchStarterSets(event) {
  return starterSets
    .map((set) => {
      let score = 0

      if (set.matchType === 'all') {
        score += 1
      }

      if (set.matchType === event.type) {
        score += 3
      }

      if (set.matchTags.length === 0) {
        score += 1
      }

      const tagMatches = set.matchTags.filter((tag) => event.tags.includes(tag)).length
      score += tagMatches * 2

      return {
        set,
        score,
      }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.set)
}

export function StartersPage() {
  const [selectedEventId, setSelectedEventId] = useState(events[0].id)

  const selectedEvent = useMemo(
    () => events.find((item) => item.id === selectedEventId) || events[0],
    [selectedEventId],
  )

  const matchedSets = useMemo(
    () => matchStarterSets(selectedEvent).slice(0, 3),
    [selectedEvent],
  )

  return (
    <section className="container page-section">
      <SectionTitle
        eyebrow="Conversation Starter Generator"
        title="Practice what to say before you go"
        description="Pick an event to generate social openers, polite phrases, and practical tips for smoother conversations."
        level="h1"
      />

      <article className="starter-selector">
        <label htmlFor="event-picker">Select an event</label>
        <select
          id="event-picker"
          value={selectedEventId}
          onChange={(event) => setSelectedEventId(event.target.value)}
        >
          {events.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>

        <p>
          <strong>{selectedEvent.title}</strong> · {selectedEvent.location} ·{' '}
          {selectedEvent.date} at {selectedEvent.time}
        </p>
      </article>

      {matchedSets.length > 0 ? (
        <div className="starter-grid">
          {matchedSets.map((set) => (
            <StarterCard
              key={set.id}
              title={set.title}
              starters={set.starters}
              politePhrases={set.politePhrases}
              socialTips={set.socialTips}
            />
          ))}
        </div>
      ) : (
        <article className="empty-state">
          <h3>No tailored starter pack found</h3>
          <p>Try another event to generate targeted conversation prompts.</p>
        </article>
      )}
    </section>
  )
}
