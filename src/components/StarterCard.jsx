import { useCursorTilt } from '../hooks/useCursorTilt'

export function StarterCard({ title, starters, politePhrases, socialTips }) {
  const motion = useCursorTilt()

  return (
    <article
      className="starter-card motion-surface"
      onMouseMove={motion.onMouseMove}
      onMouseLeave={motion.onMouseLeave}
      onFocus={motion.onFocus}
      onBlur={motion.onBlur}
      tabIndex={0}
    >
      <h3>{title}</h3>

      <h4>Conversation Starters</h4>
      <ul>
        {starters.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <h4>Polite Phrases</h4>
      <ul>
        {politePhrases.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <h4>Social Tips</h4>
      <ul>
        {socialTips.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </article>
  )
}
