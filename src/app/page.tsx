import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { StructuredData } from "../components/StructuredData";
import { noteEntries, notesPlaceholder } from "../data/notes";
import { projects } from "../data/projects";
import { experienceItems } from "../data/resume";
import {
  aboutBlurb,
  contactLinks,
  pillarCards,
  resumeHref,
  skills,
  snapshotItems,
  workPrinciples,
} from "../data/siteContent";
import { getSiteUrl, siteConfig } from "../lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);
  const socialLinks = contactLinks.filter((link) => link.href.startsWith("http"));
  const githubLink = contactLinks.find((link) => link.label === "GitHub");
  const isResumeExternal = resumeHref.startsWith("http");
  const resumeProps = isResumeExternal
    ? { href: resumeHref, target: "_blank", rel: "noreferrer" as const }
    : { href: resumeHref };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Software Engineer",
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.location,
    },
    knowsAbout: skills,
    sameAs: socialLinks.map((link) => link.href),
  };

  return (
    <>
      <StructuredData data={personJsonLd} />

      <section className="hero section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Software Engineer</p>
            <h1>I build backend systems and ML projects.</h1>
            <p className="lead">
              Most of my work sits in three areas: Java backend services, data pipelines, and ML
              systems. This site is a simple overview of the projects I think are worth showing.
            </p>
            <p className="availability-note">
              Open to backend, platform, and ML engineering roles.
            </p>
            <div className="cta-row">
              <Link className="button button-solid" href="/projects">
                View Projects
              </Link>
              {isResumeExternal ? (
                <a className="button button-ghost" {...resumeProps}>
                  Resume
                </a>
              ) : (
                <Link className="button button-ghost" href={resumeHref}>
                  Resume
                </Link>
              )}
              {githubLink ? (
                <a className="button button-ghost" href={githubLink.href} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
            </div>
            <div className="inline-link-row">
              <Link className="inline-link" href="/projects/inventory-analytics-platform">
                Event-Driven Inventory
              </Link>
              <Link className="inline-link" href="/projects/gathr">
                Gathr
              </Link>
              <Link className="inline-link" href="/projects/habit-tracker-social">
                Habit Tracker
              </Link>
            </div>
          </div>

          <aside className="snapshot-card">
            <p className="eyebrow">Role Fit</p>
            <dl className="snapshot-list">
              {snapshotItems.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Main Areas"
            title="Backend work and ML work"
            note="Those are the two main themes of the portfolio."
          />
          <div className="pillar-grid">
            {pillarCards.map((pillar) => (
              <article key={pillar.title} className="pillar-card">
                <p className="eyebrow">{pillar.title}</p>
                <p>{pillar.body}</p>
                <div className="inline-link-row">
                  {pillar.links.map((link) => (
                    <Link key={link.href} className="inline-link" href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Selected Work"
            title="Start with these projects"
            note="These are the best places to start."
          />
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Work Experience"
            title="Work experience"
            note="Short version here. Full details on the resume page."
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
            <Link className="inline-link" href="/experience">
              Experience page
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-shell">
          <div className="about-copy">
            <p className="eyebrow">Approach</p>
            <h2>I like simple systems and clear boundaries.</h2>
            <p className="body-copy">{aboutBlurb}</p>
            <div className="inline-link-row">
              <Link className="inline-link" href="/projects">
                Browse all case studies
              </Link>
              {isResumeExternal ? (
                <a className="inline-link" {...resumeProps}>
                  Open resume doc
                </a>
              ) : (
                <Link className="inline-link" href={resumeHref}>
                  Read the resume view
                </Link>
              )}
              <Link className="inline-link" href="/#contact">
                Contact
              </Link>
            </div>
          </div>
          <div className="principles-grid">
            {workPrinciples.map((principle) => (
              <div key={principle.title} className="principle-card">
                <p className="eyebrow">{principle.title}</p>
                <p>{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Notes"
            title="Notes"
            note="Short writing on systems, ML work, and product decisions."
          />
          <div className="notes-grid">
            {noteEntries.length > 0 ? (
              noteEntries.map((entry) => (
                <article key={entry.slug} className="note-card">
                  <p className="eyebrow">{entry.eyebrow}</p>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                  <ul className="resume-list">
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))
            ) : (
              <article className="note-card note-card-placeholder">
                <p className="eyebrow">{notesPlaceholder.eyebrow}</p>
                <h3>{notesPlaceholder.title}</h3>
                <p>{notesPlaceholder.summary}</p>
              </article>
            )}
          </div>
          <div className="inline-link-row">
            <Link className="inline-link" href="/notes">
              Notes page
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-last">
        <div className="container">
          <div className="contact-card">
            <p className="eyebrow">Contact</p>
            <h2>Want to work together?</h2>
            <p className="contact-copy">
              Email is the best way to reach me. If you want the quick version, start with
              Event-Driven Inventory, Gathr, Kalshi, and Enefit, then check GitHub or the resume.
            </p>
            <div className="contact-links">
              {contactLinks.map((link) => {
                const isExternal = link.href.startsWith("http");

                return (
                  <a
                    key={link.label}
                    className="contact-link"
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
        </div>
      </section>
    </>
  );
}
