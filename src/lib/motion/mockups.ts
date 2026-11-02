import gsap from 'gsap'

import { onEnter, typeInto } from './motion-helpers'

function mount(host: Element | null, html: string) {
  if (!host || !(host instanceof HTMLElement)) return null
  host.style.overflow = 'hidden'
  const mock = document.createElement('div')
  mock.className = 'hz-mock'
  mock.innerHTML = html
  host.appendChild(mock)
  const badge = host.querySelector(':scope > span')
  if (badge instanceof HTMLElement) badge.style.zIndex = '3'
  return mock
}

function mockLedgerly(host: Element | null) {
  const heights = [38, 52, 44, 63, 58, 72, 66, 81, 74, 88, 79, 94]
  const bars = heights.map((height) => `<i style="height:${height}%"></i>`).join('')
  const mock = mount(host, `<div class="lg"><div class="lg-top"><span></span><span></span><span></span><em>ledgerly.app / dashboard</em></div><div class="lg-body"><aside><b class="on"></b><b></b><b></b><b></b><b></b></aside><main><div class="lg-kpis"><div><small>Outstanding</small><strong data-n="48240" data-p="$">$0</strong><u>+12%</u></div><div><small>Overdue</small><strong data-n="7">0</strong><u class="bad">3 new</u></div><div><small>Auto-matched</small><strong data-n="132">0</strong><u>this week</u></div></div><div class="lg-chart"><small>Payments matched · 12 weeks</small><div class="lg-bars">${bars}</div><svg viewBox="0 0 300 80" preserveAspectRatio="none"><path d="M0,62 C30,55 45,58 70,46 S120,40 150,34 S210,22 240,18 S285,8 300,6" /></svg></div><div class="lg-rows"><div><span>Northwind Studio</span><span>$4,800</span><em class="ok">Matched</em></div><div><span>Blue Fern Agency</span><span>$2,150</span><em class="bad">Overdue 14d</em></div><div><span>Kite &amp; Co.</span><span>$6,920</span><em class="ok">Paid</em></div><div><span>Atlas Creative</span><span>$1,375</span><em class="bad">Overdue 9d</em></div></div></main></div><div class="lg-ai"><div class="lg-ai-h"><i>✦</i> Copilot</div><p></p><div class="lg-ai-b"><span>Send all</span><span>Review</span></div></div></div>`)
  if (!mock || !host) return
  const timeline = gsap.timeline({ paused: true })
  const copilot = mock.querySelector('.lg-ai p')
  timeline.from(mock.querySelector('.lg'), { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
    .from(mock.querySelectorAll('.lg-kpis > div'), { y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }, 0.3)
    .add(() => {
      mock.querySelectorAll<HTMLElement>('[data-n]').forEach((element) => {
        const target = Number(element.dataset.n)
        const prefix = element.dataset.p || ''
        const state = { value: 0 }
        gsap.to(state, { value: target, duration: 1.6, ease: 'power3.out', onUpdate: () => { element.textContent = prefix + Math.round(state.value).toLocaleString('en-US') } })
      })
    }, 0.4)
    .from(mock.querySelectorAll('.lg-bars i'), { scaleY: 0, transformOrigin: 'bottom', stagger: 0.05, duration: 0.8, ease: 'expo.out' }, 0.5)
    .fromTo(mock.querySelector('.lg-chart path'), { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.7)
    .from(mock.querySelectorAll('.lg-rows > div'), { x: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, 1)
    .from(mock.querySelector('.lg-ai'), { y: 40, opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.7)' }, 1.8)
  if (copilot) timeline.add(typeInto(copilot, '2 invoices are overdue. I drafted friendly reminders and matched 3 new payments. Send them?', 2.6), 2.3)
  timeline.from(mock.querySelectorAll('.lg-ai-b span'), { y: 10, opacity: 0, stagger: 0.1, duration: 0.4 }, '>-0.1')
  onEnter(host, () => timeline.play(), 'top 75%')
  gsap.to(mock.querySelectorAll('.lg-rows em.bad'), { opacity: 0.45, repeat: -1, yoyo: true, duration: 0.9, ease: 'sine.inOut' })
}

function mockDocuMind(host: Element | null) {
  const mock = mount(host, '<div class="dm"><div class="dm-search"><i>⌕</i><span class="q"></span><b class="caret"></b></div><div class="dm-ans"><small>✦ Answer</small><p><span class="l"></span><span class="l w2"></span><span class="l w3"></span></p><div class="dm-cite"><em>[1] Admin guide p.14</em><em>[2] wiki/auth-reset</em></div></div></div>')
  if (!mock || !host) return
  const query = mock.querySelector('.q')
  if (!query) return
  const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true })
  loop.set(mock.querySelectorAll('.l, .dm-cite em'), { scaleX: 0, opacity: 0 })
    .set(query, { textContent: '' })
    .add(typeInto(query, 'How do I reset 2FA for a customer?', 1.4))
    .to(mock.querySelectorAll('.l'), { scaleX: 1, opacity: 1, transformOrigin: 'left', stagger: 0.18, duration: 0.5, ease: 'power3.out' }, '+=0.3')
    .to(mock.querySelectorAll('.dm-cite em'), { scaleX: 1, opacity: 1, stagger: 0.15, duration: 0.4, ease: 'back.out(2)' }, '-=0.1')
    .to(mock.querySelectorAll('.dm-cite em'), { boxShadow: '0 0 18px rgba(143,227,255,.6)', yoyo: true, repeat: 1, duration: 0.4 }, '+=0.3')
    .to({}, { duration: 1.4 })
  onEnter(host, () => loop.play())
}

function mockShopPilot(host: Element | null) {
  const mock = mount(host, '<div class="sp"><div class="sp-thumb"><i></i></div><div class="sp-txt"><small>Product · Ceramic pour-over set</small><div class="sp-old"><span></span><span></span></div><p class="sp-new"></p><div class="sp-act"><span class="gen">✦ Generated</span><span class="ok">Approve ✓</span></div></div></div>')
  if (!mock || !host) return
  const copy = mock.querySelector('.sp-new')
  const approve = mock.querySelector('.ok')
  if (!copy || !approve) return
  const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.4, paused: true })
  loop.set(copy, { textContent: '' })
    .set(mock.querySelector('.sp-old'), { opacity: 1, height: 'auto' })
    .set(approve, { background: 'rgba(255,255,255,.06)', color: '#c9c6e0' })
    .set(mock.querySelector('.gen'), { opacity: 0 })
    .to(mock.querySelector('.sp-old'), { opacity: 0.25, duration: 0.4 }, 0.6)
    .to(mock.querySelector('.gen'), { opacity: 1, duration: 0.3 })
    .add(typeInto(copy, 'Hand-thrown stoneware that brews a slow, even cup. Matte glaze, fits any mug.', 2.2))
    .to(approve, { background: '#7ee0a4', color: '#07160d', duration: 0.3 }, '+=0.3')
    .fromTo(approve, { scale: 1 }, { scale: 1.12, yoyo: true, repeat: 1, duration: 0.15 })
    .to({}, { duration: 1.2 })
  onEnter(host, () => loop.play())
}

function mockTripwise(host: Element | null) {
  const mock = mount(host, '<div class="tw"><svg viewBox="0 0 200 150"><g class="grid"></g><path class="rt" d="M30,115 C60,60 90,120 115,70 S170,40 175,30"/><circle cx="30" cy="115" r="5"/><circle cx="115" cy="70" r="5"/><circle cx="175" cy="30" r="5"/></svg><div class="tw-log"><p>› searching 38 flights…</p><p>› comparing 14 hotels…</p><p>› rain on day 2, re-planning…</p><p class="ok">✓ itinerary ready · 3 days</p></div></div>')
  if (!mock || !host) return
  const grid = mock.querySelector('.grid')
  if (!grid) return
  let lines = ''
  for (let index = 0; index < 10; index += 1) {
    lines += `<line x1="${index * 22}" y1="0" x2="${index * 22}" y2="150"/><line x1="0" y1="${index * 17}" x2="200" y2="${index * 17}"/>`
  }
  grid.innerHTML = lines
  const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true })
  loop.set(mock.querySelectorAll('.tw-log p'), { opacity: 0, x: -10 })
    .set(mock.querySelectorAll('.tw circle'), { scale: 0, transformOrigin: 'center' })
    .fromTo(mock.querySelector('.rt'), { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 0)
    .to(mock.querySelectorAll('.tw circle'), { scale: 1, stagger: 0.7, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 0)
    .to(mock.querySelectorAll('.tw-log p'), { opacity: 1, x: 0, stagger: 0.55, duration: 0.35 }, 0.1)
    .to({}, { duration: 1.6 })
  onEnter(host, () => loop.play())
}

export function mountMockups() {
  mockLedgerly(document.querySelector('[data-mock="ledgerly"]'))
  mockDocuMind(document.querySelector('[data-mock="documind"]'))
  mockShopPilot(document.querySelector('[data-mock="shoppilot"]'))
  mockTripwise(document.querySelector('[data-mock="tripwise"]'))
}
