import { Fragment } from 'react'

import { Chip } from '@/components/ui/chip'

import type { FeaturedBuild as FeaturedBuildData } from '@/types/portfolio'

export function FeaturedBuild({ build }: { build: FeaturedBuildData }) {
  return (
    <article id={build.id} className="featured" data-reveal="">
      <div className="frame" data-mock="ledgerly">
        <span className="frame-badge">{build.badge}</span>
        {build.frameLabel}
      </div>
      <div className="featured-copy">
        <div>
          <h3>{build.name}</h3>
          <div className="tagline">{build.tagline}</div>
        </div>
        <dl className="facts">
          {build.facts.map((fact) => (
            <Fragment key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.text}</dd>
            </Fragment>
          ))}
        </dl>
        <div className="ai-note">
          <span className="ai-kicker">✦ the ai piece</span>
          <span>{build.ai}</span>
        </div>
        <div className="chips">{build.tools.map((tool) => <Chip key={tool} label={tool} />)}</div>
        <div className="metric">
          <span className="metric-value" data-count="">{build.metric}</span>
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
