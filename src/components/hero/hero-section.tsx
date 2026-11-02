import type { PortfolioContent } from '@/types/portfolio'

import { BuildingTyper } from './building-typer'

export function HeroSection({ content }: { content: PortfolioContent }) {
  return (
    <section id="top" className="section hero" data-screen-label="01 Hero">
      <div className="hero-frame">
        <div className="glow hero-a" />
        <div className="glow hero-b" />
        <div className="hero-grid" />
        <div className="hero-inner" data-hero-content="">
        <div className="hero-main">
          <div className="pills">
            <div className="pill"><i className="live-dot" />Available for work</div>
            <div className="pill pill-mono"><span>Currently building:</span><BuildingTyper words={content.building} /></div>
          </div>
          <h1>{content.name}</h1>
          <div className="hero-role gradient-text">{content.role}</div>
          <p className="hero-summary">{content.summary}</p>
          <div className="hero-actions">
            <a className="btn-primary" data-magnetic="" href="#builds">View Projects</a>
            <a className="btn-ghost" data-magnetic="" href="#contact">Contact Me</a>
          </div>
          <nav className="hero-social" aria-label="Social">
            <a href="#">github</a>
            <a href="#">linkedin</a>
            <a href="#">email</a>
          </nav>
        </div>
        <div className="layer-grid">
          {content.layerCards.map((card) => (
            <a key={card.href} className={card.tone === 'accent' ? 'layer-card accent' : 'layer-card'} href={card.href}>
              <span>{card.index}</span>
              <strong>{card.title}</strong>
              <em>{card.detail}</em>
            </a>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
