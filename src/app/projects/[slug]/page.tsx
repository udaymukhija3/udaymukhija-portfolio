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
          <div className="project-detail-meta">
            {project.stack.map((item) => (
              <span key={item} className="tag-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container project-story-grid">
          <article className="story-card">
            <h2>Project overview</h2>
            {project.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>

          <aside className="story-card">
            <h2>Links</h2>
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
          </aside>
        </div>
      </section>
    </>
  );
}
