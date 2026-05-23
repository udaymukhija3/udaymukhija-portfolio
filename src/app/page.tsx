import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProjectEvidenceLens } from "../components/ProjectEvidenceLens";
import { StructuredData } from "../components/StructuredData";
import { projects } from "../data/projects";
import { educationItems, experienceItems } from "../data/resume";
import { contactLinks, resumeHref, skills, snapshotItems } from "../data/siteContent";
import { getSiteUrl, siteConfig } from "../lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const focusAreas = [
  {
    title: "Backend systems",
    body: "Java and Spring Boot services, APIs, persistence, product state, and event-driven boundaries.",
    links: [
      { label: "Gathr", href: "/projects/gathr" },
      { label: "Inventory", href: "/projects/inventory-analytics-platform" },
    ],
  },
  {
    title: "ML products",
    body: "Forecasting, recommendations, evaluation, serving paths, and model behavior that can be explained.",
    links: [
      { label: "Enefit", href: "/projects/enefit-forecasting" },
      { label: "Fraud detection", href: "/projects/fraud-detection-system" },
    ],
  },
  {
    title: "Data platforms",
    body: "Marts, contracts, SQL quality checks, pipelines, and analytics paths close to operational systems.",
    links: [
      { label: "Logistics", href: "/projects/logistics-data-platform" },
      { label: "Instacart", href: "/projects/instacart-reordering-system" },
    ],
  },
];

const domainItems = [
  "Backend",
  "Data platforms",
  "ML systems",
  "Recommendations",
  "Forecasting",
  "Product engineering",
  "APIs",
];

function HomeSection({
  id,
  eyebrow,
  title,
  note,
  children,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section home-section ${className}`}>
      <div className="container">
        <div className="home-section-header">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {note ? <p>{note}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function HomePage() {
  const featuredProjectSlugs = [
    "inventory-analytics-platform",
    "gathr",
    "logistics-data-platform",
    "habit-tracker-social",
    "enefit-forecasting",
    "fraud-detection-system",
    "instacart-reordering-system",
  ];
  const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);

    return project ? [project] : [];
  });
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

      <section className="home-hero" aria-labelledby="home-title">
        <div className="container">
          <div className="home-kicker">
            <span>Software Engineer</span>
            <span>{siteConfig.location}</span>
          </div>

          <div className="home-hero-copy">
            <h1 id="home-title">Backend, data, and ML systems with product restraint.</h1>
            <p>
              I build Java services, data pipelines, ML projects, and product prototypes with clear
              interfaces and a bias toward systems you can inspect, debug, and defend.
            </p>
          </div>

          <div className="home-actions" aria-label="Primary links">
            <Link className="button button-solid" href="/projects">
              View projects
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
            {profileLinks.map((link) => (
              <a
                key={link.label}
                className="quiet-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="material-strip" aria-hidden="true">
            <img src="/icon.svg" alt="" />
            <span className="material-swatch material-sage" />
            <span className="material-swatch material-ash" />
            <span className="material-swatch material-clay" />
            <span className="material-line" />
          </div>

          <dl className="snapshot-strip" aria-label="Portfolio snapshot">
            {snapshotItems.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <HomeSection
        eyebrow="Focus"
        title="The work sits in three quiet lanes."
        note="Each lane points to projects where the choices, tradeoffs, and next fixes are visible."
      >
        <div className="focus-grid">
          {focusAreas.map((area) => (
            <article key={area.title} className="focus-card">
              <h3>{area.title}</h3>
              <p>{area.body}</p>
              <div className="inline-link-row">
                {area.links.map((link) => (
                  <Link key={link.href} className="inline-link" href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Domains"
        title="A narrow surface area, intentionally."
        className="section-muted"
      >
        <div className="domain-cloud" aria-label="Domains">
          {domainItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Selected Work"
        title="A filtered view of the evidence."
        note="Use the lens if you care about a specific role fit. The strongest projects pair implementation detail with proof paths, metrics, and honest limits."
      >
        <ProjectEvidenceLens projects={featuredProjects} />
        <div className="section-actions">
          <Link className="inline-link" href="/projects">
            View all projects
          </Link>
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Experience"
        title="Recent work and foundation."
        className="section-tight"
      >
        <div className="two-column">
          <div className="quiet-panel">
            <h3>Experience</h3>
            <div className="timeline-list">
              {experienceItems.map((item) => (
                <article key={item.company}>
                  <div>
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <h4>{item.role}</h4>
                  <p>{item.company}</p>
                  <p>{item.bullets[0]}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="quiet-panel">
            <h3>Foundation</h3>
            <div className="education-list">
              {educationItems.map((item) => (
                <article key={item.school}>
                  <span>{item.period}</span>
                  <h4>{item.school}</h4>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </HomeSection>

      <HomeSection
        id="contact"
        eyebrow="Contact"
        title="If the work lines up, reach out."
        className="section-last contact-section"
      >
        <div className="contact-strip">
          {contactLinks.map((link) => {
            const isExternal = link.href.startsWith("http");

            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </HomeSection>
    </>
  );
}
