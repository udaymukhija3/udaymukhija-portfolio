import Link from "next/link";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
  detailed?: boolean;
};

export function ProjectCard({ project, detailed = false }: ProjectCardProps) {
  const proofPath = project.facts.find((fact) => fact.label === "Proof")?.value;
  const proofBullets = project.highlights.slice(0, detailed ? 3 : 2);
  const githubLink = project.links.find((link) => link.href.includes("github.com"));
  const otherLinks = project.links.filter((link) => link !== githubLink);

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
      <p className="project-summary">{project.summary}</p>

      <div className="project-proof-block">
        <p>What it proves:</p>
        <ul>
          {proofBullets.map((item) => (
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
          <dd>{proofPath ?? "Case study"}</dd>
        </div>
      </dl>

      <div className="project-links">
        <Link className="project-link project-link-primary" href={`/projects/${project.slug}`}>
          Case study
        </Link>
        {githubLink ? (
          <a href={githubLink.href} className="project-link" target="_blank" rel="noreferrer">
            GitHub
          </a>
        ) : null}
        {otherLinks.map((link) => (
          <a key={link.label} href={link.href} className="project-link" target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
