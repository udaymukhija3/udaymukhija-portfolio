import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuietIntro, QuietPage, QuietSection } from "../../../components/quiet/QuietPage";
import { StructuredData } from "../../../components/StructuredData";
import { getProjectBySlug, projects } from "../../../data/projects";
import { sentenceCase } from "../../../lib/sentenceCase";
import { getSiteUrl, siteConfig } from "../../../lib/site";
import gathrCapture from "../../../../public/images/projects/gathr-plans.png";
import vibegridCard from "../../../../public/images/projects/vibegrid-social-card.png";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* Only real product captures are shown; everything else is told in words. */
const captures: Record<string, { src: typeof gathrCapture; alt: string; orientation: "portrait" | "landscape"; caption: string }> = {
  gathrly: {
    src: gathrCapture,
    alt: "Gathr Plans screen showing plan follow-up, upcoming plans, and planning tools",
    orientation: "portrait",
    caption: "The Plans screen, from the current build.",
  },
  vibegrid: {
    src: vibegridCard,
    alt: "VibeGrid private crew ritual showing a four-fragment vibe card",
    orientation: "landscape",
    caption: "The crew ritual card, from the current build.",
  },
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
  const timeline = project.timeline.replace("-", "–");
  const capture = captures[project.slug];
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
    <QuietPage>
      <StructuredData data={projectJsonLd} />

      <QuietIntro title={project.title}>
        <p className="qp-meta">{sentenceCase(project.label)} · {timeline} · {project.status}</p>
        <p>{project.summary}</p>
        <p className="qp-links">
          {project.links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
          <Link href="/projects" prefetch={false} data-back>All work <span aria-hidden="true">↗</span></Link>
        </p>
      </QuietIntro>

      {capture ? (
        <figure className="qp-section">
          <div className={`qp-figure qp-figure-${capture.orientation}`}>
            <Image src={capture.src} alt={capture.alt} sizes={capture.orientation === "portrait" ? "240px" : "(max-width: 720px) 92vw, 672px"} />
          </div>
          <figcaption className="qp-caption">{capture.caption}</figcaption>
        </figure>
      ) : null}

      <QuietSection id="product" title="What it is">
        <div className="qp-prose">
          {(productSection?.paragraphs ?? [project.summary]).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </QuietSection>

      <QuietSection id="loop" title="The loop it has to make believable">
        <ol>
          {importantInteractions.map((interaction, index) => (
            <li key={interaction} className="qp-row">
              <span>0{index + 1}</span>
              <p>{interaction}</p>
            </li>
          ))}
        </ol>
      </QuietSection>

      <QuietSection id="engineering" title="How it’s built">
        <div className="qp-prose">
          {(technicalSection?.paragraphs ?? [project.evidenceNote]).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </QuietSection>

      <QuietSection id="architecture" title="Architecture">
        <dl>
          {project.system.map((item) => (
            <div key={item.label} className="qp-row">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </QuietSection>

      {failureCases.length > 0 ? (
        <QuietSection id="edges" title="What has to hold up">
          <ul className="qp-list">
            {failureCases.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </QuietSection>
      ) : null}

      {reflectionSections.map((section, index) => (
        <QuietSection key={section.title} id={`reflection-${index + 1}`} title={section.title}>
          <div className="qp-prose">
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </QuietSection>
      ))}

      <QuietSection id="proof" title="Proof">
        <p className="qp-meta">{project.evidenceNote}</p>
        <div className="quiet-projects" style={{ marginTop: "8px" }}>
          <details>
            <summary>
              <span>Verify</span>
              <span className="quiet-category">Repository, checks, stack, status</span>
              <span className="quiet-plus" aria-hidden="true" />
            </summary>
            <div className="quiet-detail">
              <ol>
                {evaluationSteps.map((step, index) => (
                  <li key={step} className="qp-row"><span>0{index + 1}</span><p>{step}</p></li>
                ))}
              </ol>
              <dl>
                <div className="qp-row"><dt>Role</dt><dd>{getFact("Role") ?? "Software engineering"}</dd></div>
                <div className="qp-row"><dt>Scope</dt><dd>{getFact("Scope") ?? "Self-directed project"}</dd></div>
                {proofPath ? <div className="qp-row"><dt>Proof</dt><dd>{proofPath}</dd></div> : null}
                <div className="qp-row"><dt>Stack</dt><dd>{project.stack.join(", ")}</dd></div>
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="qp-row"><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
                ))}
              </dl>
            </div>
          </details>
        </div>
      </QuietSection>

      <nav className="qp-nav" aria-label="Project navigation">
        {previousProject ? (
          <Link href={`/projects/${previousProject.slug}`} prefetch={false}>
            <span aria-hidden="true">←</span> {previousProject.title}<span className="quiet-sr-only"> (previous project)</span>
          </Link>
        ) : <span />}
        <Link href="/projects" prefetch={false}>All work <span aria-hidden="true">↗</span></Link>
        {nextProject ? (
          <Link href={`/projects/${nextProject.slug}`} prefetch={false}>
            {nextProject.title}<span className="quiet-sr-only"> (next project)</span> <span aria-hidden="true">→</span>
          </Link>
        ) : <span />}
      </nav>
    </QuietPage>
  );
}
