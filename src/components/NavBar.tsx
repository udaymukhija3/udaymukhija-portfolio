"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactLinks, resumeHref } from "../data/siteContent";

export function NavBar() {
  const pathname = usePathname();
  const currentPathname = pathname ?? "";
  const isExternalResume = resumeHref.startsWith("http");
  const emailHref = contactLinks.find((link) => link.label === "Email")?.href ?? "mailto:udaymukhija3@gmail.com";
  const navLinkClassName = (isActive: boolean) => (isActive ? "nav-link is-active" : "nav-link");

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/">
          <span>Uday Mukhija</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link
            className={navLinkClassName(currentPathname.startsWith("/projects"))}
            href="/projects"
            aria-current={currentPathname.startsWith("/projects") ? "page" : undefined}
          >
            Work
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
          <a className="nav-link" href={emailHref}>
            Email
          </a>
        </nav>
      </div>
    </header>
  );
}
