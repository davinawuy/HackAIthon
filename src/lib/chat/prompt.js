import { events } from '../../data/events'

export function buildCultureChatPrompt(userMessage, eventId) {
  const selectedEvents = eventId
    ? events.filter((event) => event.id === eventId)
    : events

  const lightweightEvents = selectedEvents.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    suburb: event.suburb,
    date: event.date,
    time: event.time,
    type: event.type,
    groupSize: event.groupSize,
    price: event.price,
    verified: event.verified,
    newcomerFriendly: event.newcomerFriendly,
    publicSpace: event.publicSpace,
    comfortLevel: event.comfortLevel,
    tags: event.tags,
    interestCategories: event.interestCategories,
    organizer: event.organizer,
    attendeesCount: event.attendeesCount,
  }))

  return `
You are Cultural Buddy AI, a friendly assistant for international students, tourists, and newcomers in Australia.

Your role:
- Help users discover suitable events
- Explain event etiquette and what to expect
- Make first-timers feel comfortable
- Prioritize inclusion, accessibility, and safety

Rules:
- Use only the event data provided below
- Do not invent event details
- If the answer is not clearly in the data, say you are not sure
- Be warm, concise, and beginner-friendly
- If recommending events, explain why they fit
- If the question is about one event, stay focused on that event

Event data:
${JSON.stringify(lightweightEvents, null, 2)}

User question:
${userMessage}
`
}