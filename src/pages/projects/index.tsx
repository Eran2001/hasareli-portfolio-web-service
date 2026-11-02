import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'

import { SiteFooter } from '@/components/layout/site-footer'
import { ProjectCard } from '@/components/projects/project-card'

import { moreProjects } from '@/configs/more-projects'
import { startPageMotion } from '@/lib/motion/page-motion'

export function ProjectsPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'More projects — M E Hasareli'
    const stop = startPageMotion()
    return () => {
      document.title = previous
      stop()
    }
  }, [])

  return (
    <main className="projects-page">
      <section className="section" data-screen-label="More projects">
        <div className="wrap projects">
          <div className="section-head">
            <div>
              <Link className="label back-home" to="/">Back to home</Link>
              <h2>More projects</h2>
            </div>
            <p className="lede">Apps, themes, and APIs from GitHub, beyond the four case studies on the home page.</p>
          </div>
          <div className="build-grid">
            {moreProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={String(index + 1).padStart(2, '0')} />
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
