import type { PortfolioContent } from '@/types/portfolio'

import { ContactForm } from './contact-form'

const links = [
  ['Email', 'hello@hasareli.dev'],
  ['LinkedIn', 'linkedin.com/in/hasareli'],
  ['GitHub', 'github.com/hasareli'],
  ['Download CV', 'PDF'],
] as const

export function ContactSection({ contact }: { contact: PortfolioContent['contact'] }) {
  return (
    <section id="contact" className="section" data-screen-label="10 Let's Build">
      <div className="glow contact-a" />
      <div className="glow contact-b" />
      <div className="wrap contact">
        <div className="contact-intro">
          <div className="label">{contact.label}</div>
          <h2>{contact.titleLead}<span className="gradient-text">brain</span>{contact.titleTail}</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-side">
            <p>{contact.body}</p>
            <div className="contact-links">
              {links.map(([label, value]) => (
                <a key={label} href="#">
                  {label}
                  <span>{value}</span>
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
