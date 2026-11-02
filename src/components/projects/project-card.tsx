import { Link } from '@tanstack/react-router'

import { Chip } from '@/components/ui/chip'

import type { MoreProject } from '@/configs/more-projects'

import { ProjectFrame } from './project-frame'
import { ProjectLinks } from './project-links'

export function ProjectCard({ project, index }: { project: MoreProject; index: string }) {
  return (
    <article className="build-card" data-reveal="">
      <Link className="project-open" to="/projects/$slug" params={{ slug: project.slug }}>
        <ProjectFrame name={project.name} />
        <div className="card-copy">
          <div className="project-card-head">
            <div>
              <span className="label">{index}</span>
              <h3>{project.name}</h3>
            </div>
            <Chip label={project.visibility} tone={project.visibility === 'Private' ? 'accent' : 'plain'} />
          </div>
          <div className="tagline">{project.summary}</div>
          <div className="chips">{project.stack.map((tool) => <Chip key={tool} label={tool} />)}</div>
        </div>
      </Link>
      <ProjectLinks project={project} />
    </article>
  )
}
