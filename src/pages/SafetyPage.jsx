import { useMemo, useState } from 'react'
import { Chip } from '../components/Chip'
import { ComfortBadge } from '../components/ComfortBadge'
import { SectionTitle } from '../components/SectionTitle'
import { events } from '../data/events'
import {
  getComfortAssessment,
  getComfortDistribution,
} from '../utils/comfortUtils'

const comfortFilters = [
  'all',
  'Good for newcomers',
  'Best with a friend',
  'Small friendly group',
  'Large lively crowd',
]

export function SafetyPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const insights = useMemo(() => {
    return events.map((event) => ({
      event,
      assessment: getComfortAssessment(event),
    }))
  }, [])

  const distribution = useMemo(() => getComfortDistribution(events), [])

  const visibleInsights = useMemo(() => {
    if (activeFilter === 'all') return insights
    return insights.filter((item) => item.assessment.label === activeFilter)
  }, [activeFilter, insights])

  return (
    <section className="container page-section">
      <SectionTitle
        eyebrow="Safety & Comfort Insights"
        title="Know the social pace before you attend"
        description="Comfort labels are rule-based from event attributes like group size, verification, and newcomer support."
        level="h1"
      />

      <div className="comfort-overview-grid" aria-label="Comfort distribution summary">
        {Object.entries(distribution).map(([label, count]) => (
          <article key={label} className="comfort-summary-card">
            <h3>{label}</h3>
            <p>{count} events</p>
          </article>
        ))}
      </div>

      <div className="chip-group" aria-label="Comfort filters">
        {comfortFilters.map((item) => (
          <Chip
            key={item}
            label={item}
            selected={activeFilter === item}
            onClick={() => setActiveFilter(item)}
          />
        ))}
      </div>

      <div className="safety-grid">
        {visibleInsights.map(({ event, assessment }) => (
          <article className="safety-card" key={event.id}>
            <div className="safety-head">
              <h3>{event.title}</h3>
              <ComfortBadge assessment={assessment} />
            </div>
            <p>{assessment.explanation}</p>
            <ul>
              <li>
                <strong>Location:</strong> {event.location}
              </li>
              <li>
                <strong>Date:</strong> {event.date} · {event.time}
              </li>
              <li>
                <strong>Safety Signals:</strong>{' '}
                {event.verified ? 'Verified host, ' : ''}
                {event.publicSpace ? 'public space, ' : 'private venue, '}
                {event.newcomerFriendly ? 'newcomer friendly' : 'mixed experience levels'}
              </li>
            </ul>
          </article>
        ))}
      </div>

      {visibleInsights.length === 0 ? (
        <article className="empty-state">
          <h3>No events in this comfort category</h3>
          <p>Select another comfort filter to review more options.</p>
        </article>
      ) : null}
    </section>
  )
}
