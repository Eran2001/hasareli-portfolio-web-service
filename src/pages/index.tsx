import { useEffect } from 'react'

import { AboutSection } from '@/components/about/about-section'
import { BuildsSection } from '@/components/builds/builds-section'
import { ContactSection } from '@/components/contact/contact-section'
import { HeroSection } from '@/components/hero/hero-section'
import { LabSection } from '@/components/lab/lab-section'
import { SiteFooter } from '@/components/layout/site-footer'
import { NowSection } from '@/components/now/now-section'
import { PrinciplesSection } from '@/components/principles/principles-section'
import { StackSection } from '@/components/stack/stack-section'
import { TestimonialsSection } from '@/components/testimonials/testimonials-section'
import { WhySection } from '@/components/why/why-section'

import { usePortfolioQuery } from '@/queries/portfolio-query'
import { startPageMotion } from '@/lib/motion/page-motion'

export function HomePage() {
  const portfolio = usePortfolioQuery()

  useEffect(() => {
    if (!portfolio.data) return
    return startPageMotion()
  }, [portfolio.data])

  const content = portfolio.data

  return content ? (
    <main>
      <HeroSection content={content} />
      <WhySection text={content.why} />
      <StackSection stack={content.stack} />
      <BuildsSection builds={content.builds} />
      <LabSection lab={content.lab} />
      <PrinciplesSection principles={content.principles} />
      <AboutSection about={content.about} />
      <NowSection now={content.now} />
      <TestimonialsSection testimonials={content.testimonials} />
      <ContactSection contact={content.contact} />
      <SiteFooter />
    </main>
  ) : <main />
}
