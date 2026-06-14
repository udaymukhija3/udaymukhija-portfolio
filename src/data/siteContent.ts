export const resumeHref = process.env.NEXT_PUBLIC_RESUME_URL || "/resume";

export const skills = [
  "Java",
  "Spring Boot",
  "Go",
  "FastAPI",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "DuckDB",
  "dbt",
  "WebSocket",
  "REST APIs",
  "JPA/Hibernate",
  "JWT Auth",
  "ACID transactions",
  "Caching",
  "Rate limiting",
  "Docker",
  "Python",
  "LightGBM",
];

export const snapshotItems = [
  { label: "Focus", value: "Backend-heavy product systems" },
  { label: "Main stack", value: "Java, Spring Boot, Go, FastAPI, Next.js, PostgreSQL" },
  { label: "Strengths", value: "APIs, workflows, transactions, realtime state, data pipelines" },
  { label: "ML/data", value: "Artifact-backed evaluation, serving contracts, dbt/quality proof paths" },
  { label: "Best proof", value: "Gathr, VibeGrid, Murmur, Stockout Pipeline, Fraud" },
  { label: "Based in", value: "India" },
];

export const aboutBlurb =
  "If you're skimming, start with these. They show how I think about backend boundaries, product workflows, transactional state, realtime behavior, data pipelines, and honest ML artifacts.";

export const pillarCards = [
  {
    title: "Product systems",
    body:
      "Go, Spring Boot, and Next.js products with real domain rules: rooms, attempts, tickets, activities, media, moderation, and approvals.",
    links: [
      { label: "Gathr", href: "/projects/gathrly" },
      { label: "VibeGrid", href: "/projects/vibegrid" },
      { label: "ResolveOps", href: "/projects/resolveops" },
    ],
  },
  {
    title: "Data and ML systems",
    body:
      "Data contracts, dbt marts, backtests, calibration, feature contracts, deploy bundles, serving APIs, and proof artifacts.",
    links: [
      { label: "Stockout Pipeline", href: "/projects/inventory-management-sys" },
      { label: "Fraud", href: "/projects/fraud-detection-platform" },
      { label: "Instacart", href: "/projects/instacart-reorder-recommender" },
    ],
  },
];

export const workPrinciples = [
  {
    title: "Keep the contract clear",
    body: "I prefer explicit APIs, simple state transitions, and systems that are easy to reason about under failure.",
  },
  {
    title: "Make correctness visible",
    body:
      "For backend work, I care about transaction boundaries, cache behavior, retries, rate limits, and observability hooks.",
  },
];

export const contactLinks = [
  { label: "Email", href: "mailto:udaymukhija3@gmail.com" },
  { label: "GitHub", href: "https://github.com/udaymukhija3" },
  { label: "LinkedIn", href: "https://linkedin.com/in/udaymukhija" },
  { label: "Resume", href: resumeHref },
];
