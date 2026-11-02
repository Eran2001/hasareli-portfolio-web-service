export type LayerCard = {
  href: string
  index: string
  kicker: string
  title: string
  detail: string
  tone: 'plain' | 'accent'
}

export type StackLayer = {
  id: string
  index: string
  title: string
  aside: string
  body: string
  tools: string[]
  actionHref: string
  actionLabel: string
  tone: 'plain' | 'accent'
  flow?: string[]
}

export type BuildFact = { label: string; text: string }

export type FeaturedBuild = {
  id: string
  name: string
  tagline: string
  frameLabel: string
  badge: string
  facts: BuildFact[]
  ai: string
  tools: string[]
  metric: string
  metricNote: string
  mock: 'ledgerly'
}

export type CompactBuild = {
  id: string
  index: string
  name: string
  tagline: string
  frameLabel: string
  problem: string
  built: string
  role: string
  ai: string
  tools: string[]
  metric: string
  metricNote: string
  mock: 'documind' | 'shoppilot' | 'tripwise'
}

export type LabItem = {
  slug: string
  status: string
  tone: 'cyan' | 'green' | 'violet'
  title: string
  body: string
}

export type Principle = { index: string; title: string; body: string }
export type NowItem = { label: string; text: string }
export type Testimonial = { index: string; quote: string; name: string; role: string; tone: 'violet' | 'cyan' }

export type PortfolioContent = {
  name: string
  role: string
  summary: string
  building: string[]
  layerCards: LayerCard[]
  why: string
  stack: { label: string; title: string; body: string; hint: string; layers: StackLayer[] }
  builds: { label: string; title: string; body: string; featured: FeaturedBuild; cards: CompactBuild[] }
  lab: { label: string; title: string; body: string; items: LabItem[] }
  principles: { label: string; title: string; items: Principle[] }
  about: { label: string; title: string; paragraphs: string[]; location: string; hobbies: string[] }
  now: { label: string; title: string; updated: string; items: NowItem[] }
  testimonials: { label: string; title: string; body: string; items: Testimonial[] }
  contact: { label: string; titleLead: string; titleAccent: string; titleTail: string; body: string }
}
