import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveFilter } from "../../../components/ArchiveFilter";
import { PanelFrame } from "../../../components/panel/PanelFrame";
import { projectCategories, projects } from "../../../data/projects";
import type { Project } from "../../../types";

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
  title: "Work (panel prototype)",
  description:
    "Project archive for product systems, backend work, AI workflows, data engineering, dashboards, and proof-backed software by Uday Mukhija.",
  alternates: {
    canonical: "/panel/work",
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

const categoryLabel = new Map(projectCategories.map((item) => [item.id, item.label]));

export default function ProjectsPage() {
  const visibleProjects = sortProjects(projects);

  return (
    <PanelFrame current="work">
      {/* One id wraps the filter and the rows so the client filter can find both. */}
      <section id="project-archive" style={{ display: "contents" }} aria-label="Project archive">
        <div className="pp-band pp-title">
          <h1 className="pp-cell pp-label">Work</h1>
          <div className="pp-cell pp-body pp-filter">
            <nav aria-label="Project categories">
              {projectCategories.map((item) => {
                const href = item.id === "all" ? "/panel/work" : `/panel/work?category=${item.id}`;
                const count = item.id === "all" ? projects.length : projects.filter((project) => project.category === item.id).length;

                return (
                  <a
                    key={item.id}
                    className={item.id === "all" ? "is-active" : undefined}
                    href={href}
                    data-category-link={item.id}
                    aria-current={item.id === "all" ? "page" : undefined}
                  >
                    {item.label}
                    <small>{count}</small>
                  </a>
                );
              })}
            </nav>
            <p className="pp-count" data-filter-count role="status">{visibleProjects.length} projects</p>
          </div>
        </div>

        {visibleProjects.map((project, index) => (
          <Link
            key={project.slug}
            className="pp-row"
            href={`/panel/work/${project.slug}`}
            prefetch={false}
            data-project-category={project.category}
          >
            <span className="pp-cell pp-1 pp-row-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="pp-cell pp-3 pp-row-title">{project.title}</span>
            <span className="pp-cell pp-4 pp-row-label">{project.label}</span>
            <span className="pp-cell pp-2 pp-row-category">{categoryLabel.get(project.category)}</span>
            <span className="pp-cell pp-2 pp-row-time">{project.timeline.replace("-", "–")}</span>
          </Link>
        ))}
        <ArchiveFilter />
      </section>
    </PanelFrame>
  );
}
