import { useEffect, useRef, useState } from 'react'
import { aiLogoUrl } from '../assets/branding'
import { findFaqResponse, starterBotMessages } from '../utils/chatUtils'
import { answerChatQuestion } from '../lib/chat/service'
import { Button } from './Button'
import { Chip } from './Chip'

const CHAT_STORAGE_KEY = 'common-ground-chat-history'

function loadInitialMessages() {
  if (typeof window === 'undefined') {
    return starterBotMessages
  }

  try {
    const stored = window.localStorage.getItem(CHAT_STORAGE_KEY)
    if (!stored) {
      return starterBotMessages
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : starterBotMessages
  } catch {
    return starterBotMessages
  }
}

export function ChatWindow({ faqPrompts, quickQuestions, eventId }) {
  const [messages, setMessages] = useState(
    starterBotMessages.map((message) => ({
      ...message,
      events: message.events || [],
    }))
  )
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, isThinking])

  function pushMessage(role, text, events = []) {
    setMessages((current) => [
      ...current,
      {
        id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role,
        text,
        events,
      },
    ])
  }

  async function respondToQuestion(question) {
    const trimmed = question.trim()
    if (!trimmed || isThinking) return

    pushMessage('user', trimmed)
    setInput('')
    setIsThinking(true)

    try {
      const result = await answerChatQuestion(trimmed, eventId)
      pushMessage('assistant', result.answer, result.showEvents ? result.events : [])
    } catch (error) {
      console.error(error)

      const fallback = findFaqResponse(trimmed, faqPrompts)
      pushMessage('assistant', fallback, [])
    } finally {
      setIsThinking(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    respondToQuestion(input)
  }

  function handleResetChat() {
    setMessages(starterBotMessages)
    setInput('')
    setIsThinking(false)
  }

  return (
    <section className="chat-shell" aria-label="Informative Ibis chat window">
      <div className="chat-messages" ref={listRef}>
        {messages.map((message) => (
          <article
            key={message.id}
            className={`chat-message ${message.role === 'assistant' ? 'assistant' : 'user'}`}
          >
            <div>
              <p>{message.text}</p>

              {message.events?.length > 0 ? (
                <div
                  className="chat-event-list"
                  style={{
                    marginTop: '12px',
                    display: 'grid',
                    gap: '12px',
                  }}
                >
                  {message.events.map((event) => (
                    <div
                      key={event.id}
                      className="chat-event-card"
                      style={{
                        border: '1px solid #ddd8cc',
                        borderRadius: '18px',
                        padding: '14px',
                        background: '#f7f3eb',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '12px',
                          marginBottom: '8px',
                        }}
                      >
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              opacity: 0.7,
                            }}
                          >
                            {event.type}
                          </p>
                          <h4
                            style={{
                              margin: '4px 0 0',
                              fontSize: '1rem',
                              lineHeight: 1.3,
                            }}
                          >
                            {event.title}
                          </h4>
                        </div>

                        <span
                          style={{
                            whiteSpace: 'nowrap',
                            padding: '6px 12px',
                            borderRadius: '999px',
                            background: '#ffffff',
                            border: '1px solid #ddd8cc',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                          }}
                        >
                          {event.price}
                        </span>
                      </div>

                      <p style={{ margin: '6px 0' }}>
                        <strong>Where:</strong> {event.location}
                      </p>
                      <p style={{ margin: '6px 0' }}>
                        <strong>Suburb:</strong> {event.suburb}
                      </p>
                      <p style={{ margin: '6px 0' }}>
                        <strong>When:</strong> {event.date} at {event.time}
                      </p>

                      {event.reason ? (
                        <p style={{ margin: '10px 0 0' }}>{event.reason}</p>
                      ) : null}

                      {Array.isArray(event.tags) && event.tags.length > 0 ? (
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginTop: '12px',
                          }}
                        >
                          {event.tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '999px',
                                background: '#fff',
                                border: '1px solid #ddd8cc',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}

        {isThinking ? (
          <article className="chat-message assistant" aria-live="polite">
            <p>Informative Ibis is thinking through a practical answer...</p>
          </article>
        ) : null}
      </div>

      <div className="chat-suggestions" aria-label="Suggested prompts">
        {quickQuestions.map((question) => (
          <Chip
            key={question}
            label={question}
            className="chip-chat"
            onClick={() => respondToQuestion(question)}
          />
        ))}
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Ask Informative Ibis
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about living in Australia, culture, or nearby events..."
        />
        <Button type="submit" size="sm" variant="primary">
          Send
        </Button>
      </form>
    </section>
  )
}