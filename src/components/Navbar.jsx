import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Onboarding', to: '/onboarding' },
  { label: 'AI Buddy', to: '/chat' },
  { label: 'Events', to: '/events' },
  { label: 'Safety', to: '/safety' },
  { label: 'Starters', to: '/starters' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header" id="top">
      <nav className="navbar container" aria-label="Primary">
        <Link to="/" className="brand-link" aria-label="Cultural Buddy home">
          <span className="brand-mark" aria-hidden="true">
            CB
          </span>
          <span className="brand-copy">
            <strong>Cultural Buddy</strong>
            <small>Brisbane Student Life</small>
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
        </div>
      </nav>
    </header>
  )
}
