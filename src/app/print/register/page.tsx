import type { Metadata } from "next";
import Link from "next/link";
import { Print, type Sheet } from "../../../components/print/Print";
import { StudyHead, StudyNote } from "../../../components/print/Study";
import { indexProjects } from "../../../data/projects";

export const metadata: Metadata = { title: "Study 03 · Register" };

const strips: Record<Sheet, { viewBox: string; figure: string }> = {
  lake: { viewBox: "0 170 1600 520", figure: "a lake at dawn · four inks" },
  fjord: { viewBox: "0 300 1600 495", figure: "a fjord in spring · six inks" },
};

/** 03 · Register. The homepage as it is today — one measure, one strip, one list — reprinted in the material of the print. */
export default async function RegisterStudy({ searchParams }: { searchParams: Promise<{ sheet?: string }> }) {
  const { sheet: which } = await searchParams;
  const sheet: Sheet = which === "fjord" ? "fjord" : "lake";
  const strip = strips[sheet];
  return <>
    <div className="register">
      <StudyHead className="register-head" />

      <section className="register-intro" aria-labelledby="register-title">
        <h1 id="register-title">Hi, I’m Uday.</h1>
        <p>I’m a software engineer in India. I build thoughtful products and the systems beneath them.</p>
      </section>

      <div className="register-strip">
        <Print sheet={sheet} viewBox={strip.viewBox} />
        <span className="print-figure register-strip-figure">{strip.figure}</span>
      </div>

      <section id="work" className="register-work" aria-labelledby="register-work-title">
        <h2 id="register-work-title">A few things I’ve made</h2>
        {indexProjects.map(project => <details key={project.id} name="register-project" className="register-row">
          <summary>
            <span className="print-figure">{project.index}</span>
            <span className="register-title">{project.title}</span>
            <span className="register-category">{project.category}</span>
            <span className="register-plus" aria-hidden="true" />
          </summary>
          <div className="register-detail">
            <p>{project.description}</p>
            <Link href={project.href} prefetch={false}>View project <span aria-hidden="true">↗</span></Link>
          </div>
        </details>)}
        <Link href="/projects" className="register-archive" prefetch={false}>More work <span aria-hidden="true">↗</span></Link>
      </section>

      <footer className="register-foot print-figure">
        <span>© {new Date().getFullYear()} Uday Mukhija</span>
        <span>Sheet {sheet === "fjord" ? "02" : "01"} · 672 measure</span>
      </footer>
    </div>

    <StudyNote current="register" sheet={sheet}>
      <p><b>03 · Register.</b> The smallest step: the page exactly as it is — white, black, one measure, the same header and rows — with the sunrise strip replaced by a print. Nothing else changes. This could ship.</p>
    </StudyNote>
  </>;
}
