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
];

export const snapshotItems = [
  { label: "Focus", value: "Backend and ML systems" },
  { label: "Main stack", value: "Java, Spring Boot, Python, SQL" },
  { label: "Strengths", value: "APIs, events, pipelines, evaluation" },
  { label: "Looking for", value: "Backend, platform, and ML roles" },
  { label: "Based in", value: "India" },
];

export const aboutBlurb =
  "I build backend services, data pipelines, and ML projects. I care most about clear APIs, simple system boundaries, and work that can be explained without inflated language.";

export const pillarCards = [
  {
    title: "Backend",
    body:
      "Java and Spring Boot services, APIs, database work, and event-driven systems.",
    links: [
      { label: "Event-Driven Inventory", href: "/projects/inventory-analytics-platform" },
      { label: "Gathr", href: "/projects/gathr" },
      { label: "Habit Tracker Social", href: "/projects/habit-tracker-social" },
    ],
  },
  {
    title: "ML systems",
    body:
      "Forecasting, recommenders, model serving, evaluation, and data pipelines that support them.",
    links: [
      { label: "Kalshi Platform", href: "/projects/kalshi-prediction-platform" },
      { label: "Enefit Forecasting", href: "/projects/enefit-forecasting" },
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
