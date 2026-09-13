import type { Metadata } from "next";
import { workPrinciples } from "../../data/siteContent";

export const metadata: Metadata = {
  title: "Notes", description: "Brief notes on building thoughtful products and reliable systems.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return <div className="container" style={{ paddingBlock: "96px", maxWidth: "960px" }}>
    <header className="page-intro"><p className="eyebrow">Notes</p><h1>On making things work.</h1></header>
    {workPrinciples.map((note, index) => <article key={note.title} style={{ borderTop: "1px solid var(--line)", paddingBlock: "48px" }}>
      <p className="eyebrow">0{index + 1}</p>
      <h2 style={{ marginBlock: "16px", fontWeight: 500 }}>{note.title}</h2>
      <p style={{ maxWidth: "60ch" }}>{note.body}</p>
    </article>)}
  </div>;
}
