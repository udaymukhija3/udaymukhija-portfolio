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
    "gathr",
    "habit-tracker-social",
    "inventory-analytics-platform",
    "vibegrid",
    "murmur",
    "ramble",
    "mini-market",
    "closetdelta",
    "logistics-data-platform",
    "enefit-forecasting",
    "fraud-detection-system",
    "instacart-reordering-system",
  ].map((slug, index) => [slug, index]),
);

export const metadata: Metadata = {
  title: "Projects",
  description: "Project list for backend-focused Spring Boot, Go, FastAPI, Next.js, PostgreSQL, Redis, Kafka, WebSocket, data platform, and ML systems work by Uday Mukhija.",
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
          <p className="eyebrow">Projects</p>
          <h1>Backend-focused projects, with data and ML systems as supporting depth.</h1>
          <p>
            Start with Gathr, Habit Tracker Social, and Inventory Management for the clearest
            backend signal: APIs, transactional workflows, caching, realtime behavior, event
            boundaries, and concurrency choices.
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
