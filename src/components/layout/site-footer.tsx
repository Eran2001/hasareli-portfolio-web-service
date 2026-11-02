import { Link, useRouterState } from '@tanstack/react-router'

const links = [
  ['stack', 'Stack'],
  ['builds', 'Builds'],
  ['lab', 'Lab'],
  ['about', 'About'],
  ['contact', 'Contact'],
] as const

export function SiteFooter() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const home = pathname === '/'

  return (
    <footer className="footer">
      <div className="footer-bar">
        <span>M E Hasareli · AI Full Stack Developer</span>
        <nav aria-label="Footer">
          {links.map(([hash, label]) => (
            home ? <a key={hash} href={`#${hash}`}>{label}</a> : <Link key={hash} to="/" hash={hash}>{label}</Link>
          ))}
        </nav>
        <div className="footer-meta">
          <span>Horana, Sri Lanka</span>
          <a href="#">hello@hasareli.dev</a>
        </div>
      </div>
    </footer>
  )
}
