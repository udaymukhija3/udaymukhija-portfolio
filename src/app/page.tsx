import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { StructuredData } from "../components/StructuredData";
import { projects } from "../data/projects";
import { experienceItems } from "../data/resume";
import { aboutBlurb, contactLinks, resumeHref, skills } from "../data/siteContent";
import { getSiteUrl, siteConfig } from "../lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.flagship).slice(0, 3);
  const socialLinks = contactLinks.filter((link) => link.href.startsWith("http"));
  const profileLinks = socialLinks.filter(
    (link) => link.label === "GitHub" || link.label === "LinkedIn",
  );
  const isResumeExternal = resumeHref.startsWith("http");
  const resumeProps = isResumeExternal
    ? { href: resumeHref, target: "_blank", rel: "noreferrer" as const }
    : { href: resumeHref };
  const heroMeta = [
    { label: "Based in", value: siteConfig.location },
    { label: "Focus", value: "Backend and ML systems" },
    { label: "Open to", value: "Backend, platform, and ML roles" },
  ];

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
              Most of my work sits in three areas: Java backend services, data pipelines, and ML
              systems. This site is a simple overview of the projects I think are worth showing.
            </p>
            <div className="hero-meta" aria-label="Profile summary">
              {heroMeta.map((item) => (
                <p key={item.label} className="hero-meta-item">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </p>
              ))}
            </div>
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
            <div className="inline-link-row">
              {profileLinks.map((link) => (
                <a key={link.label} className="inline-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects worth starting with"
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
            eyebrow="Experience"
            title="Recent work"
            note="Short version here. The resume has the full details."
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
            <h2>If the work looks relevant, reach out.</h2>
            <p className="contact-copy">
              Email is the fastest route. If you want the short version first, start with the
              projects page or the resume, then reach out if there is a good fit.
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
