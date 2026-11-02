import type { PortfolioContent } from '@/types/portfolio'

export function PrinciplesSection({ principles }: { principles: PortfolioContent['principles'] }) {
  return (
    <section className="section" data-screen-label="06 Principles">
      <div className="wrap principles">
        <div className="section-head">
          <div>
            <div className="label">{principles.label}</div>
            <h2>{principles.title}</h2>
          </div>
        </div>
        <div data-reveal="">
          {principles.items.map((item) => (
            <div key={item.index} className="principle">
              <b>{item.index}</b>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
