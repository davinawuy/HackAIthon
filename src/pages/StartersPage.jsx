import { useRef, useState } from 'react'
import { aiLogoUrl } from '../assets/branding'
import { Button } from '../components/Button'
import { SectionTitle } from '../components/SectionTitle'
import { StarterCard } from '../components/StarterCard'
import { starterSets } from '../data/starterSets'
import { starterVideos } from '../data/starterVideos'

export function StartersPage() {
  const [expandedCardId, setExpandedCardId] = useState(null)
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    norm: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitted(true)
  }

  function handleCloseSuggestion() {
    setIsSuggestionOpen(false)
    setIsSubmitted(false)
    setFormValues({
      name: '',
      email: '',
      norm: '',
    })
  }
  const videoRailRef = useRef(null)

  function scrollVideoRail(direction) {
    if (!videoRailRef.current) return

    const amount = Math.max(videoRailRef.current.clientWidth * 0.8, 260)
    videoRailRef.current.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    })
  }

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

      <section className="faq-video-divider" aria-label="Suggested Brisbane student videos">
        <div className="faq-video-header">
          <div>
            <h2>Watch Brisbane TikToks</h2>
            <p>
              If reading norms is not enough, these short videos show first impressions,
              day-in-the-life routines, and the kinds of things students find unusual
              when they first move to Brisbane.
            </p>
            <small>Scroll sideways to browse more videos.</small>
          </div>

          <div className="faq-video-controls" data-no-translate="true">
            <button
              type="button"
              className="faq-video-arrow"
              onClick={() => scrollVideoRail('prev')}
              aria-label="Scroll videos left"
            >
              ←
            </button>
            <button
              type="button"
              className="faq-video-arrow"
              onClick={() => scrollVideoRail('next')}
              aria-label="Scroll videos right"
            >
              →
            </button>
          </div>
        </div>

        <div className="faq-video-grid" ref={videoRailRef}>
          {starterVideos.map((video) => (
            <article key={video.id} className="faq-video-card">
              <div className="faq-video-frame">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  loading="lazy"
                  allow="encrypted-media;"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <div className="faq-video-copy">
                <h3>{video.title}</h3>
                <small>{video.channel}</small>
                <p>{video.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="starter-grid">
        {starterSets.map((set) => (
          <StarterCard
            key={set.id}
            title={set.title}
            summary={set.summary}
            sections={set.sections}
            helpfulCount={set.helpfulCount}
            expanded={expandedCardId === set.id}
            onExpand={() => setExpandedCardId(set.id)}
            onCollapse={() =>
              setExpandedCardId((current) => (current === set.id ? null : current))
            }
          />
        ))}
      </div>
      <article className="norms-suggest-callout">
  <div>
    <h3>Want us to add another norm?</h3>
    <p>
      If there is a local habit, etiquette tip, or everyday situation you want
      included here, send it to us and we’ll look into it.
    </p>
  </div>

  <Button
      variant="primary"
      size="sm"
      onClick={() => setIsSuggestionOpen(true)}
    >
      Suggest a norm
    </Button>
  </article>

  {isSuggestionOpen && (
    <div
      className="norms-modal-backdrop"
      onClick={handleCloseSuggestion}
      role="presentation"
    >
      <div
        className="norms-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="norms-suggestion-title"
      >
        <button
          type="button"
          className="norms-modal-close"
          onClick={handleCloseSuggestion}
          aria-label="Close suggestion form"
        >
          ×
        </button>

        {!isSubmitted ? (
          <>
            <h3 id="norms-suggestion-title">Suggest a norm</h3>
            <p className="norms-modal-copy">
              Tell us what local habit or etiquette point you think should be added.
            </p>

            <form className="norms-form" onSubmit={handleSubmit}>
              <label>
                Your name
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </label>

              <label>
                Your email
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Norm suggestion
                <textarea
                  name="norm"
                  value={formValues.norm}
                  onChange={handleChange}
                  placeholder="Example: On buses, don’t play videos out loud without earphones."
                  rows="5"
                  required
                />
              </label>

              <div className="norms-form-actions">
                <Button type="submit" variant="primary" size="sm">
                  Send suggestion
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseSuggestion}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="norms-success">
            <h3>Thanks for the suggestion</h3>
            <p>We’ll look into it and consider adding it to the norms guide.</p>
            <Button variant="primary" size="sm" onClick={handleCloseSuggestion}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  )}
    </section>
  )
}
