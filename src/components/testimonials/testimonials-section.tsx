import type { PortfolioContent } from '@/types/portfolio'

export function TestimonialsSection({ testimonials }: { testimonials: PortfolioContent['testimonials'] }) {
  return (
    <section id="testimonials" className="section" data-screen-label="09 Testimonials">
      <div className="wrap builds">
        <div className="section-head">
          <div>
            <div className="label">{testimonials.label}</div>
            <h2>{testimonials.title}</h2>
          </div>
          <p className="lede">{testimonials.body}</p>
        </div>
        <div className="quote-grid">
          {testimonials.items.map((item) => (
            <article key={item.index} className="quote-card" data-tilt="">
              <span className={`status ${item.tone === 'cyan' ? 'cyan' : 'violet'}`}>sample</span>
              <p>{item.quote}</p>
              <div className="quote-by">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
