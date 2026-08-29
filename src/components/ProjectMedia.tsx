import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "../types";

type ProjectMediaProps = {
  project: Project;
  context?: "featured" | "case-study";
};

const murmurWaveform = [34, 62, 45, 78, 53, 91, 68, 39, 84, 57, 73, 42, 66, 88, 49, 71, 38, 61, 81, 55, 76, 47, 69, 36];

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
            sizes={context === "featured" ? "(max-width: 760px) 88vw, 42vw" : "(max-width: 760px) 88vw, 34vw"}
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
      <div className="project-signal" role="img" aria-label={`${project.title} system overview`}>
        <span className="project-signal-title">{project.title}</span>
        <span className="project-signal-line" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="project-signal-terms">
          {project.system.slice(0, 3).map((item) => (
            <span key={item.label}>{item.label}</span>
          ))}
        </div>
      </div>
      <figcaption>System portrait · drawn from the case-study architecture</figcaption>
    </figure>
  );
}
