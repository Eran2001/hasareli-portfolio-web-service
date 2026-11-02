import { useEffect, useRef } from 'react'

import { nextMessageId, useChatStore } from '@/stores/chat-store'
import { replyTo } from '@/lib/chat-replies'

const suggestions = [
  'What has he built with AI?',
  "What's his backend stack?",
  'Is he available for work?',
]

export function PortfolioChat() {
  const open = useChatStore((state) => state.open)
  const input = useChatStore((state) => state.input)
  const typing = useChatStore((state) => state.typing)
  const messages = useChatStore((state) => state.messages)
  const toggle = useChatStore((state) => state.toggle)
  const setInput = useChatStore((state) => state.setInput)
  const push = useChatStore((state) => state.push)
  const setTyping = useChatStore((state) => state.setTyping)
  const logRef = useRef<HTMLDivElement>(null)
  const replyTimer = useRef(0)

  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, typing, open])

  useEffect(() => () => window.clearTimeout(replyTimer.current), [])

  function ask(text?: string) {
    const question = (text ?? input).trim()
    if (!question || typing) return
    setInput('')
    push({ id: nextMessageId(), from: 'me', text: question })
    setTyping(true)
    replyTimer.current = window.setTimeout(() => {
      push({ id: nextMessageId(), from: 'ai', text: replyTo(question) })
      setTyping(false)
    }, 750)
  }

  return (
    <div className="chat-dock">
      {open ? (
        <section className="chat-panel" aria-label="Ask my portfolio">
          <header className="chat-head">
            <div className="chat-mark">AI</div>
            <div>
              <strong>Ask my portfolio</strong>
              <span>demo assistant</span>
            </div>
            <button className="icon-btn" type="button" aria-label="Close chat" onClick={toggle}>✕</button>
          </header>
          <div ref={logRef} className="chat-log" data-lenis-prevent="">
            {messages.map((message) => (
              <div key={message.id} className={message.from === 'me' ? 'bubble me' : 'bubble ai'}>{message.text}</div>
            ))}
            {typing ? <div className="bubble ai"><span className="dots"><i /><i /><i /></span></div> : null}
          </div>
          <footer className="chat-foot">
            <div className="chat-suggestions">
              {suggestions.map((question) => (
                <button key={question} type="button" onClick={() => ask(question)}>{question}</button>
              ))}
            </div>
            <form className="chat-compose" onSubmit={(event) => { event.preventDefault(); ask() }}>
              <input value={input} placeholder="Ask about the work" onChange={(event) => setInput(event.target.value)} />
              <button className="chat-send" type="submit">Send</button>
            </form>
          </footer>
        </section>
      ) : null}
      <button className="chat-launch" type="button" onClick={toggle}>{open ? 'Close chat' : 'Ask my portfolio'}</button>
    </div>
  )
}
