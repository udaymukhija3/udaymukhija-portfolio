export const resumeSummary = {
  eyebrow: "Resume",
  title: "Software engineer building product, backend, data, and AI workflow systems",
  intro:
    "I help teams turn rough ideas into working software: SaaS MVPs, internal tools, backend APIs, admin dashboards, data pipelines, and AI workflows with human review, clear tradeoffs, and maintainable code.",
  note: "Open to backend, platform, data-intensive, AI product engineering, and production-readiness work.",
};

export const skillGroups = [
  {
    label: "Product delivery",
    items: ["SaaS MVPs", "Internal tools", "Admin dashboards", "D2C workflows", "Demo-ready product loops"],
  },
  {
    label: "Backend systems",
    items: [
      "API design",
      "Authentication",
      "Permissions",
      "Workflow state",
      "Admin operations",
      "Rate limits",
      "Caching",
      "Reliable data models",
    ],
  },
  {
    label: "AI workflows",
    items: [
      "Ticket classification",
      "RAG pipelines",
      "Summarization",
      "Structured extraction",
      "Draft generation",
      "Human approval",
      "Evaluation cases",
    ],
  },
  {
    label: "Data engineering",
    items: [
      "Ingestion",
      "Validation",
      "Reject handling",
      "Quality checks",
      "Operational dashboards",
      "Reporting outputs",
      "Backtests",
    ],
  },
  {
    label: "Production readiness",
    items: ["Deployment paths", "Smoke tests", "Observability", "Error handling", "Pagination", "Performance", "Reliability audits"],
  },
];

export const experienceItems = [
  {
    company: "MyNotedApp",
    role: "Software Development Engineer (Contract)",
    period: "Jan. 2025 - Jun. 2025",
    location: "Gurugram, IN",
    bullets: [
      "Migrated a legacy no-code data model into a normalized relational model for 50,000+ course records while eliminating redundant data.",
      "Built a YouTube-to-Course engine that transformed unstructured video metadata into sequential curriculum modules, reducing course generation time by 85%.",
    ],
  },
];

export const resumeProjects = [
  {
    title: "Gathr",
    href: "/projects/gathrly",
    summary: "Private-alpha local planning product from gathr-slice2-complete, with discovery, joining, confirmation, chat, reliability, safety, privacy, and reviewer proof paths.",
    bullets: [
      "Modeled the discovery-to-attendance loop across hubs, activities, join/leave, confirmation, check-in, chat, Drops, safety, and privacy.",
      "Built backend-owned reliability and trust mechanics, including no-show penalties, report flows, blocked users, and data export/delete paths.",
    ],
  },
  {
    title: "Murmur",
    href: "/projects/murmur",
    summary: "Private short-voice product with invite-only rooms, authenticated media, saved notes, nudges, notifications, metrics, and deployment hardening.",
    bullets: [
      "Made room membership authoritative across invite acceptance, room access, voice-note creation, playback, reactions, and saved-note retention.",
      "Added server-side media validation, account export/delete paths, notification settings, PWA installability, loop-health metrics, and deploy/security checks.",
    ],
  },
  {
    title: "VibeGrid",
    href: "/projects/vibegrid",
    summary: "Daily puzzle product with server-authoritative rules, duplicate-safe guesses, admin publishing, moderation, sharing, and operational metrics.",
    bullets: [
      "Kept answer keys off the client by validating guesses server-side and revealing group data only after correct submissions.",
      "Designed guest attempts around row locking and client guess IDs so retries and double-clicks do not corrupt scoring.",
    ],
  },
];

export const educationItems = [
  {
    school: "Columbia University",
    detail: "Master of Science in Electrical Engineering",
    period: "May 2022",
  },
  {
    school: "VIT, Vellore",
    detail: "Bachelor of Technology in Electronics and Communications",
    period: "May 2020",
  },
];
