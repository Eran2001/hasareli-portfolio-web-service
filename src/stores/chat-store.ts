import { create } from 'zustand'

export type ChatMessage = { id: string; from: 'ai' | 'me'; text: string }

type ChatState = {
  open: boolean
  input: string
  typing: boolean
  messages: ChatMessage[]
  toggle: () => void
  setInput: (value: string) => void
  push: (message: ChatMessage) => void
  setTyping: (value: boolean) => void
}

let nextId = 1

export const useChatStore = create<ChatState>((set) => ({
  open: false,
  input: '',
  typing: false,
  messages: [{ id: 'hello', from: 'ai', text: "Hi! Ask me anything about Hasareli's work." }],
  toggle: () => set((state) => ({ open: !state.open })),
  setInput: (input) => set({ input }),
  push: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (typing) => set({ typing }),
}))

export function nextMessageId() {
  nextId += 1
  return `m-${nextId}`
}
