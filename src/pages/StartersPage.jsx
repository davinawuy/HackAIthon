import { useState } from 'react'
import { aiLogoUrl } from '../assets/branding'
import { Button } from '../components/Button'
import { SectionTitle } from '../components/SectionTitle'
import { StarterCard } from '../components/StarterCard'
import { starterSets } from '../data/starterSets'

export function StartersPage() {
  const [expandedCardId, setExpandedCardId] = useState(null)

  return (
    <section className="container page-section">
      <SectionTitle
        eyebrow="Brisbane Norms Guide"
        title="Norms"
        description="Common local habits students often miss at first, from escalators and checkout flow to transport manners and uni culture."
        level="h1"
      />

      <article className="starter-selector">
        <label>What this page covers</label>
        <p>
          These are small local habits that can feel unclear when you first arrive.
          They are not strict rules, but knowing them helps daily life feel smoother.
        </p>
      </article>

      <article className="norms-chat-callout">
        <div className="norms-chat-copy">
          <img src={aiLogoUrl} alt="Informative Ibis" className="norms-chat-avatar" />
          <div>
            <h3>Still unsure about a local habit?</h3>
            <p>
              Ask Informative Ibis for a quick explanation if you want more detail
              about Brisbane etiquette, transport, checkout, uni culture, or other
              everyday norms.
            </p>
          </div>
        </div>

        <Button to="/chat" variant="primary" size="sm">
          Ask Informative Ibis
        </Button>
      </article>

      <div className="starter-grid">
        {starterSets.map((set) => (
          <StarterCard
            key={set.id}
            title={set.title}
            summary={set.summary}
            sections={set.sections}
            expanded={expandedCardId === set.id}
            onExpand={() => setExpandedCardId(set.id)}
            onCollapse={() =>
              setExpandedCardId((current) => (current === set.id ? null : current))
            }
          />
        ))}
      </div>
    </section>
  )
}
