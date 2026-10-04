import type { Metadata } from "next";
import Link from "next/link";
import { Print, type Sheet } from "../../../components/print/Print";
import { StudyHead, StudyNote } from "../../../components/print/Study";
import { indexProjects } from "../../../data/projects";

export const metadata: Metadata = { title: "Study 01 · Poster" };

const colophons: Record<Sheet, string[]> = {
  lake: ["Sheet 01 · 1600 × 1000 · four inks", "horizon 0.60 · sun 0.745, 0.196"],
  fjord: ["Sheet 02 · 1600 × 1000 · six inks", "waterline 0.72 · boathouse 0.35, 0.62"],
};

/** 01 · Poster. The whole print is the sheet, and the type takes the empty sky the way a Swiss poster takes a photograph. */
export default async function PosterStudy({ searchParams }: { searchParams: Promise<{ sheet?: string }> }) {
  const { sheet: which } = await searchParams;
  const sheet: Sheet = which === "fjord" ? "fjord" : "lake";
  return <>
    <section className="poster" aria-labelledby="poster-title">
      <Print sheet={sheet} className="poster-print poster-print-wide" />
      <Print sheet={sheet} className="poster-print poster-print-tall" viewBox={sheet === "fjord" ? "200 0 720 1000" : "560 0 720 1000"} />
      <div className="print-grid-lines" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>

      <StudyHead className="poster-head" />

      <div className="poster-body">
        <h1 id="poster-title">Hi, I’m Uday.</h1>
        <p>I’m a software engineer in India. I build thoughtful products and the systems beneath them.</p>
      </div>

      <ol id="work" className="poster-index" aria-label="Selected work">
        {indexProjects.map(project => <li key={project.id}>
          <Link href={project.href} prefetch={false}>
            <span className="print-figure">{project.index}</span>
            <span className="poster-index-title">{project.title}</span>
            <span className="poster-index-category">{project.category}</span>
          </Link>
        </li>)}
      </ol>

      <aside className="poster-colophon print-figure" aria-label="Colophon">
        {colophons[sheet].map(line => <span key={line}>{line}</span>)}
      </aside>
    </section>

    <StudyNote current="poster" sheet={sheet}>
      <p><b>01 · Poster.</b> The most direct fusion: a Müller-Brockmann concert poster with the photograph swapped for a print. The image obeys the grid — the horizon sits on a row, the sun on a column — and the type only takes the sky, the print’s own empty space. The page itself is the homepage’s white and black; every colour and texture is inside the print.</p>
    </StudyNote>
  </>;
}
