import { ChatWindow } from '../components/ChatWindow'
import { SectionTitle } from '../components/SectionTitle'
import { faqPrompts, quickQuestions } from '../data/chatFaq'

export function ChatBuddyPage() {
  return (
    <section className="container page-section">
      <SectionTitle
        eyebrow="AI Chat Buddy"
        title="Ask cultural questions before you attend"
        description="Ask about events, Aussie etiquette, student life, and what to expect as a newcomer."
        level="h1"
      />

      <div className="chat-page-layout">
        <ChatWindow faqPrompts={faqPrompts} quickQuestions={quickQuestions} />

        <aside className="chat-trust-panel" aria-label="Trust and usage notes">
          <h3>Why this helps</h3>
          <ul>
            <li>Answers common questions about Australian social etiquette.</li>
            <li>Reduces uncertainty before meetups and classes.</li>
            <li>Encourages respectful, confidence-building communication.</li>
          </ul>

          <h3>How this chat works</h3>
          <p>
            It uses Gemini when your API key is available, and falls back to the
            local FAQ logic if AI is unavailable.
          </p>
        </aside>
      </div>
    </section>
  )
}