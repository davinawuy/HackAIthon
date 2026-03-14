import { useEffect, useMemo, useState } from 'react'
import { Chip } from '../components/Chip'
import { CommunityCard } from '../components/CommunityCard'
import { SectionTitle } from '../components/SectionTitle'
import { communities } from '../data/communities'
import { backgroundOptions, interestOptions } from '../data/events'

const ONBOARDING_STORAGE_KEY = 'common-ground-onboarding-profile'

function loadStoredProfile() {
  if (typeof window === 'undefined') {
    return {
      selectedInterests: [],
      selectedBackground: [],
    }
  }

  try {
    const stored = window.localStorage.getItem(ONBOARDING_STORAGE_KEY)
    if (!stored) {
      return {
        selectedInterests: [],
        selectedBackground: [],
      }
    }

    const parsed = JSON.parse(stored)
    return {
      selectedInterests: Array.isArray(parsed.selectedInterests)
        ? parsed.selectedInterests
        : [],
      selectedBackground: Array.isArray(parsed.selectedBackground)
        ? parsed.selectedBackground
        : [],
    }
  } catch {
    return {
      selectedInterests: [],
      selectedBackground: [],
    }
  }
}

function formatList(items) {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`
}

function buildPreferenceSummary(selectedBackground) {
  if (selectedBackground.includes('wants small groups')) {
    return 'Prefers smaller, lower-pressure social settings.'
  }

  if (selectedBackground.includes('shy / introvert')) {
    return 'Would benefit from gentler, lower-pressure introductions.'
  }

  if (selectedBackground.includes('looking for friends')) {
    return 'Looking for easier ways to build connection and familiarity.'
  }

  if (selectedBackground.includes('new to Australia')) {
    return 'Adjusting to local routines and norms is an important priority.'
  }

  if (selectedBackground.includes('first semester')) {
    return 'Needs a smoother first-semester landing and clearer guidance.'
  }

  if (selectedBackground.includes('wants family-friendly events')) {
    return 'Prefers social options that feel practical and family-friendly.'
  }

  return 'Add a few background preferences to refine the social pace.'
}

export function OnboardingPage() {
  const [selectedInterests, setSelectedInterests] = useState(
    () => loadStoredProfile().selectedInterests,
  )
  const [selectedBackground, setSelectedBackground] = useState(
    () => loadStoredProfile().selectedBackground,
  )
  const [status, setStatus] = useState('')

  function toggleOption(value, setState) {
    setState((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  const totalSelections = selectedInterests.length + selectedBackground.length
  const progressValue = Math.min(totalSelections, 6)
  const isProfileReady = totalSelections > 0

  const recommendedCommunities = useMemo(() => {
    if (selectedInterests.length === 0) {
      return communities.slice(0, 3)
    }

    const matched = communities
      .map((community) => ({
        community,
        score: selectedInterests.reduce(
          (sum, selected) =>
            community.interests.includes(selected) ? sum + 1 : sum,
          0,
        ),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.community)

    return matched.slice(0, 4)
  }, [selectedInterests])

  const interestSummary = selectedInterests.length
    ? `Interested in ${formatList(selectedInterests)}.`
    : 'Select a few interests to shape your recommendations.'

  const backgroundSummary = buildPreferenceSummary(selectedBackground)

  useEffect(() => {
    window.localStorage.setItem(
      ONBOARDING_STORAGE_KEY,
      JSON.stringify({ selectedInterests, selectedBackground }),
    )
  }, [selectedInterests, selectedBackground])

  function handleSaveProfile() {
    if (!isProfileReady) return
    setStatus('Comfort profile saved locally and will stay after refresh.')
    window.setTimeout(() => setStatus(''), 3000)
  }

  return (
    <section className="container page-section">
      <SectionTitle
        eyebrow="Onboarding"
        title="Tell us what helps you feel comfortable"
        description="Choose interests and social preferences to personalize event recommendations."
        level="h1"
      />

      <section className="onboarding-shell">
        <div className="onboarding-shell-header">
          <div>
            <span className="onboarding-progress-label">Comfort profile</span>
            <h2>Set up your preferences</h2>
            <p>
              Start with the interests you care about most, then add a few background
              preferences so recommendations feel more manageable and relevant.
            </p>
          </div>

          <div className="onboarding-progress-card" aria-label="Onboarding progress">
            <div className="onboarding-progress-topline">
              <strong>{totalSelections}</strong>
              <span>choices selected</span>
            </div>
            <div className="onboarding-progress-track" aria-hidden="true">
              <span style={{ width: `${(progressValue / 6) * 100}%` }} />
            </div>
            <small>{isProfileReady ? 'You have enough to personalize results.' : 'Pick a few options to get started.'}</small>
          </div>
        </div>

        <div className="onboarding-layout">
          <article className="onboarding-panel onboarding-panel-primary">
            <div className="onboarding-panel-head">
              <div>
                <span className="onboarding-panel-kicker">Primary step</span>
                <h3>Select interests</h3>
              </div>
              <span className="onboarding-count-pill">
                {selectedInterests.length} selected
              </span>
            </div>
            <p>Pick the topics and activities you want the app to prioritize.</p>
            <div className="chip-group onboarding-chip-group">
              {interestOptions.map((option) => (
                <Chip
                  key={option}
                  label={`${selectedInterests.includes(option) ? '✓ ' : ''}${option}`}
                  selected={selectedInterests.includes(option)}
                  onClick={() => toggleOption(option, setSelectedInterests)}
                  className="onboarding-chip"
                />
              ))}
            </div>
          </article>

          <article className="onboarding-panel onboarding-panel-secondary">
            <div className="onboarding-panel-head">
              <div>
                <span className="onboarding-panel-kicker">Optional tuning</span>
                <h3>Background preferences</h3>
              </div>
              <span className="onboarding-count-pill">
                {selectedBackground.length} selected
              </span>
            </div>
            <p>Help us tune comfort level, social pace, and the type of spaces to suggest.</p>
            <div className="chip-group onboarding-chip-group">
              {backgroundOptions.map((option) => (
                <Chip
                  key={option}
                  label={`${selectedBackground.includes(option) ? '✓ ' : ''}${option}`}
                  selected={selectedBackground.includes(option)}
                  onClick={() => toggleOption(option, setSelectedBackground)}
                  className="onboarding-chip onboarding-chip-secondary"
                />
              ))}
            </div>
          </article>
        </div>

        <article className="profile-summary onboarding-profile-preview">
          <div className="profile-summary-head">
            <div>
              <span className="onboarding-panel-kicker">Live preview</span>
              <h3>Your comfort profile</h3>
            </div>
            <div className="profile-summary-stats">
              <span>{selectedInterests.length} interests</span>
              <span>{selectedBackground.length} preferences</span>
            </div>
          </div>

          <div className="profile-summary-copy">
            <p>{interestSummary}</p>
            <p>{backgroundSummary}</p>
          </div>

          <div className="profile-summary-tags" aria-label="Selected profile tags">
            {selectedInterests.slice(0, 4).map((item) => (
              <span key={item} className="profile-mini-pill">
                {item}
              </span>
            ))}
            {selectedBackground.slice(0, 3).map((item) => (
              <span key={item} className="profile-mini-pill is-muted">
                {item}
              </span>
            ))}
            {!isProfileReady ? (
              <span className="profile-mini-pill is-empty">Nothing selected yet</span>
            ) : null}
          </div>

          <div className="profile-summary-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSaveProfile}
              disabled={!isProfileReady}
            >
              Save Profile
            </button>
            {status ? <p className="status-text">{status}</p> : null}
          </div>
        </article>
      </section>

      <section className="page-section no-top-pad">
        <SectionTitle
          eyebrow="Recommended Communities"
          title="Suggested clubs based on your selections"
          description="These are local student communities that may suit your comfort profile."
        />

        {recommendedCommunities.length > 0 ? (
          <div className="community-grid">
            {recommendedCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <article className="empty-state">
            <h3>No direct match yet</h3>
            <p>Choose at least one interest to unlock targeted community suggestions.</p>
          </article>
        )}
      </section>
    </section>
  )
}
