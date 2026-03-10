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
  description: "Project list for backend, data, and ML work by Uday Mukhija.",
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
  const flagshipProjects = projects.filter((project) => project.flagship);
  const additionalProjects = projects.filter((project) => !project.flagship);

  return (
    <>
      <section className="section page-intro">
        <div className="container page-intro-shell">
          <p className="eyebrow">Projects</p>
          <h1>Projects</h1>
          <p>
            These are the main projects on the site. Use the filters if you want a smaller list.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Project List"
            title="Start with these"
            note="If you only read a few, start with Event-Driven Inventory, Gathr, Kalshi, and Enefit."
          />

          <div className="library-note">
            <div className="inline-link-row">
              {flagshipProjects.map((project) => (
                <Link key={project.slug} className="inline-link" href={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              ))}
            </div>
          </div>

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

          {activeCategory === "all" ? (
            <>
              <div className="library-section">
                <SectionHeading
                  eyebrow="Flagship Work"
                  title="Start here"
                  note="These are the strongest projects on the site."
                />
                <div className="project-detail-grid">
                  {flagshipProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} detailed />
                  ))}
                </div>
              </div>

              <div className="library-section">
                <SectionHeading
                  eyebrow="More Work"
                  title="The rest of the project list"
                  note="More ML and data projects."
                />
                <div className="project-detail-grid">
                  {additionalProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} detailed />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="project-detail-grid">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} detailed />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
