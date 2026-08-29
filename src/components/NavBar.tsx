"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactLinks } from "../data/siteContent";

export function NavBar() {
  const pathname = usePathname();
  const currentPathname = pathname ?? "";
  const emailHref = contactLinks.find((link) => link.label === "Email")?.href ?? "mailto:udaymukhija3@gmail.com";
  const navLinkClassName = (isActive: boolean) => (isActive ? "nav-link is-active" : "nav-link");
  const isCaseStudy = currentPathname.startsWith("/projects/");
  const isArchive = currentPathname === "/projects";

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/">
          <span>Uday Mukhija</span>
          <small>Software Engineer</small>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link
            className={navLinkClassName(isCaseStudy)}
            href="/#work"
            aria-current={isCaseStudy ? "page" : undefined}
          >
            Work
          </Link>
          <Link className="nav-link" href="/#about">About</Link>
          <Link
            className={`${navLinkClassName(isArchive)} nav-archive`}
            href="/projects"
            aria-current={isArchive ? "page" : undefined}
          >
            Archive
          </Link>
          <a className="nav-link" href={emailHref}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
