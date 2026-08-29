"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
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

const projectNumbers: Record<string, string> = {
  gathrly: "01",
  vibegrid: "02",
  murmur: "03",
  punchline: "04",
  "mini-market": "05",
};

const projectProof: Record<string, string> = {
  gathrly: "Trust, attendance, and realtime coordination",
  vibegrid: "Server-owned rules and duplicate-safe state",
  murmur: "Private media with hard access boundaries",
  punchline: "Rooms that recover cleanly after disconnects",
  "mini-market": "Decisions backed by Bayesian evidence",
};

function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "gathrly") {
    return (
      <div className="project-visual project-visual-map" aria-hidden="true">
        <span className="map-path map-path-a" />
        <span className="map-path map-path-b" />
        <span className="map-node map-node-a" />
        <span className="map-node map-node-b" />
        <span className="map-node map-node-c" />
        <span className="map-node map-node-d" />
        <span className="map-pulse" />
        <small>4 people nearby</small>
      </div>
    );
  }

  if (slug === "vibegrid") {
    return (
      <div className="project-visual project-visual-grid" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
          <span key={index} style={{ "--tile": index } as CSSProperties} />
        ))}
      </div>
    );
  }

  if (slug === "murmur") {
    return (
      <div className="project-visual project-visual-wave" aria-hidden="true">
        <span className="wave-avatar">U</span>
        <div className="wave-bars">
          {[11, 22, 35, 18, 43, 29, 48, 24, 38, 16, 31, 12].map((height, index) => (
            <i key={`${height}-${index}`} style={{ "--wave-height": `${height}px`, "--wave-delay": `${index * -0.08}s` } as CSSProperties} />
          ))}
        </div>
        <span className="wave-time">0:24</span>
      </div>
    );
  }

  if (slug === "punchline") {
    return (
      <div className="project-visual project-visual-room" aria-hidden="true">
        <span className="room-orbit room-orbit-a" />
        <span className="room-orbit room-orbit-b" />
        <strong>LIVE</strong>
        <small>reconnecting safely</small>
      </div>
    );
  }

  return (
    <div className="project-visual project-visual-chart" aria-hidden="true">
      {[44, 61, 35, 75, 56, 89].map((height, index) => (
        <span key={`${height}-${index}`} style={{ "--bar-height": `${height}%` } as CSSProperties} />
      ))}
      <i>+18.4%</i>
    </div>
  );
}

export function HomeWorkbench({ projects, profileLinks, emailHref }: HomeWorkbenchProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const revealItems = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    revealItems.forEach((item) => observer.observe(item));
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  const tiltCard = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--card-rx", `${y * -4}deg`);
    card.style.setProperty("--card-ry", `${x * 5}deg`);
    card.style.setProperty("--card-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--card-y", `${(y + 0.5) * 100}%`);
  };

  const resetCard = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--card-rx", "0deg");
    event.currentTarget.style.setProperty("--card-ry", "0deg");
  };

  return (
    <div className="home-workbench" ref={rootRef}>
      <section className="workbench-hero" aria-labelledby="home-title">
        <div className="container workbench-hero-shell">
          <div className="hero-status hero-enter hero-enter-1">
            <p><span className="status-dot" /> Available for ambitious builds</p>
            <p>India · working worldwide</p>
          </div>

          <div className="hero-copy-block">
            <p className="hero-kicker hero-enter hero-enter-2">Product-minded software engineer</p>
            <h1 id="home-title" className="hero-display">
              <span className="hero-line"><span>Systems that</span></span>
              <span className="hero-line hero-line-offset"><span>hold up in the</span></span>
              <span className="hero-line"><span>real world.</span></span>
            </h1>
          </div>

          <div className="hero-bottom hero-enter hero-enter-6">
            <p className="hero-intro">
              I turn rough product ideas into dependable software—backend contracts,
              realtime loops, AI guardrails, and data systems included.
            </p>
            <div className="hero-actions">
              <a className="action-pill action-pill-primary" href="#selected-work">
                Explore work <span aria-hidden="true">↓</span>
              </a>
              <a className="action-pill" href={emailHref}>
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="systems-radar hero-enter hero-enter-5" aria-label="Engineering focus">
            <div className="radar-topline">
              <span>System map</span>
              <span className="radar-live"><i /> Live</span>
            </div>
            <div className="radar-field" aria-hidden="true">
              <span className="radar-ring radar-ring-one" />
              <span className="radar-ring radar-ring-two" />
              <span className="radar-axis radar-axis-x" />
              <span className="radar-axis radar-axis-y" />
              <span className="radar-sweep" />
              <span className="radar-core">UM</span>
              <span className="radar-label radar-label-state">State</span>
              <span className="radar-label radar-label-trust">Trust</span>
              <span className="radar-label radar-label-scale">Scale</span>
            </div>
            <div className="radar-footer">
              <span>Backend</span><span>Product</span><span>Data</span><span>AI</span>
            </div>
          </aside>
        </div>
      </section>

      <div className="capability-marquee" aria-label="Engineering capabilities">
        <div className="marquee-track">
          {["PRODUCT SYSTEMS", "REALTIME PROTOCOLS", "AI WORKFLOWS", "DATA CONTRACTS", "RELIABILITY", "PRODUCT SYSTEMS", "REALTIME PROTOCOLS", "AI WORKFLOWS", "DATA CONTRACTS", "RELIABILITY"].map((item, index) => (
            <span key={`${item}-${index}`}>{item}<i aria-hidden="true">✦</i></span>
          ))}
        </div>
      </div>

      <section id="selected-work" className="selected-work-section">
        <div className="container">
          <header className="workbench-section-heading" data-reveal>
            <p className="section-index">01 / Selected systems</p>
            <div>
              <h2>Built past the<br />happy path.</h2>
              <p>Five projects where the difficult behavior is the point—not an afterthought.</p>
            </div>
          </header>

          <div className="project-workbench" data-reveal>
            <div className="workbench-label" aria-hidden="true">
              <span>UDAY / PROJECT DESK</span>
              <span>DRAG YOUR EYES AROUND ↓</span>
            </div>
            <div className="project-dossier-grid">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className={`project-dossier project-dossier-${project.slug}`}
                  onPointerMove={tiltCard}
                  onPointerLeave={resetCard}
                >
                  <Link href={`/projects/${project.slug}`} aria-label={`Read the ${project.title} case study`}>
                    <div className="dossier-topline">
                      <span>{projectNumbers[project.slug] ?? "—"}</span>
                      <span>{project.category}</span>
                      <span>{project.status}</span>
                    </div>
                    <ProjectVisual slug={project.slug} />
                    <div className="dossier-copy">
                      <p>{project.label}</p>
                      <h3>{project.title}</h3>
                      <span>{projectProof[project.slug] ?? project.summary}</span>
                    </div>
                    <div className="dossier-footer">
                      <span>{project.stack.slice(0, 3).join(" · ")}</span>
                      <span className="dossier-arrow" aria-hidden="true">↗</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="work-archive-link" data-reveal>
            <p>These are the quick read. The archive has the deeper cuts, experiments, and data work.</p>
            <Link href="/projects">View all projects <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="operating-section">
        <div className="container">
          <header className="workbench-section-heading" data-reveal>
            <p className="section-index">02 / Operating principles</p>
            <div>
              <h2>How I keep<br />software honest.</h2>
              <p>The product experience is only as good as the contracts underneath it.</p>
            </div>
          </header>

          <div className="principle-board">
            <article className="principle-card principle-card-lime" data-reveal>
              <span className="principle-number">A</span>
              <div className="principle-symbol symbol-state" aria-hidden="true"><i /><i /><i /></div>
              <h3>State before screens</h3>
              <p>Clear transitions, explicit ownership, and retry-safe actions keep the interface believable.</p>
            </article>
            <article className="principle-card principle-card-violet" data-reveal>
              <span className="principle-number">B</span>
              <div className="principle-symbol symbol-boundary" aria-hidden="true"><i /><i /></div>
              <h3>Trust is a feature</h3>
              <p>Auth, privacy, access boundaries, and human-readable failure modes belong in the first version.</p>
            </article>
            <article className="principle-card principle-card-orange" data-reveal>
              <span className="principle-number">C</span>
              <div className="principle-symbol symbol-proof" aria-hidden="true"><i /><i /><i /><i /></div>
              <h3>Proof over posture</h3>
              <p>Tests, observability, runbooks, and reviewer paths make engineering claims easy to verify.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-console-section">
        <div className="container">
          <div className="contact-console" data-reveal>
            <div className="console-topline">
              <span>OPEN CHANNEL</span>
              <span><i /> READY TO TALK</span>
            </div>
            <p>Have a product that needs<br />more than a pretty demo?</p>
            <a className="console-email" href={emailHref}>
              Let&apos;s build it properly <span aria-hidden="true">↗</span>
            </a>
            <div className="console-links">
              {profileLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
              <Link href="/resume">Resume <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
