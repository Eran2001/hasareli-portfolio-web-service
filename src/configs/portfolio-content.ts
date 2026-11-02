import type { PortfolioContent } from '@/types/portfolio'

export const portfolioContent: PortfolioContent = {
  name: 'M E Hasareli',
  role: 'AI Full Stack Developer',
  summary: 'I build web apps with AI built in, from the backend and AI layer to the interface users see.',
  building: ['Ledgerly v2', 'an AI support agent', 'Tiny RAG', 'a voice-to-SQL tool'],
  layerCards: [
    { href: '#layer-interface', index: '01 — interface', kicker: 'The UI users see', title: 'The UI users see', detail: 'React, TypeScript, Next.js', tone: 'plain' },
    { href: '#layer-logic', index: '02 — backend', kicker: 'APIs & data', title: 'APIs & data', detail: 'Go, Python, PostgreSQL', tone: 'plain' },
    { href: '#layer-intelligence', index: '03 — ai layer', kicker: 'Models in the loop', title: 'Models in the loop', detail: 'LLMs, RAG, agents', tone: 'accent' },
  ],
  why: 'Most teams can build an app. Fewer can make it think. I build both, as one product.',
  stack: {
    label: '03 — how a request travels',
    title: 'One request, five layers.',
    body: 'A click becomes an API call. The API asks the AI layer to think, data grounds the answer, and the whole thing ships. This is my stack at every hop.',
    hint: 'scroll to follow the request ↓',
    layers: [
      { id: 'layer-interface', index: '01', title: 'Interface', aside: 'where the request starts', body: 'Fast, accessible interfaces people actually enjoy using, built from typed, reusable components.', tools: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'TanStack'], actionHref: '#build-1', actionLabel: 'Ledgerly dashboard', tone: 'plain' },
      { id: 'layer-logic', index: '02', title: 'Logic', aside: 'where it gets routed', body: 'APIs and services that validate, route and respond: predictable, fast and easy to extend.', tools: ['Go · Gin', 'Go · Chi', 'Python · Flask', 'Python · Django', 'PHP'], actionHref: '#build-4', actionLabel: 'Tripwise API', tone: 'plain' },
      { id: 'layer-intelligence', index: '03', title: 'Intelligence', aside: 'python ai layer', body: 'LLMs, retrieval and agents wired into the product, so it can read, reason and act on real data.', tools: ['Python AI layer', 'LLM integrations', 'RAG', 'AI agents'], actionHref: '#build-1', actionLabel: "Ledgerly's invoice copilot", tone: 'accent', flow: ['query', 'retrieve', 'reason', 'respond'] },
      { id: 'layer-data', index: '04', title: 'Data', aside: 'where answers get grounded', body: 'Well-modelled storage and caching, so every answer is accurate and every page is quick.', tools: ['PostgreSQL', 'MySQL', 'Redis'], actionHref: '#build-2', actionLabel: 'DocuMind search index', tone: 'plain' },
      { id: 'layer-ship', index: '05', title: 'Ship', aside: 'where it goes live', body: 'Versioned, deployed and in front of users, including custom WordPress and CMS builds.', tools: ['Git', 'Deployment', 'WordPress · custom', 'WordPress · CMS'], actionHref: '#build-3', actionLabel: 'ShopPilot plugin', tone: 'plain' },
    ],
  },
  builds: {
    label: '04 — case studies, not thumbnails',
    title: 'Featured builds',
    body: 'Four products, each travelling the full stack, and each with an AI piece doing real work.',
    featured: {
      id: 'build-1', name: 'Ledgerly', tagline: 'AI invoice copilot for small agencies', frameLabel: 'product screenshot — Ledgerly dashboard', badge: 'featured · 01',
      facts: [
        { label: 'the problem', text: 'Small agencies were losing hours every month chasing unpaid invoices and matching payments by hand.' },
        { label: 'what i built', text: 'The full product: a Next.js dashboard, a Go (Gin) API, PostgreSQL, and a Python AI service.' },
        { label: 'my role', text: 'Lead developer, from data model to deploy.' },
      ],
      ai: 'Reads incoming invoices and emails, extracts line items, matches them to bank payments, and drafts polite follow-ups for anything overdue.',
      tools: ['Next.js', 'TypeScript', 'Go · Gin', 'PostgreSQL', 'Python', 'LLM', 'RAG'],
      metric: '−70%', metricNote: 'time spent reconciling payments during the pilot', mock: 'ledgerly',
    },
    cards: [
      { id: 'build-2', index: '02', name: 'DocuMind', tagline: 'Knowledge-base search for support teams', frameLabel: 'screenshot — DocuMind search', problem: 'answers were buried across 2,000+ PDFs and wiki pages.', built: 'Django backend, React search UI and an ingestion pipeline.', role: 'full stack + AI.', ai: 'RAG over company docs. Every answer cites the exact paragraph it came from.', tools: ['React', 'Django', 'PostgreSQL', 'RAG'], metric: '8m → 40s', metricNote: 'average time to answer', mock: 'documind' },
      { id: 'build-3', index: '03', name: 'ShopPilot', tagline: 'AI product copy for a WordPress store', frameLabel: 'screenshot — ShopPilot in WP admin', problem: '3,000 products with thin, duplicate descriptions were hurting search rankings.', built: 'a custom WordPress plugin with a PHP backend and a Python generation service.', role: 'solo developer.', ai: 'Writes on-brand descriptions from product specs, and editors approve them in one click.', tools: ['WordPress', 'PHP', 'MySQL', 'Python', 'LLM'], metric: '+38%', metricNote: 'organic traffic in 3 months', mock: 'shoppilot' },
      { id: 'build-4', index: '04', name: 'Tripwise', tagline: 'Agentic group-trip planner', frameLabel: 'screenshot — Tripwise itinerary', problem: 'planning a group trip meant a dozen tabs and a messy chat thread.', built: 'a Next.js app on a Go (Chi) API with Redis caching.', role: 'full stack.', ai: 'An agent that searches, compares and assembles itineraries, then re-plans when something changes.', tools: ['Next.js', 'Go · Chi', 'Redis', 'AI agents'], metric: '1,200', metricNote: 'trips planned in beta', mock: 'tripwise' },
    ],
  },
  lab: {
    label: '05 — the lab',
    title: "Things I'm experimenting with.",
    body: "Half-baked on purpose. Some of these will grow up. Most won't, and that's fine.",
    items: [
      { slug: 'lab/prompt-diff', status: 'prototype', tone: 'cyan', title: 'Prompt Diff', body: 'See how a one-word prompt change shifts model output, side by side.' },
      { slug: 'lab/tiny-rag', status: 'shipped', tone: 'green', title: 'Tiny RAG', body: 'Retrieval-augmented generation in about 200 lines, no frameworks. Built to teach.' },
      { slug: 'lab/voice-to-sql', status: 'in progress', tone: 'violet', title: 'Voice to SQL', body: 'Ask your database a question out loud, get a table back.' },
      { slug: 'lab/commit-haiku', status: 'shipped', tone: 'green', title: 'Commit Haiku', body: 'Turns your git diff into a commit message in 5-7-5. Useless. Beloved.' },
      { slug: 'lab/agent-sandbox', status: 'in progress', tone: 'violet', title: 'Agent Sandbox', body: 'Small agents cooperating (and arguing) over toy tasks, so I can watch how they fail.' },
      { slug: 'lab/form-autopilot', status: 'prototype', tone: 'cyan', title: 'Form Autopilot', body: 'Paste a CV, watch a 40-field job application fill itself in.' },
    ],
  },
  principles: {
    label: '06 — principles',
    title: 'How I build',
    items: [
      { index: '01', title: 'AI should feel invisible, not gimmicky.', body: "If users notice the model instead of the result, I've designed it wrong." },
      { index: '02', title: 'Ship small, ship often.', body: 'Real feedback beats perfect plans. Small releases keep everyone honest.' },
      { index: '03', title: 'Clean code is a feature.', body: 'The next developer, often future me, should be able to move fast too.' },
      { index: '04', title: 'Own the whole request.', body: "From click to database and back, I'd rather understand every hop." },
    ],
  },
  about: {
    label: '07 — behind the code',
    title: "Hi, I'm Hasareli.",
    paragraphs: [
      "I got hooked on building the first time a page I'd written actually loaded in a browser. Many side projects later, I started wiring language models into those apps, and I haven't looked back since.",
      'These days I work across the whole stack, but my favourite part is making software feel a little smarter without making it feel complicated. I like small teams, clear problems and shipping things people use.',
    ],
    location: 'Horana, Sri Lanka',
    hobbies: ['Film photography', 'Long walks & podcasts', 'Tea, never coffee'],
  },
  now: {
    label: '08 — now',
    title: "What I'm up to",
    updated: 'last updated: September 2026',
    items: [
      { label: 'building', text: 'Ledgerly v2: multi-currency support and a smarter follow-up agent.' },
      { label: 'learning', text: 'Evaluating LLM output properly, with evals instead of vibes.' },
      { label: 'reading', text: 'Designing Data-Intensive Applications, slowly and with notes.' },
    ],
  },
  testimonials: {
    label: '09 — testimonials',
    title: 'Kind words.',
    body: "Short notes from people I've built with. These three are stand-ins until the real ones land.",
    items: [
      { index: '01', quote: 'Hasareli took a messy brief and shipped something people actually use. The AI stayed quiet, which is exactly what we wanted.', name: 'Client name', role: 'Product lead', tone: 'violet' },
      { index: '02', quote: 'Clear updates, clean code, and a backend I could still read six months later. That is rarer than it should be.', name: 'Client name', role: 'Engineering partner', tone: 'cyan' },
      { index: '03', quote: 'From the first prototype to the live site, nothing got lost between the interface and the API.', name: 'Client name', role: 'Founder', tone: 'violet' },
    ],
  },
  contact: {
    label: "10 — let's build",
    titleLead: 'Got an idea that needs a ',
    titleAccent: 'brain',
    titleTail: "? Let's build it.",
    body: "Open to freelance projects and full-time roles. Tell me what you're building, and I'll tell you how I'd approach it.",
  },
}
