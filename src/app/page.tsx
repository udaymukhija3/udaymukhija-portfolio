import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import { StructuredData } from "../components/StructuredData";
import { projects } from "../data/projects";
import { skills, snapshotItems } from "../data/siteContent";
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
  };

  return (
    <>
      <StructuredData data={personJsonLd} />

      <section className="hero section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Software Engineer</p>
            <h1>I build thoughtful software systems that survive contact with reality.</h1>
            <p className="lead">
              I work across backend, product-facing engineering, and ML systems. I like clean
              architecture, practical tradeoffs, and shipping things that are technically solid
              and actually useful.
            </p>
            <div className="cta-row">
              <Link className="button button-solid" href="/projects">
                View Projects
              </Link>
              <Link className="button button-ghost" href="/#contact">
                Get in Touch
              </Link>
            </div>
          </div>

          <aside className="snapshot-card">
            <p className="eyebrow">Snapshot</p>
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
        <div className="container teaser-shell">
          <div>
            <p className="eyebrow">Architecture</p>
            <h2>Rendered as HTML for humans, crawlers, and search engines</h2>
          </div>
          <div className="body-copy">
            <p>
              This site now uses the Next.js App Router so your content can be rendered on the
              server and delivered as real HTML instead of depending on client-side JavaScript to
              assemble the page.
            </p>
            <div className="cta-row">
              <Link className="button button-solid" href="/projects">
                Browse Project Library
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Featured Work"
            title="Selected projects"
            note="The cards below link to dedicated project pages, which gives each project its own crawlable URL."
          />
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container skills-layout">
          <div>
            <p className="eyebrow">Skills</p>
            <h2>Technical strengths</h2>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill} className="skill-card">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section section-last">
        <div className="container">
          <div className="contact-card">
            <p className="eyebrow">Contact</p>
            <h2>Let's build something good</h2>
            <p className="contact-copy">
              Replace the placeholders below with your real email, GitHub, LinkedIn, and resume.
            </p>
            <div className="contact-links">
              <a className="contact-link" href="mailto:you@example.com">
                Email
              </a>
              <a className="contact-link" href="https://github.com" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="contact-link" href="https://linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="contact-link" href="#">
                Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
