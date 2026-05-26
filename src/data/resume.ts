export const resumeSummary = {
  eyebrow: "Resume",
  title: "Software engineer focused on backend, data, and ML systems",
  intro:
    "Quick read on my experience, strongest projects, and core stack. The projects page has the deeper case studies.",
  note: "Open to backend, platform, data engineering, and ML systems roles.",
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
    items: ["FastAPI", "LightGBM", "XGBoost", "MLflow", "Optuna", "Feature contracts"],
  },
  {
    label: "Data systems",
    items: ["dbt", "Airflow", "DuckDB", "Pandas", "Quality checks"],
  },
  {
    label: "Frontend and mobile",
    items: ["React", "React Native", "Next.js"],
  },
  {
    label: "Platform",
    items: ["Docker", "Prometheus", "Grafana", "GitHub Actions", "Observability"],
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
    summary: "Inventory operations system with a transactional outbox, Kafka, ETL, analytics outputs, and stockout backtesting.",
    bullets: [
      "The clearest backend/data example: Spring Boot write path, outbox relay, idempotent pipeline, DQ, and demo artifacts.",
      "Good evidence for event-driven design, reliability, and business-metric thinking.",
    ],
  },
  {
    title: "Gathr",
    href: "/projects/gathr",
    summary: "Private-beta neighborhood activity app with mobile flows, backend APIs, chat, reliability scoring, and ML contracts.",
    bullets: [
      "Best read on product and backend together: core loop, launch manifest, feature flags, smoke checks, and trust/safety systems.",
      "Strong fit for teams that care about product constraints instead of generic CRUD examples.",
    ],
  },
  {
    title: "Unified Logistics Data Platform",
    href: "/projects/logistics-data-platform",
    summary: "Fleet, shipment, and last-mile data platform with sample-mode verification, dbt marts, quality checks, and Streamlit.",
    bullets: [
      "Shows how I turn event data into warehouse outputs and operator-facing proof.",
      "The project is explicit about the verified local path versus the deeper Kafka/Spark/Airflow path.",
    ],
  },
  {
    title: "Habit Tracker Social",
    href: "/projects/habit-tracker-social",
    summary: "Broad habit platform with Spring Boot, React, React Native, social loops, and wearable-aware completion logic.",
    bullets: [
      "Useful if you want one backend supporting web and mobile clients with auth, social state, and realtime updates.",
      "I am direct that it needs product narrowing before a public launch claim.",
    ],
  },
  {
    title: "Enefit Prosumer Energy Forecasting",
    href: "/projects/enefit-forecasting",
    summary: "Forecasting system with causal joins, dual LightGBM models, feature contracts, backtests, and API/CLI serving.",
    bullets: [
      "Strongest forecasting example: 2.0M rows, 106 features, leakage-resistant joins, and target-specific artifacts.",
      "Good evidence for train/serve parity and evaluation beyond a static holdout.",
    ],
  },
  {
    title: "Fraud Detection System",
    href: "/projects/fraud-detection-system",
    summary: "Fraud ML system with chronological splits, calibration, cost-based thresholding, deploy bundles, and FastAPI.",
    bullets: [
      "Strong risk-ML example: AUC-ROC/AUC-PR, calibration improvement, challenger benchmarking, and proof artifacts.",
      "The project shows decisioning discipline, not just model training.",
    ],
  },
  {
    title: "Instacart Reordering System",
    href: "/projects/instacart-reordering-system",
    summary: "Grocery reorder recommender with point-in-time features, candidate/basket evaluation, baseline lift, and serving contracts.",
    bullets: [
      "Strong recommender example: leakage tests, feature schema contract, F1 metrics, and lift over heuristics.",
      "The page is careful about offline evaluation versus online production claims.",
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
