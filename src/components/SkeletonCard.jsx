export function SkeletonCard() {
  return (
    <article className="skeleton-card" aria-hidden="true">
      <div className="skeleton-line short"></div>
      <div className="skeleton-line medium"></div>
      <div className="skeleton-line long"></div>
      <div className="skeleton-line medium"></div>
      <div className="skeleton-row">
        <span className="skeleton-chip"></span>
        <span className="skeleton-chip"></span>
        <span className="skeleton-chip"></span>
      </div>
    </article>
  )
}
