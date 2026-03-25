import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { StructuredData } from "../components/StructuredData";
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
  const featuredProjectSlugs = new Set([
    "gathr",
    "habit-tracker-social",
    "inventory-analytics-platform",
    "kalshi-prediction-platform",
  ]);
  const featuredProjects = projects.filter((project) => featuredProjectSlugs.has(project.slug));
  const socialLinks = contactLinks.filter((link) => link.href.startsWith("http"));
  const profileLinks = socialLinks.filter(
    (link) => link.label === "GitHub" || link.label === "LinkedIn",
  );
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
        <div className="container hero-shell">
          <div className="hero-copy">
            <p className="eyebrow">Software Engineer</p>
            <h1>I build backend systems and ML projects.</h1>
            <p className="lead">
              I work mostly on Java services, event-driven systems, and ML-heavy products. Start
              with the projects if you want the clearest picture of how I build and make tradeoffs.
            </p>
            <div className="hero-actions">
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
              </div>
              <div className="hero-links" aria-label="Profile links">
                {profileLinks.map((link) => (
                  <a
                    key={link.label}
                    className="hero-link"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-compact-top">
        <div className="container">
          <div className="snapshot-grid" aria-label="Portfolio snapshot">
            {snapshotItems.map((item) => (
              <article key={item.label} className="snapshot-card">
                <p className="eyebrow">{item.label}</p>
                <p>{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects I'd start with"
            note={aboutBlurb}
          />
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="section-actions">
            <Link className="inline-link" href="/projects">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Strengths"
            title="The work tends to cluster into backend and ML systems"
            note="If you're evaluating fit quickly, these lanes and principles are the clearest way to understand how I like to build."
          />
          <div className="pillar-grid">
            {pillarCards.map((card) => (
              <article key={card.title} className="pillar-card">
                <div className="card-copy">
                  <p className="eyebrow">{card.title}</p>
                  <p>{card.body}</p>
                </div>
                <div className="inline-link-row">
                  {card.links.map((link) => (
                    <Link key={link.href} className="inline-link" href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="principles-grid">
            {workPrinciples.map((principle) => (
              <article key={principle.title} className="principle-card">
                <p className="eyebrow">{principle.title}</p>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Experience"
            title="Recent work"
            note="This is the short version. The resume has the fuller timeline."
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
            <Link className="inline-link" href="/resume">
              Read the resume
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-last">
        <div className="container">
          <div className="contact-block">
            <p className="eyebrow">Contact</p>
            <h2>If this lines up with what you're hiring for, reach out.</h2>
            <p className="contact-copy">
              Email is the fastest way to reach me. If you want a quick read first, start with the
              projects page or the resume.
            </p>
            <div className="contact-links">
              {contactLinks.map((link) => {
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
        </div>
      </section>
    </>
  );
}
