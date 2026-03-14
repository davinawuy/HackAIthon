import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { commonGroundLogoUrl } from '../assets/branding'
import { useTranslation } from '../hooks/useTranslation'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Onboarding', to: '/onboarding' },
  { label: 'AI Buddy', to: '/chat' },
  { label: 'AI Map', to: '/where-to-go' },
  { label: 'Events', to: '/events' },
  { label: 'Safety', to: '/safety' },
  { label: 'Norms', to: '/starters' },
]

const inboxMessages = [
  {
    id: 'queen-street-event',
    eventId: 'ev-007',
    time: 'Yesterday at 6:30 PM',
    title: 'Event near Queen Street Mall',
    preview: 'You were around Queen Street yesterday. There is a free multicultural street music event tonight.',
    message:
      'Yesterday at around 6:30 PM, you were near Queen Street Mall. A free multicultural street music event is running there tonight from 6:30 PM to 8:30 PM.',
    suggestion: 'Tap Events to view more newcomer-friendly activities in the city area.',
  },
  {
    id: 'student-discount',
    eventId: 'ev-001',
    time: 'Today at 11:20 AM',
    title: 'Student discount nearby',
    preview: 'You were near South Bank. A partner cafe is offering 20% off for students today.',
    message:
      'You were near South Bank earlier today. A cafe partner is offering 20% discount for students with valid student ID until 6:00 PM.',
    suggestion: 'Bring your student card and show it at checkout.',
  },
  {
    id: 'community-reminder',
    eventId: 'ev-002',
    time: 'Today at 2:05 PM',
    title: 'Newcomer-friendly group meetup',
    preview: 'A small welcome meetup starts at 5:00 PM in West End for first-time attendees.',
    message:
      'A newcomer-friendly community meetup starts at 5:00 PM in West End. It is designed for first-time attendees and new international students.',
    suggestion: 'You can use the Conversation Starters page before attending.',
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isInboxOpen, setIsInboxOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [openedNotificationIds, setOpenedNotificationIds] = useState([])

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { language, setLanguage, isTranslating, languages } = useTranslation()

  const isHomeRoute = pathname === '/'
  const hasUnreadNotifications = inboxMessages.some(
    (item) => !openedNotificationIds.includes(item.id),
  )

  useEffect(() => {
    setIsOpen(false)
    setIsInboxOpen(false)
    setSelectedMessage(null)
  }, [pathname])

  useEffect(() => {
    if (!isInboxOpen && !selectedMessage) return undefined

    function handleEscape(event) {
      if (event.key === 'Escape') {
        if (selectedMessage) {
          setSelectedMessage(null)
          return
        }

        setIsInboxOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isInboxOpen, selectedMessage])

  function handleOpenInbox() {
    setIsInboxOpen(true)
    setSelectedMessage(null)
  }

  function handleCloseInbox() {
    setIsInboxOpen(false)
    setSelectedMessage(null)
  }

  function handleOpenMessage(message) {
    setSelectedMessage(message)
    setOpenedNotificationIds((current) =>
      current.includes(message.id) ? current : [...current, message.id],
    )
  }

  function handleGoToEvents() {
    if (!selectedMessage) return

    setSelectedMessage(null)
    setIsInboxOpen(false)
    navigate(`/events?eventId=${selectedMessage.eventId}`)
  }

  const floatingNotificationUi = isHomeRoute ? (
    <>
      <button
        type="button"
        className={`floating-mail-trigger ${isInboxOpen ? 'is-open' : ''}`}
        onClick={() => (isInboxOpen ? handleCloseInbox() : handleOpenInbox())}
        aria-haspopup="dialog"
        aria-expanded={isInboxOpen}
        aria-controls="notification-popover"
      >
        <span className="floating-mail-icon" aria-hidden="true">
          📧
        </span>
        <span className="sr-only">Open mail notifications</span>
        {hasUnreadNotifications ? (
          <span className="floating-mail-badge" aria-hidden="true"></span>
        ) : null}
      </button>

      {isInboxOpen ? (
        <button
          type="button"
          className="notification-backdrop"
          aria-label="Close notifications panel"
          onClick={handleCloseInbox}
        ></button>
      ) : null}

      {isInboxOpen ? (
        <section
          id="notification-popover"
          className={`notification-popover ${isInboxOpen ? 'is-open' : ''}`}
          aria-label="Mail notifications"
          role="dialog"
        >
          <header className="notification-head">
            <div>
              <p className="notification-eyebrow">Inbox</p>
              <h2>Updates near you</h2>
            </div>
            <button
              type="button"
              className="notification-close"
              onClick={handleCloseInbox}
            >
              Close
            </button>
          </header>

          <div className="notification-list">
            {inboxMessages.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`notification-item-button ${
                  openedNotificationIds.includes(item.id) ? 'is-opened' : 'is-new'
                }`}
                onClick={() => handleOpenMessage(item)}
              >
                <span className="notification-time">{item.time}</span>
                <h3>{item.title}</h3>
                <p>{item.preview}</p>
                <small>{openedNotificationIds.includes(item.id) ? 'Opened' : 'Not opened'}</small>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {selectedMessage ? (
        <section className="notification-detail" role="dialog" aria-label="Notification details">
          <header className="notification-detail-head">
            <div>
              <p className="notification-eyebrow">Message details</p>
              <h3>{selectedMessage.title}</h3>
            </div>
            <button
              type="button"
              className="notification-close"
              onClick={() => setSelectedMessage(null)}
            >
              Back
            </button>
          </header>

          <div className="notification-detail-body">
            <p className="notification-time">{selectedMessage.time}</p>
            <p>{selectedMessage.message}</p>
            <p className="notification-suggestion">{selectedMessage.suggestion}</p>
          </div>

          <div className="notification-detail-actions">
            <button type="button" className="notification-action" onClick={handleGoToEvents}>
              Open Events
            </button>
          </div>
        </section>
      ) : null}
    </>
  ) : null

  return (
    <header className="site-header" id="top">
      <nav className="navbar container" aria-label="Primary">
        <Link to="/" className="brand-link" aria-label="Common Ground home">
          <span className="brand-mark" aria-hidden="true">
            <img src={commonGroundLogoUrl} alt="" className="brand-logo" loading="lazy" />
          </span>
          <span className="brand-copy">
            <strong>Common Ground</strong>
            <small>Brisbane Student Life Hub</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">Toggle navigation menu</span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>

        <div className={`nav-links ${isOpen ? 'is-open' : ''}`} id="mobile-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'is-active' : ''}`
              }
              end={item.to === '/'}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <div className="translation-control" data-no-translate="true">
            <label htmlFor="page-language" className="sr-only">
              Page language
            </label>
            <select
              id="page-language"
              className="translation-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label="Page language"
            >
              {languages.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className={`translation-status ${isTranslating ? 'is-active' : ''}`}>
              {isTranslating ? 'Translating...' : 'Translate page'}
            </span>
          </div>
        </div>

      </nav>
      {typeof document !== 'undefined' && floatingNotificationUi
        ? createPortal(floatingNotificationUi, document.body)
        : null}
    </header>
  )
}
