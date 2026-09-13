import { indexProjects } from "../../data/projects";
import { SunriseField } from "./SunriseField";
import { WorkIndex } from "./WorkIndex";
import { LivingHero } from "./LivingHero";
import styles from "./ContextPortfolio.module.css";

export function ContextPortfolio() {
  return <div id="context-portfolio" className={styles.portfolio}>
    <LivingHero>
      <SunriseField id="hero-light" hero />
      <div className={`context-container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <h1 id="context-title"><span className={styles.headlineLine}><span>Design</span></span><span className={styles.headlineLine}><span>in context.</span></span></h1>
          <p>Thoughtful products.<br />The systems beneath them.</p>
        </div>
      </div>
    </LivingHero>
    <WorkIndex projects={indexProjects.map(project => ({
      ...project,
      artwork: <SunriseField id={`art-${project.id}`} type={project.artworkType} />,
      preview: <SunriseField id={`preview-${project.id}`} type={project.artworkType} />,
    }))} />
  </div>;
}
