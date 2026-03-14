import { useCursorTilt } from '../hooks/useCursorTilt'

const communityFallbackImage =
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80'

export function CommunityCard({ community }) {
  const motion = useCursorTilt()
  const communityImage = community.imageUrl || communityFallbackImage

  return (
    <article
      className="community-card motion-surface"
      onMouseMove={motion.onMouseMove}
      onMouseLeave={motion.onMouseLeave}
      onFocus={motion.onFocus}
      onBlur={motion.onBlur}
      tabIndex={0}
    >
      <figure className="community-image-wrap">
        <img src={communityImage} alt={community.name} loading="lazy" className="community-image" />
      </figure>

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
