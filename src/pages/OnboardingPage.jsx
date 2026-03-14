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

  useEffect(() => {
    window.localStorage.setItem(
      ONBOARDING_STORAGE_KEY,
      JSON.stringify({ selectedInterests, selectedBackground }),
    )
  }, [selectedInterests, selectedBackground])

  function handleSaveProfile() {
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

      <div className="onboarding-layout">
        <article className="onboarding-panel">
          <h3>Select interests</h3>
          <p>Pick as many as you like.</p>
          <div className="chip-group">
            {interestOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={selectedInterests.includes(option)}
                onClick={() => toggleOption(option, setSelectedInterests)}
              />
            ))}
          </div>
        </article>

        <article className="onboarding-panel">
          <h3>Background preferences</h3>
          <p>Help us tune comfort and social pace.</p>
          <div className="chip-group">
            {backgroundOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={selectedBackground.includes(option)}
                onClick={() => toggleOption(option, setSelectedBackground)}
              />
            ))}
          </div>
        </article>
      </div>

      <article className="profile-summary">
        <h3>Your comfort profile</h3>
        <p>
          Interests selected: <strong>{selectedInterests.length}</strong>
        </p>
        <p>
          Background flags: <strong>{selectedBackground.length}</strong>
        </p>
        <button type="button" className="btn btn-primary btn-sm" onClick={handleSaveProfile}>
          Save Profile
        </button>
        {status ? <p className="status-text">{status}</p> : null}
      </article>

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
