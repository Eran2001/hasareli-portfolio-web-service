import { Link } from '@tanstack/react-router'

import type { PortfolioContent } from '@/types/portfolio'

import { BuildCard } from './build-card'
import { FeaturedBuild } from './featured-build'

export function BuildsSection({ builds }: { builds: PortfolioContent['builds'] }) {
  return (
    <section id="builds" className="section" data-screen-label="04 Featured Builds">
      <div className="glow builds-glow" />
      <div className="wrap builds">
        <div className="section-head">
          <div>
            <div className="label">{builds.label}</div>
            <h2>{builds.title}</h2>
          </div>
          <p className="lede">{builds.body}</p>
        </div>
        <FeaturedBuild build={builds.featured} />
        <div className="build-grid" data-reveal="">
          {builds.cards.map((build) => <BuildCard key={build.id} build={build} />)}
        </div>
        <div className="builds-more">
          <Link className="btn btn-ghost" to="/projects">More Projects</Link>
        </div>
      </div>
    </section>
  )
}
