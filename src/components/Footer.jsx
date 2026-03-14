import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Find Events', to: '/events' },
  { label: 'Ask AI Buddy', to: '/chat' },
  { label: 'Comfort Insights', to: '/safety' },
  { label: 'Conversation Starters', to: '/starters' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <h3>Cultural Buddy</h3>
          <p>
            An MVP for international students to explore Brisbane culture with
            confidence, safety, and community warmth.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>City Spaces</h4>
          <p>South Bank, West End, St Lucia, Kelvin Grove, and more.</p>
          <p className="footer-note">Built for hackathon demo use.</p>
        </div>
      </div>
    </footer>
  )
}
