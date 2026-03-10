import type { Metadata } from "next";
import { SectionHeading } from "../../components/SectionHeading";
import { noteEntries, notesIntro, notesPlaceholder } from "../../data/notes";

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
        <div className="container page-intro-shell">
          <p className="eyebrow">{notesIntro.eyebrow}</p>
          <h1>{notesIntro.title}</h1>
          <p>{notesIntro.summary}</p>
        </div>
      </section>

      <section className="section section-last">
        <div className="container">
          <SectionHeading
            eyebrow="Notes"
            title="Recent writing"
            note="Short technical notes and project writeups."
          />
          <div className="notes-grid">
            {noteEntries.length > 0 ? (
              noteEntries.map((entry) => (
                <article key={entry.slug} className="note-card">
                  <p className="eyebrow">{entry.eyebrow}</p>
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                  <ul className="resume-list">
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))
            ) : (
              <article className="note-card note-card-placeholder">
                <p className="eyebrow">{notesPlaceholder.eyebrow}</p>
                <h2>{notesPlaceholder.title}</h2>
                <p>{notesPlaceholder.summary}</p>
              </article>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
