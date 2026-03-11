import Link from "next/link";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
  detailed?: boolean;
};

export function ProjectCard({ project, detailed = false }: ProjectCardProps) {
  const stackPreview = project.stack.slice(0, detailed ? 4 : 3);
  const remainingStackCount = project.stack.length - stackPreview.length;

  return (
    <article className={detailed ? "project-detail-card" : "project-card"}>
      <div className="project-card-meta">
        <p className="project-kicker">{project.label}</p>
        <p className="project-status">
          {project.year} · {project.status}
        </p>
      </div>
      <h3>
        <Link className="project-title-link" href={`/projects/${project.slug}`}>
          {project.title}
        </Link>
      </h3>
      <p className="project-summary">{detailed ? project.description : project.summary}</p>
      <p className="project-proof">{project.evidenceNote}</p>
      <p className="project-stack">
        <span>Stack</span>
        <span>
          {stackPreview.join(" / ")}
          {remainingStackCount > 0 ? ` +${remainingStackCount}` : ""}
        </span>
      </p>

      <div className="project-links">
        <Link className="project-link project-link-primary" href={`/projects/${project.slug}`}>
          View case study
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
