import { useEffect } from 'react'
import { getRouteApi, Link } from '@tanstack/react-router'

import { SiteFooter } from '@/components/layout/site-footer'
import { ProjectFrame } from '@/components/projects/project-frame'
import { ProjectLinks } from '@/components/projects/project-links'
import { Chip } from '@/components/ui/chip'

import { findProject } from '@/configs/more-projects'
import { startPageMotion } from '@/lib/motion/page-motion'

const projectRoute = getRouteApi('/projects/$slug')

export function ProjectDetailPage() {
  const { slug } = projectRoute.useParams()
  const project = findProject(slug)

  useEffect(() => {
    const previous = document.title
    document.title = project ? `${project.name} — M E Hasareli` : previous
    const stop = startPageMotion()
    return () => {
      document.title = previous
      stop()
    }
  }, [project])

  return project ? (
    <main className="projects-page">
      <section className="section">
        <div className="wrap project-detail">
          <Link className="label back-home" to="/projects">Back to projects</Link>
          <div className="project-detail-layout">
            <ProjectFrame name={project.name} />
            <div className="project-detail-copy">
              <h2>{project.name}</h2>
              <p className="lede">{project.summary}</p>
              <div className="chips">{project.stack.map((tool) => <Chip key={tool} label={tool} />)}</div>
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  ) : (
    <main className="projects-page">
      <section className="section">
        <div className="wrap project-detail">
          <h2>Project not found</h2>
          <Link className="label back-home" to="/projects">Back to projects</Link>
        </div>
      </section>
    </main>
  )
}
