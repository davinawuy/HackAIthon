# Cultural Buddy MVP (React + Vite)

Cultural Buddy is a fully responsive React website MVP for international students in Australia.
It helps users understand Australian social culture, discover community events, evaluate comfort/safety context, and prepare conversation starters before attending.

## Design Intent

The UI blends:
- Australian civic clarity and trust
- Brisbane public service/community tone
- Futuristic but warm earthy visual language

Palette direction:
- Off-white base (`#FAF7F2`)
- Warm text and clay accents
- Earth green support tones
- Soft borders, rounded cards, calm shadows, glass-like hover layers

## Tech Stack

- React
- React Router DOM
- Vite
- Plain CSS (single design system file)
- Local dummy data (no backend, no auth, no database)

## Pages Implemented

1. Landing Page
- Hero with value proposition and floating animated shapes
- How it works
- Feature cards
- Featured events
- Community suggestions
- Testimonials

2. Onboarding Page
- Interest selection chips
- Background preference chips
- Local save status (demo)
- Recommended communities based on selected interests

3. AI Chat Buddy Page
- Sleek chat interface
- Suggestion chips
- Dummy FAQ matching logic
- API-ready utility structure for future LLM integration

4. Events Recommendation Page
- 20+ realistic Brisbane-focused dummy events
- Filtering by interest, type, date, group size, comfort level, and search
- Save/bookmark state with localStorage
- Empty states and loading skeletons
- Mobile featured-event horizontal slider

5. Safety / Comfort Insights Page
- Rule-based comfort scoring (`comfort score /100`)
- Comfort labels:
  - Good for newcomers
  - Best with a friend
  - Small friendly group
  - Large lively crowd
- Event safety context and explanations

6. Conversation Starter Generator Page
- Event picker
- 3 tailored starter packs per event
- Conversation starters, polite phrases, social tips

## Core Reusable Components

- `Navbar`
- `Hero`
- `FeatureCard`
- `EventCard`
- `FilterBar`
- `ChatWindow`
- `ComfortBadge`
- `StarterCard`
- `Footer`
- `Button`, `Chip`, `SectionTitle`, `SkeletonCard`, `CommunityCard`

## Folder Structure

```txt
src/
  components/
  data/
  hooks/
  pages/
  styles/
  utils/
  App.jsx
  main.jsx
```

## Dummy Data Included

- 22 events with rich attributes
- 12 AI FAQ prompts and answers
- 10 testimonials
- 12 conversation starter sets
- 10+ event tags/categories
- 6 recommended communities/clubs

## Accessibility and UX Notes

- Semantic HTML across sections/cards/forms
- Sticky navbar with active route highlighting
- Keyboard-focus styles and large touch targets
- Skip link for quick navigation
- Responsive layout for mobile, tablet, desktop
- `prefers-reduced-motion` fallback

## Getting Started

```bash
npm install
npm run start
```

For development with HMR:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Future AI API Integration

The chat logic is separated in `src/utils/chatUtils.js` and consumed in `ChatWindow`.
To add a real AI API later, replace local FAQ matching with an async API call in the same interaction flow.
