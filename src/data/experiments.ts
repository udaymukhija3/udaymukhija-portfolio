import type { Experiment } from "../types";

export const experiments: Experiment[] = [
  {
    slug: "signal-routing",
    title: "Signal routing",
    category: "svg",
    year: "2026",
    description:
      "An authored SVG study of how one request changes shape across nominal, retry, and recovery paths.",
    technologies: ["React", "SVG", "CSS"],
    preview: "routing",
    route: "/lab#signal-routing",
  },
  {
    slug: "transition-tempo",
    title: "Transition tempo",
    category: "motion",
    year: "2026",
    description:
      "A comparison of three motion roles: immediate response, ordinary state change, and expressive spatial continuity.",
    technologies: ["React", "CSS", "Reduced motion"],
    preview: "tempo",
    route: "/lab#transition-tempo",
  },
  {
    slug: "reading-measure",
    title: "Reading measure",
    category: "typography",
    year: "2026",
    description:
      "A variable text-measure specimen for seeing where editorial rhythm becomes either cramped or diffuse.",
    technologies: ["Variable CSS", "Semantic HTML"],
    preview: "measure",
    route: "/lab#reading-measure",
  },
  {
    slug: "constraint-field",
    title: "Constraint field",
    category: "webgl",
    year: "2026",
    description:
      "A lazy-loaded Three.js surface that maps pointer pressure and three operating modes into spatial deformation.",
    technologies: ["Three.js", "WebGL", "Reduced motion"],
    preview: "field",
    route: "/lab#constraint-field",
  },
];
