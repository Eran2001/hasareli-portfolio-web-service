import { Chip } from '@/components/ui/chip'

import type { CompactBuild } from '@/types/portfolio'

export function BuildCard({ build }: { build: CompactBuild }) {
  return (
    <article id={build.id} className="build-card" data-tilt="">
      <div className="frame" data-mock={build.mock}>{build.frameLabel}</div>
      <div className="card-copy">
        <div>
          <span className="label">{build.index}</span>
          <h3>{build.name}</h3>
          <div className="tagline">{build.tagline}</div>
        </div>
        <p><strong>Problem:</strong> {build.problem}</p>
        <p><strong>Built:</strong> {build.built} <strong>Role:</strong> {build.role}</p>
        <div className="mini-ai">
          <span className="ai-kicker">✦ the ai piece</span>
          <span>{build.ai}</span>
        </div>
        <div className="chips">{build.tools.map((tool) => <Chip key={tool} label={tool} />)}</div>
        <div className="card-metric">
          <span data-count="">{build.metric}</span>
          <span>{build.metricNote}</span>
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#">Live demo ↗</a>
          <a className="btn btn-ghost" href="#">GitHub</a>
        </div>
      </div>
    </article>
  )
}
