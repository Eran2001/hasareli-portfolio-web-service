import type { PortfolioContent } from '@/types/portfolio'

import { StackLayerCard } from './stack-layer'

export function StackSection({ stack }: { stack: PortfolioContent['stack'] }) {
  const [lead, rest] = stack.title.split(', ')

  return (
    <section id="stack" className="section" data-screen-label="03 Stack Journey">
      <div className="glow stack-glow" />
      <div className="wrap stack-layout">
        <div className="stack-intro">
          <div className="label">{stack.label}</div>
          <h2>{lead},<br />{rest}</h2>
          <p className="lede">{stack.body}</p>
          <div className="stack-hint">{stack.hint}</div>
        </div>
        <div className="stack-list">
          <div className="stack-track"><div className="stack-fill" /></div>
          {stack.layers.map((layer) => <StackLayerCard key={layer.id} layer={layer} />)}
        </div>
      </div>
    </section>
  )
}
