export function ProjectFrame({ name }: { name: string }) {
  return (
    <div className="frame project-frame" aria-hidden="true">
      <div className="project-window">
        <div className="project-window-bar">
          <span />
          <span />
          <span />
          <em>{name}</em>
        </div>
        <div className="project-window-body">
          <strong>{name}</strong>
        </div>
      </div>
    </div>
  )
}
