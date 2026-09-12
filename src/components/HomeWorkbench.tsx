"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ProjectMedia } from "./ProjectMedia";
import { usePortfolioMotion } from "./usePortfolioMotion";
import type { Project } from "../types";

type ProfileLink = {
  label: string;
  href: string;
};

type HomeWorkbenchProps = {
  projects: Project[];
  profileLinks: ProfileLink[];
  emailHref: string;
};

const featuredProjectSlugs = ["gathrly", "vibegrid", "murmur"];
const archivePreviewSlugs = [
  "resolveops",
  "punchline",
  "mini-market",
  "logistics-data-engineering",
  "inventory-management-sys",
  "fraud-detection-platform",
];

const projectIdeas: Record<string, string> = {
  gathrly: "Trust, attendance, and realtime coordination for plans that make it into the real world.",
  vibegrid: "A daily social ritual whose rules, stages, and retries stay authoritative on the server.",
  murmur: "Private voice notes with hard access boundaries and a deliberately narrow social loop.",
};

const practiceAreas = [
  { number: "01", title: "Product interfaces", detail: "State people can understand" },
  { number: "02", title: "Backend systems", detail: "Rules the server can defend" },
  { number: "03", title: "Data + AI", detail: "Outputs that can be evaluated" },
];

export function HomeWorkbench({ projects, profileLinks, emailHref }: HomeWorkbenchProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeProjectSlug, setActiveProjectSlug] = useState(featuredProjectSlugs[0]);
  usePortfolioMotion(rootRef);
  const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });
  const activeProject = featuredProjects.find((project) => project.slug === activeProjectSlug)
    ?? featuredProjects[0];
  const archiveProjects = archivePreviewSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });

  return (
    <div className="home-shell" ref={rootRef}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-role">Uday Mukhija / Software Engineer</p>
            <h1 id="home-title">
              <span className="hero-title-line"><span>The interface</span></span>
              <span className="hero-title-line"><span>is only half</span></span>
              <span className="hero-title-line"><span>the work.</span></span>
            </h1>
            <p className="home-intro">
              I design product interfaces and engineer the state, data, and failure paths beneath them.
            </p>
            <a className="primary-text-link" href="#work">
              View selected work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <aside className="hero-practice" aria-label="Areas of practice">
            <div className="hero-practice-meta">
              <span>Practice / 2026</span>
              <span>Selected / 03</span>
            </div>
            <ol>
              {practiceAreas.map((area) => (
                <li key={area.number}>
                  <span>{area.number}</span>
                  <div>
                    <strong>{area.title}</strong>
                    <small>{area.detail}</small>
                  </div>
                </li>
              ))}
            </ol>
            <p>Surface clarity. System responsibility.</p>
          </aside>
        </div>
      </section>

      <section
        id="work"
        className="section workbench-section"
        aria-labelledby="workbench-title"
        data-live-motion
      >
        <div className="container">
          <header className="workbench-heading" data-reveal>
            <div>
              <p className="eyebrow">Selected work</p>
              <span>03 systems</span>
            </div>
            <h2 id="workbench-title">Three products. Three different problems.</h2>
            <p>Choose a product to change the stage. Each case study opens up the decisions, system boundary, and proof.</p>
          </header>

          <div className="project-workbench" data-active-project={activeProject?.slug}>
            <div className="workbench-index" aria-label="Selected projects">
              {featuredProjects.map((project, index) => {
                const isActive = project.slug === activeProject?.slug;

                return (
                  <button
                    key={project.slug}
                    id={`workbench-control-${project.slug}`}
                    className={isActive ? "workbench-control is-active" : "workbench-control"}
                    type="button"
                    aria-controls="workbench-stage"
                    aria-pressed={isActive}
                    onClick={() => setActiveProjectSlug(project.slug)}
                    onFocus={() => setActiveProjectSlug(project.slug)}
                    onMouseEnter={() => setActiveProjectSlug(project.slug)}
                  >
                    <span className="workbench-control-number">0{index + 1}</span>
                    <span className="workbench-control-copy">
                      <strong>{project.title}</strong>
                      <small>{project.label}</small>
                      <span>{projectIdeas[project.slug] ?? project.summary}</span>
                    </span>
                    <i aria-hidden="true">↗</i>
                  </button>
                );
              })}
            </div>

            {activeProject ? (
              <div
                id="workbench-stage"
                className={`workbench-stage workbench-stage-${activeProject.slug}`}
                role="region"
                aria-live="polite"
                aria-labelledby={`workbench-control-${activeProject.slug}`}
                data-tilt
              >
                <div key={activeProject.slug} className="workbench-stage-content">
                  <ProjectMedia project={activeProject} context="workbench" />
                  <div className="workbench-stage-footer">
                    <p>{projectIdeas[activeProject.slug] ?? activeProject.summary}</p>
                    <Link className="quiet-link" href={`/projects/${activeProject.slug}`}>
                      View {activeProject.title} case study <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section compact-archive-section" aria-labelledby="archive-title" data-reveal>
        <div className="container">
          <header className="compact-archive-heading">
            <div>
              <p className="eyebrow">Archive</p>
              <h2 id="archive-title">More things I&apos;ve built</h2>
            </div>
            <p>Products, data systems, and machine-learning work, kept concise here and detailed in the archive.</p>
            <Link className="quiet-link" href="/projects">View all fourteen <span aria-hidden="true">↗</span></Link>
          </header>

          <div className="compact-archive-grid">
            {archiveProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="compact-archive-item"
                style={{ "--archive-order": index } as CSSProperties}
              >
                <span className="compact-archive-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{project.title}</strong>
                <small>{project.label}</small>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="section home-closing-section"
        aria-labelledby="about-title"
        data-reveal
        data-live-motion
      >
        <div className="container home-closing-grid">
          <article className="closing-about">
            <p className="eyebrow">About</p>
            <h2 id="about-title">I like the part after the demo.</h2>
            <p className="closing-lead">
              The moment where retries, permissions, partial failure, and real people enter the picture, and the product still needs to feel simple.
            </p>
            <p>
              I&apos;m a software engineer based in India. My work moves between product interfaces, backend state, realtime protocols, data contracts, and AI workflows with explicit guardrails.
            </p>
            <div className="about-links">
              <Link className="quiet-link" href="/about">More about me</Link>
              <Link className="quiet-link" href="/experience">Experience</Link>
            </div>
            <dl className="working-principles">
              <div><dt>Boundary</dt><dd>Make ownership explicit.</dd></div>
              <div><dt>Failure</dt><dd>Design the next action.</dd></div>
              <div><dt>Proof</dt><dd>Show what can be verified.</dd></div>
            </dl>
          </article>

          <article id="contact" className="closing-contact" aria-labelledby="contact-title">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Have something that needs to work beyond the happy path?</h2>
            <a className="contact-email" href={emailHref}>
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-links">
              {profileLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="contact-mark" aria-hidden="true">
              <span>Write</span>
              <i>↗</i>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
