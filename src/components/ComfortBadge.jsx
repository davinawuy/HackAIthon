export function ComfortBadge({ assessment }) {
  return (
    <span className={`comfort-badge comfort-${assessment.tone}`}>
      <strong>{assessment.label}</strong>
      <small>{assessment.score}/100 comfort</small>
    </span>
  )
}
