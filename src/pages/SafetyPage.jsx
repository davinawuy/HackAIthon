import { useMemo, useState } from 'react'
import { Chip } from '../components/Chip'
import { SectionTitle } from '../components/SectionTitle'
import { events } from '../data/events'
import {
  comfortCategoryMeta,
  comfortCategoryOrder,
  getComfortAssessment,
  getComfortDistribution,
  getComfortMeter,
} from '../utils/comfortUtils'

const metadataDateFormatter = new Intl.DateTimeFormat('en-AU', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})

function formatEventDate(date, time) {
  return `${metadataDateFormatter.format(new Date(`${date}T00:00:00`))} | ${time}`
}

function Icon({ name }) {
  const icons = {
    calendar: (
      <path d="M8 2v3M16 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    ),
    pin: (
      <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    ),
    shield: (
      <path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Zm-3 9 2 2 4-4" />
    ),
    tree: (
      <path d="M12 3c2 0 4 1.6 4 3.8 1.8.3 3 1.8 3 3.6 0 2.2-1.8 4-4 4h-1v4h2v2H8v-2h2v-4H9a4 4 0 0 1-1-7.9A4 4 0 0 1 12 3Z" />
    ),
    sparkles: (
      <path d="m12 3 1.2 3.3L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3L7.5 7.5l3.3-1.2L12 3Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13ZM6 14l.9 2.4L9.3 17l-2.4.9L6 20.3l-.9-2.4L2.7 17l2.4-.6L6 14Z" />
    ),
    users: <path d="M16 21v-1.5a4.5 4.5 0 0 0-9 0V21M11.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm8 11.5v-1a4 4 0 0 0-3-3.9m.5-6.6a3 3 0 1 1 0-6" />,
    friend: (
      <path d="M16 21v-1.5a4.5 4.5 0 0 0-9 0V21M11.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.5 4.5v6m-3-3h6" />
    ),
    lively: (
      <path d="M4 13h3l2-7 4 14 2-7h5M6 4h.01M18 5h.01M20 10h.01M4 8h.01" />
    ),
    chat: (
      <path d="M5 18.5V6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H9l-4 2.5Z" />
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      {icons[name]}
    </svg>
  )
}

function buildSignalChips(event, assessment) {
  const chips = []

  if (event.verified) {
    chips.push({ key: 'verified', label: 'Verified', icon: 'shield' })
  }

  if (event.publicSpace) {
    chips.push({ key: 'public-space', label: 'Public space', icon: 'tree' })
  }

  if (event.newcomerFriendly) {
    chips.push({ key: 'newcomer', label: 'Newcomer friendly', icon: 'sparkles' })
  }

  if (event.groupSize === 'small' || event.tags.includes('small group')) {
    chips.push({ key: 'small-group', label: 'Small group', icon: 'users' })
  }

  if (assessment.label === 'Best with a friend') {
    chips.push({ key: 'friend', label: 'Bring a friend', icon: 'friend' })
  }

  if (assessment.label === 'Large lively crowd' || event.comfortLevel === 'lively') {
    chips.push({ key: 'lively', label: 'Lively crowd', icon: 'lively' })
  }

  if (
    event.tags.includes('english practice') ||
    event.tags.includes('quiet zone') ||
    assessment.label === 'Small friendly group'
  ) {
    chips.push({ key: 'chat', label: 'Conversation-friendly', icon: 'chat' })
  }

  return chips.slice(0, 5)
}

export function SafetyPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const insights = useMemo(() => {
    return events.map((event) => {
      const assessment = getComfortAssessment(event)

      return {
        event,
        assessment,
        meter: getComfortMeter(assessment.score),
        chips: buildSignalChips(event, assessment),
      }
    })
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
        description="Browse calmer, clearer event signals so you can spot the right atmosphere quickly and choose what feels manageable."
        level="h1"
      />

      <div className="safety-filter-bar">
        <p>Pick a social pace to narrow the list.</p>
        <Chip
          label="All"
          selected={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
          className="safety-reset-chip"
        />
      </div>

      <div className="comfort-overview-grid" aria-label="Comfort distribution summary">
        {comfortCategoryOrder.map((label) => {
          const meta = comfortCategoryMeta[label]
          const isSelected = activeFilter === label

          return (
            <button
              key={label}
              type="button"
              className={`comfort-summary-card comfort-accent-${meta.accent} ${isSelected ? 'is-active' : ''}`.trim()}
              onClick={() => setActiveFilter(label)}
              aria-pressed={isSelected}
            >
              <span className="comfort-summary-topline">{meta.shortLabel}</span>
              <strong>{distribution[label]} events</strong>
              <p>{meta.summary}</p>
            </button>
          )
        })}
      </div>

      <div className="safety-grid">
        {visibleInsights.map(({ event, assessment, meter, chips }) => {
          const meta = comfortCategoryMeta[assessment.label]

          return (
            <article
              className={`safety-card comfort-accent-${meta.accent}`.trim()}
              key={event.id}
            >
              <div className="safety-head">
                <div className="safety-title-block">
                  <span className="safety-category-pill">{meta.shortLabel}</span>
                  <h3>{event.title}</h3>
                </div>

                <div className="comfort-meter" aria-label={`Comfort level ${meter.label}`}>
                  <div className="comfort-meter-labels">
                    <span>Comfort level</span>
                    <strong>{meter.label}</strong>
                  </div>
                  <div className="comfort-meter-dots" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={`${event.id}-meter-${index}`}
                        className={index < meter.filled ? 'is-filled' : ''}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="safety-summary">{assessment.explanation}</p>

              <div className="safety-meta" aria-label="Event details">
                <span>
                  <Icon name="calendar" />
                  {formatEventDate(event.date, event.time)}
                </span>
                <span>
                  <Icon name="pin" />
                  {event.location}
                </span>
              </div>

              <div className="safety-chip-row" aria-label="Safety and social signals">
                {chips.map((chip) => (
                  <span key={`${event.id}-${chip.key}`} className="safety-signal-chip">
                    <Icon name={chip.icon} />
                    {chip.label}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
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
