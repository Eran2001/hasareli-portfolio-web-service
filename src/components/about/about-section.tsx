import type { PortfolioContent } from '@/types/portfolio'

export function AboutSection({ about }: { about: PortfolioContent['about'] }) {
  return (
    <section id="about" className="section" data-screen-label="07 Behind the Code">
      <div className="glow about-glow" />
      <div className="wrap about">
        <div className="about-photo" data-reveal="">
          <div className="frame" data-photo="">
            <div className="hz-photo">
              <img alt="M E Hasareli" src="/hasareli.jpg" />
              <span className="hz-tint" />
              <span className="hz-scan" />
            </div>
          </div>
          <div className="about-badge">status: probably debugging</div>
        </div>
        <div className="about-copy">
          <div className="label">{about.label}</div>
          <h2>{about.title}</h2>
          {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="about-meta">
            <span className="mono-muted">based in</span>
            <strong>{about.location}</strong>
            <span className="mono-muted">off the clock</span>
            <div className="chips">{about.hobbies.map((hobby) => <span key={hobby} className="chip">{hobby}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
