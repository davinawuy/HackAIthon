import { useEffect, useMemo, useRef, useState } from 'react'
import { EventCard } from '../components/EventCard'
import { FilterBar } from '../components/FilterBar'
import { SectionTitle } from '../components/SectionTitle'
import { SkeletonCard } from '../components/SkeletonCard'
import { featuredEventIds, events, eventTypes, interestOptions } from '../data/events'
import { applyEventFilters } from '../utils/filterUtils'

const defaultFilters = {
  search: '',
  interest: 'all',
  type: 'all',
  dateWindow: 'any',
  groupSize: 'all',
  comfort: 'all',
}

export function EventsPage({ bookmarks, isBookmarked, onBookmarkToggle }) {
  const [filters, setFilters] = useState(defaultFilters)
  const [isLoading, setIsLoading] = useState(false)
  const loadingTimerRef = useRef(null)

  const filteredEvents = useMemo(
    () => applyEventFilters(events, filters),
    [filters],
  )

  const featuredEvents = useMemo(
    () => events.filter((event) => featuredEventIds.includes(event.id)),
    [],
  )

  useEffect(
    () => () => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current)
      }
    },
    [],
  )

  function applyFiltersWithLoading(nextFilters) {
    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current)
    }

    setIsLoading(true)
    setFilters(nextFilters)

    loadingTimerRef.current = window.setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  function handleFilterChange(key, value) {
    const nextFilters = { ...filters, [key]: value }
    applyFiltersWithLoading(nextFilters)
  }

  function resetFilters() {
    applyFiltersWithLoading(defaultFilters)
  }

  return (
    <section className="container page-section">
      <SectionTitle
        eyebrow="Events Recommendation"
        title="Discover Brisbane events matched to your comfort"
        description="Filter by interests, social pace, and trusted labels. Save events you want to attend later."
        level="h1"
      />

      <article className="saved-counter">
        <p>
          Saved events: <strong>{bookmarks.length}</strong>
        </p>
      </article>

      <section className="mobile-carousel" aria-label="Featured event carousel">
        <h3>Featured Picks</h3>
        <div className="carousel-track">
          {featuredEvents.map((event) => (
            <div className="carousel-item" key={`featured-${event.id}`}>
              <EventCard
                event={event}
                isBookmarked={isBookmarked(event.id)}
                onBookmarkToggle={onBookmarkToggle}
              />
            </div>
          ))}
        </div>
      </section>

      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={resetFilters}
        interests={interestOptions}
        types={eventTypes}
      />

      {isLoading ? (
        <div className="events-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isBookmarked={isBookmarked(event.id)}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </div>
      ) : (
        <article className="empty-state">
          <h3>No events match these filters yet</h3>
          <p>Try broadening the date range or selecting fewer tags.</p>
          <button type="button" className="btn btn-secondary btn-sm" onClick={resetFilters}>
            Reset to default
          </button>
        </article>
      )}
    </section>
  )
}
