import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "gathr",
    title: "Gathr",
    label: "Full-Stack Social",
    status: "Public repo",
    category: "product",
    year: "2025",
    summary: "Social planning app built around the gap between interest and actual attendance.",
    description: "Solo product build with mobile flows, Spring Boot APIs, chat, and simple recommendation logic.",
    metrics: [
      { label: "North star", value: "Attendance" },
      { label: "Realtime", value: "WS -> polling" },
      { label: "Decisioning", value: "Canonical rec events" },
      { label: "Rollouts", value: "14 feature flags" },
    ],
    facts: [
      { label: "Scope", value: "Solo product prototype" },
      { label: "Role", value: "Product, backend, mobile" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "End-to-end flows and architecture notes" },
      { label: "What I owned", value: "Discovery, chat, trust features, APIs" },
      { label: "Best fit", value: "Startup product and backend roles" },
    ],
    system: [
      { label: "Mobile app", value: "Discovery, commitments, trust cues, and chat" },
      { label: "Backend", value: "Spring Boot APIs, Postgres, Redis, flags, messaging" },
      { label: "Recommendations", value: "Shared event model and ranking inputs" },
      { label: "Fallbacks", value: "Polling fallback and rollout controls" },
    ],
    evidenceNote: "Public repo. Good signal for product thinking and end-to-end implementation, not for scale.",
    highlights: [
      "Built the product around attendance instead of raw activity.",
      "Connected discovery, commitments, trust cues, and chat in one app.",
      "Used shared recommendation events across multiple surfaces.",
      "Added fallbacks and feature flags to keep the app usable during changes.",
    ],
    sections: [
      {
        title: "What it is",
        paragraphs: [
          "Gathr started with a simple question: why do people say they are interested in an event but do not show up?",
          "I built it as a full-stack product so I could work through the mobile UX, backend APIs, chat, and recommendation logic in one system.",
        ],
      },
      {
        title: "Main choices",
        paragraphs: [
          "The main product choice was to optimize for attendance, not just clicks or interest.",
          "On the backend side, I used a shared recommendation event model so multiple screens could rely on the same logic.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "This is still a solo product build, so it is better as a design and implementation example than as proof of production scale.",
          "I also chose practical fallbacks over perfect realtime behavior. Chat falls back to polling when needed.",
        ],
      },
      {
        title: "Next steps",
        paragraphs: [
          "If I kept working on it, I would narrow the product around the strongest loop and measure how well it converts interest into attendance.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "React Native", "TypeScript", "LightGBM"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/gathrly" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "habit-tracker-social",
    title: "Habit Tracker Social",
    label: "Full-Stack Health",
    status: "Public repo",
    category: "product",
    year: "2024",
    summary: "Habit tracking app with web and mobile clients, social features, and wearable-aware updates.",
    description: "Full-stack build focused on reducing manual tracking without making user data unreliable.",
    metrics: [
      { label: "Clients", value: "Web + mobile" },
      { label: "Sync", value: "Manual + wearable" },
      { label: "Auth", value: "JWT + OAuth" },
      { label: "Realtime", value: "WS + Redis" },
    ],
    facts: [
      { label: "Scope", value: "Solo full-stack product build" },
      { label: "Role", value: "Backend, web, mobile, product logic" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "End-to-end flows, auth, sync rules, tests" },
      { label: "What I owned", value: "User state, automation rules, social features, APIs" },
      { label: "Best fit", value: "Backend and full-stack product roles" },
    ],
    system: [
      { label: "Clients", value: "React web app and React Native mobile app" },
      { label: "Core backend", value: "Spring Boot APIs, Redis, relational state, notifications" },
      { label: "Automation", value: "Manual, wearable, and hybrid completion flows" },
      { label: "Social layer", value: "Activity feeds, accountability, competitions, realtime updates" },
    ],
    evidenceNote: "Public repo. Best signal is the backend and state-management work behind the product.",
    highlights: [
      "Built both web and mobile clients around the same backend.",
      "Used confirmation rules so automation does not silently overwrite user progress.",
      "Added social features instead of keeping it as a solo tracker.",
      "Included auth, async work, and notifications as part of the core system.",
    ],
    sections: [
      {
        title: "What it is",
        paragraphs: [
          "This project looks at a common product problem: how do you reduce tracking friction without making progress feel fake?",
          "The result is a full-stack app with web and mobile clients, social features, and backend rules for when automated updates are allowed.",
        ],
      },
      {
        title: "Main choices",
        paragraphs: [
          "The main product choice was to treat trust as part of the feature set. Automated updates can ask for confirmation instead of pretending they are always correct.",
          "The backend is split into auth, sync, notifications, and user-state logic so the whole system does not collapse into one request path.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "It is a broad product build, so the strongest part is the system design rather than deep polish in every feature.",
          "The main value here is the backend and state-management work, not any AI layer.",
        ],
      },
      {
        title: "Next steps",
        paragraphs: [
          "If I kept working on it, I would narrow the product around the strongest retention loop and measure activation and first-week consistency more directly.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "React", "React Native", "MySQL", "Redis", "WebSocket"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/habit-tracker-social" }],
    featured: true,
    flagship: false,
  },
  {
    slug: "inventory-analytics-platform",
    title: "Event-Driven Inventory Analytics",
    label: "Backend and Data Platform",
    status: "Public repo",
    category: "data",
    year: "2024",
    summary: "Inventory service that records stock changes, emits Kafka events, and publishes analytics outputs.",
    description: "Backend and data project focused on transactional writes, typed events, and analytics pipelines.",
    metrics: [
      { label: "Operational writes", value: "Postgres + audit" },
      { label: "Events", value: "Kafka mutations" },
      { label: "Analytics", value: "3 sinks" },
      { label: "Known gap", value: "Serving path split" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed backend and data build" },
      { label: "Role", value: "Service design, events, ETL, API boundary" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "Inventory updates flow into analytics outputs" },
      { label: "What I owned", value: "Service, events, ETL, quality checks" },
      { label: "Best fit", value: "Backend, platform, and event-driven roles" },
    ],
    system: [
      { label: "Operational service", value: "Transactional inventory writes, audit trail, typed mutations" },
      { label: "Event stream", value: "Kafka events emitted from stock changes and reservations" },
      { label: "ETL and marts", value: "Python and Airflow path publishing Postgres, Redis, and Parquet outputs" },
      { label: "Serving boundary", value: "Analytics API exists, but the read path is still split" },
    ],
    evidenceNote: "Public repo. Strong backend signal. The analytics serving path is still split, and the project says so directly.",
    highlights: [
      "Captures stock changes transactionally before publishing events.",
      "Writes analytics outputs to multiple sinks.",
      "Includes explicit data quality checks.",
      "Calls out the current gap in the analytics read path.",
    ],
    sections: [
      {
        title: "What it is",
        paragraphs: [
          "This project combines an inventory service with an analytics pipeline.",
          "The core idea is simple: write stock changes transactionally, emit typed events, and publish analytics outputs from those events.",
        ],
      },
      {
        title: "Main choices",
        paragraphs: [
          "The main design choice was to treat the event stream as a real boundary, not a side effect.",
          "I also published outputs to multiple sinks so the project shows more than one downstream use case.",
        ],
      },
      {
        title: "Current gap",
        paragraphs: [
          "The main gap is that the analytics API is not yet reading from the exact same path as the ETL outputs.",
          "If I kept going, I would unify that read path and tighten the publication contract.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Airflow", "Python"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/inventory-management-sys" }],
    featured: false,
    flagship: true,
  },
  {
    slug: "kalshi-prediction-platform",
    title: "Kalshi Prediction Market Analytics Platform",
    label: "ML Platform",
    status: "Case study only",
    category: "ml",
    year: "2025",
    summary: "Prediction market case study with marts, evaluation, model serving, and a realtime path.",
    description: "ML systems project focused on data modeling, calibration, and a clean serving boundary.",
    metrics: [
      { label: "Validation", value: "Time-aware" },
      { label: "Invariant", value: "Zero-sum dbt test" },
      { label: "Serving", value: "FastAPI + Spring" },
      { label: "Streaming", value: "Python + Flink" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML platform case study" },
      { label: "Role", value: "Data modeling, evaluation design, API boundaries" },
      { label: "Status", value: "Case study only" },
      { label: "Proof", value: "Evaluation design and architecture documentation" },
      { label: "What I owned", value: "Marts, evaluation design, serving split, stream path" },
      { label: "Best fit", value: "ML platform and data-intensive backend roles" },
    ],
    system: [
      { label: "Batch layer", value: "Trades transformed into marts and model-ready features" },
      { label: "Model layer", value: "Mispricing model with calibration-aware evaluation" },
      { label: "Serving layer", value: "FastAPI inference behind a Spring Boot public contract" },
      { label: "Realtime path", value: "Python consumer today, Flink path for scale-up" },
    ],
    evidenceNote: "No public repo linked. The strongest part is the system design and evaluation setup.",
    highlights: [
      "Modeled market data into features and marts.",
      "Used time-aware validation and calibration metrics.",
      "Separated model serving from the public API layer.",
      "Included a simple realtime path with a clearer scale-up option.",
    ],
    sections: [
      {
        title: "What it is",
        paragraphs: [
          "This project is meant to look like a small ML platform instead of a single training script.",
          "It combines data modeling, evaluation, model serving, and a realtime update path in one case study.",
        ],
      },
      {
        title: "Main choices",
        paragraphs: [
          "The main choices were to keep the data model explicit, use time-aware evaluation, and separate inference from the public API.",
          "That makes the project more about system design than about model hype.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "This is a case study, so the evidence is mostly in the design and write-up rather than a public repo.",
          "It is useful for architecture discussion, but weaker as a proof artifact than the public projects.",
        ],
      },
    ],
    stack: ["DuckDB", "dbt", "LightGBM", "FastAPI", "Spring Boot", "Kafka", "Flink", "Redis"],
    links: [],
    featured: true,
    flagship: true,
  },
  {
    slug: "instacart-reordering-system",
    title: "Instacart Reordering System",
    label: "ML Recommender",
    status: "Case study only",
    category: "ml",
    year: "2025",
    summary: "Reordering system with point-in-time features, calibration, and a versioned serving contract.",
    description: "Recommendation system case study focused on preprocessing, evaluation, and training-serving parity.",
    metrics: [
      { label: "Candidate F1", value: "0.5665" },
      { label: "Basket F1", value: "0.4159" },
      { label: "Calibration", value: "Held-out split" },
      { label: "Serving", value: "Versioned contract" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML systems project" },
      { label: "Role", value: "Pipeline design, evaluation, inference contract" },
      { label: "Status", value: "Case study only" },
      { label: "Proof", value: "Offline metrics plus explicit feature contract" },
      { label: "What I owned", value: "Preprocessing, evaluation, calibration, API serving" },
      { label: "Best fit", value: "Applied ML and backend-adjacent ML roles" },
    ],
    system: [
      { label: "Data path", value: "Fingerprinting, deterministic splits, point-in-time features" },
      { label: "Model layer", value: "Candidate ranking and full-basket evaluation" },
      { label: "Calibration", value: "Thresholding on a dedicated held-out split" },
      { label: "Serving", value: "FastAPI inference with saved schema contract" },
    ],
    evidenceNote: "Strongest part is the work on leakage, evaluation, and inference contracts.",
    highlights: [
      "Used point-in-time preprocessing and leakage checks.",
      "Separated candidate quality from full-basket quality.",
      "Calibrated thresholds on a dedicated holdout split.",
      "Used the same feature contract in training and inference.",
    ],
    sections: [
      {
        title: "What it is",
        paragraphs: [
          "This project focuses on the parts of recommendation systems that are easy to skip in portfolios: leakage control, evaluation, and serving parity.",
          "The main goal was to show care for the data path and the online contract, not just the model.",
        ],
      },
      {
        title: "Main choices",
        paragraphs: [
          "The main decisions were to keep preprocessing point-in-time and deterministic, and to separate candidate ranking from basket-level quality.",
          "Those choices make the offline results easier to trust.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "This is better as an engineering example than as a broad product case study.",
          "The useful signal is the evaluation setup and feature contract.",
        ],
      },
    ],
    stack: ["Python", "Pandas", "LightGBM", "XGBoost", "FastAPI", "Pydantic", "Prometheus"],
    links: [],
  },
  {
    slug: "enefit-forecasting",
    title: "Enefit Prosumer Energy Forecasting",
    label: "ML Forecasting",
    status: "Public repo",
    category: "ml",
    year: "2025",
    summary: "Energy forecasting system with causal joins, separate models, and a shared serving contract.",
    description: "Forecasting project focused on time-aware joins, target-specific models, and reusable serving code.",
    metrics: [
      { label: "Rows", value: "2.0M" },
      { label: "Features", value: "106" },
      { label: "Holdout MAE", value: "46.33 / 89.70" },
      { label: "Serving", value: "Shared contract" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML systems build" },
      { label: "Role", value: "Data pipeline, feature design, serving contract" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "Walk-forward evaluation and saved artifacts" },
      { label: "What I owned", value: "Data joins, features, dual models, serving path" },
      { label: "Best fit", value: "Forecasting, ML systems, and backend-adjacent ML roles" },
    ],
    system: [
      { label: "Data joins", value: "As-of weather and price joins with origin-time discipline" },
      { label: "Feature path", value: "Temporal, autoregressive, and segment-prior features" },
      { label: "Model layer", value: "Separate consumption and production models" },
      { label: "Serving path", value: "Shared feature contract with fallback defaults" },
    ],
    evidenceNote: "Public repo. Strongest part is the time-aware data work and the shared serving contract.",
    highlights: [
      "Used causal joins and time-aware features.",
      "Trained separate models for different targets.",
      "Shared a feature contract across training and serving.",
      "Included walk-forward backtesting and reusable artifacts.",
    ],
    sections: [
      {
        title: "What it is",
        paragraphs: [
          "This project is about building a forecasting pipeline that stays believable when time matters.",
          "I used it to practice causal joins, target-specific models, and a serving path that stays aligned with training.",
        ],
      },
      {
        title: "Main choices",
        paragraphs: [
          "The main decisions were to keep joins explicitly causal and to split artifacts by target.",
          "I also kept the same feature contract in serving instead of rewriting the online path as a toy version.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "This is a strong technical project, but it is still a self-directed build rather than a live business system.",
          "The main proof is in the data handling, evaluation, and shared contract.",
        ],
      },
    ],
    stack: ["Python", "Pandas", "Pandera", "LightGBM", "FastAPI", "MLflow", "Docker"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/enefit" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "fraud-detection-system",
    title: "Fraud Detection System",
    label: "ML Risk",
    status: "Case study only",
    category: "ml",
    year: "2025",
    summary: "Fraud system with chronology-safe evaluation, calibration, and a serving contract.",
    description: "Fraud case study focused on leakage, thresholds, calibration, and deployable inference.",
    metrics: [
      { label: "AUC-ROC", value: "0.8360" },
      { label: "AUC-PR", value: "0.4198" },
      { label: "Calibration", value: "Threshold-aware" },
      { label: "Tests", value: "64 passed" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML systems project" },
      { label: "Role", value: "Evaluation design, decisioning, inference service" },
      { label: "Status", value: "Case study only" },
      { label: "Proof", value: "Offline metrics plus deployment-aware framing" },
      { label: "What I owned", value: "Feature path, model tuning, serving, challenger logic" },
      { label: "Best fit", value: "Applied ML and risk-oriented backend roles" },
    ],
    system: [
      { label: "Temporal path", value: "Chronology-safe split and leakage-aware preprocessing" },
      { label: "Model layer", value: "LightGBM plus challenger benchmarking" },
      { label: "Decisioning", value: "Calibration and thresholding for deployable outputs" },
      { label: "Serving", value: "FastAPI contract with monitoring hooks" },
    ],
    evidenceNote: "Strongest part is the decisioning and deployment-aware evaluation, not the product surface.",
    highlights: [
      "Treated chronology and leakage as first-class concerns.",
      "Focused on calibration and thresholding, not just ranking metrics.",
      "Included challenger benchmarking.",
      "Wrapped the model in a serving contract.",
    ],
    sections: [
      {
        title: "What it is",
        paragraphs: [
          "This project is about decision quality under class imbalance and deployment constraints.",
          "It emphasizes leakage control, calibration, and deployable inference more than feature volume.",
        ],
      },
      {
        title: "Main choices",
        paragraphs: [
          "The main choices were to make chronology explicit, tune thresholds, and keep challenger benchmarking in the loop.",
          "That makes the project read like a system that can evolve instead of a one-off training run.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "This is strongest as an ML systems example, not as a public proof artifact.",
          "Without a public repo, the evidence is weaker than the flagship projects.",
        ],
      },
    ],
    stack: ["Python", "LightGBM", "Optuna", "MLflow", "FastAPI", "Prometheus", "Grafana"],
    links: [],
  },
  {
    slug: "customer-segmentation-api",
    title: "Customer Segmentation API",
    label: "ML Service",
    status: "Public repo",
    category: "ml",
    year: "2024",
    summary: "Small ML service with a clean train-to-serving path and a stricter v2 validation flow.",
    description: "Compact clustering service that is mostly useful for artifact discipline and API design.",
    metrics: [
      { label: "Model", value: "K-Means" },
      { label: "Serving", value: "FastAPI" },
      { label: "Validation", value: "Schema-gated v2" },
      { label: "Tests", value: "16 API tests" },
    ],
    facts: [
      { label: "Scope", value: "Compact self-directed ML service" },
      { label: "Role", value: "Artifacts, API design, validation path" },
      { label: "Status", value: "Public repo with baseline and v2 tracks" },
      { label: "Proof", value: "Runnable baseline plus stricter validation flow" },
      { label: "What I owned", value: "Training path, metadata, API contract, packaging" },
      { label: "Best fit", value: "Smaller ML service and backend-adjacent roles" },
    ],
    system: [
      { label: "Baseline path", value: "CSV to model artifacts to FastAPI inference" },
      { label: "Metadata", value: "Persisted metrics, feature names, training statistics" },
      { label: "v2 path", value: "Schema checks and richer engineered features" },
      { label: "Packaging", value: "Docker, CI, and API tests" },
    ],
    evidenceNote: "Small project. Useful mainly because it shows clean artifacts, validation, and API boundaries.",
    highlights: [
      "Kept a runnable baseline path.",
      "Saved model metadata with the artifacts.",
      "Added a stricter v2 validation path.",
      "Included tests and packaging around the API.",
    ],
    sections: [
      {
        title: "What it is",
        paragraphs: [
          "This is a compact ML service project.",
          "The value is not model complexity. The value is the clean artifact flow, explicit metadata, and testable API contract.",
        ],
      },
      {
        title: "Main choices",
        paragraphs: [
          "The main choice was to keep both a stable baseline and a stricter v2 path.",
          "I also made the API contract and model metadata explicit so the system is easy to inspect.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "This is a supporting project, not a flagship one.",
          "It is useful as a small example of clean service design.",
        ],
      },
    ],
    stack: ["Python", "scikit-learn", "FastAPI", "Pydantic", "Docker", "pytest"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/customer-segment" }],
  },
  {
    slug: "logistics-data-platform",
    title: "Unified Logistics Data Platform",
    label: "Data Engineering",
    status: "Public repo",
    category: "data",
    year: "2025",
    summary: "Logistics data platform with layered processing, quality checks, and a verified local demo path.",
    description: "Data engineering project with ingestion, transforms, marts, orchestration, and explicit local proof.",
    metrics: [
      { label: "Tests", value: "77 passed" },
      { label: "Quality", value: "31 / 31 checks" },
      { label: "Demo", value: "Bronze + Silver" },
      { label: "Domains", value: "3 data streams" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed data engineering build" },
      { label: "Role", value: "Pipeline shape, quality framework, demo path" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "Sample-mode run with passing tests and checks" },
      { label: "What I owned", value: "Data layers, validation, orchestration story" },
      { label: "Best fit", value: "Data platform and backend-adjacent pipeline roles" },
    ],
    system: [
      { label: "Operational domains", value: "Fleet, shipment, and last-mile event streams" },
      { label: "Data layers", value: "Bronze landing, Silver reconstruction, warehouse marts" },
      { label: "Quality", value: "Reusable framework across pipeline checks" },
      { label: "Demo path", value: "Verified local sample run with reproducible outputs" },
    ],
    evidenceNote: "Public repo. Strong because it clearly separates the verified local path from the larger target architecture.",
    highlights: [
      "Modeled three operational domains instead of one synthetic stream.",
      "Built layered processing and validation.",
      "Added a reusable quality framework.",
      "Separated the verified local path from the larger architecture.",
    ],
    sections: [
      {
        title: "What it is",
        paragraphs: [
          "This project is meant to look like a small data platform instead of a single ETL script.",
          "It combines ingestion, layered transforms, quality checks, orchestration, and marts.",
        ],
      },
      {
        title: "Main choices",
        paragraphs: [
          "The main decisions were to build reusable checks into the pipeline and to keep a verified sample-mode path.",
          "That gives the project something concrete to prove instead of only describing a target architecture.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "The architecture is broader than the fully verified runtime path.",
          "That tradeoff is acceptable here because the project is clear about what is proven locally and what is still just architecture.",
        ],
      },
    ],
    stack: ["Python", "Spark", "Kafka", "dbt", "Airflow", "DuckDB", "Streamlit"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/logistics-data-engineering" }],
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "product", label: "Product Systems" },
  { id: "ml", label: "ML Systems" },
  { id: "data", label: "Data Platforms" },
] as const;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
