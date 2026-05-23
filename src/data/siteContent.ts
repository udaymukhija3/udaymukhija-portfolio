export const resumeHref = process.env.NEXT_PUBLIC_RESUME_URL || "/resume";

export const skills = [
  "Java backend",
  "APIs",
  "Data pipelines",
  "ML systems",
  "Spring Boot",
  "Python",
  "SQL",
  "FastAPI",
  "LightGBM",
  "dbt",
  "Kafka",
];

export const snapshotItems = [
  { label: "Focus", value: "Backend, data, and ML systems" },
  { label: "Main stack", value: "Java, Spring Boot, Python, SQL, TypeScript" },
  { label: "Strengths", value: "APIs, events, contracts, pipelines, evaluation" },
  { label: "Best proof", value: "Inventory, Gathr, Logistics, Enefit, Fraud, Instacart" },
  { label: "Based in", value: "India" },
];

export const aboutBlurb =
  "If you're skimming, start with these. They show how I think about product choices, backend boundaries, and ML/data systems.";

export const pillarCards = [
  {
    title: "Backend",
    body:
      "Java and Spring Boot services, APIs, transactional state, realtime flows, and event-driven systems.",
    links: [
      { label: "Event-Driven Inventory", href: "/projects/inventory-analytics-platform" },
      { label: "Gathr", href: "/projects/gathr" },
      { label: "Habit Tracker Social", href: "/projects/habit-tracker-social" },
    ],
  },
  {
    title: "ML systems",
    body:
      "Forecasting, risk, recommenders, model serving, evaluation, and the data pipelines that support them.",
    links: [
      { label: "Enefit Forecasting", href: "/projects/enefit-forecasting" },
      { label: "Fraud Detection", href: "/projects/fraud-detection-system" },
      { label: "Instacart Reordering", href: "/projects/instacart-reordering-system" },
    ],
  },
];

export const workPrinciples = [
  {
    title: "Keep it clear",
    body: "I prefer simple interfaces, direct code paths, and systems that are easy to debug.",
  },
  {
    title: "End To End ML rigor",
    body:
      "For ML work, I care about the full path from data quality and evaluation to serving behavior in production.",
  },
];

export const contactLinks = [
  { label: "Email", href: "mailto:udaymukhija3@gmail.com" },
  { label: "GitHub", href: "https://github.com/udaymukhija3" },
  { label: "LinkedIn", href: "https://linkedin.com/in/udaymukhija" },
  { label: "Resume", href: resumeHref },
];
