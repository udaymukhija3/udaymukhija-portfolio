import type { Metadata } from "next";
import { SectionHeading } from "../../components/SectionHeading";
import { noteEntries, notesIntro } from "../../data/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Interests, reading notes, and current areas of focus for Uday Mukhija.",
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
            eyebrow="Working Notebook"
            title="Not case studies, not polished essays"
            note="This page is for the things that influence how I think: backend architecture, ML systems discipline, current reading, and what I am exploring right now."
          />
          <div className="notes-grid">
            {noteEntries.map((entry) => (
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
