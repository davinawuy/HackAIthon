import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { commonGroundLogoUrl } from '../assets/branding'
import { useTranslation } from '../hooks/useTranslation'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Onboarding', to: '/onboarding' },
  { label: 'AI Buddy', to: '/chat' },
  { label: 'AI Map', to: '/where-to-go' },
  { label: 'Events', to: '/events' },
  { label: 'Safety', to: '/safety' },
  { label: 'Starters', to: '/starters' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, isTranslating, languages } = useTranslation()

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
    </header>
  )
}
