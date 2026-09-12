import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "../types";

type ProjectMediaProps = {
  project: Project;
  context?: "featured" | "workbench" | "case-study";
};

const murmurWaveform = [34, 62, 45, 78, 53, 91, 68, 39, 84, 57, 73, 42, 66, 88, 49, 71, 38, 61, 81, 55, 76, 47, 69, 36];

function ProjectPortrait({ project }: { project: Project }) {
  const systemFacts = project.system.slice(0, 3);

  if (project.category === "data") {
    return (
      <div className="project-portrait project-portrait-data" role="img" aria-label={`${project.title} data architecture summary`}>
        <header><span>Data contract</span><span>{project.status}</span></header>
        <strong>{project.title}</strong>
        <dl>
          {systemFacts.map((item, index) => (
            <div key={item.label}>
              <dt>{String(index + 1).padStart(2, "0")} / {item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <footer><span>Source</span><span>Contract</span><span>Consumer</span></footer>
      </div>
    );
  }

  if (project.category === "ml") {
    return (
      <div className="project-portrait project-portrait-ml" role="img" aria-label={`${project.title} machine-learning evaluation summary`}>
        <header><span>Evaluation sheet</span><span>{project.status}</span></header>
        <div className="project-portrait-ml-title">
          <strong>{project.title}</strong>
          <span aria-hidden="true">EVAL</span>
        </div>
        <div className="project-portrait-matrix">
          {systemFacts.map((item, index) => (
            <div key={item.label} style={{ "--portrait-order": index } as CSSProperties}>
              <span>{item.label}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <footer>Question → baseline → evidence</footer>
      </div>
    );
  }

  return (
    <div className="project-portrait project-portrait-product" role="img" aria-label={`${project.title} product architecture summary`}>
      <header><span>Product behavior</span><span>{project.status}</span></header>
      <div className="project-portrait-product-title">
        <strong>{project.title}</strong>
        <small>{project.label}</small>
      </div>
      <ol>
        {systemFacts.map((item, index) => (
          <li key={item.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{item.label}</strong><p>{item.value}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProjectMedia({ project, context = "featured" }: ProjectMediaProps) {
  const className = `project-media project-media-${project.slug} project-media-${context}`;

  if (project.slug === "gathrly") {
    return (
      <figure className={className}>
        <div className="project-media-stage project-media-stage-portrait">
          <Image
            alt="Gathr Plans screen showing plan follow-up, upcoming plans, and planning tools"
            className="project-media-image"
            height={2622}
            sizes={context === "case-study" ? "(max-width: 760px) 88vw, 34vw" : "(max-width: 760px) 88vw, 42vw"}
            src="/images/projects/gathr-plans.png"
            width={1206}
          />
          <span className="gathr-focus-frame" aria-hidden="true"><i /><i /><i /><i /></span>
        </div>
        <figcaption>Real product capture · Gathr Plans</figcaption>
      </figure>
    );
  }

  if (project.slug === "vibegrid") {
    return (
      <figure className={className}>
        <div className="project-media-stage project-media-stage-landscape">
          <Image
            alt="VibeGrid private crew ritual showing a four-fragment vibe card"
            className="project-media-image"
            height={630}
            sizes="(max-width: 760px) 92vw, 76vw"
            src="/images/projects/vibegrid-social-card.png"
            width={1200}
          />
          <div className="vibegrid-sequence" aria-hidden="true">
            <div className="vibegrid-sequence-labels">
              <span>Make</span>
              <span>Judge</span>
              <span>Reveal</span>
            </div>
            <span className="vibegrid-sequence-track"><i /></span>
          </div>
        </div>
        <figcaption>Real product artwork · VibeGrid crew ritual</figcaption>
      </figure>
    );
  }

  if (project.slug === "murmur") {
    return (
      <figure className={className}>
        <div
          className="murmur-fragment"
          role="img"
          aria-label="Murmur interface fragment showing a twelve-second private voice note"
        >
          <div className="murmur-fragment-topline">
            <span>Latest murmur</span>
            <span>00:12</span>
          </div>
          <div className="murmur-waveform" aria-hidden="true">
            {murmurWaveform.map((level, index) => (
              <span
                key={`${level}-${index}`}
                style={{
                  "--wave-level": `${level}%`,
                  "--wave-delay": `${index * -0.09}s`,
                } as CSSProperties}
              />
            ))}
            <i className="murmur-playhead" />
          </div>
          <blockquote>“Made chai. Miss you.”</blockquote>
          <div className="murmur-fragment-state">
            <span>Private room</span>
            <span>Heard</span>
          </div>
        </div>
        <figcaption>Native interface fragment based on the current Murmur product UI</figcaption>
      </figure>
    );
  }

  return (
    <figure className={className}>
      <ProjectPortrait project={project} />
      <figcaption>Editorial architecture plate · drawn from documented project evidence</figcaption>
    </figure>
  );
}
