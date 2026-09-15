import Link from "next/link";
import type { Metadata } from "next";
import { QuietIntro, QuietPage, QuietSection } from "../../components/quiet/QuietPage";
import { indexProjects } from "../../data/projects";
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
  const categoryFor = (href: string) => indexProjects.find((project) => project.href === href)?.category;

  return (
    <QuietPage>
      <QuietIntro title="Resume.">
        <p>{resumeSummary.title}. {resumeSummary.intro}</p>
        <p className="qp-meta">{resumeSummary.note}</p>
        <p className="qp-links">
          <a
            href={resumeHref}
            target={isResumeExternal ? "_blank" : undefined}
            rel={isResumeExternal ? "noreferrer" : undefined}
          >
            Resume document <span aria-hidden="true">↗</span>
          </a>
          {profileLinks.map((link) => {
            const isExternal = link.href.startsWith("http");

            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            );
          })}
        </p>
      </QuietIntro>

      <QuietSection id="experience" title="Experience">
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
      </QuietSection>

      <QuietSection id="skills" title="Skills" note="where I’m strongest">
        <dl>
          {skillGroups.map((group) => (
            <div key={group.label} className="qp-row">
              <dt>{group.label}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </QuietSection>

      <QuietSection id="start" title="Start with these" note="if you’re short on time">
        <div className="quiet-projects">
          {resumeProjects.map((project) => (
            <details key={project.title} name="resume-project">
              <summary>
                <span>{project.title}</span>
                <span className="quiet-category">{categoryFor(project.href)}</span>
                <span className="quiet-plus" aria-hidden="true" />
              </summary>
              <div className="quiet-detail">
                <p>{project.summary}</p>
                <ul className="qp-list">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Link href={project.href} prefetch={false}>
                  View project <span aria-hidden="true">↗</span><span className="quiet-sr-only">: {project.title}</span>
                </Link>
              </div>
            </details>
          ))}
        </div>
      </QuietSection>

      <QuietSection id="education" title="Education">
        <dl>
          {educationItems.map((item) => (
            <div key={item.school} className="qp-row">
              <dt>{item.period}</dt>
              <dd>{item.detail}, {item.school}</dd>
            </div>
          ))}
        </dl>
      </QuietSection>
    </QuietPage>
  );
}
