import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "../../../components/StructuredData";
import { getProjectBySlug, projects } from "../../../data/projects";
import { getSiteUrl, siteConfig } from "../../../lib/site";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      url: `${getSiteUrl()}/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const getFact = (label: string) => project.facts.find((fact) => fact.label === label)?.value;
  const primaryLink = project.links[0];
  const stackSummary = project.stack.join(", ");
  const metaItems = [
    { label: "Year", value: project.year },
    { label: "Role", value: getFact("Role") ?? "Software engineering" },
    { label: "Status", value: project.status },
    { label: "Scope", value: getFact("Scope") ?? "Self-directed project" },
    { label: "Stack", value: stackSummary },
    {
      label: "Proof",
      value: primaryLink ? primaryLink.label : "Case study only",
    },
  ];
  const metricItems = project.metrics.slice(0, 3);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${getSiteUrl()}/projects/${project.slug}`,
    creator: {
      "@type": "Person",
      name: siteConfig.name,
    },
    keywords: project.stack,
  };

  return (
    <>
      <StructuredData data={projectJsonLd} />

      <section className="section page-intro">
        <div className="container project-hero">
          <div className="project-hero-copy">
            <p className="eyebrow">
              {project.label} · {project.year}
            </p>
            <h1>{project.title}</h1>
            <p className="lead">{project.description}</p>
            <p className="detail-note">{project.evidenceNote}</p>
            <div className="project-links">
              <Link className="project-link project-link-primary" href="/projects">
                Back to projects
              </Link>
              {project.links.map((link) => (
                <a key={link.label} className="project-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <aside className="detail-panel" aria-label="Project metadata">
            <dl className="meta-list">
              {metaItems.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="metric-list" aria-label={`${project.title} highlights`}>
              {metricItems.map((metric) => (
                <div key={metric.label} className="metric-list-item">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-compact-top">
        <div className="container project-overview-grid">
          <article className="content-block">
            <p className="eyebrow">Overview</p>
            <h2>Why I built it</h2>
            <p>{project.summary}</p>
            <ul className="story-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>

          <aside className="content-block">
            <p className="eyebrow">Architecture</p>
            <h2>How it's put together</h2>
            <dl className="system-list">
              {project.system.map((item) => (
                <div key={item.label} className="system-list-item">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="section section-last">
        <div className="container project-sections">
          {project.sections.map((section) => (
            <article key={section.title} className="prose-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
