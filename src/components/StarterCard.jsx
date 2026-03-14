import { useCursorTilt } from '../hooks/useCursorTilt'

export function StarterCard({
  title,
  summary,
  sections,
  expanded = false,
  onExpand,
  onCollapse,
}) {
  const motion = useCursorTilt()

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
      </div>
    </article>
  )
}
