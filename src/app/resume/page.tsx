import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeading } from "../../components/SectionHeading";
import { contactLinks, resumeHref } from "../../data/siteContent";
import {
  educationItems,
  experienceItems,
  resumeProjects,
  resumeSummary,
  skillGroups,
} from "../../data/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Uday Mukhija, a software engineer building production-ready apps, backend systems, dashboards, data pipelines, and AI-powered workflows.",
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  const profileLinks = contactLinks.filter((link) => link.label !== "Resume");
  const isResumeExternal = resumeHref.startsWith("http");

  return (
    <>
      <section className="section page-intro">
        <div className="container page-intro-shell">
          <p className="eyebrow">{resumeSummary.eyebrow}</p>
          <h1>{resumeSummary.title}</h1>
          <p>{resumeSummary.intro}</p>
          <p className="detail-note">{resumeSummary.note}</p>
          <div className="inline-link-row">
            <a
              className="inline-link"
              href={resumeHref}
              target={isResumeExternal ? "_blank" : undefined}
              rel={isResumeExternal ? "noreferrer" : undefined}
            >
              Resume document
            </a>
            {profileLinks.map((link) => {
              const isExternal = link.href.startsWith("http");

              return (
                <a
                  key={link.label}
                  className="inline-link"
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container resume-grid">
          <section id="experience" className="resume-card">
            <p className="eyebrow">Experience</p>
            <h2>Recent work</h2>
            <div className="resume-stack">
              {experienceItems.map((item) => (
                <article key={item.company} className="resume-item">
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
          </section>

          <section className="resume-card">
            <p className="eyebrow">Skills</p>
            <h2>Where I am strongest</h2>
            <div className="skill-groups">
              {skillGroups.map((group) => (
                <article key={group.label} className="skill-group">
                  <h3>{group.label}</h3>
                  <p>{group.items.join(", ")}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Selected projects"
            title="Projects to start with"
            note="If you're short on time, these are the product, backend, and data-system projects I'd open first."
          />
          <div className="resume-project-grid">
            {resumeProjects.map((project) => (
              <article key={project.title} className="resume-card">
                <h3>
                  <Link className="project-title-link" href={project.href}>
                    {project.title}
                  </Link>
                </h3>
                <p>{project.summary}</p>
                <ul className="resume-list">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-last">
        <div className="container resume-grid">
          <section className="resume-card">
            <p className="eyebrow">Education</p>
            <h2>Background</h2>
            <div className="resume-stack">
              {educationItems.map((item) => (
                <article key={item.school} className="resume-item">
                  <div className="resume-item-header">
                    <div>
                      <h3>{item.school}</h3>
                      <p className="resume-company">{item.detail}</p>
                    </div>
                    <p className="resume-meta">{item.period}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-card">
            <p className="eyebrow">Contact</p>
            <h2>Quickest way to evaluate fit</h2>
            <p>
              If you want the fastest read on my product and backend work, start with these
              projects, then check GitHub or the resume document for more detail.
            </p>
            <div className="inline-link-row">
              <Link className="inline-link" href="/projects/gathrly">
                Gathr
              </Link>
              <Link className="inline-link" href="/projects/vibegrid">
                VibeGrid
              </Link>
              <Link className="inline-link" href="/projects/inventory-management-sys">
                Stockout Pipeline
              </Link>
            </div>
            <div className="inline-link-row">
              {profileLinks.map((link) => {
                const isExternal = link.href.startsWith("http");

                return (
                  <a
                    key={link.label}
                    className="inline-link"
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
