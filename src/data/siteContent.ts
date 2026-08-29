export const resumeHref =
  process.env.NEXT_PUBLIC_RESUME_URL ||
  "https://drive.google.com/file/d/1ewrfIQ2m4onv6HaPB-gNKj-rxPgZ8iCR/view?usp=drive_link";

export const skills = [
  "Go backend services",
  "Java domain services",
  "Python ML and data systems",
  "TypeScript product surfaces",
  "PostgreSQL transactional design",
  "Redis queues and realtime coordination",
  "WebSocket and SSE protocols",
  "Kafka and event-driven workflows",
  "DuckDB and dbt analytics",
  "Spark and Airflow-style pipelines",
  "RAG and retrieval workflows",
  "LLM evals and guardrails",
  "Structured outputs",
  "Human-approved AI actions",
  "Idempotency and state machines",
  "Auth and privacy boundaries",
  "Data contracts and quality gates",
  "Observability and launch readiness",
];

export const snapshotItems = [
  { label: "Focus", value: "Backend-heavy product systems that hold up under real use" },
  { label: "Operating range", value: "Realtime protocols, AI workflows, evals, data contracts, dashboards, and launch paths" },
  { label: "Strengths", value: "State, idempotency, auth boundaries, edge cases, proof paths, reliability" },
  { label: "AI/data", value: "Human-approved AI actions, retrieval, quality gates, trusted analytics, monitoring" },
  { label: "Best proof", value: "Gathr, Murmur, VibeGrid" },
  { label: "Based in", value: "India" },
];

export const aboutBlurb =
  "If you're skimming, start with Gathr, VibeGrid, Murmur, Punchline, and Mini Market. They show how I think about product state, realtime protocols, access boundaries, eval-style proof, and launch constraints.";

export const pillarCards = [
  {
    title: "Product systems and internal tools",
    body:
      "Working products with real domain rules: local plans, invite-only rooms, private media, puzzle attempts, moderation, and admin workflows.",
    links: [
      { label: "Gathr", href: "/projects/gathrly" },
      { label: "Murmur", href: "/projects/murmur" },
      { label: "VibeGrid", href: "/projects/vibegrid" },
    ],
  },
  {
    title: "Data and AI workflows",
    body:
      "Pipelines, dashboards, quality checks, retrieval workflows, structured outputs, evaluation paths, and proof artifacts.",
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
    body: "I prefer clear product boundaries, simple state transitions, and systems that are easy to reason about under failure.",
  },
  {
    title: "Make correctness visible",
    body:
      "For backend and data work, I care about validation, retries, idempotency, edge cases, and monitoring that shows what happened.",
  },
];

export const contactLinks = [
  { label: "Email", href: "mailto:udaymukhija3@gmail.com" },
  { label: "GitHub", href: "https://github.com/udaymukhija3" },
  { label: "LinkedIn", href: "https://linkedin.com/in/udaymukhija" },
  { label: "Resume", href: resumeHref },
];
