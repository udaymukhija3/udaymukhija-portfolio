import type { Metadata } from "next";
import { QuietIntro, QuietPage, QuietSection } from "../../components/quiet/QuietPage";
import { workPrinciples } from "../../data/siteContent";

export const metadata: Metadata = {
  title: "Notes", description: "Brief notes on building thoughtful products and reliable systems.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <QuietPage>
      <QuietIntro title="On making things work.">
        <p>Short notes on building thoughtful products and the systems beneath them.</p>
      </QuietIntro>

      <QuietSection id="notes" title="Notes">
        <ol>
          {workPrinciples.map((note, index) => (
            <li key={note.title} className="qp-row">
              <span>0{index + 1}</span>
              <div>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </QuietSection>
    </QuietPage>
  );
}
