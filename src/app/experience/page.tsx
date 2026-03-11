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
          <h1>Where I've worked</h1>
          <p>Short version of my work history and the problems I've worked on.</p>
        </div>
      </section>

      <section className="section section-last">
        <div className="container">
          <SectionHeading
            eyebrow="Experience"
            title="Recent work"
            note="The resume page has the fuller version."
          />
          <div className="experience-list">
            {experienceItems.map((item) => (
              <article key={item.company} className="experience-row">
                <div className="experience-header">
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
          <div className="section-actions">
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
