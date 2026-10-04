import type { Metadata } from "next";
import Link from "next/link";
import { Print, type Sheet } from "../../../components/print/Print";
import { StudyHead, StudyNote } from "../../../components/print/Study";
import { indexProjects } from "../../../data/projects";

export const metadata: Metadata = { title: "Study 02 · Specimen" };

/* The windows each sheet is cut into: the one red thing, the range, a quiet corner, and a detail per project. */
const windows: Record<Sheet, { hero: string; wide: string; side: string; figure: string; marks: Record<string, string> }> = {
  lake: {
    hero: "1062 50 260 260", wide: "0 236 1040 440", side: "440 700 360 300", figure: "the sun · one of four inks",
    marks: { gathr: "470 760 300 200", vibegrid: "0 180 360 100", murmur: "300 596 500 90", glyphfall: "1112 116 160 160", bricksy: "440 700 360 300" },
  },
  fjord: {
    hero: "372 500 350 350", wide: "600 300 1000 260", side: "1040 610 480 250", figure: "the boathouse · one of six inks",
    marks: { gathr: "440 652 200 94", vibegrid: "60 560 200 94", murmur: "1100 760 200 94", glyphfall: "1160 690 200 94", bricksy: "1040 610 480 250" },
  },
};
/* A panorama wants to be seen whole: one wide window across every column, the spire beside the type. */
const whole = { hero: "0 300 1600 400", wide: "1100 250 480 310" };

/** 02 · Specimen. The print is cut into modules and set on a 12-column grid of rules, the way Tanaka set a face. */
export default async function SpecimenStudy({ searchParams }: { searchParams: Promise<{ sheet?: string; cut?: string }> }) {
  const { sheet: which, cut: how } = await searchParams;
  const sheet: Sheet = which === "fjord" ? "fjord" : "lake";
  const panorama = how === "whole";
  const cut = panorama ? { ...windows[sheet], ...whole } : windows[sheet];
  return <>
    <section className="specimen" data-cut={panorama ? "whole" : undefined} aria-labelledby="specimen-title">
      <StudyHead className="specimen-head" />

      <div className="specimen-sun"><Print sheet={sheet} viewBox={cut.hero} /></div>
      <div className="specimen-body">
        <h1 id="specimen-title">Hi, I’m Uday.</h1>
        <p>I’m a software engineer in India. I build thoughtful products and the systems beneath them.</p>
        <span className="print-figure specimen-figure">{cut.figure}</span>
      </div>

      <div className="specimen-range"><Print sheet={sheet} viewBox={cut.wide} /></div>
      <div className="specimen-wake"><Print sheet={sheet} viewBox={cut.side} /></div>

      <ol id="work" className="specimen-index" aria-label="Selected work">
        {indexProjects.map(project => <li key={project.id}>
          <Link href={project.href} prefetch={false}>
            <span className="specimen-mark"><Print sheet={sheet} viewBox={cut.marks[project.id]} material={false} /></span>
            <span className="print-figure">{project.index}</span>
            <span className="specimen-title">{project.title}</span>
            <span className="specimen-category">{project.category}</span>
          </Link>
        </li>)}
      </ol>

      <footer className="specimen-foot print-figure">
        <span>Sheet {sheet === "fjord" ? "02" : "01"} · {panorama ? "one window and a detail" : "four windows"}</span>
        <span>© {new Date().getFullYear()} Uday Mukhija</span>
      </footer>
    </section>

    <StudyNote current="specimen" sheet={sheet}>
      <p><b>02 · Specimen.</b> The Ikko Tanaka move: the picture is dissolved into the grid and reassembled as modules. Each cell is a window onto the same sheet, and each project takes one detail as its mark. The rules and the white are the homepage’s; the only material inside the cells is the print. This one has the most room to grow as the archive grows.</p>
    </StudyNote>
  </>;
}
