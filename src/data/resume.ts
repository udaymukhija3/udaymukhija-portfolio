export const resumeSummary = {
  eyebrow: "Resume",
  title: "Backend and full-stack engineer with product sense and systems range",
  intro:
    "I build product systems, APIs, and data-heavy workflows with a bias for clear contracts, sensible scope, and shipping work that stays understandable under pressure.",
  note:
    "Best fit for backend, full-stack, and startup roles where ownership, product judgment, and execution matter more than narrow specialization.",
};

export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "TypeScript", "SQL"],
  },
  {
    label: "Backend",
    items: ["Spring Boot", "FastAPI", "PostgreSQL", "Redis", "WebSocket"],
  },
  {
    label: "Product and frontend",
    items: ["React", "React Native", "API design", "feature flags", "operational tooling"],
  },
  {
    label: "Data and ML",
    items: ["Kafka", "Airflow", "dbt", "LightGBM", "MLflow", "Flink"],
  },
];

export const experienceItems = [
  {
    company: "Gathr",
    role: "Founder and lead engineer",
    period: "2024 - present",
    location: "Toronto / remote",
    bullets: [
      "Built a social planning product around a hard product problem: moving users from lightweight interest to real attendance.",
      "Owned product framing, backend APIs, ranking and trust signals, realtime coordination, and the mobile client.",
      "Used the project to practice end-to-end ownership: product decisions, API contracts, fallbacks, instrumentation, and rollout controls.",
    ],
  },
  {
    company: "MyNotedApp",
    role: "Software development engineer",
    period: "2024",
    location: "Toronto",
    bullets: [
      "Worked on backend and product delivery during a migration from a no-code stack to a normalized PostgreSQL-backed system.",
      "Built FastAPI-driven content processing flows and React UI for a learning product with a stronger data model and clearer operational boundaries.",
      "Focused on pragmatic shipping: data migration safety, application performance, and user-facing product clarity.",
    ],
  },
];

export const resumeProjects = [
  {
    title: "Gathr",
    href: "/projects/gathr",
    summary: "Full-stack product build centered on trust, discovery, commitments, and resilient realtime coordination.",
    bullets: [
      "Strongest signal for startup and product-minded full-stack roles.",
      "Public repo with the clearest end-to-end proof path in the portfolio.",
    ],
  },
  {
    title: "Habit Tracker Social",
    href: "/projects/habit-tracker-social",
    summary: "Behavior-change platform with web and mobile clients, wearable-aware sync, and trust-preserving automation rules.",
    bullets: [
      "Best example of backend, mobile, and product systems living in one coherent build.",
      "Good proof for auth, realtime flows, data contracts, and user-state automation.",
    ],
  },
  {
    title: "Event-Driven Inventory Analytics",
    href: "/projects/inventory-analytics-platform",
    summary: "Backend and data-platform case study built around transactional writes, Kafka events, and multi-sink analytics materialization.",
    bullets: [
      "Best backend-heavy case study in the portfolio.",
      "Includes honest documentation of what is solid and what is still incomplete.",
    ],
  },
];

export const educationItems = [
  {
    school: "Scaler Institute of Technology",
    detail: "Software engineering program",
    period: "Expected 2026",
  },
  {
    school: "Columbia University",
    detail: "M.S. in Electrical Engineering",
    period: "2022",
  },
  {
    school: "VIT, Vellore",
    detail: "B.Tech. in Electronics and Communication",
    period: "2020",
  },
];
