import Link from "next/link";
import { contactLinks } from "../../data/siteContent";

export const studies = [
  { slug: "poster", number: "01", title: "Poster", line: "The print is the sheet; the type sits in the empty sky." },
  { slug: "specimen", number: "02", title: "Specimen", line: "The print cut into modules on a 12-column grid." },
  { slug: "register", number: "03", title: "Register", line: "The current homepage, reprinted in this material." },
  { slug: "mirror", number: "04", title: "Mirror", line: "The horizon is the layout: sky above, work below." },
];

const emailHref = contactLinks.find(link => link.label === "Email")?.href ?? "mailto:udaymukhija3@gmail.com";

/** The homepage's header, exactly: the links, and a way to say hello. */
export function StudyHead({ className = "" }: { className?: string }) {
  return <header className={`print-head ${className}`}>
    <nav className="print-nav" aria-label="Primary">
      <Link href="/" prefetch={false}>home</Link>
      <a href="#work">work</a>
      <Link href="/notes" prefetch={false}>notes</Link>
      <Link href="/about" prefetch={false}>about</Link>
    </nav>
    <a className="print-hello" href={emailHref}>say hello <span aria-hidden="true">↗</span></a>
  </header>;
}

/** Under each composition: what the study is trying, the way to the others, and the other sheet. */
export function StudyNote({ current, sheet = "lake", children }: { current: string; sheet?: "lake" | "fjord"; children: React.ReactNode }) {
  const query = sheet === "fjord" ? "?sheet=fjord" : "";
  const other = sheet === "fjord" ? "" : "?sheet=fjord";
  return <footer className="print-note">
    <div className="print-note-text">{children}</div>
    <nav className="print-studies" aria-label="Studies">
      <Link href="/print" prefetch={false}>Studies</Link>
      {studies.map(study => <Link key={study.slug} href={`/print/${study.slug}${query}`} prefetch={false} aria-current={study.slug === current ? "page" : undefined}>
        <b>{study.number}</b> {study.title}
      </Link>)}
      <span className="print-studies-sheet">
        <Link href="/print/sheet" prefetch={false} aria-current={sheet === "lake" ? "true" : undefined}>Sheet 01 · lake</Link>
        <Link href="/print/fjord" prefetch={false} aria-current={sheet === "fjord" ? "true" : undefined}>Sheet 02 · fjord</Link>
        <Link href={`/print/${current}${other}`} prefetch={false}>this study with the {sheet === "fjord" ? "lake" : "fjord"} ↗</Link>
      </span>
    </nav>
  </footer>;
}
