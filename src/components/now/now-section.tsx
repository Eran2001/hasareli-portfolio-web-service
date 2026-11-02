import type { PortfolioContent } from '@/types/portfolio'

export function NowSection({ now }: { now: PortfolioContent['now'] }) {
  return (
    <section className="section" data-screen-label="08 Now">
      <div className="wrap">
        <div className="now-card" data-reveal="">
          <div className="section-head">
            <div>
              <div className="label">{now.label}</div>
              <h2>{now.title}</h2>
            </div>
            <div className="updated"><i />{now.updated}</div>
          </div>
          <div className="now-grid">
            {now.items.map((item) => (
              <div key={item.label} className="now-item">
                <span>{item.label}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
