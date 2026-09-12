import type { Metadata } from "next";
import { ProjectCard } from "../../components/ProjectCard";
import { ArchiveFilter } from "../../components/ArchiveFilter";
import { projectCategories, projects } from "../../data/projects";
import type { Project } from "../../types";

const projectPriority = new Map(
  [
    "gathrly",
    "vibegrid",
    "murmur",
    "resolveops",
    "punchline",
    "mini-market",
    "ramble",
    "closetdelta",
    "receipt-scanner",
    "inventory-management-sys",
    "logistics-data-engineering",
    "enefit-forecasting",
    "fraud-detection-platform",
    "instacart-reorder-recommender",
  ].map((slug, index) => [slug, index]),
);

export const metadata: Metadata = {
  title: "Work",
  description:
    "Project archive for product systems, backend work, AI workflows, data engineering, dashboards, and proof-backed software by Uday Mukhija.",
  alternates: {
    canonical: "/projects",
  },
};

function sortProjects(items: Project[]) {
  return [...items].sort((left, right) => {
    const priorityDelta =
      (projectPriority.get(left.slug) ?? Number.MAX_SAFE_INTEGER) -
      (projectPriority.get(right.slug) ?? Number.MAX_SAFE_INTEGER);

    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    const flagshipDelta = Number(Boolean(right.flagship)) - Number(Boolean(left.flagship));

    if (flagshipDelta !== 0) {
      return flagshipDelta;
    }

    const leftDate = left.sortDate ?? left.dateModified ?? left.dateCreated ?? "";
    const rightDate = right.sortDate ?? right.dateModified ?? right.dateCreated ?? "";

    return rightDate.localeCompare(leftDate);
  });
}

export default function ProjectsPage() {
  const visibleProjects = sortProjects(projects);

  return (
    <>
      <section className="section page-intro">
        <div className="container page-intro-shell page-intro-narrow">
          <p className="eyebrow">Work archive</p>
          <h1>A wider view of the work.</h1>
          <p>Products, data systems, and machine-learning work. Each case study keeps the deeper technical proof within reach.</p>
        </div>
      </section>

      <section id="project-archive" className="section section-compact-top section-last">
        <div className="container">
          <div className="projects-toolbar">
            <div className="filter-row" role="navigation" aria-label="Project categories">
              {projectCategories.map((item) => {
                const href = item.id === "all" ? "/projects" : `/projects?category=${item.id}`;
                const className = item.id === "all" ? "filter-chip is-active" : "filter-chip";

                return (
                  <a
                    key={item.id}
                    className={className}
                    href={href}
                    data-category-link={item.id}
                    aria-current={item.id === "all" ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          <p className="archive-result-count" data-filter-count role="status">{visibleProjects.length} projects</p>
          <div className="project-detail-grid">
            {visibleProjects.map((project) => (
              <div key={project.slug} data-project-category={project.category}><ProjectCard project={project} detailed /></div>
            ))}
          </div>
        </div>
        <ArchiveFilter />
      </section>
    </>
  );
}
