import Link from "next/link";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
  detailed?: boolean;
};

export function ProjectCard({ project, detailed = false }: ProjectCardProps) {
  const visibleMetrics = project.metrics.slice(0, detailed ? 3 : 2);

  return (
    <article className={detailed ? "project-detail-card" : "project-card"}>
      <div className="project-topline">
        <span>{project.label}</span>
        <span>
          {project.year} · {project.status}
        </span>
      </div>
      <h3>
        <Link className="project-title-link" href={`/projects/${project.slug}`}>
          {project.title}
        </Link>
      </h3>
      <p>{detailed ? project.description : project.summary}</p>

      <div className="project-stat-grid" aria-label={`${project.title} metrics`}>
        {visibleMetrics.map((metric) => (
          <div key={metric.label} className="project-stat">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      {detailed ? <p className="card-proof-note">{project.evidenceNote}</p> : null}

      <div className={detailed ? "project-detail-meta" : "tag-list"}>
        {project.stack.map((item) => (
          <span key={item} className={detailed ? "tag-chip" : "tag-pill"}>
            {item}
          </span>
        ))}
      </div>

      <div className="project-links">
        <Link className="project-link project-link-primary" href={`/projects/${project.slug}`}>
          Read case study
        </Link>
        {project.links.map((link) => (
          <a key={link.label} href={link.href} className="project-link" target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
