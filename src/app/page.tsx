import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
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

const domainItems = [
  "Backend",
  "Data platforms",
  "ML systems",
  "Recommendations",
  "Forecasting",
  "Product engineering",
  "APIs",
];

const expertiseRows = [
  {
    input: "JAVA",
    action: "services / APIs / product state",
    outputs: [
      { label: "Gathr", href: "/projects/gathr" },
      { label: "Habit", href: "/projects/habit-tracker-social" },
      { label: "Inventory", href: "/projects/inventory-analytics-platform" },
    ],
  },
  {
    input: "PYTHON",
    action: "ML pipelines / evaluation / serving",
    outputs: [
      { label: "Enefit", href: "/projects/enefit-forecasting" },
      { label: "Fraud", href: "/projects/fraud-detection-system" },
      { label: "Instacart", href: "/projects/instacart-reordering-system" },
    ],
  },
  {
    input: "SQL / DBT",
    action: "marts / contracts / quality checks",
    outputs: [
      { label: "Logistics", href: "/projects/logistics-data-platform" },
      { label: "Inventory", href: "/projects/inventory-analytics-platform" },
    ],
  },
];

function SheetSection({
  id,
  title,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`sheet-section ${className}`}>
      <div className="sheet-heading">
        <h2>{title}</h2>
      </div>
      {children}
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

      <section className="section section-last datasheet-page" aria-labelledby="datasheet-title">
        <div className="container datasheet-shell">
          <div className="sheet-titlebar">
            <p>DATASHEET</p>
            <h1 id="datasheet-title">{siteConfig.name}</h1>
          </div>

          <div className="sheet-intro">
            <p>
              Software engineer focused on backend systems, ML-heavy products, data pipelines, and
              practical platform work.
            </p>
            <p>
              I build mostly with Java, Spring Boot, Python, SQL, and TypeScript. The projects here
              are written as evidence: local repos, demo paths, evaluation artifacts, architecture
              choices, tradeoffs, and the next fixes I would make.
            </p>
            <p>
              Best current fit: backend, platform, data-intensive product, and ML systems roles
              where clear interfaces and debuggable behavior matter.
            </p>
          </div>

          <div className="quick-actions" aria-label="Primary links">
            <Link className="box-link" href="/projects">
              PROJECTS
            </Link>
            {isResumeExternal ? (
              <a className="box-link" {...resumeProps}>
                RESUME
              </a>
            ) : (
              <Link className="box-link" href={resumeHref}>
                RESUME
              </Link>
            )}
            {profileLinks.map((link) => (
              <a
                key={link.label}
                className="box-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </div>

          <SheetSection title="Snapshot">
            <dl className="fact-grid">
              {snapshotItems.map((item) => (
                <div key={item.label} className="fact-item">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </SheetSection>

          <SheetSection title="Domains">
            <div className="domain-line" aria-label="Domains">
              {domainItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </SheetSection>

          <SheetSection title="Expertise" className="expertise-section">
            <div className="expertise-diagram" aria-label="Expertise map">
              <div className="expertise-inputs">
                {expertiseRows.map((row) => (
                  <span key={row.input}>{row.input}</span>
                ))}
              </div>
              <div className="expertise-core">BUILD / DEBUG / SHIP</div>
              <div className="expertise-flows">
                {expertiseRows.map((row) => (
                  <div key={row.input} className="flow-row">
                    <span>{row.action}</span>
                    <span aria-hidden="true">-&gt;</span>
                    <div className="flow-links">
                      {row.outputs.map((output) => (
                        <Link key={output.href} href={output.href}>
                          {output.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SheetSection>

          <SheetSection title="Selected Work">
            <div className="sheet-table">
              {featuredProjects.map((project) => (
                <article key={project.slug} className="sheet-row project-sheet-row">
                  <div className="sheet-row-meta">
                    <span>{project.year}</span>
                    <span>{project.label}</span>
                  </div>
                  <div className="sheet-row-main">
                    <h3>
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p>{project.summary}</p>
                  </div>
                  <div className="sheet-row-tail">
                    <span>{project.stack.slice(0, 3).join(" / ")}</span>
                    <Link href={`/projects/${project.slug}`}>case study</Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="sheet-after">
              <Link className="inline-link" href="/projects">
                all projects
              </Link>
            </div>
          </SheetSection>

          <SheetSection title="Experience">
            <div className="sheet-table">
              {experienceItems.map((item) => (
                <article key={item.company} className="sheet-row">
                  <div className="sheet-row-meta">
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <div className="sheet-row-main">
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <div className="sheet-row-tail">
                    <span>{item.bullets[0]}</span>
                  </div>
                </article>
              ))}
            </div>
          </SheetSection>

          <SheetSection title="Foundation">
            <div className="compact-list">
              {educationItems.map((item) => (
                <p key={item.school}>
                  <span>{item.period}</span>
                  <strong>{item.school}</strong>
                  <span>{item.detail}</span>
                </p>
              ))}
            </div>
          </SheetSection>

          <SheetSection id="contact" title="Contact">
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
          </SheetSection>
        </div>
      </section>
    </>
  );
}
