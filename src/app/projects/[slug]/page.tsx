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
        <div className="container page-intro-shell">
          <p className="eyebrow">
            {project.label} · {project.year}
          </p>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <p className="detail-note">{project.evidenceNote}</p>
          <div className="project-stat-grid project-stat-grid-hero" aria-label={`${project.title} key metrics`}>
            {project.metrics.map((metric) => (
              <div key={metric.label} className="project-stat">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="project-detail-meta">
            {project.stack.map((item) => (
              <span key={item} className="tag-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-compact-top">
        <div className="container">
          <div className="project-fact-grid">
            {project.facts.map((fact) => (
              <div key={fact.label} className="project-fact">
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container project-story-shell">
          <div className="project-story-grid">
            <article className="story-card">
              <p className="eyebrow">Overview</p>
              <h2>What it does</h2>
              <p>{project.summary}</p>
              <ul className="story-list">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>

            <aside className="story-card">
              <p className="eyebrow">System</p>
              <h2>Main parts</h2>
              <div className="system-grid">
                {project.system.map((item) => (
                  <div key={item.label} className="system-card">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
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
              {project.links.length === 0 ? (
                <p className="card-proof-note">No public repo is linked for this project.</p>
              ) : null}
            </aside>
          </div>

          <div className="project-section-grid">
            {project.sections.map((section) => (
              <article key={section.title} className="story-card">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
