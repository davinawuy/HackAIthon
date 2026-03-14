export const faqPrompts = [
  {
    id: 'faq-001',
    question: 'What does “bring a plate” mean?',
    answer:
      'In Australia, “bring a plate” means bring a dish of food to share, not an empty plate. A simple salad, snacks, or dessert is perfect.',
    keywords: ['bring a plate', 'food', 'bbq', 'share'],
  },
  {
    id: 'faq-002',
    question: 'Is it okay to call my tutor by first name?',
    answer:
      'Usually yes. Many Australian tutors and lecturers invite first-name use. If unsure, start with “Hi Dr/Professor…” and follow how they sign emails.',
    keywords: ['tutor', 'first name', 'lecturer', 'uni etiquette'],
  },
  {
    id: 'faq-003',
    question: 'How do I make friends at uni?',
    answer:
      'Join one recurring activity each week, arrive 10 minutes early, and ask simple open questions. Familiar faces build friendship faster than one-off events.',
    keywords: ['friends', 'uni', 'social', 'meet people'],
  },
  {
    id: 'faq-004',
    question: 'What should I wear to a BBQ?',
    answer:
      'Smart-casual is safe: comfortable top, jeans or shorts, and closed shoes. Bring a light layer for evening breeze and check if the event is outdoors.',
    keywords: ['bbq', 'wear', 'clothes', 'dress code'],
  },
  {
    id: 'faq-005',
    question: 'What does “no worries” actually mean?',
    answer:
      '“No worries” is a friendly way to say “it’s okay” or “you’re welcome.” It usually signals that everything is fine and relaxed.',
    keywords: ['no worries', 'slang', 'australian phrase'],
  },
  {
    id: 'faq-006',
    question: 'How early should I arrive for a meetup?',
    answer:
      'For most student meetups, arriving 5 to 10 minutes early is ideal. It gives you time to settle in and meet people before groups form.',
    keywords: ['arrive', 'timing', 'meetup', 'late'],
  },
  {
    id: 'faq-007',
    question: 'Is it normal to split bills in Australia?',
    answer:
      'Yes, splitting bills is very common. You can politely ask, “Can we split this?” Most cafes and restaurants are used to separate payments.',
    keywords: ['split bill', 'payment', 'money', 'restaurant'],
  },
  {
    id: 'faq-008',
    question: 'How do I politely leave a conversation?',
    answer:
      'Try: “It was lovely chatting, I’m going to grab a drink and say hi to a few others.” This sounds warm and natural in social settings.',
    keywords: ['leave conversation', 'polite', 'social anxiety'],
  },
  {
    id: 'faq-009',
    question: 'Are public events generally safe at night?',
    answer:
      'Many are, especially in central areas, but go with a friend when possible, share your location, and use well-lit transport routes after events.',
    keywords: ['safety', 'night', 'public events', 'transport'],
  },
  {
    id: 'faq-010',
    question: 'What if I feel shy at large events?',
    answer:
      'Pick one micro-goal: talk to two people or stay for 45 minutes. You can also choose events tagged “small group” or “newcomer friendly.”',
    keywords: ['shy', 'introvert', 'large events', 'confidence'],
  },
  {
    id: 'faq-011',
    question: 'Do I need to bring cash to local markets?',
    answer:
      'Card payments are common, but having a small amount of cash helps at some weekend market stalls and food trucks.',
    keywords: ['cash', 'market', 'card payment'],
  },
  {
    id: 'faq-012',
    question: 'How can I join conversations without interrupting?',
    answer:
      'Stand nearby, smile, and wait for a pause. A simple “Mind if I join?” is polite and usually welcomed in student spaces.',
    keywords: ['join conversation', 'interrupt', 'social tips'],
  },
]

export const quickQuestions = faqPrompts.slice(0, 6).map((item) => item.question)
