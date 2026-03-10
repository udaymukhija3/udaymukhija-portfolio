import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    label: "In Progress",
    status: "Replace me",
    category: "backend",
    year: "2026",
    summary: "Production-style backend or ML system with concrete outcomes and real tradeoffs.",
    description:
      "Use this block for your strongest backend-heavy project. Explain the problem, what you designed, what decisions mattered, and the clearest outcome you can point to.",
    content: [
      "Describe the user or operational problem first. A recruiter or hiring manager should understand why this project matters within a few sentences.",
      "Then explain the system shape: the backend services, data model, infrastructure, APIs, and reliability decisions you owned.",
      "Close with the strongest evidence you have, such as latency improvements, cost reduction, user adoption, or complexity handled well.",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    links: [{ label: "Add repo link", href: "#" }],
    featured: true,
  },
  {
    slug: "project-two",
    title: "Project Two",
    label: "Case Study",
    status: "Replace me",
    category: "frontend",
    year: "2026",
    summary: "End-to-end product build covering frontend, API design, deployment, and observability.",
    description:
      "Use this one for a product-facing system. A good version of this entry explains the user problem, the architecture, and what you owned from UI to deployment.",
    content: [
      "Use this project to show full-stack ownership. Talk about how the interface served a real user workflow instead of just looking nice in screenshots.",
      "Explain the contract between frontend and backend, how state and loading were handled, and how you shipped or deployed it.",
      "If you have usage data, bugs prevented, or performance work, include that here. Concrete outcomes make the project more credible.",
    ],
    stack: ["React", "TypeScript", "Node.js", "AWS"],
    links: [{ label: "Add demo link", href: "#" }],
    featured: true,
  },
  {
    slug: "project-three",
    title: "Project Three",
    label: "Experiment",
    status: "Replace me",
    category: "ml",
    year: "2025",
    summary: "Data or ML system covering model choice, serving, evaluation, and engineering tradeoffs.",
    description:
      "Use this slot for a system where the ML side actually ships. Mention the model or pipeline, how you served it, and what you learned from operating it.",
    content: [
      "Start with the business or product need, not the model name. That makes the work legible to people outside pure ML.",
      "Then explain the engineering parts: data flow, evaluation, inference, serving, caching, or retraining, depending on what you actually built.",
      "End with tradeoffs. If a simpler model won, or if reliability mattered more than leaderboard performance, say that directly.",
    ],
    stack: ["Python", "FastAPI", "PyTorch", "Redis"],
    links: [{ label: "Add write-up link", href: "#" }],
    featured: true,
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "ml", label: "ML Systems" },
  { id: "frontend", label: "Frontend" },
] as const;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
