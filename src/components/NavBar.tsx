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
          <span className="brand-mark" aria-hidden="true">UM</span>
          <span>Uday Mukhija</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link
            className={navLinkClassName(currentPathname.startsWith("/projects"))}
            href="/projects"
            aria-current={currentPathname.startsWith("/projects") ? "page" : undefined}
          >
            <span aria-hidden="true">01</span> Work
          </Link>
          {isExternalResume ? (
            <a className="nav-link" href={resumeHref} target="_blank" rel="noreferrer">
              <span aria-hidden="true">02</span> Resume
            </a>
          ) : (
            <Link
              className={navLinkClassName(currentPathname === resumeHref)}
              href={resumeHref}
              aria-current={currentPathname === resumeHref ? "page" : undefined}
            >
              <span aria-hidden="true">02</span> Resume
            </Link>
          )}
          <a className="nav-link" href={emailHref}>
            <span aria-hidden="true">03</span> Email
          </a>
        </nav>
      </div>
    </header>
  );
}
