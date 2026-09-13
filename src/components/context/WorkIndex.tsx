"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { IndexProject } from "../../data/projects";
import styles from "./ContextPortfolio.module.css";

type WorkProject = IndexProject & { artwork: ReactNode; preview: ReactNode };

export function WorkIndex({ projects }: { projects: WorkProject[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return <section id="work" className={`context-container ${styles.work}`} aria-label="Selected work">
    {projects.map(project => {
      const open = expanded === project.id;
      return <article key={project.id} className={styles.row} data-open={open}>
        <h2 className={styles.rowHeading}>
          <button className={styles.toggle} id={`${project.id}-toggle`}
            aria-expanded={open} aria-controls={`${project.id}-details`}
            onClick={() => setExpanded(open ? null : project.id)}>
            <span className={styles.number}>{project.index}</span>
            <span className={styles.title}>{project.title}</span>
            <span className={styles.descriptor} aria-hidden="true"><i />{project.category}</span>
            <span className={styles.symbol} aria-hidden="true"><i /><i /></span>
          </button>
        </h2>
        <div className={styles.preview} aria-hidden="true">{project.preview}</div>
        <div className={styles.expansion} id={`${project.id}-details`} role="region"
          aria-labelledby={`${project.id}-toggle`} aria-hidden={!open} inert={!open}>
          <div className={styles.expansionInner}>
            <div className={styles.details}>
              <div className={styles.description}>
                <p>{project.description}</p>
                <Link href={project.href} prefetch={false} className={styles.projectLink}>View project <span aria-hidden="true">→</span><span className={styles.srOnly}>: {project.title}</span></Link>
              </div>
              <div className={styles.artwork}>{project.artwork}</div>
              <dl className={styles.metadata}>
                <div><dt>Role</dt><dd>{project.role}</dd></div>
                <div><dt>Type</dt><dd>{project.category}</dd></div>
                <div><dt>Year</dt><dd>{project.year}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </article>;
    })}
    <noscript><p className={styles.fallback}>Explore the projects: {projects.map(project => <a key={project.id} href={project.href}>{project.title} → </a>)}</p></noscript>
  </section>;
}
