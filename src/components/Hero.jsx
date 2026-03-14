import { Button } from './Button'

export function Hero({ highlights = [], visuals = [] }) {
  const [primaryVisual, ...secondaryVisuals] = visuals

  return (
    <section className="hero-block" aria-labelledby="hero-title">
      <div className="hero-glow hero-glow-1" aria-hidden="true"></div>
      <div className="hero-glow hero-glow-2" aria-hidden="true"></div>
      <div className="hero-glow hero-glow-3" aria-hidden="true"></div>

      <div className="hero-content">
        <p className="hero-eyebrow">International Student Support MVP</p>
        <h1 id="hero-title">Feel at home in Australia, one meaningful meetup at a time.</h1>
        <p className="hero-description">
          Common Ground helps you understand social norms, discover trusted
          community events, and prepare conversation starters before you go.
        </p>

        <div className="hero-actions">
          <Button to="/onboarding">Start Your Comfort Profile</Button>
          <Button to="/events" variant="ghost">
            Explore Brisbane Events
          </Button>
        </div>

        <ul className="hero-highlights">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="hero-media" aria-label="Atmospheric visuals">
        {primaryVisual ? (
          <figure className="hero-media-primary">
            <img src={primaryVisual.imageUrl} alt={primaryVisual.title} loading="eager" />
          </figure>
        ) : null}

        <div className="hero-media-stack">
          {secondaryVisuals.slice(0, 2).map((visual) => (
            <figure key={visual.id} className="hero-media-secondary">
              <img src={visual.imageUrl} alt={visual.title} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
