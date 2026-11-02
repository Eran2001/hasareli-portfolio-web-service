import { Link, useRouterState } from '@tanstack/react-router'

const links = [
  ['stack', 'Stack'],
  ['builds', 'Builds'],
  ['lab', 'Lab'],
  ['about', 'About'],
  ['testimonials', 'Words'],
] as const

export function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const home = pathname === '/'

  return (
    <header className="site-header">
      <div className="site-header-bar">
        {home ? <a className="brand" href="#top">M E Hasareli</a> : <Link className="brand" to="/" hash="top">M E Hasareli</Link>}
        <nav className="nav-pill" aria-label="Page">
          {links.map(([hash, label]) => (
            home ? <a key={hash} href={`#${hash}`}>{label}</a> : <Link key={hash} to="/" hash={hash}>{label}</Link>
          ))}
          {home ? <a className="nav-cta" data-magnetic="" href="#contact">Let's Build</a> : <Link className="nav-cta" data-magnetic="" to="/" hash="contact">Let's Build</Link>}
        </nav>
      </div>
      <div className="progress" />
    </header>
  )
}
