export const resumeHref =
  process.env.NEXT_PUBLIC_RESUME_URL ||
  "https://drive.google.com/file/d/1ewrfIQ2m4onv6HaPB-gNKj-rxPgZ8iCR/view?usp=drive_link";

export const skills = [
  "Go",
  "Java",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "DuckDB",
  "dbt",
  "Backend Systems",
  "Distributed Systems",
  "Realtime Protocols",
  "WebSocket/SSE",
  "State Machines",
  "Transaction Boundaries",
  "Idempotency",
  "REST APIs",
  "AI Workflows",
  "Retrieval-Augmented Generation",
  "Human-in-the-Loop Guardrails",
  "Feature Contracts",
  "Model Evaluation",
  "Calibration",
  "Data Contracts",
  "Schema Validation",
  "Observability",
  "LightGBM",
];

export const snapshotItems = [
  { label: "Focus", value: "Backend-heavy product systems" },
  { label: "Operating range", value: "Go/Java services, realtime protocols, AI guardrails, evals, feature/data contracts" },
  { label: "Strengths", value: "State ownership, transactions, idempotency, product workflows, proof paths" },
  { label: "ML/data", value: "Retrieval workflows, feature contracts, calibration, dbt/quality proof paths" },
  { label: "Best proof", value: "Gathr, VibeGrid, Stockout Pipeline" },
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
