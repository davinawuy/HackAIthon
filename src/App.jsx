import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { useBookmarks } from './hooks/useBookmarks'
import { ChatBuddyPage } from './pages/ChatBuddyPage'
import { EventsPage } from './pages/EventsPage'
import { LandingPage } from './pages/LandingPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { SafetyPage } from './pages/SafetyPage'
import { StartersPage } from './pages/StartersPage'
import { WhereToGoPage } from './pages/WhereToGoPage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function App() {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks()

  return (
    <div className="app-shell">
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />

      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isBookmarked={isBookmarked}
                onBookmarkToggle={toggleBookmark}
              />
            }
          />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/chat" element={<ChatBuddyPage />} />
          <Route
            path="/events"
            element={
              <EventsPage
                bookmarks={bookmarks}
                isBookmarked={isBookmarked}
                onBookmarkToggle={toggleBookmark}
              />
            }
          />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/starters" element={<StartersPage />} />
          <Route path="/where-to-go" element={<WhereToGoPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
