export const resumeHref =
  process.env.NEXT_PUBLIC_RESUME_URL ||
  "https://drive.google.com/file/d/1ewrfIQ2m4onv6HaPB-gNKj-rxPgZ8iCR/view?usp=drive_link";

export const skills = [
  "SaaS MVPs",
  "Internal tools",
  "Backend systems",
  "Admin dashboards",
  "AI support workflows",
  "RAG pipelines",
  "Structured extraction",
  "Human-approved AI drafts",
  "Data pipelines",
  "Operational dashboards",
  "Data quality checks",
  "Schema design",
  "Authentication",
  "Workflow automation",
  "Production readiness",
  "Observability",
];

export const snapshotItems = [
  { label: "Focus", value: "Production-ready product and data systems" },
  { label: "Operating range", value: "MVPs, internal tools, AI workflows, backend APIs, dashboards, data pipelines" },
  { label: "Strengths", value: "Product loops, data models, edge cases, proof paths, reliability" },
  { label: "AI/data", value: "Human-approved AI workflows, trusted analytics, quality checks, monitoring" },
  { label: "Best proof", value: "ResolveOps, Stockout Pipeline, VibeGrid" },
  { label: "Based in", value: "India" },
];

export const aboutBlurb =
  "If you're skimming, start with these. They show how I think about product workflows, data models, operational edge cases, AI guardrails, and proof paths.";

export const pillarCards = [
  {
    title: "Product systems and internal tools",
    body:
      "Working products with real domain rules: rooms, tickets, activities, media, moderation, approvals, and admin workflows.",
    links: [
      { label: "Gathr", href: "/projects/gathrly" },
      { label: "VibeGrid", href: "/projects/vibegrid" },
      { label: "ResolveOps", href: "/projects/resolveops" },
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
