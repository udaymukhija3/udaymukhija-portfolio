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
  "murmur",
  "vibegrid",
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
    "Local planning product from the gathr-slice2-complete codebase, built around discovery, joining, confirmation, group chat, safety, privacy, and reviewer proof paths.",
  murmur:
    "Private short-voice product with invite-only rooms, magic-link sign-in, authenticated media, reactions, saved notes, nudges, notifications, and production-hardening work.",
  vibegrid:
    "Server-authoritative daily puzzle product with race-safe guesses, admin publishing, moderation, metrics, and a deployable operating path.",
};

const featuredProofs: Record<string, string[]> = {
  gathrly: [
    "Discovery-to-attendance workflow with join, confirmation, check-in, chat, and post-meet memory paths",
    "Backend-owned reliability, blocked-action reasons, reporting, privacy export, and account deletion",
    "Reviewer paths across backend, mobile, static web demo, launch manifest, and verification docs",
  ],
  murmur: [
    "Invite-only room membership gates room, voice note, playback, and media access",
    "Magic-link sessions, upload validation, heard state, reactions, saved notes, and account export/delete",
    "Notification, PWA, metrics, deployment, and security hardening around a narrow private product loop",
  ],
  vibegrid: [
    "Server-side answer secrecy and duplicate-safe scoring",
    "Guest play, creator links, admin publishing, reports, appeals, and moderation surfaces",
    "Launch-minded health checks, metrics, rate limits, smoke tests, and deployment notes",
  ],
};

const strengthItems = [
  "product loops with real backend state",
  "multi-step workflows and admin tools",
  "private access control and permissions",
  "data models that can survive change",
  "data ingestion, validation, and reporting",
  "AI workflows with human approval",
  "production readiness and observability",
  "clear tradeoffs for MVP scope",
];

const helpItems = [
  "Build MVPs from rough product ideas into demo-ready software",
  "Design backend APIs, data models, auth flows, and admin dashboards",
  "Add AI features such as ticket classification, RAG, summarization, extraction, and draft generation",
  "Improve existing apps with pagination, caching, error handling, deployment, and reliability work",
  "Turn operational data into trusted dashboards, reports, and repeatable proof paths",
];

const fitItems = [
  "SaaS MVPs",
  "Internal tools",
  "AI support dashboards",
  "D2C and e-commerce workflows",
  "Backend APIs",
  "Admin panels",
  "AI/RAG integrations",
  "Data pipelines and dashboards",
  "Schema design",
  "Production-readiness audits",
];

const dataWorkItems = [
  {
    title: "Stockout Prevention Data Pipeline",
    href: "/projects/inventory-management-sys",
    body:
      "Turns inventory changes into validated analytics, quality evidence, reporting outputs, and a stockout-prevention backtest.",
  },
  {
    title: "Logistics Customer Ops Pipeline",
    href: "/projects/logistics-data-engineering",
    body:
      "Turns messy customer logistics exports into trusted operations tables, reject reports, SLA views, route productivity reports, and a control-tower dashboard.",
  },
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
              I build backend-heavy product systems for teams with real operational problems.
            </h1>
            <p className="hero-lede">
              I help SaaS founders, D2C brands, and small teams turn rough product ideas into
              working apps, backend systems, dashboards, APIs, data pipelines, and AI-powered
              workflows.
            </p>
            <p className="hero-start">
              Start with <Link href="/projects/gathrly">Gathr</Link>,{" "}
              <Link href="/projects/murmur">Murmur</Link>, and{" "}
              <Link href="/projects/vibegrid">VibeGrid</Link>.
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
                <dt>Best fit</dt>
                <dd>SaaS, D2C, private product loops, internal tools, and data-heavy workflows</dd>
              </div>
              <div>
                <dt>Best proof</dt>
                <dd>Gathr, Murmur, VibeGrid</dd>
              </div>
            </dl>
          </div>

          <aside className="hero-brief" aria-label="Fast reviewer path">
            <dl>
              <div>
                <dt>Start here</dt>
                <dd>Gathr, Murmur, and VibeGrid before the full archive.</dd>
              </div>
              <div>
                <dt>What to look for</dt>
                <dd>Product loop, access control, state, edge cases, proof path, and launch constraints.</dd>
              </div>
              <div>
                <dt>Then go deeper</dt>
                <dd>The archive adds data engineering, AI workflows, ML systems, and smaller product builds.</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <HomeSection
        id="work"
        eyebrow="Start here"
        title="Three headliners that show how I deliver."
        note="Gathr and Murmur show private product systems. VibeGrid shows correctness-heavy product operations. Data engineering and AI work sit deeper in the archive."
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
        note="I am strongest where product behavior creates backend, data, and operational complexity:"
        className="section-muted"
      >
        <ul className="strength-list">
          {strengthItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </HomeSection>

      <HomeSection
        eyebrow="How I can help"
        title="Useful software, not just code."
        note="I think through the product, data model, backend behavior, edge cases, deployment path, and what will make the system reliable after launch."
      >
        <div className="service-grid">
          <section className="service-panel">
            <h3>I can help with</h3>
            <ul className="service-list">
              {helpItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="service-panel">
            <h3>Good fit projects</h3>
            <ul className="service-list service-list-compact">
              {fitItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="Data engineering"
        title="I also build data work that operators can trust."
        note="The data projects are about reliable ingestion, validation, quality checks, reports, and dashboards."
        className="section-muted"
      >
        <div className="data-work-list">
          {dataWorkItems.map((item) => (
            <article key={item.href} className="data-work-item">
              <h3>
                <Link className="project-title-link" href={item.href}>
                  {item.title}
                </Link>
              </h3>
              <p>{item.body}</p>
              <Link className="inline-link" href={item.href}>
                Case study
              </Link>
            </article>
          ))}
        </div>
      </HomeSection>

      <HomeSection
        eyebrow="More work"
        title="The archive is there when you want breadth."
        note="Use it after the top examples, not as the first thing to evaluate."
      >
        <div className="archive-strip">
          <p>
            Compare private apps, internal tools, data pipelines, ML systems, and production-minded
            experiments with clear status and proof paths.
          </p>
          <Link className="inline-link" href="/projects">
            Open project archive
          </Link>
        </div>
      </HomeSection>

      <HomeSection
        id="contact"
        eyebrow="Contact"
        title="Have a product or system that needs to work for real?"
        className="section-last contact-section"
        note="Send the problem, constraints, and what exists today. I will be most useful where the product loop, data model, and reliability details matter."
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
