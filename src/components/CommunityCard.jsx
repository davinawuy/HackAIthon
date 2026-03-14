import { useCursorTilt } from '../hooks/useCursorTilt'

export function CommunityCard({ community }) {
  const motion = useCursorTilt()

  return (
    <article
      className="community-card motion-surface"
      onMouseMove={motion.onMouseMove}
      onMouseLeave={motion.onMouseLeave}
      onFocus={motion.onFocus}
      onBlur={motion.onBlur}
      tabIndex={0}
    >
      <h3>{community.name}</h3>
      <p>{community.blurb}</p>
      <ul>
        <li>
          <strong>Focus:</strong> {community.focus}
        </li>
        <li>
          <strong>Location:</strong> {community.location}
        </li>
        <li>
          <strong>Style:</strong> {community.meetingStyle}
        </li>
      </ul>
    </article>
  )
}
