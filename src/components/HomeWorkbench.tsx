"use client";

import Link from "next/link";
import { useRef } from "react";
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

const projectIdeas: Record<string, string> = {
  gathrly: "Trust, attendance, and realtime coordination for plans that make it into the real world.",
  vibegrid: "A daily social ritual whose rules, stages, and retries stay authoritative on the server.",
  murmur: "Private voice notes with hard access boundaries and a deliberately narrow social loop.",
};

function SystemVisual() {
  return (
    <div className="system-visual" aria-hidden="true">
      <span className="system-ambient" />
      <span className="system-line" />
      <span className="system-flow system-flow-one" />
      <span className="system-flow system-flow-two" />
      <span className="system-node system-node-one"><i /></span>
      <span className="system-node system-node-two"><i /></span>
      <span className="system-node system-node-three"><i /></span>
      <span className="system-node system-node-live"><i /></span>
      <span className="system-caption">State settles into product</span>
    </div>
  );
}

export function HomeWorkbench({ projects, profileLinks, emailHref }: HomeWorkbenchProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  usePortfolioMotion(rootRef);
  const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });
  const archiveProjects = projects.filter((project) => !featuredProjectSlugs.includes(project.slug));

  return (
    <div className="home-shell" ref={rootRef}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-role">Uday Mukhija / Software Engineer</p>
            <h1 id="home-title">
              <span className="hero-title-line"><span>Systems that</span></span>
              <span className="hero-title-line"><span>hold up in the</span></span>
              <span className="hero-title-line"><span>real world.</span></span>
            </h1>
            <p className="home-intro">
              I turn rough product ideas into dependable software, from the interface to the contracts underneath it.
            </p>
            <a className="primary-text-link" href="#work">
              View selected work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <SystemVisual />
        </div>
      </section>

      <div className="system-continuity" data-continuity aria-hidden="true">
        <div className="container system-continuity-inner">
          <span className="continuity-line" />
          <span className="continuity-runner"><i /></span>
          <span className="continuity-destination">01 / Gathr</span>
        </div>
      </div>

      <section id="work" className="section featured-work-section">
        <div className="container">
          <header className="quiet-section-heading" data-reveal>
            <p className="eyebrow">Selected work</p>
            <h2>Three systems worth opening.</h2>
            <p>Product experiences first. The engineering proof is waiting inside each case study.</p>
          </header>

          <div className="featured-projects">
            {featuredProjects.map((project, index) => (
              <article
                key={project.slug}
                className={`featured-project featured-project-${project.slug}`}
                data-reveal
                data-tilt
              >
                <div className="featured-project-copy">
                  <p className="featured-project-number">0{index + 1}</p>
                  <h3>{project.title}</h3>
                  <p>{projectIdeas[project.slug] ?? project.summary}</p>
                  <Link className="quiet-link" href={`/projects/${project.slug}`}>
                    View case study <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <ProjectMedia project={project} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section archive-preview-section" aria-labelledby="archive-title" data-reveal>
        <div className="container archive-preview-grid">
          <header>
            <p className="eyebrow">Archive</p>
            <h2 id="archive-title">More things I&apos;ve built</h2>
            <p>Smaller products, data systems, and machine-learning work, kept quieter but not hidden.</p>
            <Link className="quiet-link" href="/projects">
              Browse the full archive <span aria-hidden="true">↗</span>
            </Link>
          </header>

          <div className="archive-preview-list">
            {archiveProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="archive-preview-row"
                data-reveal
                style={{ "--reveal-order": index } as CSSProperties}
              >
                <span>{project.title}</span>
                <span>{project.label}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section about-section" aria-labelledby="about-title" data-reveal>
        <div className="container about-grid">
          <p className="eyebrow">About</p>
          <div>
            <h2 id="about-title">I like the part after the demo.</h2>
            <p className="about-lead">
              The moment where retries, permissions, partial failure, and real people enter the picture, and the product still needs to feel simple.
            </p>
            <p>
              I&apos;m a software engineer based in India. My work moves between product interfaces, backend state, realtime protocols, data contracts, and AI workflows with explicit guardrails.
            </p>
            <div className="about-links">
              <Link className="quiet-link" href="/experience">Experience</Link>
              <Link className="quiet-link" href="/resume">Resume page</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section" aria-labelledby="contact-title" data-reveal>
        <div className="container contact-grid">
          <p className="eyebrow">Contact</p>
          <div>
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
          </div>
        </div>
      </section>
    </div>
  );
}
