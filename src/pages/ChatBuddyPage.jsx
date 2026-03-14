import { ChatWindow } from '../components/ChatWindow'
import { SectionTitle } from '../components/SectionTitle'
import { faqPrompts, quickQuestions } from '../data/chatFaq'

export function ChatBuddyPage() {
  return (
    <section className="container page-section">
      <SectionTitle
        eyebrow="AI Chat Buddy"
        title="Ask cultural questions before you attend"
        description="This MVP uses local dummy FAQ logic now, with a clean structure ready for future AI API integration."
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

          <h3>Future API-ready architecture</h3>
          <p>
            The chat handler is isolated in utility logic, so plugging in a real
            AI endpoint later is straightforward.
          </p>
        </aside>
      </div>
    </section>
  )
}
