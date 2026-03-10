import Link from "next/link";

export function NavBar() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/">
          Uday Mukhija
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link className="nav-link" href="/projects">
            Projects
          </Link>
          <Link className="nav-link" href="/resume">
            Resume
          </Link>
          <Link className="nav-link" href="/#contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
