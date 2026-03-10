import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "../../components/SectionHeading";
import { experienceItems } from "../../data/resume";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work experience for Uday Mukhija.",
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <>
      <section className="section page-intro">
        <div className="container page-intro-shell">
          <p className="eyebrow">Experience</p>
          <h1>Work experience</h1>
          <p>
            This section is short right now, but I still want it on the site. It gives context
            beyond the project work and shows the environments where I have actually operated.
          </p>
        </div>
      </section>

      <section className="section section-last">
        <div className="container">
          <SectionHeading
            eyebrow="Background"
            title="What is here so far"
            note="A small amount of experience is still worth presenting clearly."
          />
          <div className="experience-grid-home">
            {experienceItems.map((item) => (
              <article key={item.company} className="experience-card">
                <div className="resume-item-header">
                  <div>
                    <h3>{item.role}</h3>
                    <p className="resume-company">{item.company}</p>
                  </div>
                  <p className="resume-meta">
                    {item.period}
                    <span>{item.location}</span>
                  </p>
                </div>
                <ul className="resume-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="inline-link-row">
            <Link className="inline-link" href="/projects">
              Projects
            </Link>
            <Link className="inline-link" href="/resume">
              Resume page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
