import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProjectEvidenceLens } from "../components/ProjectEvidenceLens";
import { StructuredData } from "../components/StructuredData";
import { projects } from "../data/projects";
import { educationItems, experienceItems } from "../data/resume";
import { contactLinks, resumeHref, skills, snapshotItems } from "../data/siteContent";
import { getSiteUrl, siteConfig } from "../lib/site";

const emailLink = contactLinks.find((link) => link.label === "Email");
const personEmail = emailLink ? emailLink.href.replace(/^mailto:/, "") : undefined;

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const focusAreas = [
  {
    title: "Product systems",
    body: "Go, Spring Boot, and Next.js products where backend state owns the real rules: rooms, tickets, attempts, activities, media, and approvals.",
    links: [
      { label: "Gathr", href: "/projects/gathrly" },
      { label: "VibeGrid", href: "/projects/vibegrid" },
      { label: "ResolveOps", href: "/projects/resolveops" },
      { label: "Murmur", href: "/projects/murmur" },
    ],
  },
  {
    title: "Data platforms",
    body: "Operational writes, event streams, customer CSV ingestion, dbt/DuckDB marts, quality checks, pipeline artifacts, dashboards, and business-facing metrics.",
    links: [
      { label: "Stockout Pipeline", href: "/projects/inventory-management-sys" },
      { label: "Logistics", href: "/projects/logistics-data-engineering" },
    ],
  },
  {
    title: "ML systems",
    body: "Feature contracts, leakage-safe evaluation, calibration, deploy bundles, proof packs, monitoring endpoints, and honest limits.",
    links: [
      { label: "Fraud", href: "/projects/fraud-detection-platform" },
      { label: "Instacart", href: "/projects/instacart-reorder-recommender" },
      { label: "Enefit", href: "/projects/enefit-forecasting" },
    ],
  },
];

const domainItems = [
  "Spring Boot",
  "Go",
  "FastAPI",
  "Next.js",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "DuckDB",
  "dbt",
  "WebSocket",
  "REST APIs",
  "JPA/Hibernate",
  "JWT Auth",
  "ACID transactions",
  "Rate limiting",
  "Caching",
  "LightGBM",
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
    "gathrly",
    "vibegrid",
    "murmur",
    "resolveops",
    "punchline",
    "mini-market",
    "ramble",
    "closetdelta",
    "receipt-scanner",
    "inventory-management-sys",
    "logistics-data-engineering",
    "enefit-forecasting",
    "fraud-detection-platform",
    "instacart-reorder-recommender",
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
    description: siteConfig.description,
    url: siteUrl,
    ...(personEmail ? { email: personEmail } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.location,
    },
    knowsAbout: skills,
    alumniOf: educationItems.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.school,
    })),
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
            <h1 id="home-title">Software engineer building backend-heavy products and data systems.</h1>
            <p>
              I'm Uday. I build Spring Boot, Go, FastAPI, and Next.js systems where the interesting
              work lives in backend contracts, product workflows, transactional state, realtime
              behavior, data pipelines, ML artifacts, and honest proof paths.
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
                className="button button-ghost"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
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
        title="The work is product-first, with serious backend and data depth."
        note="Start with the projects where domain rules, transactions, realtime behavior, queues, evaluation artifacts, and proof paths are visible."
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
        title="The technical surface area I want to be judged on."
        className="section-muted"
      >
        <div className="domain-cloud" aria-label="Domains">
          {domainItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Selected work"
        title="Fourteen local projects, grouped by what they demonstrate."
        note="Use the lens if you're scoping for a specific role. The strongest entries pair product intent with implementation detail, metrics, proof paths, and honest limits."
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
        title="Recent backend work and foundation."
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
