import { useCursorTilt } from '../hooks/useCursorTilt'

const iconMap = {
  chat: '◍',
  shield: '◈',
  spark: '✦',
  community: '◎',
}

export function FeatureCard({ title, description, icon = 'spark' }) {
  const motion = useCursorTilt()

  return (
    <article
      className="feature-card motion-surface"
      onMouseMove={motion.onMouseMove}
      onMouseLeave={motion.onMouseLeave}
      onFocus={motion.onFocus}
      onBlur={motion.onBlur}
      tabIndex={0}
    >
      <span className="feature-icon" aria-hidden="true">
        {iconMap[icon] || iconMap.spark}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}
