import { Chip } from '@/components/ui/chip'

import type { StackLayer } from '@/types/portfolio'

export function StackLayerCard({ layer }: { layer: StackLayer }) {
  const special = layer.tone === 'accent'

  return (
    <article id={layer.id} className="stack-row" data-reveal="">
      <div className={special ? 'stack-node is-special' : 'stack-node'} data-node="">{layer.index}</div>
      {special ? <IntelligenceCopy layer={layer} /> : <PlainCopy layer={layer} />}
    </article>
  )
}

function PlainCopy({ layer }: { layer: StackLayer }) {
  return (
    <div className="stack-copy">
      <div className="stack-title">
        <h3>{layer.title}</h3>
        <span>{layer.aside}</span>
      </div>
      <p>{layer.body}</p>
      <div className="chips">{layer.tools.map((tool) => <Chip key={tool} label={tool} />)}</div>
      <a className="action" href={layer.actionHref}>See it in action → <span>{layer.actionLabel}</span></a>
    </div>
  )
}

function IntelligenceCopy({ layer }: { layer: StackLayer }) {
  return (
    <div className="intel">
      <div className="stack-title">
        <span className="ai-kicker">✦ the layer that thinks</span>
        <span className="mono-muted">{layer.aside}</span>
      </div>
      <h3>{layer.title}</h3>
      <p>{layer.body}</p>
      <div className="flow">
        <b>query</b><span>→</span>
        <b className="on">retrieve</b><span>→</span>
        <b className="alt">reason</b><span>→</span>
        <b>respond</b>
      </div>
      <div className="chips">{layer.tools.map((tool) => <Chip key={tool} label={tool} tone="accent" />)}</div>
      <a className="action accent" href={layer.actionHref}>See it in action → <span>{layer.actionLabel}</span></a>
    </div>
  )
}
