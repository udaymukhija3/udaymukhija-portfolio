import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMedia } from "../../../components/ProjectMedia";
import { StructuredData } from "../../../components/StructuredData";
import { getProjectBySlug, projects } from "../../../data/projects";
import { getSiteUrl, siteConfig } from "../../../lib/site";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      url: `${getSiteUrl()}/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const getFact = (label: string) => project.facts.find((fact) => fact.label === label)?.value;
  const repoLink = project.links.find((link) => link.href.includes("github.com"));
  const proofPath = getFact("Proof");
  const productSection = project.sections[0];
  const technicalSection = project.sections[1];
  const reflectionSections = project.sections.slice(2);
  const importantInteractions = project.highlights.slice(0, 2);
  const failureCases = project.highlights.slice(2);
  const evaluationSteps = project.evaluationPath ?? [
    repoLink ? `Open the ${repoLink.label}.` : "Start with the project status and available evidence.",
    "Read the architecture and edge-case sections.",
    proofPath ? `Follow the documented proof path: ${proofPath}.` : "Use the case-study evidence as the primary proof path.",
  ];
  const proofFacts = [
    { label: "Build window", value: project.timeline },
    { label: "Role", value: getFact("Role") ?? "Software engineering" },
    { label: "Status", value: project.status },
    { label: "Scope", value: getFact("Scope") ?? "Self-directed project" },
    { label: "Proof", value: proofPath ?? "Case study" },
  ];
  const currentProjectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = currentProjectIndex > 0 ? projects[currentProjectIndex - 1] : undefined;
  const nextProject = currentProjectIndex >= 0 && currentProjectIndex < projects.length - 1
    ? projects[currentProjectIndex + 1]
    : undefined;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": repoLink ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${getSiteUrl()}/projects/${project.slug}`,
    ...(repoLink ? { codeRepository: repoLink.href } : {}),
    author: { "@type": "Person", name: siteConfig.name, url: getSiteUrl() },
    creator: { "@type": "Person", name: siteConfig.name },
    programmingLanguage: project.stack,
    keywords: [...project.stack, project.category, project.label].join(", "),
    ...(project.dateCreated ? { dateCreated: project.dateCreated } : {}),
    ...(project.dateModified ? { dateModified: project.dateModified } : {}),
  };

  return (
    <>
      <StructuredData data={projectJsonLd} />

      <section className="section project-intro">
        <div className="container project-intro-copy">
          <p className="eyebrow">{project.label}</p>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>
          <div className="project-links">
            <Link className="project-link project-link-primary" href="/#work">Back to selected work</Link>
            {project.links.map((link) => (
              <a key={link.label} className="project-link" href={link.href} target="_blank" rel="noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="project-case-media-section" aria-label={`${project.title} product visual`}>
        <div className="container">
          <ProjectMedia project={project} context="case-study" />
        </div>
      </section>

      <section className="section project-narrative-section">
        <div className="container project-narrative-grid">
          <header>
            <p className="eyebrow">Product</p>
            <h2>What it does and how it feels.</h2>
          </header>
          <article className="project-prose">
            {(productSection?.paragraphs ?? [project.summary]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>

      <section className="section project-interaction-section">
        <div className="container project-interaction-grid">
          <header>
            <p className="eyebrow">Important interaction</p>
            <h2>The loop the product has to make believable.</h2>
          </header>
          <ol className="interaction-list">
            {importantInteractions.map((interaction, index) => (
              <li key={interaction}>
                <span>0{index + 1}</span>
                <p>{interaction}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section engineering-section">
        <div className="container engineering-grid">
          <article>
            <p className="eyebrow">Engineering challenge</p>
            <h2>Keep the product simple while the system handles the difficult behavior.</h2>
            <div className="project-prose">
              {(technicalSection?.paragraphs ?? [project.evidenceNote]).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside>
            <p className="eyebrow">Architecture</p>
            <dl className="architecture-list">
              {project.system.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {failureCases.length > 0 ? (
        <section className="section failure-section">
          <div className="container project-narrative-grid">
            <header>
              <p className="eyebrow">Edges and failure</p>
              <h2>What has to hold up.</h2>
            </header>
            <ul className="failure-list">
              {failureCases.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
      ) : null}

      {reflectionSections.length > 0 ? (
        <section className="section reflection-section">
          <div className="container reflection-grid">
            {reflectionSections.map((section) => (
              <article key={section.title} className="project-reflection">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section technical-proof-section">
        <div className="container">
          <details className="technical-proof">
            <summary>
              <span>
                <small>Technical proof</small>
                Repository, verification, stack, and project status
              </span>
              <span aria-hidden="true">+</span>
            </summary>
            <div className="technical-proof-body">
              <div>
                <p className="technical-proof-note">{project.evidenceNote}</p>
                <dl className="proof-facts">
                  {proofFacts.map((item) => (
                    <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
                  ))}
                </dl>
              </div>
              <div>
                <h3>Fastest verification path</h3>
                <ol className="reviewer-steps">
                  {evaluationSteps.map((step) => <li key={step}>{step}</li>)}
                </ol>
                <h3>Stack</h3>
                <p>{project.stack.join(" · ")}</p>
                {project.metrics.length > 0 ? (
                  <dl className="metric-list">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
                    ))}
                  </dl>
                ) : null}
              </div>
            </div>
          </details>

          <nav className="project-next" aria-label="Project navigation">
            <Link href="/projects">All work</Link>
            <div>
              {previousProject ? <Link href={`/projects/${previousProject.slug}`}>Previous: {previousProject.title}</Link> : null}
              {nextProject ? <Link href={`/projects/${nextProject.slug}`}>Next: {nextProject.title}</Link> : null}
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
