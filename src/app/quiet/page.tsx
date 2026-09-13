import type { Metadata } from "next";
import Link from "next/link";
import { LivingHero } from "../../components/context/LivingHero";
import { SunriseField } from "../../components/context/SunriseField";
import { indexProjects } from "../../data/projects";
import "./quiet.css";

export const metadata: Metadata = {
  title: "A quieter portfolio",
  description: "Uday Mukhija. Thoughtful products and the systems beneath them.",
  robots: { index: false, follow: false },
};

export default function QuietPage() {
  return <div id="quiet-portfolio">
    <header className="quiet-intro">
      <h1>Hi, I’m Uday.</h1>
      <p>I’m a software engineer in India. I build thoughtful products and the systems beneath them.</p>
    </header>

    <LivingHero className="quiet-sunrise" labelId="quiet-light-title" compact>
      <h2 id="quiet-light-title" className="quiet-sr-only">A study in morning light</h2>
      <SunriseField id="quiet-light" hero />
    </LivingHero>

    <section id="work" className="quiet-work" aria-labelledby="quiet-work-title">
      <h2 id="quiet-work-title">A few things I’ve made</h2>
      <div className="quiet-projects">
        {indexProjects.map(project => <details key={project.id} name="quiet-project">
          <summary><span>{project.title}</span><span className="quiet-category">{project.category}</span><span className="quiet-plus" aria-hidden="true" /></summary>
          <div className="quiet-detail">
            <p>{project.description}</p>
            <Link href={project.href} prefetch={false}>View project <span aria-hidden="true">↗</span><span className="quiet-sr-only">: {project.title}</span></Link>
          </div>
        </details>)}
      </div>
      <Link href="/projects" className="quiet-archive" prefetch={false}>More work <span aria-hidden="true">↗</span></Link>
    </section>
  </div>;
}
