import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { StructuredData } from "../components/StructuredData";
import { projects } from "../data/projects";
import { aboutBlurb, contactLinks, skills, snapshotItems, workPrinciples } from "../data/siteContent";
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

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Backend and Full-Stack Engineer",
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
            <p className="eyebrow">Backend and Full-Stack Engineer</p>
            <h1>I build product systems that are clear, reliable, and worth shipping.</h1>
            <p className="lead">
              I work across Java, Python, and TypeScript, with recent projects in social
              coordination, habit tracking, event-driven inventory, logistics data platforms, and
              ML-backed product systems.
            </p>
            <p className="availability-note">
              Best fit: backend, full-stack, and startup product engineering roles.
            </p>
            <div className="cta-row">
              <Link className="button button-solid" href="/projects">
                View Selected Work
              </Link>
              <Link className="button button-ghost" href="/resume">
                Resume
              </Link>
              {githubLink ? (
                <a className="button button-ghost" href={githubLink.href} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
            </div>
            <div className="inline-link-row">
              <Link className="inline-link" href="/projects/gathr">
                Start with Gathr
              </Link>
              <Link className="inline-link" href="/projects/habit-tracker-social">
                Habit Tracker Social
              </Link>
              <Link className="inline-link" href="/projects/inventory-analytics-platform">
                Event-Driven Inventory
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
            eyebrow="Selected Work"
            title="Start with the projects that best show ownership"
            note="These three projects are the fastest path to understanding how I think about product systems, backend boundaries, and shipping discipline."
          />
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-shell">
          <div className="about-copy">
            <p className="eyebrow">How I Work</p>
            <h2>Product-minded engineering with clear contracts and visible tradeoffs.</h2>
            <p className="body-copy">{aboutBlurb}</p>
            <div className="inline-link-row">
              <Link className="inline-link" href="/projects">
                Browse all case studies
              </Link>
              <Link className="inline-link" href="/resume">
                Read the resume view
              </Link>
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

      <section id="contact" className="section section-last">
        <div className="container">
          <div className="contact-card">
            <p className="eyebrow">Contact</p>
            <h2>Hiring for backend, full-stack, or product-minded engineering?</h2>
            <p className="contact-copy">
              Email is best. If you want the fastest scan first, start with Gathr, Habit Tracker
              Social, and Event-Driven Inventory Analytics, then jump to the resume page or GitHub.
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
