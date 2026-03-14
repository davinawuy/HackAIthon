import { useState } from 'react'
import { useCursorTilt } from '../hooks/useCursorTilt'

export function StarterCard({
  title,
  summary,
  sections,
  helpfulCount = 200,
  expanded = false,
  onExpand,
  onCollapse,
}) {
  const motion = useCursorTilt()
  const [feedback, setFeedback] = useState(null)

  return (
    <article
      className={`starter-card motion-surface ${expanded ? 'is-expanded' : ''}`.trim()}
      onMouseMove={motion.onMouseMove}
      onMouseLeave={(event) => {
        motion.onMouseLeave(event)
        onCollapse?.()
      }}
      onMouseEnter={onExpand}
      onFocus={(event) => {
        motion.onFocus(event)
        onExpand?.()
      }}
      onBlur={(event) => {
        motion.onBlur(event)
        onCollapse?.()
      }}
      tabIndex={0}
    >
      <h3>{title}</h3>
      <p className="starter-summary">{summary}</p>
      <p className="starter-hint">Hover to expand</p>

      <div className="starter-details">
        {sections.map((section) => (
          <div key={`${title}-${section.heading}`} className="starter-section">
            <h4>{section.heading}</h4>
            <ul>
              {section.items.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="starter-feedback">
          <p className="starter-feedback-label">Was this helpful?</p>

          <div className="starter-feedback-actions">
            <button
              type="button"
              aria-label="Helpful"
              title="Helpful"
              className={`starter-feedback-button starter-feedback-icon ${feedback === 'yes' ? 'is-active' : ''}`}
              onClick={(event) => {
                event.stopPropagation()
                setFeedback('yes')
              }}
            >
              👍
            </button>

            <button
              type="button"
              aria-label="Not helpful"
              title="Not helpful"
              className={`starter-feedback-button starter-feedback-icon ${feedback === 'no' ? 'is-active' : ''}`}
              onClick={(event) => {
                event.stopPropagation()
                setFeedback('no')
              }}
            >
              👎
            </button>
          </div>

          <p className="starter-feedback-meta">
            {helpfulCount} other people found this helpful
          </p>
        </div>
      </div>
    </article>
  )
}