export const resumeSummary = {
  eyebrow: "Resume",
  title: "Software engineer building backend-heavy products and data systems",
  intro:
    "I work with Spring Boot, Go, FastAPI, Next.js, PostgreSQL, Redis, Kafka, DuckDB/dbt, and ML serving artifacts. The strongest signal is product engineering with clear backend contracts, transactional state, realtime behavior, data pipelines, and evidence-backed evaluation.",
  note: "Open to backend, platform, data-intensive, and backend-adjacent ML engineering roles.",
};

export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "Scala", "Go", "C++"],
  },
  {
    label: "Backend engineering",
    items: [
      "Spring Boot",
      "Go",
      "FastAPI",
      "REST APIs",
      "JPA/Hibernate",
      "JWT Auth",
      "WebSocket",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Docker",
      "AWS",
    ],
  },
  {
    label: "Backend concepts",
    items: [
      "ACID transactions",
      "Database normalization",
      "API design",
      "Rate limiting",
      "Caching strategies",
      "Optimistic locking",
      "Pessimistic locking",
      "Event-driven architecture",
    ],
  },
  {
    label: "Currently learning",
    items: [
      "CI/CD",
      "Observability",
      "Integration testing",
      "Cloud deployment",
      "Message-driven services",
      "System design",
    ],
  },
  {
    label: "Data and ML",
    items: ["Airflow", "Flink", "Spark", "MLflow", "PyTorch", "XGBoost", "Pandas", "NumPy"],
  },
];

export const experienceItems = [
  {
    company: "MyNotedApp",
    role: "Software Development Engineer (Contract)",
    period: "Jan. 2025 - Jun. 2025",
    location: "Gurugram, IN",
    bullets: [
      "Migrated a legacy no-code data model to normalized PostgreSQL, enforcing relational structure and ACID-compliant storage for 50,000+ course records while eliminating redundant data.",
      "Built a YouTube-to-Course engine using Python and FastAPI to transform unstructured video metadata into sequential curriculum modules, reducing course generation time by 85%.",
    ],
  },
];

export const resumeProjects = [
  {
    title: "Gathrly",
    href: "/projects/gathrly",
    summary: "Spring Boot and Expo social activity product with feed ranking, realtime chat, reliability scoring, privacy flows, and a static public demo.",
    bullets: [
      "Modeled the discovery-to-attendance loop across hubs, activities, join/leave, confirmation, check-in, chat, Drops, safety, and privacy.",
      "Built backend-owned reliability and trust mechanics, including no-show penalties, report flows, blocked users, and data export/delete paths.",
    ],
  },
  {
    title: "VibeGrid",
    href: "/projects/vibegrid",
    summary: "Go-backed daily word puzzle with server-authoritative rules, idempotent guesses, Postgres attempt locking, admin publishing, moderation, and metrics.",
    bullets: [
      "Kept answer keys off the client by validating guesses in Go and revealing group data only after correct submissions.",
      "Designed guest attempts around Postgres row locking and client guess IDs so retries and double-clicks are safe.",
    ],
  },
  {
    title: "Inventory Management System",
    href: "/projects/inventory-management-sys",
    summary: "Inventory operations service plus data platform with transactional outbox, Kafka, idempotent ETL, Redis/FastAPI analytics, and a stockout backtest gate.",
    bullets: [
      "Connected Spring Boot inventory writes to analytics through a transactional outbox, Kafka relay, Python ETL, Postgres marts, Redis cache, and Parquet artifacts.",
      "Added a stockout-prevention backtest that records recall, precision, and estimated dollars saved, with a CI gate on recall.",
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
