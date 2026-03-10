export const resumeHref = process.env.NEXT_PUBLIC_RESUME_URL || "/resume";

export const skills = [
  "Core Java Backend Engineering",
  "ML Systems Thinking",
  "Spring Boot and API Design",
  "Feature Contracts and Serving Boundaries",
  "Streaming and Event Pipelines",
  "Evaluation and Calibration Discipline",
  "FastAPI, SQL, and Python Tooling",
  "Observability, Reliability, and CI/CD",
];

export const snapshotItems = [
  { label: "Pillar one", value: "Core Java backend systems" },
  { label: "Pillar two", value: "ML systems engineering" },
  { label: "Core stack", value: "Java, Spring Boot, Python, SQL" },
  { label: "Strengths", value: "APIs, event-driven flows, contracts, evaluation rigor" },
  { label: "Based in", value: "India" },
];

export const aboutBlurb =
  "I am a software engineer focused on two things: Core Java backend systems and ML systems engineering. I like work where service boundaries, event flows, data contracts, evaluation rigor, and operational clarity matter more than trendy abstractions. The shape of the portfolio is intentional: strong backend ownership on one side, disciplined ML system design on the other.";

export const pillarCards = [
  {
    title: "Core Java backend",
    body:
      "Spring Boot services, transactional data paths, event-driven flows, API contracts, operational boundaries, and systems that stay legible when failure modes show up.",
    links: [
      { label: "Event-Driven Inventory", href: "/projects/inventory-analytics-platform" },
      { label: "Gathr", href: "/projects/gathr" },
      { label: "Habit Tracker Social", href: "/projects/habit-tracker-social" },
    ],
  },
  {
    title: "ML systems engineering",
    body:
      "Temporal validation, feature contracts, calibration, serving parity, realtime feature boundaries, and model systems that can be defended beyond offline scores.",
    links: [
      { label: "Kalshi Platform", href: "/projects/kalshi-prediction-platform" },
      { label: "Enefit Forecasting", href: "/projects/enefit-forecasting" },
      { label: "Instacart Reordering", href: "/projects/instacart-reordering-system" },
    ],
  },
];

export const workPrinciples = [
  {
    title: "Java backend clarity",
    body:
      "I care about service boundaries, transactional correctness, event contracts, and APIs that remain legible under change.",
  },
  {
    title: "ML systems rigor",
    body:
      "I pay attention to leakage control, temporal evaluation, calibration, and training-serving parity because those usually matter more than model novelty.",
  },
  {
    title: "Operational honesty",
    body:
      "Fallbacks, proof boundaries, and clear notes about what is unfinished are part of the system, not something to hide after the demo.",
  },
];

export const contactLinks = [
  { label: "Email", href: "mailto:udaymukhija3@gmail.com" },
  { label: "GitHub", href: "https://github.com/udaymukhija3" },
  { label: "LinkedIn", href: "https://linkedin.com/in/udaymukhija" },
  { label: "Resume", href: resumeHref },
];
