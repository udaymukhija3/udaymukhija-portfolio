import Link from "next/link";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
  detailed?: boolean;
};

export function ProjectCard({ project, detailed = false }: ProjectCardProps) {
  return (
    <article className={detailed ? "project-detail-card" : "project-card"}>
      <div className="project-card-meta">
        <p className="project-kicker">{project.label}</p>
        <p className="project-status">{project.timeline}</p>
      </div>
      <h3>
        <Link className="project-title-link" href={`/projects/${project.slug}`}>
          {project.title}
        </Link>
      </h3>
      <p className="project-summary">{project.summary}</p>

      <div className="project-links">
        <Link className="project-link project-link-primary" href={`/projects/${project.slug}`}>
          Open case study <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
