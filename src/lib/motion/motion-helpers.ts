import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function isGradientText(element: Element) {
  if (element.classList.contains('gradient-text')) return true
  const style = getComputedStyle(element)
  return style.webkitBackgroundClip === 'text' || style.backgroundClip === 'text'
}

export function splitWords(element: HTMLElement) {
  const words: HTMLElement[] = []
  const seen = new Set<Element>()
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  while (walker.nextNode()) nodes.push(walker.currentNode as Text)

  nodes.forEach((node) => {
    if (!node.nodeValue?.trim()) return
    const parent = node.parentElement
    if (!parent) return
    if (parent !== element && isGradientText(parent)) {
      if (seen.has(parent)) return
      seen.add(parent)
      const wrap = document.createElement('span')
      wrap.className = 'hz-w'
      parent.parentNode?.insertBefore(wrap, parent)
      wrap.appendChild(parent)
      parent.style.display = 'inline-block'
      words.push(parent as HTMLElement)
      return
    }

    const fragment = document.createDocumentFragment()
    let first = true
    const previous = node.previousSibling
    const glue = previous instanceof HTMLElement && previous.classList.contains('hz-w') ? previous : null
    node.nodeValue.split(/(\s+)/).forEach((part) => {
      if (!part) return
      if (first && glue && !/^\s/.test(part)) {
        first = false
        const inner = document.createElement('span')
        inner.textContent = part
        glue.appendChild(inner)
        words.push(inner)
        return
      }
      first = false
      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part))
        return
      }
      const wrap = document.createElement('span')
      wrap.className = 'hz-w'
      const inner = document.createElement('span')
      inner.textContent = part
      wrap.appendChild(inner)
      fragment.appendChild(wrap)
      words.push(inner)
    })
    node.parentNode?.replaceChild(fragment, node)
  })

  return words
}

export function scramble(element: HTMLElement) {
  const finalText = element.textContent ?? ''
  const chars = '!<>-_\\/[]{}=+*^?#01'
  const state = { progress: 0 }
  gsap.to(state, {
    progress: 1,
    duration: 1.1,
    ease: 'power2.out',
    onUpdate: () => {
      const count = Math.floor(state.progress * finalText.length)
      let next = finalText.slice(0, count)
      for (let index = count; index < finalText.length; index += 1) {
        next += finalText[index] === ' ' ? ' ' : chars[(Math.random() * chars.length) | 0]
      }
      element.textContent = next
    },
    onComplete: () => { element.textContent = finalText },
  })
}

export function typeInto(element: Element, text: string, duration?: number) {
  const state = { count: 0 }
  return gsap.to(state, {
    count: text.length,
    duration: duration || text.length * 0.035,
    ease: 'none',
    onUpdate: () => { element.textContent = text.slice(0, Math.round(state.count)) },
  })
}

export function onEnter(element: Element, run: () => void, start = 'top 85%') {
  ScrollTrigger.create({ trigger: element, start, once: true, onEnter: run })
}
