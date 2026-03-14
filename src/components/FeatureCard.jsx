import { useCursorTilt } from '../hooks/useCursorTilt'
import { Link } from 'react-router-dom'

const iconMap = {
  chat: '◍',
  shield: '◈',
  spark: '✦',
  community: '◎',
}

export function FeatureCard({ title, description, icon = 'spark', to = '' }) {
  const motion = useCursorTilt()
  const isAnchorLink = typeof to === 'string' && to.startsWith('#')
  const isClickable = Boolean(to)

  const card = (
    <article
      className={`feature-card motion-surface ${isClickable ? 'is-clickable' : ''}`}
      onMouseMove={motion.onMouseMove}
      onMouseLeave={motion.onMouseLeave}
      onFocus={motion.onFocus}
      onBlur={motion.onBlur}
      tabIndex={isClickable ? -1 : 0}
    >
      <span className="feature-icon" aria-hidden="true">
        {iconMap[icon] || iconMap.spark}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )

  if (isAnchorLink) {
    return (
      <a href={to} className="feature-card-link" aria-label={`${title} feature`}>
        {card}
      </a>
    )
  }

  if (isClickable) {
    return (
      <Link to={to} className="feature-card-link" aria-label={`${title} feature`}>
        {card}
      </Link>
    )
  }

  return card
}
