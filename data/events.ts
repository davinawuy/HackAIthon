import { Event } from "@/types/event";

export const events: Event[] = [
  {
    id: "indonesian-food-night",
    title: "Indonesian Food Night",
    shortDescription:
      "Share home-style dishes, stories behind recipes, and meet students from across Southeast Asia.",
    longDescription:
      "A warm evening hosted by the Indonesian Student Association featuring satay, soto, vegetarian options, and mini storytelling circles about family food traditions. Newcomers can join guided table introductions to make socializing easier.",
    date: "April 5, 2026",
    dateISO: "2026-04-05",
    time: "6:30 PM - 9:00 PM",
    location: "Riverside Community Hall, Brisbane",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    category: "Food",
    cultureTag: "Indonesian",
    host: "Indonesian Student Association",
    attendeeCount: 84,
    interestedCount: 162,
    safetyBadges: ["Respect-checked", "Community safe", "Inclusive wording suggested"],
    comfortFeatures: [
      "Beginner friendly",
      "Non-members welcome",
      "Halal options",
      "Wheelchair accessible",
    ],
    aiExplainer: {
      whatIsThis:
        "A social food gathering introducing Indonesian flavors and hospitality customs through shared meals.",
      whyItMatters:
        "Food lowers social barriers and creates natural conversation between people from different backgrounds.",
      firstTimerFriendly:
        "Yes. Hosts greet first-timers at the entrance and seat them with friendly table guides.",
      whatToExpect:
        "Casual buffet, small conversation prompts, and short cultural stories between meal rounds.",
    },
    beginnerTips: [
      "Arrive 10 minutes early for first-timer introductions.",
      "Try one dish you have never heard of and ask the story behind it.",
      "You can join quietly first and mingle at your own pace.",
    ],
    comments: [
      {
        id: "c1",
        author: "Maya",
        text: "Came alone last time and left with three new friends.",
        timeAgo: "2h ago",
      },
      {
        id: "c2",
        author: "Liam",
        text: "Great vegetarian options and super welcoming vibe.",
        timeAgo: "1d ago",
      },
    ],
    whyThisMatters:
      "Shared meals help people connect quickly, especially students new to the city.",
    whatToExpect: [
      "Welcome circle for newcomers",
      "Buffet tables with dietary labels",
      "Optional group games and language exchange",
    ],
    featured: true,
    trending: true,
    beginnerFriendly: true,
    familyFriendly: true,
    freeOrPaid: "Paid",
    accessibilityNotes:
      "Ground floor venue, wheelchair access ramp, halal and vegan signs clearly marked.",
  },
  {
    id: "holi-celebration-meetup",
    title: "Holi Celebration Meetup",
    shortDescription:
      "Celebrate color, music, and joy with guided cultural context for first-time attendees.",
    longDescription:
      "An open community event celebrating Holi with eco-friendly colors, dance workshops, and storytelling about the festival's roots. Safety volunteers and comfort zones are available for anyone who prefers lower-noise spaces.",
    date: "April 12, 2026",
    dateISO: "2026-04-12",
    time: "11:00 AM - 3:00 PM",
    location: "South Bank Parklands",
    image:
      "https://images.unsplash.com/photo-1616486788371-62d930495c44?auto=format&fit=crop&w=1200&q=80",
    category: "Festival",
    cultureTag: "Indian",
    host: "Brisbane Indian Cultural Network",
    attendeeCount: 220,
    interestedCount: 418,
    safetyBadges: ["Respect-checked", "Community safe"],
    comfortFeatures: [
      "Beginner friendly",
      "Family friendly",
      "Quiet spaces available",
      "Non-members welcome",
    ],
    aiExplainer: {
      whatIsThis:
        "Holi is a spring festival focused on renewal, friendship, and celebrating diversity through color.",
      whyItMatters:
        "It invites people from all backgrounds to connect through joy and shared cultural learning.",
      firstTimerFriendly:
        "Absolutely. A quick orientation explains color etiquette, consent, and respectful participation.",
      whatToExpect:
        "Live drumming, dancing, color zones, and a calm zone with cultural exhibits.",
    },
    beginnerTips: [
      "Wear clothes you do not mind getting colorful.",
      "Ask before applying color to someone.",
      "Use the quiet zone if crowds feel intense.",
    ],
    comments: [
      {
        id: "c3",
        author: "Aarav",
        text: "Loved that they explained the meaning before the celebration started.",
        timeAgo: "4h ago",
      },
      {
        id: "c4",
        author: "Sophie",
        text: "The consent reminders made it feel respectful and safe.",
        timeAgo: "2d ago",
      },
    ],
    whyThisMatters:
      "It breaks down fear of unfamiliar celebrations through guided context and safety cues.",
    whatToExpect: [
      "Opening cultural explainer",
      "Color celebration windows",
      "Dance circles and beginner lessons",
    ],
    featured: true,
    trending: true,
    beginnerFriendly: true,
    familyFriendly: true,
    freeOrPaid: "Free",
    accessibilityNotes:
      "Accessible pathways, sensory-friendly rest area, water refill stations, and shaded seating.",
  },
  {
    id: "ramadan-community-iftar",
    title: "Ramadan Community Iftar",
    shortDescription:
      "Break fast together, learn Ramadan traditions, and build friendship across communities.",
    longDescription:
      "This interfaith iftar welcomes Muslims and non-Muslims for a shared meal at sunset, with short reflections on generosity, compassion, and community care. Volunteers support first-time guests with etiquette guidance.",
    date: "March 21, 2026",
    dateISO: "2026-03-21",
    time: "5:45 PM - 8:30 PM",
    location: "West End Community Centre",
    image:
      "https://images.unsplash.com/photo-1578923931302-808f17f0f85f?auto=format&fit=crop&w=1200&q=80",
    category: "Faith & Community",
    cultureTag: "Muslim Community",
    host: "Neighbourhood Mosque & Friends",
    attendeeCount: 132,
    interestedCount: 245,
    safetyBadges: ["Respect-checked", "Inclusive wording suggested", "Community safe"],
    comfortFeatures: [
      "Non-members welcome",
      "Family friendly",
      "Quiet spaces available",
      "Halal meal provided",
    ],
    aiExplainer: {
      whatIsThis:
        "Iftar is the evening meal that breaks the daily fast during Ramadan.",
      whyItMatters:
        "Sharing iftar builds empathy, understanding, and trust between neighbors of different beliefs.",
      firstTimerFriendly:
        "Yes. Hosts explain meal timing, prayer moments, and respectful behavior for guests.",
      whatToExpect:
        "Dates and water at sunset, shared dinner, short talks, and optional Q&A.",
    },
    beginnerTips: [
      "Arrive before sunset to hear the welcome briefing.",
      "Dress modestly out of respect for the space.",
      "Feel free to ask questions during the Q&A segment.",
    ],
    comments: [
      {
        id: "c5",
        author: "Noah",
        text: "I appreciated the intro on traditions. It helped me feel comfortable.",
        timeAgo: "5h ago",
      },
      {
        id: "c6",
        author: "Hana",
        text: "Very warm hosts and thoughtful seating for families.",
        timeAgo: "3d ago",
      },
    ],
    whyThisMatters:
      "It turns curiosity into understanding and supports respectful interfaith connection.",
    whatToExpect: [
      "Brief culture and etiquette guide",
      "Shared iftar meal",
      "Open conversation tables",
    ],
    featured: true,
    trending: false,
    beginnerFriendly: true,
    familyFriendly: true,
    freeOrPaid: "Free",
    accessibilityNotes:
      "Prayer and reflection room, wheelchair-friendly access, quiet corners for first-time guests.",
  },
  {
    id: "lunar-new-year-lantern-gathering",
    title: "Lunar New Year Lantern Gathering",
    shortDescription:
      "Lantern walk, music, and stories celebrating renewal, family, and shared hope.",
    longDescription:
      "A multicultural lantern evening inspired by Lunar New Year traditions across East and Southeast Asian communities. Includes calligraphy booths, zodiac storytelling, and family photo spots.",
    date: "February 28, 2026",
    dateISO: "2026-02-28",
    time: "6:00 PM - 9:30 PM",
    location: "King George Square",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1200&q=80",
    category: "Festival",
    cultureTag: "East Asian",
    host: "City Multicultural Council",
    attendeeCount: 310,
    interestedCount: 570,
    safetyBadges: ["Community safe", "Respect-checked"],
    comfortFeatures: [
      "Family friendly",
      "Beginner friendly",
      "Wheelchair accessible",
      "Visual guides available",
    ],
    aiExplainer: {
      whatIsThis:
        "A cultural night centered on Lunar New Year customs like lanterns, wishes, and family reunions.",
      whyItMatters:
        "The event encourages shared celebration while preserving rich traditions in public spaces.",
      firstTimerFriendly:
        "Yes. Signage explains symbolism and event volunteers offer guided walk-throughs.",
      whatToExpect:
        "Lantern parade, live instruments, and mini booths for crafts and greetings.",
    },
    beginnerTips: [
      "Start at the orientation map near the main gate.",
      "Visit the calligraphy booth for a custom good-luck card.",
      "Stay for the final lantern release moment.",
    ],
    comments: [
      {
        id: "c7",
        author: "Ying",
        text: "Beautiful blend of traditions, and very easy to follow for newcomers.",
        timeAgo: "1d ago",
      },
      {
        id: "c8",
        author: "Grace",
        text: "Loved the zodiac storytelling section.",
        timeAgo: "3d ago",
      },
    ],
    whyThisMatters:
      "Public cultural celebrations increase belonging for migrants, students, and local families alike.",
    whatToExpect: [
      "Lantern craft stations",
      "Live music and lion dance",
      "Guided cultural storytelling",
    ],
    featured: false,
    trending: true,
    beginnerFriendly: true,
    familyFriendly: true,
    freeOrPaid: "Free",
    accessibilityNotes:
      "Step-free pathways, stroller-friendly spaces, and translated visual signs.",
  },
  {
    id: "african-drumming-circle",
    title: "African Drumming Circle",
    shortDescription:
      "Hands-on rhythm session celebrating African musical heritage and community healing.",
    longDescription:
      "A welcoming drumming workshop led by local African artists. Learn basic rhythms, call-and-response patterns, and the social stories behind communal drumming practices from multiple regions.",
    date: "April 19, 2026",
    dateISO: "2026-04-19",
    time: "2:00 PM - 5:00 PM",
    location: "New Farm Community Arts Hub",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    category: "Music & Arts",
    cultureTag: "African Diaspora",
    host: "Ubuntu Arts Collective",
    attendeeCount: 67,
    interestedCount: 149,
    safetyBadges: ["Inclusive wording suggested", "Respect-checked"],
    comfortFeatures: [
      "Beginner friendly",
      "Ear protection zone",
      "Family friendly",
      "Wheelchair accessible",
    ],
    aiExplainer: {
      whatIsThis:
        "A participatory music gathering focused on rhythm, storytelling, and collective expression.",
      whyItMatters:
        "Music creates non-verbal connection and gives people confidence to join without language barriers.",
      firstTimerFriendly:
        "Definitely. Intro rounds teach rhythm basics before group sessions begin.",
      whatToExpect:
        "Live demos, shared drumming circles, and reflection moments between sets.",
    },
    beginnerTips: [
      "No prior music experience is needed.",
      "Start in the beginner ring closest to facilitators.",
      "Use earplugs if you are sensitive to sound.",
    ],
    comments: [
      {
        id: "c9",
        author: "Ruth",
        text: "Such positive energy and patient teachers.",
        timeAgo: "6h ago",
      },
      {
        id: "c10",
        author: "Daniel",
        text: "Great way to connect without awkward small talk.",
        timeAgo: "1d ago",
      },
    ],
    whyThisMatters:
      "Creative participation helps newcomers build confidence and social ties quickly.",
    whatToExpect: [
      "Rhythm warm-up",
      "Guided drumming circles",
      "Cultural context and story sessions",
    ],
    featured: false,
    trending: false,
    beginnerFriendly: true,
    familyFriendly: true,
    freeOrPaid: "Paid",
    accessibilityNotes:
      "Seated and standing participation options, assistive listening support, quiet corner nearby.",
  },
  {
    id: "naidoc-storytelling-night",
    title: "NAIDOC Week Storytelling Night",
    shortDescription:
      "Listen, learn, and honour First Nations voices through stories, art, and community dialogue.",
    longDescription:
      "A respectful storytelling evening featuring Elders, young artists, and local performers sharing histories, language, and resilience. Includes a guided protocol introduction so attendees understand cultural respect before the session.",
    date: "July 8, 2026",
    dateISO: "2026-07-08",
    time: "5:30 PM - 8:30 PM",
    location: "State Library Cultural Theatre",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    category: "Storytelling",
    cultureTag: "First Nations",
    host: "NAIDOC Community Partners",
    attendeeCount: 156,
    interestedCount: 301,
    safetyBadges: ["Respect-checked", "Community safe", "Inclusive wording suggested"],
    comfortFeatures: [
      "Beginner friendly",
      "Family friendly",
      "Quiet spaces available",
      "Wheelchair accessible",
    ],
    aiExplainer: {
      whatIsThis:
        "A NAIDOC community event centering Aboriginal and Torres Strait Islander storytelling and cultural continuity.",
      whyItMatters:
        "Listening to First Nations voices supports truth-telling, respect, and stronger local relationships.",
      firstTimerFriendly:
        "Yes. A protocol briefing helps first-time attendees participate respectfully.",
      whatToExpect:
        "Welcome to Country, story sessions, music, and guided reflection spaces.",
    },
    beginnerTips: [
      "Join the protocol introduction at the start.",
      "Listen actively and avoid interrupting story moments.",
      "Use the reflection wall to share gratitude messages.",
    ],
    comments: [
      {
        id: "c11",
        author: "Ella",
        text: "Powerful stories and a very respectful event design.",
        timeAgo: "9h ago",
      },
      {
        id: "c12",
        author: "Tom",
        text: "I learned so much from the protocol session.",
        timeAgo: "2d ago",
      },
    ],
    whyThisMatters:
      "Respectful learning spaces strengthen trust and reduce cultural misunderstanding.",
    whatToExpect: [
      "Welcome to Country",
      "Storytelling by Elders and artists",
      "Community discussion with facilitators",
    ],
    featured: true,
    trending: false,
    beginnerFriendly: true,
    familyFriendly: true,
    freeOrPaid: "Free",
    accessibilityNotes:
      "Hearing loop support, step-free seating, and low-sensory breakout room.",
  },
  {
    id: "arabic-coffee-conversation",
    title: "Arabic Coffee & Conversation Night",
    shortDescription:
      "Practice warm conversation over Arabic coffee and learn cross-cultural greetings.",
    longDescription:
      "An intimate social evening with Arabic coffee tasting, board games, and guided conversation tables for language learners and curious neighbors. Every table has a friendly host to include new arrivals.",
    date: "April 3, 2026",
    dateISO: "2026-04-03",
    time: "7:00 PM - 9:30 PM",
    location: "Community Loft, Fortitude Valley",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    category: "Language Exchange",
    cultureTag: "Arab Community",
    host: "Bridges Language Collective",
    attendeeCount: 48,
    interestedCount: 109,
    safetyBadges: ["Respect-checked", "Community safe"],
    comfortFeatures: [
      "Beginner friendly",
      "Non-members welcome",
      "Quiet spaces available",
      "Halal snacks",
    ],
    aiExplainer: {
      whatIsThis:
        "A cultural social night combining coffee traditions with friendly conversation practice.",
      whyItMatters:
        "Language-sharing builds empathy and helps newcomers feel seen and understood.",
      firstTimerFriendly:
        "Yes. Guided prompts and table hosts reduce social pressure.",
      whatToExpect:
        "Coffee tasting, rotating chat prompts, and beginner Arabic phrase cards.",
    },
    beginnerTips: [
      "Start at the beginner phrase table.",
      "Use prompt cards if you are shy.",
      "You can switch tables every 20 minutes.",
    ],
    comments: [
      {
        id: "c13",
        author: "Fatima",
        text: "The hosts made everyone feel included from minute one.",
        timeAgo: "3h ago",
      },
      {
        id: "c14",
        author: "Kai",
        text: "Great event for practicing listening and speaking.",
        timeAgo: "1d ago",
      },
    ],
    whyThisMatters:
      "Conversation-based events reduce social anxiety and build trust across cultures.",
    whatToExpect: [
      "Coffee ritual introduction",
      "Small guided conversations",
      "Language games and prompt cards",
    ],
    featured: false,
    trending: true,
    beginnerFriendly: true,
    familyFriendly: false,
    freeOrPaid: "Free",
    accessibilityNotes:
      "Quiet seating section, clear signage, and non-caffeinated alternatives available.",
  },
  {
    id: "pacific-dance-workshop",
    title: "Pacific Islander Dance Workshop",
    shortDescription:
      "Learn foundational island dance moves, stories, and respectful participation.",
    longDescription:
      "A movement and storytelling workshop led by Pacific Islander instructors. The session introduces dance origins, meaning, and community pride while keeping a fun beginner-friendly pace.",
    date: "May 10, 2026",
    dateISO: "2026-05-10",
    time: "1:00 PM - 4:00 PM",
    location: "Northside Youth Hall",
    image:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=1200&q=80",
    category: "Dance",
    cultureTag: "Pacific Islander",
    host: "Moana Youth Movement",
    attendeeCount: 95,
    interestedCount: 187,
    safetyBadges: ["Community safe", "Respect-checked", "Inclusive wording suggested"],
    comfortFeatures: [
      "Beginner friendly",
      "Family friendly",
      "Water stations",
      "Wheelchair viewing access",
    ],
    aiExplainer: {
      whatIsThis:
        "A cultural dance workshop celebrating Pacific movement traditions and storytelling.",
      whyItMatters:
        "Embodied cultural learning helps people connect deeply and respectfully.",
      firstTimerFriendly:
        "Yes. Beginner lanes and step-by-step demos are provided.",
      whatToExpect:
        "Warm-up, storytelling, guided practice, and a community showcase.",
    },
    beginnerTips: [
      "Wear comfortable movement-friendly clothes.",
      "Choose the beginner circle when you arrive.",
      "Ask instructors about dance meanings between sets.",
    ],
    comments: [
      {
        id: "c15",
        author: "Lani",
        text: "Beautiful teaching style and amazing sense of community.",
        timeAgo: "4h ago",
      },
      {
        id: "c16",
        author: "Ethan",
        text: "Beginner lane made it so easy to join.",
        timeAgo: "2d ago",
      },
    ],
    whyThisMatters:
      "Cultural expression through movement helps participants feel connected and included.",
    whatToExpect: [
      "Cultural storytelling intro",
      "Technique basics",
      "Group choreography and celebration",
    ],
    featured: false,
    trending: false,
    beginnerFriendly: true,
    familyFriendly: true,
    freeOrPaid: "Paid",
    accessibilityNotes:
      "Seated participation alternatives, support volunteers, and visible hydration points.",
  },
  {
    id: "multicultural-campus-picnic",
    title: "Multicultural Campus Picnic",
    shortDescription:
      "Meet new people, share snacks, and discover student clubs from every background.",
    longDescription:
      "A low-pressure social picnic designed for students and local residents. Includes icebreaker circles, club booths, and AI-powered conversation prompts to make joining easier for introverts.",
    date: "April 26, 2026",
    dateISO: "2026-04-26",
    time: "12:00 PM - 4:00 PM",
    location: "University Lakes Lawn",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    category: "Student Life",
    cultureTag: "Multicultural",
    host: "Campus Community Union",
    attendeeCount: 205,
    interestedCount: 396,
    safetyBadges: ["Inclusive wording suggested", "Community safe", "Respect-checked"],
    comfortFeatures: [
      "Beginner friendly",
      "Family friendly",
      "Vegan options",
      "Wheelchair accessible",
    ],
    aiExplainer: {
      whatIsThis:
        "A social campus meetup where students and neighbors connect through food and friendly activities.",
      whyItMatters:
        "It helps reduce social isolation and creates bridges between communities and campus life.",
      firstTimerFriendly:
        "Yes. Newcomer stations and guided introductions are available all day.",
      whatToExpect:
        "Club showcases, language mini-games, snack swaps, and open networking circles.",
    },
    beginnerTips: [
      "Stop by the newcomer welcome tent first.",
      "Use AI prompt cards to start conversations.",
      "Join one group activity before leaving.",
    ],
    comments: [
      {
        id: "c17",
        author: "Olivia",
        text: "The prompt cards helped me talk to people outside my major.",
        timeAgo: "1h ago",
      },
      {
        id: "c18",
        author: "Jamal",
        text: "Really inclusive vibe and plenty of food choices.",
        timeAgo: "1d ago",
      },
    ],
    whyThisMatters:
      "It creates easy first steps for people who want community but fear awkward social entry.",
    whatToExpect: [
      "Welcome lounge for newcomers",
      "Club and culture booths",
      "Games, food sharing, and networking",
    ],
    featured: true,
    trending: true,
    beginnerFriendly: true,
    familyFriendly: true,
    freeOrPaid: "Free",
    accessibilityNotes:
      "Flat lawn access routes, labeled dietary options, and volunteer support for navigation.",
  },
  {
    id: "language-exchange-evening",
    title: "Language Exchange Evening",
    shortDescription:
      "Practice new languages with cultural mentors in a calm, supportive environment.",
    longDescription:
      "An evening for language learners and native speakers to connect through structured rounds. Mentors provide conversation starters and gentle correction, making this ideal for shy participants.",
    date: "April 16, 2026",
    dateISO: "2026-04-16",
    time: "6:00 PM - 8:30 PM",
    location: "City Library Collaboration Lab",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    category: "Language Exchange",
    cultureTag: "Global Languages",
    host: "Speak & Share Network",
    attendeeCount: 112,
    interestedCount: 233,
    safetyBadges: ["Community safe", "Inclusive wording suggested"],
    comfortFeatures: [
      "Beginner friendly",
      "Non-members welcome",
      "Quiet spaces available",
      "Wheelchair accessible",
    ],
    aiExplainer: {
      whatIsThis:
        "A community language social where people practice speaking and learn cultural communication norms.",
      whyItMatters:
        "Language confidence helps people access education, services, and social belonging.",
      firstTimerFriendly:
        "Yes. Beginner tables and mentor-guided rounds are clearly marked.",
      whatToExpect:
        "Timed conversation rounds, phrase practice, and mentorship check-ins.",
    },
    beginnerTips: [
      "Choose one language table to start.",
      "Use the AI phrase cards for polite openers.",
      "Tell mentors your confidence level for better support.",
    ],
    comments: [
      {
        id: "c19",
        author: "Miguel",
        text: "Super practical and not intimidating at all.",
        timeAgo: "3h ago",
      },
      {
        id: "c20",
        author: "Nora",
        text: "Loved the structure and encouragement from mentors.",
        timeAgo: "2d ago",
      },
    ],
    whyThisMatters:
      "Communication skills reduce isolation and help newcomers participate in community life.",
    whatToExpect: [
      "Mentor-led language rounds",
      "Cultural etiquette mini-tips",
      "Partner and group practice",
    ],
    featured: false,
    trending: true,
    beginnerFriendly: true,
    familyFriendly: false,
    freeOrPaid: "Free",
    accessibilityNotes:
      "Assistive listening support, seated tables, and text-based prompt cards.",
  },
];

export const cultureTags = Array.from(new Set(events.map((event) => event.cultureTag)));
export const categories = Array.from(new Set(events.map((event) => event.category)));

export const featuredEvents = events.filter((event) => event.featured);
export const trendingEvents = events.filter((event) => event.trending);

export const getEventById = (id: string) => events.find((event) => event.id === id);

export const getRelatedEvents = (event: Event) =>
  events
    .filter(
      (candidate) =>
        candidate.id !== event.id &&
        (candidate.category === event.category || candidate.cultureTag === event.cultureTag),
    )
    .slice(0, 3);

export const aiInterestRecommendations: Record<string, Event[]> = {
  food: events.filter((event) => event.category === "Food" || event.category === "Festival").slice(0, 3),
  art: events.filter((event) => event.category === "Music & Arts" || event.category === "Storytelling").slice(0, 3),
  music: events.filter((event) => event.category === "Music & Arts" || event.category === "Dance").slice(0, 3),
  "language exchange": events.filter((event) => event.category === "Language Exchange").slice(0, 3),
  "student life": events.filter((event) => event.category === "Student Life").slice(0, 3),
  religion: events.filter((event) => event.category === "Faith & Community").slice(0, 3),
  volunteering: events.filter((event) => event.category === "Storytelling" || event.category === "Student Life").slice(0, 3),
};
