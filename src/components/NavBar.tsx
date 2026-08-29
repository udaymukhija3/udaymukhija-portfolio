"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { contactLinks } from "../data/siteContent";

export function NavBar() {
  const pathname = usePathname();
  const currentPathname = pathname ?? "";
  const emailHref = contactLinks.find((link) => link.label === "Email")?.href ?? "mailto:udaymukhija3@gmail.com";
  const navLinkClassName = (isActive: boolean) => (isActive ? "nav-link is-active" : "nav-link");
  const isCaseStudy = currentPathname.startsWith("/projects/");
  const isArchive = currentPathname === "/projects";

  useEffect(() => {
    let frame = 0;

    const writeReadingState = () => {
      frame = 0;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const scrollableHeight = Math.max(document.documentElement.scrollHeight - viewportHeight, 1);
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight));

      document.documentElement.style.setProperty("--site-progress", progress.toFixed(4));
      document.documentElement.toggleAttribute("data-page-scrolled", window.scrollY > 24);
    };

    const scheduleReadingState = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(writeReadingState);
      }
    };

    writeReadingState();
    window.addEventListener("scroll", scheduleReadingState, { passive: true });
    window.addEventListener("resize", scheduleReadingState, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleReadingState);
      window.removeEventListener("resize", scheduleReadingState);
      document.documentElement.style.removeProperty("--site-progress");
      document.documentElement.removeAttribute("data-page-scrolled");
    };
  }, [currentPathname]);

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
      <span className="site-reading-progress" aria-hidden="true" />
    </header>
  );
}
