import type { Metadata } from "next";
import { LabWorkbench } from "../../components/LabWorkbench";
import { experiments } from "../../data/experiments";

export const metadata: Metadata = {
  title: "Lab",
  description: "Original studies in SVG, motion, typography, interaction, and spatial computation by Uday Mukhija.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  return (
    <>
      <section className="lab-hero" aria-labelledby="lab-title">
        <div className="container lab-hero-grid">
          <div>
            <p className="eyebrow">Experiments / Lab</p>
            <h1 id="lab-title">Small studies in how interfaces explain themselves.</h1>
          </div>
          <p>
            Original studies of state, timing, reading, and spatial input. Each one has a job beyond decoration and a complete non-animated state.
          </p>
        </div>
      </section>

      <section className="lab-index-section" aria-labelledby="lab-index-title">
        <div className="container lab-index">
          <p className="eyebrow" id="lab-index-title">Index / {String(experiments.length).padStart(2, "0")}</p>
          <nav aria-label="Experiment index">
            {experiments.map((experiment, index) => (
              <a key={experiment.slug} href={experiment.route}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{experiment.title}</strong>
                <small>{experiment.category}</small>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="lab-studies">
        <LabWorkbench />
      </div>
    </>
  );
}
