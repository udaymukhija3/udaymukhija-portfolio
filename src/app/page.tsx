import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StructuredData } from "../components/StructuredData";
import { projects } from "../data/projects";
import { educationItems, experienceItems } from "../data/resume";
import { contactLinks, resumeHref, skills } from "../data/siteContent";
import { getSiteUrl, siteConfig } from "../lib/site";
import type { Project } from "../types";

const emailLink = contactLinks.find((link) => link.label === "Email");
const personEmail = emailLink ? emailLink.href.replace(/^mailto:/, "") : undefined;

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const proofAreas = [
  {
    label: "Product systems",
    title: "I ship the stateful product loop.",
    body: "Activities, puzzle attempts, private voice rooms, ticket approvals, receipts, and inventory flows are modeled behind explicit backend contracts.",
  },
  {
    label: "Data platforms",
    title: "I make the proof path inspectable.",
    body: "The stronger projects include migrations, smoke tests, quality checks, dashboards, evaluation artifacts, and README-level evidence for reviewers.",
  },
  {
    label: "ML and AI",
    title: "I keep model claims honest.",
    body: "AI and ML work is framed around feature contracts, deterministic guardrails, human approval, calibration, serving bundles, and documented limits.",
  },
];

const stackGroups = [
  {
    label: "Backend",
    items: ["Java", "Spring Boot", "Go", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    label: "Product",
    items: ["Next.js", "TypeScript", "REST APIs", "WebSocket", "JWT auth", "Docker"],
  },
  {
    label: "Data and ML",
    items: ["Kafka", "DuckDB", "dbt", "Python", "LightGBM", "quality checks"],
  },
];

const spotlightProjectSlugs = [
  "gathrly",
  "vibegrid",
  "murmur",
  "resolveops",
  "inventory-management-sys",
  "fraud-detection-platform",
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

function getFact(project: Project, label: string) {
  return project.facts.find((fact) => fact.label === label)?.value;
}

function SpotlightProject({ project }: { project: Project }) {
  const bestFit = getFact(project, "Best fit") ?? project.label;
  const proof = getFact(project, "Proof") ?? project.status;

  return (
    <article className="spotlight-row">
      <div className="work-meta">
        <span>{project.year}</span>
        <span>{project.label}</span>
      </div>

      <div className="spotlight-main">
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
        <div className="evidence-proof">
          <span>{bestFit}</span>
          <span>{proof}</span>
        </div>
      </div>

      <div className="spotlight-side">
        <p>{project.stack.slice(0, 4).join(" / ")}</p>
        <Link className="inline-link" href={`/projects/${project.slug}`}>
          Case study
        </Link>
      </div>
    </article>
  );
}

export default function HomePage() {
  const spotlightProjects = spotlightProjectSlugs.flatMap((slug) => {
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
        <div className="container home-hero-shell">
          <div className="home-hero-copy">
            <p className="eyebrow">Uday Mukhija</p>
            <h1 id="home-title">Software engineer for backend-heavy products and data systems.</h1>
            <p className="hero-lede">
              I build the parts that make products real: API contracts, transactional workflows,
              realtime state, data pipelines, evaluation artifacts, and proof paths a reviewer can
              inspect.
            </p>

            <div className="home-actions" aria-label="Primary links">
              <Link className="button button-solid" href="/projects">
                See the work
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

            <div className="hero-profile-links" aria-label="Profile links">
              {profileLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
              <a href="#contact">Email</a>
            </div>
          </div>

          <aside className="hero-brief" aria-label="Portfolio snapshot">
            <img src="/icon.svg" alt="" aria-hidden="true" />
            <dl>
              <div>
                <dt>Based in</dt>
                <dd>{siteConfig.location}</dd>
              </div>
              <div>
                <dt>Core stack</dt>
                <dd>Java, Go, FastAPI, Next.js, PostgreSQL</dd>
              </div>
              <div>
                <dt>Portfolio</dt>
                <dd>{projects.length} repo-grounded case studies</dd>
              </div>
              <div>
                <dt>Strongest proof</dt>
                <dd>Gathr, VibeGrid, Murmur, Stockout Pipeline, Fraud</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <HomeSection
        eyebrow="Positioning"
        title="Clear product judgment, with engineering depth behind it."
        note="The site is organized around what the work proves, not just what libraries appear in the stack."
      >
        <div className="proof-grid">
          {proofAreas.map((area) => (
            <article key={area.label} className="proof-item">
              <p className="eyebrow">{area.label}</p>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
            </article>
          ))}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Stack"
        title="Broad tools, one throughline: systems that hold up under real product behavior."
        className="section-muted"
      >
        <div className="stack-matrix" aria-label="Technical strengths">
          {stackGroups.map((group) => (
            <section key={group.label} className="stack-group">
              <h3>{group.label}</h3>
              <p>{group.items.join(" / ")}</p>
            </section>
          ))}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Selected work"
        title="Six entry points. The full archive is there when you want depth."
        note="These are the fastest reads if you want to understand my judgment: product loops, backend state, data proof paths, and honest ML or AI boundaries."
      >
        <div className="spotlight-list">
          {spotlightProjects.map((project) => (
            <SpotlightProject key={project.slug} project={project} />
          ))}
        </div>
        <div className="section-actions">
          <Link className="inline-link" href="/projects">
            View all {projects.length} projects
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
