import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { StructuredData } from "../components/StructuredData";
import { noteEntries } from "../data/notes";
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
    jobTitle: "Core Java Backend and ML Systems Engineer",
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
            <p className="eyebrow">Core Java Backend and ML Systems Engineer</p>
            <h1>I build Java backend systems and ML workflows that hold up under real constraints.</h1>
            <p className="lead">
              The site is intentionally built around two pillars: Core Java backend engineering and
              ML systems thinking. Recent work spans Spring Boot services, event-driven inventory,
              ranking-aware product systems, forecasting pipelines, and feature-serving boundaries.
            </p>
            <p className="availability-note">
              Best fit: core Java backend, backend platform, and ML systems engineering roles.
            </p>
            <div className="cta-row">
              <Link className="button button-solid" href="/projects">
                View Selected Work
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
              <Link className="inline-link" href="/projects/kalshi-prediction-platform">
                Kalshi Platform
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
            eyebrow="Two Pillars"
            title="The portfolio is intentionally anchored in Java backend work and ML systems engineering"
            note="The goal is not to look broad for its own sake. It is to show depth in backend implementation and rigor in model-adjacent system design."
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
            title="Start with the work that best represents the two pillars"
            note="Two Java/backend-heavy case studies and two ML-system-heavy case studies are featured first so the narrative reads the right way without extra explanation."
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
            title="Space for experience, not just projects"
            note="This section is here so the site can stand on its own even before the public resume doc is linked."
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
        </div>
      </section>

      <section className="section">
        <div className="container about-shell">
          <div className="about-copy">
            <p className="eyebrow">How I Work</p>
            <h2>Backend-first engineering with explicit ML systems discipline.</h2>
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
            title="Interests, current reading, and what I am working on"
            note="A lighter section for current curiosity and in-progress thinking. More like a working notebook than a polished blog."
          />
          <div className="notes-grid">
            {noteEntries.map((entry) => (
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
            ))}
          </div>
          <div className="inline-link-row">
            <Link className="inline-link" href="/notes">
              Open notes page
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-last">
        <div className="container">
          <div className="contact-card">
            <p className="eyebrow">Contact</p>
            <h2>Hiring for core Java backend or ML systems work?</h2>
            <p className="contact-copy">
              Email is best. If you want the fastest scan first, start with Event-Driven Inventory
              Analytics, Gathr, Kalshi Prediction Market Analytics Platform, and Enefit Forecasting,
              then jump to GitHub or the resume.
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
