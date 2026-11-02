import type { MoreProject } from '@/configs/more-projects'

export function ProjectLinks({ project }: { project: MoreProject }) {
  return (
    <div className="hero-actions project-actions">
      {project.live ? (
        <a className="btn btn-primary" href={project.live} target="_blank" rel="noreferrer">Live preview ↗</a>
      ) : (
        <span className="btn btn-ghost" aria-disabled="true">Live preview</span>
      )}
      <a className="btn btn-ghost" href={project.url} target="_blank" rel="noreferrer">GitHub</a>
    </div>
  )
}
