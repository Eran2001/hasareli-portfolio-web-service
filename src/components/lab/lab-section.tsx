import type { PortfolioContent } from '@/types/portfolio'

export function LabSection({ lab }: { lab: PortfolioContent['lab'] }) {
  const [lead, rest] = lab.title.split('experimenting')

  return (
    <section id="lab" className="section lab" data-screen-label="05 The Lab">
      <div className="wrap builds">
        <div className="section-head">
          <div>
            <div className="label">{lab.label}</div>
            <h2>{lead}<br />experimenting{rest}</h2>
          </div>
          <p className="lede">{lab.body}</p>
        </div>
        <div className="lab-grid">
          {lab.items.map((item) => (
            <a key={item.slug} className="lab-card" data-tilt="" href="#">
              <div className="lab-meta">
                <span>{item.slug}</span>
                <span className={`status ${item.tone}`}>{item.status}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="poke">Poke at it →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
