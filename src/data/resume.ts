export const resumeSummary = {
  eyebrow: "Resume",
  title: "Software engineer focused on backend and ML systems",
  intro:
    "This is the quick read on my experience, strongest projects, and core stack.",
  note: "I'm targeting backend, platform, and ML engineering roles.",
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
      "Helped migrate a no-code product onto a PostgreSQL-backed system.",
      "Built FastAPI flows and product-facing UI while tightening the data model.",
      "That work gave me hands-on experience with migration-heavy backend delivery and pragmatic shipping.",
    ],
  },
];

export const resumeProjects = [
  {
    title: "Inventory Analytics and Management System",
    href: "/projects/inventory-analytics-platform",
    summary: "Inventory service with transactional writes, Kafka events, and analytics outputs.",
    bullets: [
      "If you want my clearest backend example, start here.",
      "It shows event-driven design and is direct about what I would still tighten up.",
    ],
  },
  {
    title: "Gathr",
    href: "/projects/gathr",
    summary: "Social planning app with mobile flows, backend APIs, chat, and recommendation events.",
    bullets: [
      "This is the best read on how I think about product and backend together.",
      "It has real product constraints instead of feeling like a generic CRUD build.",
    ],
  },
  {
    title: "Habit Tracker Social",
    href: "/projects/habit-tracker-social",
    summary: "Habit tracking product with web and mobile clients, automation rules, and social features.",
    bullets: [
      "Useful if you want to see one backend supporting multiple client experiences.",
      "I spent most of my time here on state management, sync rules, and user trust.",
    ],
  },
  {
    title: "Kalshi Prediction Market Analytics Platform",
    href: "/projects/kalshi-prediction-platform",
    summary: "ML platform case study with data modeling, evaluation, model serving, and a realtime path.",
    bullets: [
      "This is the ML systems case study I'd use for architecture conversations.",
      "It focuses on evaluation, serving boundaries, and realtime tradeoffs.",
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
