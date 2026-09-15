import Link from "next/link";
import type { ReactNode } from "react";
import { contactLinks, resumeHref } from "../../data/siteContent";
import { grotesk } from "./font";

type PanelFrameProps = {
  /* Which navigation band item this page belongs under. */
  current?: "work" | "about";
  children: ReactNode;
};

const emailHref = contactLinks.find((link) => link.label === "Email")?.href ?? "mailto:udaymukhija3@gmail.com";
const githubHref = contactLinks.find((link) => link.label === "GitHub")?.href;
const linkedInHref = contactLinks.find((link) => link.label === "LinkedIn")?.href;

/* The homepage object, opened vertically: the same inset, header band, and rules,
   with page content stacked as bands and a closing band of contact links. */
export function PanelFrame({ current, children }: PanelFrameProps) {
  return (
    <div id="panel" className={grotesk.variable}>
      <div className="panel-object panel-page">
        <header className="pp-band pp-head">
          <Link className="pp-cell pp-wordmark" href="/panel">Uday Mukhija</Link>
          <nav className="pp-cell panel-nav" aria-label="Primary">
            <Link href="/panel/work" prefetch={false} aria-current={current === "work" ? "page" : undefined}>Work</Link>
            <Link href="/panel/about" prefetch={false} aria-current={current === "about" ? "page" : undefined}>About</Link>
            <a href={emailHref}>Contact</a>
          </nav>
        </header>

        {children}

        <footer className="pp-band pp-foot">
          <p className="pp-cell">© {new Date().getFullYear()} Uday Mukhija</p>
          <nav className="pp-cell" aria-label="Elsewhere">
            {githubHref ? <a href={githubHref} target="_blank" rel="noreferrer">GitHub</a> : null}
            {linkedInHref ? <a href={linkedInHref} target="_blank" rel="noreferrer">LinkedIn</a> : null}
            <a href={resumeHref} target="_blank" rel="noreferrer">Resume</a>
            <a href={emailHref}>Email</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
