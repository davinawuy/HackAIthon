export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  level = 'h2',
}) {
  const HeadingTag = level

  return (
    <header className={`section-title section-title-${align}`}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <HeadingTag>{title}</HeadingTag>
      {description ? <p className="section-description">{description}</p> : null}
    </header>
  )
}
