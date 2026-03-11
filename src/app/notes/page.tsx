import Link from "next/link";
import type { Metadata } from "next";
import { noteEntries, notesIntro } from "../../data/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Notes page for Uday Mukhija.",
  alternates: {
    canonical: "/notes",
  },
};

export default function NotesPage() {
  return (
    <>
      <section className="section page-intro">
        <div className="container page-intro-shell page-intro-narrow">
          <p className="eyebrow">{notesIntro.eyebrow}</p>
          <h1>{notesIntro.title}</h1>
          <p>{notesIntro.summary}</p>
        </div>
      </section>

      <section className="section section-compact-top section-last">
        <div className="container">
          {noteEntries.length > 0 ? (
            <div className="note-list">
              {noteEntries.map((entry) => (
                <article key={entry.slug} className="note-row">
                  <p className="eyebrow">{entry.eyebrow}</p>
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                  <ul className="resume-list">
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>There is no published writing here yet.</p>
              <div className="inline-link-row">
                <Link className="inline-link" href="/projects">
                  Projects
                </Link>
                <Link className="inline-link" href="/resume">
                  Resume
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
