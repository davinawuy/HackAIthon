import { Link } from 'react-router-dom'
import { CommunityCard } from '../components/CommunityCard'
import { EventCard } from '../components/EventCard'
import { FeatureCard } from '../components/FeatureCard'
import { Hero } from '../components/Hero'
import { SectionTitle } from '../components/SectionTitle'
import { communities } from '../data/communities'
import { events, featuredEventIds } from '../data/events'
import {
  heroHighlights,
  heroVisuals,
  howItWorksSteps,
  keyFeatures,
} from '../data/siteContent'
import { testimonials } from '../data/testimonials'

export function LandingPage({ isBookmarked, onBookmarkToggle }) {
  const featuredEvents = events.filter((event) => featuredEventIds.includes(event.id))

  return (
    <>
      <Hero highlights={heroHighlights} visuals={heroVisuals} />

      <section className="container page-section" id="how-it-works">
        <SectionTitle
          eyebrow="How It Works"
          title="Simple steps that lower social pressure"
          description="From profile setup to conversation prep, the flow is built for confidence and clarity."
        />

        <div className="steps-grid">
          {howItWorksSteps.map((step, index) => (
            <article key={step.id} className="step-card">
              <p className="step-number">0{index + 1}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container page-section" id="features">
        <SectionTitle
          eyebrow="Key Features"
          title="Civic clarity with modern student support"
          description="A calm, structured interface inspired by public service trust and startup-level polish."
        />

        <div className="feature-grid">
          {keyFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              to={feature.to}
            />
          ))}
        </div>
      </section>

      <section className="container page-section" id="featured-events">
        <SectionTitle
          eyebrow="Featured Community Events"
          title="Trusted places to start this week"
          description="Handpicked examples from around Brisbane with newcomer-friendly context."
        />

        <div className="events-grid">
          {featuredEvents.slice(0, 4).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isBookmarked={isBookmarked(event.id)}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </div>

        <div className="section-cta">
          <Link to="/events" className="text-link">
            View all event recommendations
          </Link>
        </div>
      </section>

      <section className="container page-section" id="communities">
        <SectionTitle
          eyebrow="Communities"
          title="Local groups that welcome diverse backgrounds"
          description="These clubs balance social warmth, structure, and practical support for students."
        />

        <div className="community-grid">
          {communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </section>

      <section className="container page-section" id="testimonials">
        <SectionTitle
          eyebrow="Student Voices"
          title="Dummy testimonials from a diverse student community"
          description="Every quote below is sample content for the MVP, designed to reflect real adjustment journeys."
        />

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="testimonial-card">
              <p>“{testimonial.text}”</p>
              <h3>{testimonial.name}</h3>
              <small>
                {testimonial.country} · {testimonial.university}
              </small>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
