import type { Metadata } from "next";
import Link from "next/link";
import { Print } from "../../components/print/Print";
import { StudyHead, studies } from "../../components/print/Study";

export const metadata: Metadata = {
  title: "Print studies",
  description: "A Japanese print set on a Swiss grid: four ways.",
};

const thumbs: Record<string, string> = {
  poster: "0 0 1600 1000",
  specimen: "1062 50 260 260",
  register: "0 170 1600 520",
  mirror: "0 380 1600 440",
};

/** The contact sheet: the print itself, then the four studies. */
export default function PrintStudiesPage() {
  return <div className="studies">
    <StudyHead className="studies-head" />
    <h1 className="studies-title">Two prints, set on twelve columns.</h1>
    <p className="studies-lede">Two landscapes drawn as woodblock prints — a lake at dawn, and a fjord in spring from a photograph — with carved edges, brush strokes, and the weave showing through, and four ways of setting either on the homepage’s white page with its black Helvetica and a twelve-column grid. The page stays as it is. The print is the only thing with colour.</p>
    <Link href="/print/sheet" prefetch={false} className="studies-sheet"><Print fit="meet" /><span className="print-figure">Sheet 01 · a lake at dawn · four inks</span></Link>
    <Link href="/print/fjord" prefetch={false} className="studies-sheet"><Print sheet="fjord" fit="meet" /><span className="print-figure">Sheet 02 · a fjord in spring · six inks</span></Link>
    <ol className="studies-index">
      {studies.map(study => <li key={study.slug}>
        <Link href={`/print/${study.slug}`} prefetch={false}>
          <span className="studies-thumb"><Print viewBox={thumbs[study.slug]} /></span>
          <span className="print-figure">{study.number}</span>
          <span className="studies-name">{study.title}</span>
          <span className="studies-line">{study.line}</span>
        </Link>
        <Link href={`/print/${study.slug}?sheet=fjord`} prefetch={false} className="studies-alt print-figure">with the fjord ↗</Link>
      </li>)}
    </ol>
  </div>;
}
