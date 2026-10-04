import type { Metadata } from "next";
import Link from "next/link";
import { Print, type Sheet } from "../../../components/print/Print";
import { StudyHead, StudyNote } from "../../../components/print/Study";
import { indexProjects } from "../../../data/projects";

export const metadata: Metadata = { title: "Study 04 · Mirror" };

const halves: Record<Sheet, { sky: string; water: string; rule: string }> = {
  lake: { sky: "0 0 1600 600", water: "0 600 1600 400", rule: "horizon · 0.56" },
  /* The boathouse stands in front of the far shore, so the fjord's rule is the near waterline, and the bank is left off the water. */
  fjord: { sky: "0 0 1600 719", water: "0 719 1600 281", rule: "waterline · 0.72" },
};

/** 04 · Mirror. The horizon is the layout's one rule: the sky holds the statement, the water holds the work. */
export default async function MirrorStudy({ searchParams }: { searchParams: Promise<{ sheet?: string }> }) {
  const { sheet: which } = await searchParams;
  const sheet: Sheet = which === "fjord" ? "fjord" : "lake";
  const half = halves[sheet];
  return <>
    <section className="mirror" data-sheet={sheet} aria-labelledby="mirror-title">
      <div className="mirror-sky">
        <Print sheet={sheet} viewBox={half.sky} align="xMidYMax" />
        <StudyHead className="mirror-head" />
        <div className="mirror-body">
          <h1 id="mirror-title">Hi, I’m Uday.</h1>
          <p>I’m a software engineer in India. I build thoughtful products and the systems beneath them.</p>
        </div>
      </div>

      <div className="mirror-horizon" aria-hidden="true"><span className="print-figure">{half.rule}</span></div>

      <div className="mirror-water">
        <Print sheet={sheet} viewBox={half.water} align="xMidYMin" />
        <p className="mirror-reflection" aria-hidden="true">Hi, I’m Uday.</p>
        <ol id="work" className="mirror-index" aria-label="Selected work">
          {indexProjects.map(project => <li key={project.id}>
            <Link href={project.href} prefetch={false}>
              <span className="print-figure">{project.index}</span>
              <span className="mirror-title">{project.title}</span>
              <span className="mirror-category">{project.category}</span>
              <span className="mirror-year print-figure">{project.year}</span>
              <span className="mirror-arrow" aria-hidden="true">↗</span>
            </Link>
          </li>)}
        </ol>
      </div>
    </section>

    <StudyNote current="mirror" sheet={sheet}>
      <p><b>04 · Mirror.</b> The print’s own structure becomes the page’s: one horizontal rule, sky above, water below. The statement lives in the empty sky in black; the work lives on the water in white, on the same columns, and the headline lies faintly on the water like the mountains do. The Swiss grid is only that one rule and the columns beneath it.</p>
    </StudyNote>
  </>;
}
