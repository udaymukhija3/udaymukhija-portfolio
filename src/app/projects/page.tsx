import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "../../components/ProjectCard";
import { SectionHeading } from "../../components/SectionHeading";
import { projectCategories, projects } from "../../data/projects";
import type { ProjectCategory } from "../../types";

type SearchParams = Promise<{
  category?: string;
}>;

type ActiveCategory = ProjectCategory | "all";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project library covering backend, ML systems, and product-focused engineering work.",
  alternates: {
    canonical: "/projects",
  },
};

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
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <section className="section page-intro">
        <div className="container page-intro-shell">
          <p className="eyebrow">Projects</p>
          <h1>What I am building</h1>
          <p>
            This page is server-rendered and query-driven, so each category view can be linked,
            shared, and crawled as HTML instead of relying on a client-only filter.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Project Library"
            title="Start populating this page"
            note="Each project has its own detail page, so add substance here and let search engines index the individual entries."
          />

          <div className="filter-row" role="navigation" aria-label="Project categories">
            {projectCategories.map((item) => {
              const href = item.id === "all" ? "/projects" : `/projects?category=${item.id}`;
              const className = item.id === activeCategory ? "filter-chip is-active" : "filter-chip";

              return (
                <Link key={item.id} className={className} href={href}>
                  {item.label}
                </Link>
              );
            })}
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
