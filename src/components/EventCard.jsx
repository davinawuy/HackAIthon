import { useCursorTilt } from '../hooks/useCursorTilt'
import { getComfortAssessment } from '../utils/comfortUtils'
import { ComfortBadge } from './ComfortBadge'

const eventImageByType = {
  'social meetup':
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  workshop:
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  market:
    'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
  sports:
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
  study:
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
  volunteering:
    'https://images.unsplash.com/photo-1469571486292-b53601020f58?auto=format&fit=crop&w=1200&q=80',
  career:
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  'arts & culture':
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
}

export function EventCard({
  event,
  isBookmarked,
  onBookmarkToggle,
  showComfort = false,
  isHighlighted = false,
}) {
  const motion = useCursorTilt()
  const assessment = getComfortAssessment(event)
  const eventImageUrl =
    event.imageUrl || eventImageByType[event.type] || eventImageByType['social meetup']

  return (
    <article
      id={isHighlighted ? `event-${event.id}` : undefined}
      className={`event-card motion-surface ${isHighlighted ? 'is-highlighted' : ''}`}
      style={{ backgroundImage: event.imageGradient }}
      onMouseMove={motion.onMouseMove}
      onMouseLeave={motion.onMouseLeave}
      onFocus={motion.onFocus}
      onBlur={motion.onBlur}
      tabIndex={0}
    >
      <figure className="event-image-wrap">
        <img src={eventImageUrl} alt={event.title} loading="lazy" className="event-image" />
      </figure>

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
