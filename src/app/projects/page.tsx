import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "../../components/ProjectCard";
import { projectCategories, projects } from "../../data/projects";
import type { Project, ProjectCategory } from "../../types";

type SearchParams = Promise<{
  category?: string;
}>;

type ActiveCategory = ProjectCategory | "all";

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
    "Project archive for backend-heavy product systems, data platforms, and ML systems work by Uday Mukhija, grounded in repos and proof artifacts.",
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

    return Number(right.year) - Number(left.year);
  });
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category } = await searchParams;
  const activeCategory: ActiveCategory = projectCategories.some((item) => item.id === category)
    ? (category as ActiveCategory)
    : "all";

  const visibleProjects =
    activeCategory === "all"
      ? sortProjects(projects)
      : sortProjects(projects.filter((project) => project.category === activeCategory));

  return (
    <>
      <section className="section page-intro">
        <div className="container page-intro-shell page-intro-narrow">
          <p className="eyebrow">Work</p>
          <h1>Project archive</h1>
          <p>
            Start with the three featured projects on the homepage. This page keeps the broader
            set available for additional depth across product systems, data platforms, and ML
            systems.
          </p>
        </div>
      </section>

      <section className="section section-compact-top section-last">
        <div className="container">
          <div className="projects-toolbar">
            <div className="filter-row" role="navigation" aria-label="Project categories">
              {projectCategories.map((item) => {
                const href = item.id === "all" ? "/projects" : `/projects?category=${item.id}`;
                const className = item.id === activeCategory ? "filter-chip is-active" : "filter-chip";

                return (
                  <Link
                    key={item.id}
                    className={className}
                    href={href}
                    aria-current={item.id === activeCategory ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="project-detail-grid">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} detailed />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
