import { indexProjects } from "../../data/projects";
import { SunriseField } from "./SunriseField";
import { WorkIndex } from "./WorkIndex";
import styles from "./ContextPortfolio.module.css";

export function ContextPortfolio() {
  return <div id="context-portfolio" className={styles.portfolio}>
    <section className={styles.hero} aria-labelledby="context-title">
      <SunriseField id="hero-light" hero />
      <div className={`context-container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <h1 id="context-title">Design<br />in context.</h1>
          <p>Thoughtful products.<br />The systems beneath them.</p>
        </div>
      </div>
    </section>
    <WorkIndex projects={indexProjects.map(project => ({
      ...project,
      artwork: <SunriseField id={`art-${project.id}`} type={project.artworkType} />,
      preview: <SunriseField id={`preview-${project.id}`} type={project.artworkType} />,
    }))} />
  </div>;
}
