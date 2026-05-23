"use client";

import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState, useTransition } from "react";
import type { Project, ProjectCategory } from "../types";

type LensId = "all" | ProjectCategory;

type ProjectEvidenceLensProps = {
  projects: Project[];
};

const lensOptions: Array<{ id: LensId; label: string }> = [
  { id: "all", label: "All" },
  { id: "data", label: "Data" },
  { id: "product", label: "Product" },
  { id: "ml", label: "ML" },
];

function getFact(project: Project, label: string) {
  return project.facts.find((fact) => fact.label === label)?.value;
}

function getProjectText(project: Project) {
  return [
    project.title,
    project.label,
    project.category,
    project.summary,
    project.description,
    project.stack.join(" "),
    project.metrics.map((metric) => `${metric.label} ${metric.value}`).join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

export function ProjectEvidenceLens({ projects }: ProjectEvidenceLensProps) {
  const searchId = useId();
  const [activeLens, setActiveLens] = useState<LensId>("all");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesLens = activeLens === "all" || project.category === activeLens;
      const matchesQuery =
        normalizedQuery.length === 0 || getProjectText(project).includes(normalizedQuery);

      return matchesLens && matchesQuery;
    });
  }, [activeLens, normalizedQuery, projects]);

  const summary = useMemo(() => {
    const publicRepos = visibleProjects.filter((project) => project.status.includes("Public")).length;
    const localStudies = visibleProjects.length - publicRepos;
    const proofCount = visibleProjects.filter((project) => Boolean(getFact(project, "Proof"))).length;

    return [
      { label: "Shown", value: visibleProjects.length.toString() },
      { label: "Public repos", value: publicRepos.toString() },
      { label: "Local case studies", value: localStudies.toString() },
      { label: "Proof paths", value: proofCount.toString() },
    ];
  }, [visibleProjects]);

  return (
    <div className="evidence-lens">
      <div className="lens-toolbar">
        <div className="lens-tabs" aria-label="Project lens">
          {lensOptions.map((option) => (
            <button
              key={option.id}
              className={activeLens === option.id ? "lens-tab is-active" : "lens-tab"}
              type="button"
              onClick={() => {
                startTransition(() => {
                  setActiveLens(option.id);
                });
              }}
              aria-pressed={activeLens === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="lens-search" htmlFor={searchId}>
          <span>Search evidence</span>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Kafka, FastAPI, calibration..."
          />
        </label>
      </div>

      <dl className="lens-summary" aria-live="polite" aria-busy={isPending}>
        {summary.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      {visibleProjects.length > 0 ? (
        <div className="work-list">
          {visibleProjects.map((project) => {
            const proof = getFact(project, "Proof") ?? project.status;
            const bestFit = getFact(project, "Best fit") ?? project.label;
            const metrics = project.metrics.slice(0, 2);

            return (
              <article key={project.slug} className="work-row evidence-row">
                <div className="work-meta">
                  <span>{project.year}</span>
                  <span>{project.label}</span>
                </div>
                <div className="work-main">
                  <h3>
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p>{project.summary}</p>
                  <div className="evidence-proof">
                    <span>{proof}</span>
                    <span>{bestFit}</span>
                  </div>
                </div>
                <div className="work-side">
                  <span>{project.stack.slice(0, 3).join(" / ")}</span>
                  {metrics.length > 0 ? (
                    <dl className="mini-metrics">
                      {metrics.map((metric) => (
                        <div key={metric.label}>
                          <dt>{metric.label}</dt>
                          <dd>{metric.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  <Link className="inline-link" href={`/projects/${project.slug}`}>
                    Case study
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="lens-empty">
          <p>No projects match this view yet.</p>
        </div>
      )}
    </div>
  );
}
