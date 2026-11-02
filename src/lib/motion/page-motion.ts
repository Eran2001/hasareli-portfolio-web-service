import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { prefersFinePointer, prefersReducedMotion } from '@/lib/utilities'

import { mountMockups } from './mockups'
import { onEnter, scramble, splitWords } from './motion-helpers'
import { buildOrb } from './orb'

export function startPageMotion() {
  gsap.registerPlugin(ScrollTrigger)
  const reduce = prefersReducedMotion()
  const fine = prefersFinePointer()
  const disposers: Array<() => void> = []

  const context = gsap.context(() => {
    document.documentElement.classList.add('hz-on')
    const lenis = setupScroll(reduce, disposers)
    if (reduce) return

    const hero = document.getElementById('top')
    const heroMain = hero?.querySelector<HTMLElement>('.hero-main')
    const heroContent = hero?.querySelector<HTMLElement>('[data-hero-content]')
    if (hero && heroContent) disposers.push(buildOrb(hero, heroContent))
    if (hero && heroMain) playHeroIntro(hero, heroMain)

    document.querySelectorAll<HTMLElement>('.label').forEach((label) => {
      const text = label.textContent?.trim() ?? ''
      if (!/^\d{2} — /.test(text)) return
      label.textContent = ''
      onEnter(label, () => { label.textContent = text; scramble(label) }, 'top 92%')
    })

    document.querySelectorAll<HTMLElement>('section h2').forEach((heading) => {
      const words = splitWords(heading)
      gsap.from(words, { yPercent: 115, duration: 1.15, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: heading, start: 'top 86%' } })
    })

    const why = document.querySelector<HTMLElement>('section[data-screen-label="02 Why I Exist"] p')
    if (why) {
      const words = splitWords(why)
      gsap.set(words, { opacity: 0.12 })
      gsap.to(words, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: why, start: 'top 78%', end: 'bottom 45%', scrub: 1 } })
    }

    revealBlocks()
    mountMockups()
    countMetrics()
    revealCards()
    if (fine) tiltCards()
    startMarquee(lenis, disposers)
    revealPhoto()
    revealContact()
    if (fine) magneticAndCursor(disposers)
    parallaxGlows()

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 800)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    disposers.push(() => { window.clearTimeout(refreshTimer); window.removeEventListener('load', onLoad) })
  })

  return () => {
    disposers.forEach((dispose) => dispose())
    context.revert()
    document.documentElement.classList.remove('hz-on')
    gsap.ticker.lagSmoothing(500)
  }
}

function setupScroll(reduce: boolean, disposers: Array<() => void>) {
  let lenis: Lenis | null = null
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    disposers.push(() => { gsap.ticker.remove(raf); lenis?.destroy() })
  }

  let lastY = 0
  const onScroll = () => {
    const y = lenis ? lenis.animatedScroll : window.scrollY
    const header = document.querySelector('.site-header')
    if (header) {
      header.classList.toggle('is-solid', y >= 8)
      if (y < 8) header.classList.remove('is-hidden')
      else if (y > lastY + 6) header.classList.add('is-hidden')
      else if (y < lastY - 6) header.classList.remove('is-hidden')
    }
    lastY = y
    const progress = document.querySelector<HTMLElement>('.progress')
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
    measureStack()
  }

  const unsubscribe = lenis?.on('scroll', onScroll)
  if (!lenis) {
    window.addEventListener('scroll', onScroll, { passive: true })
    disposers.push(() => window.removeEventListener('scroll', onScroll))
  } else if (unsubscribe) disposers.push(unsubscribe)
  window.addEventListener('resize', onScroll)
  disposers.push(() => window.removeEventListener('resize', onScroll))
  onScroll()

  const hash = window.location.hash
  if (hash.length > 1) {
    const target = document.querySelector(hash)
    if (target) {
      const jump = () => {
        if (lenis) lenis.scrollTo(target, { offset: -72, immediate: true })
        else target.scrollIntoView()
      }
      requestAnimationFrame(jump)
    }
  }

  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]')
    if (!anchor) return
    const hash = anchor.getAttribute('href') ?? ''
    if (hash.length < 2) return
    const target = document.querySelector(hash)
    if (!target) return
    event.preventDefault()
    if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.6 })
    else target.scrollIntoView()
  }
  document.addEventListener('click', onClick)
  disposers.push(() => document.removeEventListener('click', onClick))
  return lenis
}

function measureStack() {
  const track = document.querySelector<HTMLElement>('.stack-track')
  const fill = track?.querySelector<HTMLElement>('.stack-fill')
  if (!track || !fill) return
  const line = window.innerHeight * 0.55
  const rect = track.getBoundingClientRect()
  const progress = Math.max(0, Math.min(1, (line - rect.top) / Math.max(rect.height, 1)))
  fill.style.height = `${progress * 100}%`
  const nodes = track.parentElement?.querySelectorAll<HTMLElement>('[data-node]') ?? []
  let active = -1
  nodes.forEach((node, index) => {
    if (node.getBoundingClientRect().top + 20 < line) active = index
  })
  nodes.forEach((node, index) => node.classList.toggle('is-on', index <= active))
}

function playHeroIntro(hero: HTMLElement, heroMain: HTMLElement) {
  const heading = heroMain.querySelector('h1')
  if (!heading) return
  const letters: HTMLElement[] = []
  const full = heading.textContent ?? ''
  heading.textContent = ''
  full.split('').forEach((character) => {
    const wrap = document.createElement('span')
    wrap.className = 'hz-w'
    const inner = document.createElement('span')
    inner.textContent = character === ' ' ? '\u00a0' : character
    wrap.appendChild(inner)
    heading.appendChild(wrap)
    letters.push(inner)
  })

  const intro = gsap.timeline({ delay: 0.15 })
  intro.from('.pills > *', { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, 0.2)
    .from(letters, { yPercent: 115, rotate: 8, stagger: 0.035, duration: 1.2, ease: 'expo.out' }, 0.3)
    .from(['.hero-role', '.hero-summary'], { y: 24, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out' }, 0.8)
    .from('.hero-actions > *', { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.6)' }, 1)
    .from('.hero-social', { opacity: 0, duration: 0.8 }, 1.2)
    .from('.layer-grid > *', { y: 60, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out' }, 1.1)

  gsap.to(heroMain, { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
  gsap.to('.hero-a', { y: 220, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
  gsap.to('.hero-b', { y: -160, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
}

function revealBlocks() {
  const groupReveal = (elements: HTMLElement[], options: gsap.TweenVars) => {
    if (!elements.length) return
    gsap.from(elements, { y: 70, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: elements[0].parentElement, start: 'top 85%' }, ...options })
  }

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
    if (element.id.startsWith('layer-')) {
      const copy = element.children[1]
      if (copy) gsap.from(copy, { x: 60, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: element, start: 'top 82%' } })
      return
    }
    if (element.querySelector('#build-2')) {
      groupReveal(Array.from(element.children) as HTMLElement[], { y: 110, rotate: 2 })
      return
    }
    if (element.closest('section[data-screen-label="06 Principles"]')) {
      groupReveal(Array.from(element.children) as HTMLElement[], { x: -50, y: 0 })
      return
    }
    if (element.closest('section[data-screen-label="08 Now"]')) {
      gsap.from(element, { y: 80, opacity: 0, scale: 0.97, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: element, start: 'top 85%' } })
      const rows = element.children[1]?.children
      if (rows) gsap.from(rows, { x: 40, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 75%' } })
      return
    }
    if (element.id === 'build-1') {
      gsap.from(element, { y: 120, opacity: 0, scale: 0.96, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: element, start: 'top 88%' } })
      return
    }
    if (element.closest('#about')) return
    gsap.from(element, { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: element, start: 'top 86%' } })
  })
}

function countMetrics() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((metric) => {
    const text = metric.textContent?.trim() ?? ''
    if (!/^[−+]?[\d,]+%?$/.test(text)) return
    const value = Number.parseFloat(text.replace(/[^\d.]/g, ''))
    const prefix = /^[−+]/.test(text) ? text[0] : ''
    const suffix = text.endsWith('%') ? '%' : ''
    const comma = text.includes(',')
    const state = { value: 0 }
    metric.textContent = `${prefix}0${suffix}`
    onEnter(metric, () => {
      gsap.to(state, {
        value,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          const next = Math.round(state.value)
          metric.textContent = prefix + (comma ? next.toLocaleString('en-US') : next) + suffix
        },
      })
    }, 'top 96%')
  })
}

function revealCards() {
  const labCards = document.querySelectorAll<HTMLElement>('#lab .lab-card')
  if (labCards.length) {
    gsap.from(labCards, { y: 90, opacity: 0, rotate: (index) => (index % 2 ? 3 : -3), duration: 1.2, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: labCards[0], start: 'top 88%' } })
  }
  const quotes = document.querySelectorAll<HTMLElement>('#testimonials [data-tilt]')
  if (quotes.length) {
    gsap.from(quotes, { y: 90, opacity: 0, rotate: (index) => (index % 2 ? 3 : -3), duration: 1.2, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: quotes[0], start: 'top 88%' } })
  }
}

function tiltCards() {
  const cards = [
    ...document.querySelectorAll<HTMLElement>('#lab .lab-card'),
    ...document.querySelectorAll<HTMLElement>('#testimonials [data-tilt]'),
    ...document.querySelectorAll<HTMLElement>('#build-2, #build-3, #build-4'),
  ]
  cards.forEach((card) => {
    card.style.transition = 'box-shadow .3s, border-color .3s'
    const spot = document.createElement('span')
    spot.className = 'hz-spot'
    card.appendChild(spot)
    const onMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      card.style.setProperty('--mx', `${x * 100}%`)
      card.style.setProperty('--my', `${y * 100}%`)
      gsap.to(card, { rotateY: (x - 0.5) * 8, rotateX: (0.5 - y) * 8, transformPerspective: 900, duration: 0.5, ease: 'power2.out' })
    }
    const onEnterCard = () => { spot.style.opacity = '1' }
    const onLeave = () => {
      spot.style.opacity = '0'
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1,0.5)' })
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseenter', onEnterCard)
    card.addEventListener('mouseleave', onLeave)
  })
}

function startMarquee(lenis: Lenis | null, disposers: Array<() => void>) {
  const lab = document.getElementById('lab')
  if (!lab) return
  const marquee = document.createElement('div')
  marquee.className = 'hz-marquee'
  const items = ['AI agents', 'Next.js', 'Go', 'Python', 'RAG', 'PostgreSQL', 'LLMs', 'WordPress', 'Redis', 'TypeScript']
  const row = `<div class="hz-mq-row">${[0, 1, 2].map(() => items.map((item, index) => `<span class="${index % 2 ? 'o' : ''}">${item}</span><em>✦</em>`).join('')).join('')}</div>`
  marquee.innerHTML = row
  lab.appendChild(marquee)
  const track = marquee.firstElementChild
  if (!(track instanceof HTMLElement)) return
  let offset = 0
  let velocity = 0
  const unsubscribe = lenis?.on('scroll', (instance) => { velocity = instance.velocity || 0 })
  const tick = () => {
    offset -= 0.6 + Math.abs(velocity) * 0.5
    const width = track.scrollWidth / 3
    if (-offset > width) offset += width
    track.style.transform = `translate3d(${offset}px,0,0) skewX(${gsap.utils.clamp(-10, 10, -velocity * 0.35)}deg)`
    velocity *= 0.9
  }
  gsap.ticker.add(tick)
  disposers.push(() => {
    gsap.ticker.remove(tick)
    unsubscribe?.()
    marquee.remove()
  })

  const trackLine = document.querySelector('.stack-track')
  if (!trackLine) return
  const fill = trackLine.firstElementChild
  const packet = document.createElement('div')
  packet.className = 'hz-packet'
  packet.innerHTML = '<i></i><b>request</b>'
  trackLine.appendChild(packet)
  let lastHeight = -1
  const follow = () => {
    const height = fill instanceof HTMLElement ? fill.offsetHeight : 0
    if (height === lastHeight) return
    lastHeight = height
    packet.style.transform = `translate(-50%,${height}px)`
    packet.style.opacity = height > 2 && height < trackLine.clientHeight - 2 ? '1' : '0'
  }
  gsap.ticker.add(follow)
  disposers.push(() => { gsap.ticker.remove(follow); packet.remove() })
}

function revealPhoto() {
  const frame = document.querySelector<HTMLElement>('#about [data-photo]')
  const photo = frame?.querySelector<HTMLElement>('.hz-photo')
  const image = photo?.querySelector('img')
  const scan = photo?.querySelector('.hz-scan')
  if (!frame || !photo || !image || !scan) return
  gsap.set(photo, { clipPath: 'inset(100% 0% 0% 0%)' })
  const timeline = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 80%' } })
  timeline.to(photo, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' })
    .fromTo(scan, { top: '100%', opacity: 1 }, { top: '-10%', duration: 1.5, ease: 'expo.inOut' }, 0)
    .to(scan, { opacity: 0, duration: 0.3 })
    .from(image, { scale: 1.3, duration: 2, ease: 'expo.out' }, 0)
  gsap.fromTo(image, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } })
  const badge = frame.nextElementSibling
  if (badge) gsap.from(badge, { x: 40, opacity: 0, duration: 1, delay: 1.1, ease: 'back.out(1.7)', scrollTrigger: { trigger: frame, start: 'top 80%' } })
  const copy = frame.parentElement?.nextElementSibling
  if (copy) gsap.from(copy.children, { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: copy, start: 'top 80%' } })
}

function revealContact() {
  const rows = document.querySelectorAll('.contact-links a')
  if (rows.length) gsap.from(rows, { x: -40, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: rows[0], start: 'top 90%' } })
  const form = document.querySelector('#contact form, #contact .form-ok')
  if (form) gsap.from(form, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: form, start: 'top 88%' } })
}

function magneticAndCursor(disposers: Array<() => void>) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((button) => {
    const onMove = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      gsap.to(button, { x: (event.clientX - rect.left - rect.width / 2) * 0.3, y: (event.clientY - rect.top - rect.height / 2) * 0.4, duration: 0.4, ease: 'power3.out' })
    }
    const onLeave = () => gsap.to(button, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' })
    button.addEventListener('mousemove', onMove)
    button.addEventListener('mouseleave', onLeave)
  })

  const glow = document.createElement('div')
  glow.id = 'hz-cursor'
  document.body.appendChild(glow)
  const moveX = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3' })
  const moveY = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3' })
  const onPointer = (event: PointerEvent) => { moveX(event.clientX); moveY(event.clientY) }
  window.addEventListener('pointermove', onPointer)
  disposers.push(() => { window.removeEventListener('pointermove', onPointer); glow.remove() })
}

function parallaxGlows() {
  document.querySelectorAll<HTMLElement>('section > .glow').forEach((blob, index) => {
    if (blob.closest('#top')) return
    gsap.to(blob, { y: index % 2 ? -120 : 120, ease: 'none', scrollTrigger: { trigger: blob.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
  })
}
