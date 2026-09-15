import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PanelFrame } from "../../../../components/panel/PanelFrame";
import { StructuredData } from "../../../../components/StructuredData";
import { getProjectBySlug, projects } from "../../../../data/projects";
import { getSiteUrl, siteConfig } from "../../../../lib/site";
import gathrCapture from "../../../../../public/images/projects/gathr-plans.png";
import vibegridCard from "../../../../../public/images/projects/vibegrid-social-card.png";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* Only real product captures earn a media band; the rest of the archive is type and rules. */
const captures: Record<string, { src: typeof gathrCapture; alt: string; orientation: "portrait" | "landscape"; caption: string }> = {
  gathrly: {
    src: gathrCapture,
    alt: "Gathr Plans screen showing plan follow-up, upcoming plans, and planning tools",
    orientation: "portrait",
    caption: "Product capture, Plans screen",
  },
  vibegrid: {
    src: vibegridCard,
    alt: "VibeGrid private crew ritual showing a four-fragment vibe card",
    orientation: "landscape",
    caption: "Product artwork, crew ritual card",
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
    alternates: { canonical: `/panel/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      url: `${getSiteUrl()}/panel/work/${project.slug}`,
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
    url: `${getSiteUrl()}/panel/work/${project.slug}`,
    ...(repoLink ? { codeRepository: repoLink.href } : {}),
    author: { "@type": "Person", name: siteConfig.name, url: getSiteUrl() },
    creator: { "@type": "Person", name: siteConfig.name },
    programmingLanguage: project.stack,
    keywords: [...project.stack, project.category, project.label].join(", "),
    ...(project.dateCreated ? { dateCreated: project.dateCreated } : {}),
    ...(project.dateModified ? { dateModified: project.dateModified } : {}),
  };

  return (
    <PanelFrame current="work">
      <StructuredData data={projectJsonLd} />

      <div className="pp-band pp-title">
        <h1 className="pp-cell pp-label">{project.title}</h1>
        <div className="pp-cell pp-body">
          <p className="pp-meta">{project.label}</p>
          <p className="pp-lead">{project.summary}</p>
          {project.links.length > 0 ? (
            <p className="pp-links">
              {project.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </p>
          ) : null}
        </div>
      </div>

      <dl className="pp-band pp-facts">
        <div className="pp-cell pp-2"><dt>Build window</dt><dd>{timeline}</dd></div>
        <div className="pp-cell pp-2"><dt>Status</dt><dd>{project.status}</dd></div>
        <div className="pp-cell pp-4"><dt>Role</dt><dd>{getFact("Role") ?? "Software engineering"}</dd></div>
        <div className="pp-cell pp-4"><dt>Scope</dt><dd>{getFact("Scope") ?? "Self-directed project"}</dd></div>
      </dl>

      {capture ? (
        <figure className="pp-band">
          <figcaption className="pp-cell pp-label"><span>Capture<small>{capture.caption}</small></span></figcaption>
          <div className={`pp-cell pp-body pp-media pp-media-${capture.orientation}`}>
            <Image src={capture.src} alt={capture.alt} sizes={capture.orientation === "portrait" ? "320px" : "(max-width: 719px) 92vw, 70vw"} />
          </div>
        </figure>
      ) : null}

      <section className="pp-band" aria-labelledby="product-title">
        <div className="pp-cell pp-label"><h2 id="product-title">Product</h2></div>
        <div className="pp-cell pp-body">
          {(productSection?.paragraphs ?? [project.summary]).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="pp-band" aria-labelledby="interaction-title">
        <div className="pp-cell pp-label"><h2 id="interaction-title">Interaction<small>The loop the product has to make believable</small></h2></div>
        <div className="pp-cell pp-body">
          <ol className="pp-steps">
            {importantInteractions.map((interaction, index) => (
              <li key={interaction}>
                <span>0{index + 1}</span>
                <p>{interaction}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pp-band" aria-labelledby="engineering-title">
        <div className="pp-cell pp-label"><h2 id="engineering-title">Engineering<small>The system handles the difficult behaviour</small></h2></div>
        <div className="pp-cell pp-body">
          {(technicalSection?.paragraphs ?? [project.evidenceNote]).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="pp-band" aria-labelledby="architecture-title">
        <div className="pp-cell pp-label"><h2 id="architecture-title">Architecture</h2></div>
        <div className="pp-cell pp-body">
          <dl className="pp-dl">
            {project.system.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {failureCases.length > 0 ? (
        <section className="pp-band" aria-labelledby="edges-title">
          <div className="pp-cell pp-label"><h2 id="edges-title">Edges<small>What has to hold up</small></h2></div>
          <div className="pp-cell pp-body">
            <ul className="pp-list">
              {failureCases.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
      ) : null}

      {reflectionSections.map((section) => (
        <section key={section.title} className="pp-band" aria-label={section.title}>
          <div className="pp-cell pp-label"><h2>{section.title}</h2></div>
          <div className="pp-cell pp-body">
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ))}

      <section className="pp-band" aria-labelledby="proof-title">
        <div className="pp-cell pp-label"><h2 id="proof-title">Proof<small>Repository, verification, stack, status</small></h2></div>
        <div className="pp-cell pp-5">
          <p>{project.evidenceNote}</p>
          <h3>Fastest verification path</h3>
          <ol className="pp-steps">
            {evaluationSteps.map((step, index) => (
              <li key={step}><span>0{index + 1}</span><p>{step}</p></li>
            ))}
          </ol>
        </div>
        <div className="pp-cell pp-4">
          <h3>Stack</h3>
          <p>{project.stack.join(", ")}</p>
          {project.metrics.length > 0 ? (
            <>
              <h3>Measures</h3>
              <dl className="pp-dl">
                {project.metrics.map((metric) => (
                  <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
                ))}
              </dl>
            </>
          ) : null}
          {proofPath ? (
            <>
              <h3>Where the proof lives</h3>
              <p>{proofPath}</p>
            </>
          ) : null}
        </div>
      </section>

      <nav className="pp-band" aria-label="Project navigation">
        {previousProject ? (
          <Link className="pp-cell pp-3 pp-cell-link" href={`/panel/work/${previousProject.slug}`} prefetch={false}>
            <small>Previous</small>
            <span>{previousProject.title}</span>
          </Link>
        ) : (
          <span className="pp-cell pp-3" aria-hidden="true" />
        )}
        <Link className="pp-cell pp-6 pp-cell-link" href="/panel/work" prefetch={false}>
          <small>Archive</small>
          <span>All work</span>
        </Link>
        {nextProject ? (
          <Link className="pp-cell pp-3 pp-cell-link pp-end" href={`/panel/work/${nextProject.slug}`} prefetch={false}>
            <small>Next</small>
            <span>{nextProject.title}</span>
          </Link>
        ) : (
          <span className="pp-cell pp-3" aria-hidden="true" />
        )}
      </nav>
    </PanelFrame>
  );
}
