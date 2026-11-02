import { useEffect, useState } from 'react'

import { prefersReducedMotion } from '@/lib/utilities'

export function BuildingTyper({ words }: { words: string[] }) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (words.length === 0) return
    if (prefersReducedMotion()) {
      setText(words[0] ?? '')
      return
    }

    let wordIndex = 0
    let charIndex = 0
    let deleting = false
    const timer = window.setInterval(() => {
      const word = words[wordIndex] ?? ''
      if (!deleting) {
        charIndex += 1
        setText(word.slice(0, charIndex))
        if (charIndex >= word.length) deleting = true
        return
      }
      charIndex -= 1
      setText(word.slice(0, Math.max(0, charIndex)))
      if (charIndex <= 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
      }
    }, 55)

    return () => window.clearInterval(timer)
  }, [words])

  return <span>{text}</span>
}
