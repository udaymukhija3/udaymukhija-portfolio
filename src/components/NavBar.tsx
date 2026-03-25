"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { resumeHref } from "../data/siteContent";

export function NavBar() {
  const pathname = usePathname();
  const currentPathname = pathname ?? "";
  const isExternalResume = resumeHref.startsWith("http");
  const navLinkClassName = (isActive: boolean) => (isActive ? "nav-link is-active" : "nav-link");

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/">
          Uday Mukhija
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link
            className={navLinkClassName(currentPathname.startsWith("/projects"))}
            href="/projects"
            aria-current={currentPathname.startsWith("/projects") ? "page" : undefined}
          >
            Projects
          </Link>
          {isExternalResume ? (
            <a className="nav-link" href={resumeHref} target="_blank" rel="noreferrer">
              Resume
            </a>
          ) : (
            <Link
              className={navLinkClassName(currentPathname === resumeHref)}
              href={resumeHref}
              aria-current={currentPathname === resumeHref ? "page" : undefined}
            >
              Resume
            </Link>
          )}
          <Link
            className={navLinkClassName(currentPathname === "/experience")}
            href="/experience"
            aria-current={currentPathname === "/experience" ? "page" : undefined}
          >
            Experience
          </Link>
          <Link
            className={navLinkClassName(currentPathname === "/notes")}
            href="/notes"
            aria-current={currentPathname === "/notes" ? "page" : undefined}
          >
            Notes
          </Link>
          <Link className="nav-link" href="/#contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
