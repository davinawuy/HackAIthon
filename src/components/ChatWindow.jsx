import { useEffect, useRef, useState } from 'react'
import { findFaqResponse, starterBotMessages } from '../utils/chatUtils'
import { Button } from './Button'
import { Chip } from './Chip'

export function ChatWindow({ faqPrompts, quickQuestions }) {
  const [messages, setMessages] = useState(starterBotMessages)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, isThinking])

  function pushMessage(role, text) {
    setMessages((current) => [
      ...current,
      {
        id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role,
        text,
      },
    ])
  }

  function respondToQuestion(question) {
    const trimmed = question.trim()
    if (!trimmed || isThinking) return

    pushMessage('user', trimmed)
    setInput('')
    setIsThinking(true)

    window.setTimeout(() => {
      const answer = findFaqResponse(trimmed, faqPrompts)
      pushMessage('assistant', answer)
      setIsThinking(false)
    }, 600)
  }

  function handleSubmit(event) {
    event.preventDefault()
    respondToQuestion(input)
  }

  return (
    <section className="chat-shell" aria-label="AI Cultural Buddy chat window">
      <div className="chat-messages" ref={listRef}>
        {messages.map((message) => (
          <article
            key={message.id}
            className={`chat-message ${message.role === 'assistant' ? 'assistant' : 'user'}`}
          >
            <p>{message.text}</p>
          </article>
        ))}

        {isThinking ? (
          <article className="chat-message assistant" aria-live="polite">
            <p>Thinking through a practical answer...</p>
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
          Ask Cultural Buddy
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about social norms, events, or conversation tips..."
        />
        <Button type="submit" size="sm" variant="primary">
          Send
        </Button>
      </form>
    </section>
  )
}
