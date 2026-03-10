export const resumeSummary = {
  eyebrow: "Resume",
  title: "Core Java backend engineer with strong ML systems instincts",
  intro:
    "I build Java backend systems and ML-heavy data workflows with a bias for clean contracts, sensible scope, and engineering decisions that survive scrutiny.",
  note:
    "Best fit for core Java backend, backend platform, and ML systems roles where implementation quality and system thinking both matter.",
};

export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "TypeScript", "SQL"],
  },
  {
    label: "Core Java backend",
    items: ["Spring Boot", "PostgreSQL", "Redis", "Kafka", "WebSocket"],
  },
  {
    label: "ML systems",
    items: ["FastAPI", "LightGBM", "MLflow", "dbt", "Airflow", "Flink"],
  },
  {
    label: "Supporting stack",
    items: ["TypeScript", "React", "React Native", "Docker", "feature contracts", "observability"],
  },
];

export const experienceItems = [
  {
    company: "Gathr",
    role: "Founder and lead engineer",
    period: "2024 - present",
    location: "Toronto / remote",
    bullets: [
      "Built and owned a Java-first product system spanning Spring Boot APIs, trust signals, realtime coordination, and ranking-aware product behavior.",
      "Used the project to practice backend ownership end to end: service contracts, fallback paths, instrumentation, data flows, and rollout controls.",
      "Strongest experience signal for startup environments where product ambiguity and backend execution have to coexist.",
    ],
  },
  {
    company: "MyNotedApp",
    role: "Software development engineer",
    period: "2024",
    location: "Toronto",
    bullets: [
      "Worked on backend delivery during a migration from a no-code stack to a normalized PostgreSQL-backed system with cleaner operational boundaries.",
      "Built FastAPI-driven processing flows and product-facing UI while tightening the data model and the migration story.",
      "Useful work-experience proof for application performance, migration safety, and pragmatic backend shipping.",
    ],
  },
];

export const resumeProjects = [
  {
    title: "Event-Driven Inventory Analytics",
    href: "/projects/inventory-analytics-platform",
    summary: "Core Java backend and platform case study built around transactional writes, Kafka events, and analytical materialization.",
    bullets: [
      "Best pure backend signal in the portfolio.",
      "Shows event-driven architecture, service boundaries, and honest handling of an incomplete serving path.",
    ],
  },
  {
    title: "Gathr",
    href: "/projects/gathr",
    summary: "Java-backed product system centered on trust, commitments, recommendation events, and resilient realtime coordination.",
    bullets: [
      "Useful startup signal because it combines product ambiguity with clear backend ownership.",
      "Shows Java backend judgment without reading like a generic CRUD project.",
    ],
  },
  {
    title: "Kalshi Prediction Market Analytics Platform",
    href: "/projects/kalshi-prediction-platform",
    summary: "ML platform case study focused on calibration-aware evaluation, feature-serving boundaries, and stream-processing scale-up paths.",
    bullets: [
      "Best signal for ML systems thinking and engineering maturity.",
      "Useful if the reviewer cares about data modeling, evaluation discipline, and serving boundaries.",
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
