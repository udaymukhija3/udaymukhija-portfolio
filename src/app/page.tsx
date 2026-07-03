import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StructuredData } from "../components/StructuredData";
import { projects } from "../data/projects";
import { educationItems } from "../data/resume";
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

const featuredProjectSlugs = [
  "gathrly",
  "vibegrid",
  "inventory-management-sys",
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

const featuredDescriptions: Record<string, string> = {
  gathrly:
    "Private-alpha local planning product with activity lifecycle state, auth, realtime chat, reliability, safety, and privacy flows.",
  vibegrid:
    "Server-authoritative daily puzzle game with transaction-safe guesses and production-minded deploy scaffolding.",
  "inventory-management-sys":
    "Event-driven inventory analytics pipeline connecting transactional writes to Kafka, ETL, serving, dbt marts, and stockout backtest evidence.",
};

const featuredProofs: Record<string, string[]> = {
  gathrly: [
    "Backend-owned activity lifecycle, OTP auth, reliability, safety, and privacy flows",
    "Spring Boot, Postgres, Redis, Flyway, and WebSocket/STOMP chat paths",
    "Product judgment around private-beta scope and reviewer-visible proof paths",
  ],
  vibegrid: [
    "Server-side answer secrecy and idempotent guess handling",
    "Postgres attempt locking, guest sessions, health checks, metrics, and deploy path",
    "A compact game loop with admin publishing, moderation, and share surfaces",
  ],
  "inventory-management-sys": [
    "Transactional outbox from inventory writes into Kafka",
    "Idempotent ETL, Redis/FastAPI serving, Parquet artifacts, and dbt marts",
    "Stockout-prevention backtest with a CI-gated recall threshold",
  ],
};

const strengthItems = [
  "private access control",
  "stateful workflows",
  "realtime collaboration",
  "transactional correctness",
  "data pipelines",
  "AI workflows with human approval",
  "evaluation and monitoring",
];

function FeaturedProjectCard({ project }: { project: Project }) {
  const proof = getFact(project, "Proof") ?? project.status;
  const githubLink = project.links.find((link) => link.href.includes("github.com"));
  const demoLink = project.links.find(
    (link) => !link.href.includes("github.com") && link.label.toLowerCase().includes("demo"),
  );

  return (
    <article className="featured-project-card">
      <div className="project-card-meta">
        <p className="project-kicker">{project.label}</p>
        <p className="project-status">{project.status}</p>
      </div>
      <h3>
        <Link className="project-title-link" href={`/projects/${project.slug}`}>
          {project.title}
        </Link>
      </h3>
      <p className="project-summary">{featuredDescriptions[project.slug] ?? project.summary}</p>

      <div className="project-proof-block">
        <p>What it proves:</p>
        <ul>
          {(featuredProofs[project.slug] ?? project.highlights.slice(0, 3)).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <dl className="project-evaluation-meta">
        <div>
          <dt>Status</dt>
          <dd>{project.status}</dd>
        </div>
        <div>
          <dt>Evaluation path</dt>
          <dd>{proof}</dd>
        </div>
      </dl>

      <div className="project-links">
        <Link className="project-link project-link-primary" href={`/projects/${project.slug}`}>
          Case study
        </Link>
        {githubLink ? (
          <a className="project-link" href={githubLink.href} target="_blank" rel="noreferrer">
            GitHub
          </a>
        ) : null}
        {demoLink ? (
          <a className="project-link" href={demoLink.href} target="_blank" rel="noreferrer">
            Demo
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function HomePage() {
  const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);

    return project ? [project] : [];
  });
  const socialLinks = contactLinks.filter((link) => link.href.startsWith("http"));
  const isResumeExternal = resumeHref.startsWith("http");
  const resumeProps = isResumeExternal
    ? { href: resumeHref, target: "_blank", rel: "noreferrer" as const }
    : { href: resumeHref };
  const emailHref = emailLink?.href ?? "mailto:udaymukhija3@gmail.com";
  const githubLink = contactLinks.find((link) => link.label === "GitHub");
  const linkedInLink = contactLinks.find((link) => link.label === "LinkedIn");

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
            <h1 id="home-title">
              Software engineer building backend-heavy products, data systems, and AI workflows.
            </h1>
            <p className="hero-lede">
              I design product loops that hold up beyond the demo: API contracts, transactional
              state, auth, realtime behavior, queues, data pipelines, evals, observability, and
              deployment paths reviewers can inspect.
            </p>
            <p className="hero-start">
              Start with <Link href="/projects/gathrly">Gathr</Link>,{" "}
              <Link href="/projects/vibegrid">VibeGrid</Link>, and{" "}
              <Link href="/projects/inventory-management-sys">Stockout Pipeline</Link>.
            </p>

            <div className="home-actions" aria-label="Primary links">
              <Link className="button button-solid" href="/projects">
                Work
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

            <dl className="availability-grid" aria-label="Availability and fit">
              <div>
                <dt>Available for</dt>
                <dd>Backend, platform, data-intensive, and AI product engineering roles</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>India / Remote</dd>
              </div>
              <div>
                <dt>Preferred stack</dt>
                <dd>Go, Java/Spring Boot, Postgres, Redis, Next.js</dd>
              </div>
              <div>
                <dt>Best proof</dt>
                <dd>Gathr, VibeGrid, Stockout Pipeline</dd>
              </div>
            </dl>
          </div>

          <aside className="hero-brief" aria-label="Fast reviewer path">
            <dl>
              <div>
                <dt>Start here</dt>
                <dd>Three case studies before the full archive.</dd>
              </div>
              <div>
                <dt>What to inspect</dt>
                <dd>Architecture, status metadata, smoke paths, and source links.</dd>
              </div>
              <div>
                <dt>Then go deeper</dt>
                <dd>The project archive is available when you want more breadth.</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <HomeSection
        id="work"
        eyebrow="Start here"
        title="Three projects that carry the strongest signal."
        note="The homepage is intentionally curated. The archive stays available for additional depth."
      >
        <div className="featured-project-grid">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Strength"
        title="What I'm strong at"
        note="I am strongest where product behavior creates backend complexity:"
        className="section-muted"
      >
        <ul className="strength-list">
          {strengthItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </HomeSection>

      <HomeSection
        eyebrow="More work"
        title="Additional systems are available, but secondary."
        note="The archive holds the broader set of product, data, and ML case studies without making the homepage a catalog."
      >
        <div className="archive-strip">
          <p>
            Use it when you want to compare more systems after the top three: private media,
            AI-assisted support, logistics marts, fraud scoring, and forecasting.
          </p>
          <Link className="inline-link" href="/projects">
            Open project archive
          </Link>
        </div>
      </HomeSection>

      <HomeSection
        id="contact"
        eyebrow="Contact"
        title="Want to evaluate the work quickly?"
        className="section-last contact-section"
        note="Start with the three featured case studies, then open the repos and proof paths."
      >
        <div className="contact-strip">
          <a className="button button-solid" href={emailHref}>
            Email me
          </a>
          {isResumeExternal ? (
            <a className="button button-ghost" {...resumeProps}>
              View resume
            </a>
          ) : (
            <Link className="button button-ghost" href={resumeHref}>
              View resume
            </Link>
          )}
          {githubLink ? (
            <a className="button button-ghost" href={githubLink.href} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {linkedInLink ? (
            <a className="button button-ghost" href={linkedInLink.href} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          ) : null}
        </div>
      </HomeSection>
    </>
  );
}
