# Culture Cauldron

Culture Cauldron is a hackathon-ready web app for discovering and sharing multicultural community events in a safer, friendlier way.

## Hackathon Theme: Strengthen Communities

Theme prompt:

> How can we leverage the potential of AI to build stronger, safer, and friendlier communities?

Culture Cauldron answers this by combining social event discovery with visible AI guidance that helps people:

- understand unfamiliar cultural events
- discover relevant local activities
- feel safe and welcomed before joining
- communicate respectfully when hosting
- reduce fear of participating outside their usual social bubble

## Main Features

- Futuristic premium landing page with animated hero and storytelling sections
- Explore feed with search, filter chips, featured/trending cards, and interaction buttons
- Event detail pages with full context, first-timer guidance, comments, and related events
- Create event flow with polished form and AI writing/safety helper panel
- Profile dashboard showing saved, joined, and posted events + next recommendations
- Mobile-first responsive layouts with smooth Framer Motion interactions

## AI Features (Mocked for Demo)

- AI Event Explainer:
  - What is this event?
  - Why is it important?
  - Can first-timers join?
  - What should attendees expect?
- AI Friendly Tone Helper:
  - Suggests clearer, more welcoming host descriptions
- AI Safety Layer:
  - Visual moderation badges like `Respect-checked`, `Inclusive wording suggested`, `Community safe`
- AI Recommendation Section:
  - Suggests events by interests (food, art, music, language exchange, student life, religion, volunteering)
- AI Accessibility / Comfort Info:
  - Surfaces beginner-friendly, family-friendly, quiet spaces, dietary notes, and access needs

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Local mock seed data (no backend/database/auth)

## Requirements

- Node.js 18+ recommended
- npm required

## Installation

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Folder Structure

```text
app/
  page.tsx
  explore/page.tsx
  create/page.tsx
  profile/page.tsx
  events/[id]/page.tsx
  events/[id]/not-found.tsx
  layout.tsx
  template.tsx
  globals.css
components/
  layout/
    Navbar.tsx
    Footer.tsx
  ui/
    ActionButton.tsx
    AnimatedHeading.tsx
    Badge.tsx
    FilterChips.tsx
    GradientMesh.tsx
    HeroSpotlight.tsx
    Reveal.tsx
    SearchInput.tsx
    SectionWrapper.tsx
  sections/
    LandingHero.tsx
    ExploreClient.tsx
    EventDetailClient.tsx
    CreateEventForm.tsx
    ProfileDashboard.tsx
  events/
    EventCard.tsx
    CommentList.tsx
    RecommendationGrid.tsx
  ai/
    AIInsightPanel.tsx
    AIRecommendations.tsx
data/
  events.ts
lib/
  utils.ts
types/
  event.ts
```

## Demo User Flow

1. Landing (`/`)
- View hero message, AI-for-community story, feature highlights, and CTA.

2. Explore (`/explore`)
- Search and filter events by category and culture/community tags.
- Interact with cards via Interested, Going, Save.
- View AI recommendations by interest.

3. Event Detail (`/events/[id]`)
- Open an event to see full details, AI explainer, safety/comfort badges, comments, and related events.

4. Create (`/create`)
- Fill out event form fields and review AI tone/safety suggestions in real time.

5. Profile (`/profile`)
- Browse saved/joined/posted event lists and AI-generated next recommendations.

## Future Improvements

- Connect to real authentication and role-based community hosting tools
- Add real AI API integrations for explainer generation and moderation scoring
- Add map view and geolocation-based discovery
- Add real-time RSVP syncing and notifications
- Add multilingual translations and on-device accessibility personalization
- Add trust systems for organizers and community ambassadors
