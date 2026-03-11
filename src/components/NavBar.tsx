import Link from "next/link";
import { resumeHref } from "../data/siteContent";

export function NavBar() {
  const isExternalResume = resumeHref.startsWith("http");

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
          {isExternalResume ? (
            <a className="nav-link" href={resumeHref} target="_blank" rel="noreferrer">
              Resume
            </a>
          ) : (
            <Link className="nav-link" href={resumeHref}>
              Resume
            </Link>
          )}
          <Link className="nav-link" href="/experience">
            Experience
          </Link>
          <Link className="nav-link" href="/#contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
