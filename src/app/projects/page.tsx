import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveFilter } from "../../components/ArchiveFilter";
import { QuietIntro, QuietPage } from "../../components/quiet/QuietPage";
import { sentenceCase } from "../../lib/sentenceCase";
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
    <QuietPage>
      <QuietIntro title="Things I’ve made.">
        <p>Products, data systems, and some machine-learning work. Each one opens into a longer write-up.</p>
      </QuietIntro>

      <section id="project-archive" className="qp-section" aria-label="Project archive">
        <div className="qp-filter">
          <nav aria-label="Project categories">
            {projectCategories.map((item) => {
              const href = item.id === "all" ? "/projects" : `/projects?category=${item.id}`;
              const count = item.id === "all" ? projects.length : projects.filter((project) => project.category === item.id).length;

              return (
                <a
                  key={item.id}
                  className={item.id === "all" ? "is-active" : undefined}
                  href={href}
                  data-category-link={item.id}
                  aria-current={item.id === "all" ? "page" : undefined}
                >
                  {item.label.toLowerCase()}
                  <small>{count}</small>
                </a>
              );
            })}
          </nav>
          <p data-filter-count role="status">{visibleProjects.length} projects</p>
        </div>

        <div className="quiet-projects">
          {visibleProjects.map((project) => (
            <details key={project.slug} name="quiet-project" data-project-category={project.category}>
              <summary>
                <span>{project.title}</span>
                <span className="quiet-category">{sentenceCase(project.label)}</span>
                <span className="quiet-plus" aria-hidden="true" />
              </summary>
              <div className="quiet-detail">
                <p>{project.summary}</p>
                <Link href={`/projects/${project.slug}`} prefetch={false}>
                  View project <span aria-hidden="true">↗</span><span className="quiet-sr-only">: {project.title}</span>
                </Link>
              </div>
            </details>
          ))}
        </div>
        <ArchiveFilter />
      </section>
    </QuietPage>
  );
}
