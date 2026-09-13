"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { contactLinks } from "../data/siteContent";

export function NavBar() {
  const pathname = usePathname();
  const currentPathname = pathname ?? "";
  const isDaybreak = currentPathname === "/daybreak";
  const isContext = currentPathname === "/";
  const emailHref = contactLinks.find((link) => link.label === "Email")?.href ?? "mailto:udaymukhija3@gmail.com";
  const navLinkClassName = (isActive: boolean) => (isActive ? "nav-link is-active" : "nav-link");
  const isCaseStudy = currentPathname.startsWith("/projects/");
  const isArchive = currentPathname === "/projects";
  const isLab = currentPathname === "/lab";
  const isAbout = currentPathname === "/about";

  useEffect(() => {
    if (isDaybreak || isContext) return;
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
  }, [currentPathname, isDaybreak, isContext]);

  if (isContext) return (
    <header className="context-header">
      <div className="context-container context-navigation">
        <Link className="context-wordmark" href="/">Uday Mukhija</Link>
        <nav aria-label="Primary">
          <a href="#work">Work</a>
          <Link href="/about" prefetch={false}>About</Link>
          <Link href="/notes" prefetch={false}>Notes</Link>
          <a href={emailHref}>Contact</a>
        </nav>
      </div>
    </header>
  );

  return (
    <header className="site-header" data-daybreak={isDaybreak ? "true" : undefined}>
      <div className="container nav-shell">
        <Link className="brand" href="/" onClick={event => { if (isDaybreak) { event.preventDefault(); window.dispatchEvent(new CustomEvent("daybreak:navigate", { detail: "home" })); } }}>
          <span>{isDaybreak ? "DAYBREAK" : "Uday Mukhija"}</span>
          <small>{isDaybreak ? "UDAY MUKHIJA" : "Software Engineer"}</small>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link
            className={navLinkClassName(isCaseStudy || isArchive)}
            href="/projects"
            onClick={event => { if (isDaybreak) { event.preventDefault(); window.dispatchEvent(new CustomEvent("daybreak:navigate", { detail: "work" })); } }}
            aria-current={isCaseStudy || isArchive ? "page" : undefined}
          >
            Work
          </Link>
          <Link
            className={navLinkClassName(isLab)}
            href="/lab"
            onClick={event => { if (isDaybreak) { event.preventDefault(); window.dispatchEvent(new CustomEvent("daybreak:navigate", { detail: "lab" })); } }}
            aria-current={isLab ? "page" : undefined}
          >
            Lab
          </Link>
          <Link
            className={navLinkClassName(isAbout)}
            href="/about"
            onClick={event => { if (isDaybreak) { event.preventDefault(); window.dispatchEvent(new CustomEvent("daybreak:navigate", { detail: "about" })); } }}
            aria-current={isAbout ? "page" : undefined}
          >
            About
          </Link>
          <a className="nav-link" href={emailHref} onClick={event => { if (isDaybreak) { event.preventDefault(); window.dispatchEvent(new CustomEvent("daybreak:navigate", { detail: "contact" })); } }}>
            Contact
          </a>
        </nav>
      </div>
      <span className="site-reading-progress" aria-hidden="true" />
    </header>
  );
}
