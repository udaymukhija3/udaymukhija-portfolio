import type { Metadata } from "next";
import Link from "next/link";
import { QuietIntro, QuietPage, QuietSection } from "../../components/quiet/QuietPage";
import { experienceItems } from "../../data/resume";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work history for Uday Mukhija: backend and product engineering roles, with the problems and migrations I've shipped.",
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <QuietPage>
      <QuietIntro title="Where I’ve worked.">
        <p>The short version of my work history. The resume page has the fuller skill breakdown.</p>
      </QuietIntro>

      <QuietSection id="roles" title="Recent work">
        {experienceItems.map((item) => (
          <article key={item.company} className="qp-row" aria-label={`${item.role} at ${item.company}`}>
            <span>
              {item.company}
              <br />
              {item.period.replace(" - ", "–")}
              <br />
              {item.location}
            </span>
            <div>
              <h3>{item.role}</h3>
              <ul className="qp-list">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <p className="qp-links">
          <Link href="/resume" prefetch={false}>Resume <span aria-hidden="true">→</span></Link>
          <Link href="/projects" prefetch={false}>Work <span aria-hidden="true">→</span></Link>
        </p>
      </QuietSection>
    </QuietPage>
  );
}
