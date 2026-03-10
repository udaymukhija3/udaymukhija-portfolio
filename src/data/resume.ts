export const resumeSummary = {
  eyebrow: "Resume",
  title: "Software engineer focused on backend and ML systems",
  intro:
    "I build backend services, data pipelines, and ML projects. This page is the short version of the site.",
  note: "Best fit for backend, platform, and ML engineering roles.",
};

export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "TypeScript", "SQL"],
  },
  {
    label: "Backend",
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
    company: "MyNotedApp",
    role: "Software development engineer",
    period: "2024",
    location: "Remote, India",
    bullets: [
      "Worked on a migration from a no-code stack to a PostgreSQL-backed system.",
      "Built FastAPI flows and product-facing UI while cleaning up the data model.",
      "Good experience in migration work, backend delivery, and pragmatic shipping.",
    ],
  },
];

export const resumeProjects = [
  {
    title: "Inventory Analytics and Management System",
    href: "/projects/inventory-analytics-platform",
    summary: "Inventory service with transactional writes, Kafka events, and analytics outputs.",
    bullets: [
      "Best backend project on the site.",
      "Shows event-driven design and a clear note about what is still incomplete.",
    ],
  },
  {
    title: "Gathr",
    href: "/projects/gathr",
    summary: "Social planning app with mobile flows, backend APIs, chat, and recommendation events.",
    bullets: [
      "Best example of product work plus backend ownership.",
      "More useful than a generic CRUD project because it has real product constraints.",
    ],
  },
  {
    title: "Kalshi Prediction Market Analytics Platform",
    href: "/projects/kalshi-prediction-platform",
    summary: "ML platform case study with data modeling, evaluation, model serving, and a realtime path.",
    bullets: [
      "Best high-level ML systems case study on the site.",
      "Useful if the role cares about evaluation and serving design.",
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
