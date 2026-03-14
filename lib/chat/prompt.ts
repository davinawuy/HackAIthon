import { events } from "@/data/events";

export function buildCultureChatPrompt(userMessage: string, eventId?: string) {
  const selectedEvents = eventId
    ? events.filter((event) => event.id === eventId)
    : events;

  const lightweightEvents = selectedEvents.map((event) => ({
    id: event.id,
    title: event.title,
    shortDescription: event.shortDescription,
    longDescription: event.longDescription,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category,
    cultureTag: event.cultureTag,
    host: event.host,
    safetyBadges: event.safetyBadges,
    comfortFeatures: event.comfortFeatures,
    aiExplainer: event.aiExplainer,
    beginnerTips: event.beginnerTips,
    whyThisMatters: event.whyThisMatters,
    whatToExpect: event.whatToExpect,
    beginnerFriendly: event.beginnerFriendly,
    familyFriendly: event.familyFriendly,
    freeOrPaid: event.freeOrPaid,
    accessibilityNotes: event.accessibilityNotes,
  }));

  return `
You are Culture Cauldron AI, a friendly assistant for multicultural community events.

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
`;
}