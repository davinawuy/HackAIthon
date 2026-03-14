import { useCursorTilt } from '../hooks/useCursorTilt'
import { getComfortAssessment } from '../utils/comfortUtils'
import { ComfortBadge } from './ComfortBadge'

export function EventCard({
  event,
  isBookmarked,
  onBookmarkToggle,
  showComfort = false,
}) {
  const motion = useCursorTilt()
  const assessment = getComfortAssessment(event)

  return (
    <article
      className="event-card motion-surface"
      style={{ backgroundImage: event.imageGradient }}
      onMouseMove={motion.onMouseMove}
      onMouseLeave={motion.onMouseLeave}
      onFocus={motion.onFocus}
      onBlur={motion.onBlur}
      tabIndex={0}
    >
      <div className="event-header">
        <p className="event-type">{event.type}</p>
        <button
          className={`bookmark-btn ${isBookmarked ? 'is-saved' : ''}`}
          onClick={() => onBookmarkToggle(event.id)}
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Save event'}
          type="button"
        >
          {isBookmarked ? 'Saved' : 'Save'}
        </button>
      </div>

      <h3>{event.title}</h3>
      <p className="event-description">{event.description}</p>

      <ul className="event-meta" aria-label="Event details">
        <li>
          <strong>Where:</strong> {event.location}
        </li>
        <li>
          <strong>When:</strong> {event.date} at {event.time}
        </li>
        <li>
          <strong>Group:</strong> {event.groupSize}
        </li>
        <li>
          <strong>Organizer:</strong> {event.organizer}
        </li>
      </ul>

      <div className="event-tags">
        {event.tags.slice(0, 4).map((tag) => (
          <span key={`${event.id}-${tag}`} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>

      {showComfort ? (
        <div className="event-comfort">
          <ComfortBadge assessment={assessment} />
          <p>{assessment.explanation}</p>
        </div>
      ) : null}
    </article>
  )
}
