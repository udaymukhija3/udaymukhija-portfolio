import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "gathr",
    title: "Gathr",
    label: "Full-Stack Social",
    status: "Public repo",
    category: "product",
    year: "2026",
    summary:
      "I built this neighborhood activity app around a tight loop: find a small group, commit, chat, and show up.",
    description:
      "I built Gathr as a private-beta social planning product with a Spring Boot backend, React Native client, activity chat, reliability scoring, micro-commitments, and ML-backed recommendation contracts.",
    metrics: [
      { label: "North star", value: "Attendance" },
      { label: "Backend", value: "39 controllers" },
      { label: "Codebase", value: "333 Java files" },
      { label: "Rollouts", value: "14 feature flags" },
    ],
    facts: [
      { label: "Scope", value: "Private-beta product build" },
      { label: "Role", value: "Product, backend, mobile" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "Launch manifest, subsystem report, smoke checklist" },
      { label: "What I owned", value: "Activity loop, chat, reliability, recommendations, APIs" },
      { label: "Best fit", value: "Startup product and backend roles" },
    ],
    system: [
      { label: "Mobile loop", value: "Hub selection, feed browse, create, join, chat, confirm, check in" },
      { label: "Backend", value: "OTP/JWT auth, activity lifecycle, reliability, notifications, safety" },
      { label: "Intelligence", value: "Feed ranking, matching, graph embeddings, semantic search, fallbacks" },
      { label: "Release shape", value: "One-hub private beta with launch flags and staging smoke checks" },
    ],
    evidenceNote:
      "The local gathr-slice2-complete repo is the source of truth here: launch manifest, subsystem inventory, ML runtime contract, and staging smoke docs.",
    highlights: [
      "Narrowed the product to a private-beta launch in one hub instead of pretending it was ready for every city.",
      "Connected discovery, join, chat, reminders, confirmation, check-in, and reliability into one attendance loop.",
      "Defined runtime contracts and fallbacks for feed ranking, matching, search, churn, notification value, and safety paths.",
      "Added feature flags and staging smoke checks around the core launch path.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "Gathr started with a product question: how do you help people turn casual interest into actual attendance for small neighborhood activities?",
          "The app lets a user choose a hub, browse activities happening soon, join one, chat with the group, confirm, check in, and build reliability through attendance behavior.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I kept the launch shape narrow. The local launch manifest freezes the beta to one hub and disables broad surfaces like Discover, Crews, contacts sync, enhanced search, and map view.",
          "On the backend side, I treated trust and attendance as part of the domain model: activity lifecycle, participation state, micro-commitments, reliability history, safety reporting, and reminders are all explicit systems.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "I do not present this as a public app-store launch. It is a private-beta product build with a strong core loop and a lot of system depth.",
          "Some ML paths are contract-backed and fallback-aware rather than proof of production traffic. The honest value is the architecture and launch discipline, not a claim of large-scale usage.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would keep the one-hub beta constraint, seed recurring host supply, and measure the conversion from feed impression to join, confirmation, check-in, and attended activity.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "React Native", "TypeScript", "WebSocket", "LightGBM"],
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
    year: "2026",
    summary:
      "I built this habit platform across Spring Boot, React, and React Native, with social accountability and wearable-aware completion logic.",
    description:
      "This is strongest as a backend and product-systems sample: 30 controllers, 64 entities, 41 Flyway migrations, JWT and refresh-token auth, WebSocket updates, provider adapters, and an honest launch audit that says the product still needs a sharper v1 cut.",
    metrics: [
      { label: "Controllers", value: "30" },
      { label: "Entities", value: "64" },
      { label: "Migrations", value: "41" },
      { label: "Auth", value: "JWT + OAuth" },
    ],
    facts: [
      { label: "Scope", value: "Broad full-stack product build" },
      { label: "Role", value: "Backend, web, mobile, product logic" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "State-of-app audit, OpenAPI docs, backend inventory" },
      { label: "What I owned", value: "Habit state, auth, social flows, wearable/fusion scaffolding" },
      { label: "Best fit", value: "Backend and full-stack product roles" },
    ],
    system: [
      { label: "Backend", value: "Spring Boot APIs, MySQL, Redis, WebSocket, OpenAPI, Actuator" },
      { label: "Clients", value: "React web client and React Native mobile client over the same API" },
      { label: "Health data", value: "Provider adapter pattern, Fitbit path, dedup keys, fusion confidence" },
      { label: "Product loops", value: "Habits, streaks, friends, feed, reactions, challenges, notifications" },
    ],
    evidenceNote:
      "The local repo has useful ambition and an equally useful audit: backend depth is real, while the product should be narrowed before any public launch claim.",
    highlights: [
      "Built a Spring Boot backend with versioned routes, DTO mapping, domain events, JWT auth, rate limiting, and WebSocket updates.",
      "Supported React web and React Native clients from the same backend contract.",
      "Designed a health-data path with OAuth adapters, webhook security, deduplication, fusion methods, and confidence-gated auto-completion.",
      "Kept the site copy honest by calling out that the product is broad and needs a focused v1 before launch.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built a full-stack habit product with a Spring Boot API, React web app, and React Native mobile app.",
          "The backend covers the parts that matter for a serious habit system: auth, habit CRUD, completions, streaks, social feeds, friends, notifications, provider connections, sync logs, and automation rules.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I treated trust in automated progress as a domain problem. Health data can be deduplicated, fused, assigned confidence, and either silently applied or held for confirmation.",
          "The service design uses explicit controllers, DTOs, mappers, repositories, domain events, schedulers, and provider adapters so the system does not collapse into one oversized habit controller.",
        ],
      },
      {
        title: "Current truth",
        paragraphs: [
          "The local state-of-app audit is blunt: this repo contains infrastructure for several product directions, but it is not a polished production habit app yet.",
          "That honesty makes the project better to discuss. I would present the backend architecture, data fusion, and cross-client contract as the strongest evidence, while being clear that mobile/web product scope needs pruning.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would cut the product to a solo-first v1: Today, fast logging, streaks, optional friends, and a small number of notifications. The repo already contains enough backend machinery; the next win is focus.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "React", "React Native", "MySQL", "Redis", "WebSocket"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/habit-tracker-social" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "inventory-analytics-platform",
    title: "Event-Driven Inventory Analytics",
    label: "Backend and Data Platform",
    status: "Public repo",
    category: "data",
    year: "2026",
    summary:
      "I built an inventory operations system where stock writes flow through a transactional outbox, Kafka, ETL, marts, and stockout-prevention backtests.",
    description:
      "I built this as an inventory operations and analytics platform: Spring Boot source-of-truth APIs, transactional outbox publishing, an idempotent Python pipeline, Postgres and Redis serving outputs, Parquet artifacts, quality checks, Prometheus/Grafana, and a CI-gated stockout backtest.",
    metrics: [
      { label: "Recall gate", value: "60%" },
      { label: "Core services", value: "4" },
      { label: "API surface", value: "50+ endpoints" },
      { label: "Outputs", value: "Postgres / Redis / Parquet" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed backend and data platform" },
      { label: "Role", value: "Service design, outbox, ETL, backtesting, demo path" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "make demo artifacts, DQ results, backtest metadata" },
      { label: "What I owned", value: "Inventory service, event contract, pipeline, quality checks" },
      { label: "Best fit", value: "Backend, platform, and event-driven roles" },
    ],
    system: [
      { label: "Operational write path", value: "Spring Boot inventory APIs, Postgres transactions, audit rows" },
      { label: "Event stream", value: "Transactional outbox relay to Kafka with retries and give-up handling" },
      { label: "Analytics pipeline", value: "Idempotent Python ETL into metrics, history, Redis, and Parquet" },
      { label: "Reliability", value: "DQ checks, run manifests, stockout backtest, Prometheus, Grafana" },
    ],
    evidenceNote:
      "The local inventory_management_sys repo has the clearest proof path: run the supported demo, inspect artifacts, and see stock changes materialized into analytics outputs.",
    highlights: [
      "Used a transactional outbox so inventory mutations and publish intent are committed together.",
      "Built the ETL to deduplicate events, support replay, reject invalid events, and persist run metadata.",
      "Materialized analytics into Postgres current/history tables, Redis hot keys, and partitioned Parquet files.",
      "Scored stockout-prevention logic in CI against a synthetic 90-day history with recall, precision, and dollars-saved outputs.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built this as an inventory operations system with a data-engineering spine.",
          "The operational side manages products, warehouses, adjustments, reservations, sales, receipts, and audit rows. The analytics side consumes inventory events and produces current metrics, history, cache entries, Parquet artifacts, quality results, and stockout recommendations.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I treated the outbox as the boundary between correctness and delivery. Inventory writes stay transactional, and the relay handles Kafka publication separately.",
          "I also made the demo path supported and explicit: inventory-service, data-pipeline-service, analytics-service, frontend, Postgres, Redis, Kafka, Prometheus, and Grafana. Other sandbox pieces are quarantined instead of oversold.",
        ],
      },
      {
        title: "Verification",
        paragraphs: [
          "The local proof path triggers a live sale for a seeded SKU, waits for ETL, then captures before/after inventory, analytics responses, current metrics, pipeline runs, DQ runs, Redis output, Parquet files, and the latest manifest.",
          "That gives the project a concrete evaluation story instead of only an architecture diagram.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "I would present the supported path first and avoid claiming the optional gateway, reorder service, Airflow, and stream processor as equally verified.",
          "The strongest interview story is the outbox, idempotent ETL, run metadata, and CI-backed backtest.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "FastAPI", "Python", "dbt"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/inventory-management-sys" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "kalshi-prediction-platform",
    title: "Kalshi Prediction Market Analytics Platform",
    label: "ML Platform",
    status: "Case study only",
    category: "ml",
    year: "2025",
    summary:
      "I designed this prediction market case study around marts, evaluation, model serving, and a realtime path.",
    description:
      "I used this case study to work through data modeling, evaluation, model serving, and a cleaner public API boundary.",
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
    evidenceNote:
      "This one is a case study rather than a public repo, so the value is in the system design and evaluation choices.",
    highlights: [
      "Modeled market data into features and marts.",
      "Used time-aware validation and calibration metrics.",
      "Separated model serving from the public API layer.",
      "Included a simple realtime path with a clearer scale-up option.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I approached this like a small ML platform instead of a single training script.",
          "It combines data modeling, evaluation, model serving, and a realtime update path in one case study.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I kept the data model explicit, used time-aware evaluation, and separated inference from the public API.",
          "That makes the project more about system design than about model hype.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "Because this is a case study, most of the evidence lives in the design and write-up rather than a public repo.",
          "It works well for architecture discussion, but it is not as inspectable as the public projects.",
        ],
      },
    ],
    stack: ["DuckDB", "dbt", "LightGBM", "FastAPI", "Spring Boot", "Kafka", "Flink", "Redis"],
    links: [],
    featured: false,
    flagship: false,
  },
  {
    slug: "instacart-reordering-system",
    title: "Instacart Reordering System",
    label: "ML Recommender",
    status: "Local case study",
    category: "ml",
    year: "2026",
    summary:
      "I built an Instacart reorder recommender with point-in-time features, leakage tests, calibration, baseline lift, and FastAPI serving.",
    description:
      "I built this as a full ML systems case study: raw-data validation, dataset fingerprints, deterministic train/validation/calibration/test splits, LightGBM and XGBoost training, candidate and basket evaluation, feature-contract checks, Prometheus metrics, and deterministic demo artifacts.",
    metrics: [
      { label: "Candidate F1", value: "0.5665" },
      { label: "Basket F1", value: "0.4159" },
      { label: "Lift", value: "1.67x / 2.32x" },
      { label: "Feature contract", value: "65 features" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML systems project" },
      { label: "Role", value: "Data pipeline, evaluation, calibration, serving" },
      { label: "Status", value: "Local case study with checked-in artifacts" },
      { label: "Proof", value: "Run summary, lift table, leakage tests, demo bundle" },
      { label: "What I owned", value: "Preprocessing, evaluation, calibration, API serving" },
      { label: "Best fit", value: "Applied ML and backend-adjacent ML roles" },
    ],
    system: [
      { label: "Data path", value: "Memory-aware loading, schema checks, fingerprints, point-in-time recency" },
      { label: "Model layer", value: "LightGBM and XGBoost over user-product candidate rows" },
      { label: "Evaluation", value: "Candidate F1, full-basket F1, baseline lift, slices, calibration curves" },
      { label: "Serving", value: "FastAPI recommendations with feature contract, lineage, latency metadata" },
    ],
    evidenceNote:
      "The local Instacart repo has strong proof artifacts: run_summary, baseline_lift_table, feature_schema_contract, data fingerprint, API demo outputs, and leakage/API tests.",
    highlights: [
      "Used point-in-time preprocessing and tests that protect recency features from target-order leakage.",
      "Separated candidate quality from full-basket quality so the metrics do not overstate recommendation performance.",
      "Beat recency and global-popularity heuristics on temporal candidate F1.",
      "Loaded a versioned feature contract in the API and returned request-level lineage and latency metadata.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built an end-to-end grocery reordering recommender around the Instacart dataset.",
          "The system starts with raw CSV loading and validation, builds point-in-time user, product, user-product, time, aisle, and department features, trains tree-based rankers, evaluates candidate and basket quality, and serves recommendations through FastAPI.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I made leakage control explicit instead of treating it as a comment in a notebook. The training pipeline fingerprints data, saves deterministic split IDs, and includes tests for point-in-time recency behavior.",
          "I also kept two evaluation contracts. Candidate F1 shows whether the model can score likely reorders; full-basket F1 shows whether the final basket recommendation is actually useful.",
        ],
      },
      {
        title: "Evidence",
        paragraphs: [
          "The verified run reports 0.5665 candidate F1 and 0.4159 full-basket F1 for LightGBM on temporal validation.",
          "The same run shows 1.67x lift over recency and 2.32x over global popularity on temporal candidate F1.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "This is offline evaluation plus a local serving path, not an online A/B-tested recommender.",
          "The right claim is that the system demonstrates trustworthy ML engineering: data contracts, leakage tests, calibration, reproducible artifacts, and serving parity.",
        ],
      },
    ],
    stack: ["Python", "Pandas", "LightGBM", "XGBoost", "FastAPI", "Pydantic", "Prometheus"],
    links: [],
    featured: true,
    flagship: true,
  },
  {
    slug: "enefit-forecasting",
    title: "Enefit Prosumer Energy Forecasting",
    label: "ML Forecasting",
    status: "Public repo",
    category: "ml",
    year: "2026",
    summary:
      "I built an energy forecasting system with leakage-resistant joins, dual LightGBM models, walk-forward backtests, and contract-validated serving.",
    description:
      "I built this end to end: schema-validated ingestion, causal weather and price joins, feature engineering, separate consumption and production models, baseline comparisons, walk-forward backtesting, FastAPI and CLI inference, Prometheus metrics, drift checks, and retrain artifacts.",
    metrics: [
      { label: "Rows", value: "2.0M" },
      { label: "Features", value: "106" },
      { label: "Holdout MAE", value: "46.33 / 89.70" },
      { label: "Baseline delta", value: "68% / 67%" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML systems build" },
      { label: "Role", value: "Data pipeline, feature design, evaluation, serving" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "Metrics, manifests, lineage, backtests, API artifacts" },
      { label: "What I owned", value: "Data joins, features, dual models, serving path" },
      { label: "Best fit", value: "Forecasting, ML systems, and backend-adjacent ML roles" },
    ],
    system: [
      { label: "Data path", value: "Seven raw tables loaded, validated, causally merged, and lineage-tracked" },
      { label: "Feature path", value: "Temporal, weather, autoregressive, rolling, segment-prior, interaction features" },
      { label: "Model layer", value: "Separate LightGBM models for consumption and production" },
      { label: "Serving path", value: "FeatureContract reused by FastAPI and CLI inference with fallback modes" },
    ],
    evidenceNote:
      "The local Enefit Project repo has unusually strong artifacts: per-target reports, lineage manifests, feature contracts, backtests, API captures, monitoring reports, and demo assets.",
    highlights: [
      "Processed a checked-in 2,018,352-row feature matrix with 106 final features.",
      "Prevented leakage with origin-time weather and price joins, shifted rolling features, and temporal splits.",
      "Reduced MAE versus the best saved baselines by 68.38% for consumption and 66.57% for production.",
      "Served both API and batch inference through the same feature contract and target-specific artifacts.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built a production-oriented forecasting system for Estonian prosumer energy consumption and production.",
          "The pipeline covers raw data loading, schema validation, temporal preprocessing, feature engineering, model training, walk-forward backtesting, API serving, CLI inference, and monitoring checks.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I treated leakage prevention as data engineering. Forecast weather is constrained by origin time, price joins use as-of logic, and feature statistics are shifted so future rows do not bleed into training.",
          "I also split consumption and production into target-specific models and artifacts because they have different behavior and failure modes.",
        ],
      },
      {
        title: "Evidence",
        paragraphs: [
          "The latest checked-in run reports consumption MAE of 46.33 and production MAE of 89.70 on holdout evaluation.",
          "The repo also includes closed-loop walk-forward backtests and ablations that expose the gap between open-loop and recursive rollout behavior.",
        ],
      },
      {
        title: "Serving",
        paragraphs: [
          "The FastAPI surface exposes health, readiness, prediction, metrics, model info, and model reload endpoints.",
          "The CLI inference path uses the same feature contract, which is the part I would emphasize for ML systems roles.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "It is still a self-directed build rather than a live business system.",
          "The strongest proof is the artifact trail and the offline-to-serving contract, not production traffic.",
        ],
      },
    ],
    stack: ["Python", "Pandas", "Pandera", "LightGBM", "Optuna", "FastAPI", "MLflow", "Docker"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/enefit" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "fraud-detection-system",
    title: "Fraud Detection System",
    label: "ML Risk",
    status: "Local case study",
    category: "ml",
    year: "2026",
    summary:
      "I built a fraud detection system with chronological splits, leakage-aware features, calibrated thresholds, deploy bundles, and FastAPI inference.",
    description:
      "I built this around the production-shaped risks in fraud ML: temporal leakage, train/serve feature mismatch, arbitrary thresholds, poor calibration, challenger promotion, drift, and serving observability.",
    metrics: [
      { label: "AUC-ROC", value: "0.8360" },
      { label: "AUC-PR", value: "0.4198" },
      { label: "Brier", value: "0.0488 -> 0.0253" },
      { label: "Tests", value: "64 passed" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML systems project" },
      { label: "Role", value: "Evaluation design, decisioning, inference service" },
      { label: "Status", value: "Local case study with proof artifacts" },
      { label: "Proof", value: "Evaluation report, deploy bundle, drift report, API proof pack" },
      { label: "What I owned", value: "Feature path, model tuning, serving, challenger logic" },
      { label: "Best fit", value: "Applied ML and risk-oriented backend roles" },
    ],
    system: [
      { label: "Data path", value: "IEEE-CIS transaction/identity merge with raw and processed contracts" },
      { label: "Temporal protocol", value: "Train, calibration, and untouched test slices ordered by TransactionDT" },
      { label: "Decisioning", value: "Platt calibration and cost-based operating threshold from calibration split" },
      { label: "Serving", value: "Deploy bundle loaded by FastAPI with predict, batch, health, reload, metrics" },
    ],
    evidenceNote:
      "The local fraud repo includes the evidence I would show in an interview: evaluation report, operating point, calibration curves, deploy bundle, proof pack, drift report, and tests.",
    highlights: [
      "Used a strict chronological train/calibration/test protocol instead of random splits.",
      "Improved probability quality with calibration and selected a 0.11 threshold from explicit FP/FN costs.",
      "Packaged model, feature pipeline, schema, operating point, metadata, and manifest into a deploy bundle.",
      "Included challenger benchmarking, where CatBoost outperformed the deployed LightGBM artifact and became a clear promotion candidate.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built an end-to-end fraud detection system around the IEEE-CIS dataset.",
          "The project covers data ingest, feature engineering, model training, evaluation, calibration, threshold selection, deployment packaging, API serving, monitoring, and proof-pack generation.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I separated model fitting, probability calibration, operating-threshold selection, and final test evaluation. That is the main reason the metrics are more believable.",
          "I also split offline and online feature contracts so the API does not silently depend on history features that cannot be reconstructed from a single request.",
        ],
      },
      {
        title: "Evidence",
        paragraphs: [
          "The latest evaluation reports 0.8360 AUC-ROC, 0.4198 AUC-PR, 0.2719 precision, 0.4758 recall, and 0.3460 F1 on the test split.",
          "Calibration improved Brier score from 0.048806 to 0.025288 and ECE from 0.105124 to 0.006936.",
        ],
      },
      {
        title: "Serving",
        paragraphs: [
          "The runtime loads a versioned bundle from models/deploy/latest rather than loose model files.",
          "The API exposes single and batch prediction, health, reload, model info, and Prometheus metrics, and writes structured prediction events.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "This is a local case study, not a live fraud product.",
          "I would be explicit that the challenger study found a stronger CatBoost candidate and that drift reporting is part of the story, including when not to overclaim a deployed model.",
        ],
      },
    ],
    stack: ["Python", "LightGBM", "Optuna", "MLflow", "FastAPI", "Prometheus", "Grafana"],
    links: [],
    featured: true,
    flagship: true,
  },
  {
    slug: "customer-segmentation-api",
    title: "Customer Segmentation API",
    label: "ML Service",
    status: "Public repo",
    category: "ml",
    year: "2024",
    summary:
      "I built this small ML service with a clean train-to-serving path and a stricter v2 validation flow.",
    description:
      "I built this compact clustering service to keep the artifact flow, validation, and API contract explicit.",
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
    evidenceNote:
      "This is a small public repo, but it does show how I handle artifacts, validation, and API boundaries in a compact service.",
    highlights: [
      "Kept a runnable baseline path.",
      "Saved model metadata with the artifacts.",
      "Added a stricter v2 validation path.",
      "Included tests and packaging around the API.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built this as a compact ML service project.",
          "The value is not model complexity. The value is the clean artifact flow, explicit metadata, and testable API contract.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I kept both a stable baseline and a stricter v2 path.",
          "I also made the API contract and model metadata explicit so the system is easy to inspect.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "This is a supporting project, not the one I'd start with.",
          "I keep it here because it shows clean service design in a small surface area.",
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
    year: "2026",
    summary:
      "I built a logistics data platform across fleet, shipment, and last-mile events, with a verified sample path and a deeper Kafka/Spark/Airflow path.",
    description:
      "I built this as a serious local data-engineering demo: event simulation, Bronze and Silver layers, DuckDB/dbt marts, data quality, run metadata, Streamlit operator surfaces, and optional Kafka, Spark, and Airflow infrastructure for deeper walkthroughs.",
    metrics: [
      { label: "Tests", value: "80+ passed" },
      { label: "Quality", value: "31 / 31 checks" },
      { label: "dbt", value: "PASS=81" },
      { label: "Marts", value: "90 / 500 / 60" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed data engineering build" },
      { label: "Role", value: "Pipeline design, dbt modeling, quality framework, demo path" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "make demo-build path, dbt marts, quality reports, dashboard" },
      { label: "What I owned", value: "Data layers, contracts, marts, quality, operator UI" },
      { label: "Best fit", value: "Data platform and backend-adjacent pipeline roles" },
    ],
    system: [
      { label: "Domains", value: "Fleet telematics, shipment tracking, last-mile delivery execution" },
      { label: "Verified path", value: "Sample parquet to DuckDB source views to dbt marts to quality to Streamlit" },
      { label: "Live path", value: "Simulators, Kafka, Spark Bronze/Silver, dbt, Airflow, Streamlit" },
      { label: "Customer mode", value: "CSV/Parquet dropzone to contracts, DuckDB marts, exports, control tower" },
    ],
    evidenceNote:
      "The local logistics repo is strong because it separates what is verified locally from the bigger live-stack architecture, then gives both a coherent story.",
    highlights: [
      "Modeled fleet telematics, shipment lifecycle tracking, and last-mile execution instead of one synthetic stream.",
      "Built a deterministic sample path that proves contracts, dbt marts, quality checks, and the dashboard without Docker.",
      "Kept the Kafka/Spark/Airflow path as optional depth rather than the only way to evaluate the repo.",
      "Added customer-mode contracts and exports for a lower-friction pilot story.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built this to feel like a small logistics data platform instead of a collection of unrelated ETL scripts.",
          "It models vehicle positions, telemetry, shipment events, agent positions, delivery events, and alerts, then reconstructs trips, journeys, shifts, and warehouse marts for analytics.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I made the sample mode the first proof path: generate canonical sample data, bootstrap DuckDB sources, run dbt, refresh quality reports, and launch the dashboard.",
          "That keeps the repo interview-safe while still preserving Kafka, Spark, and Airflow for deeper architecture discussion.",
        ],
      },
      {
        title: "Evidence",
        paragraphs: [
          "The checked docs report 31/31 quality checks, a passing dbt build with PASS=81, and populated DuckDB marts: fct_trips 90 rows, fct_shipments 500 rows, and fct_agent_daily 60 rows.",
          "The Streamlit surface is read-only by design and shows mode, run history, output row counts, dataset previews, mart KPIs, and quality status.",
        ],
      },
      {
        title: "Productization",
        paragraphs: [
          "The architecture docs also add a customer-mode path: customer CSV or Parquet exports land in a dropzone, get mapped and validated against Bronze contracts, build DuckDB/dbt marts, export daily reports, and show a Streamlit control tower.",
          "That is a good product-thinking angle because it reduces the first pilot from a streaming-platform install to a data-contract exercise.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "The fully verified path is the local sample/DuckDB/dbt path. The live Kafka/Spark/Airflow path is valuable architecture depth, but I would not present it as equally proven without a fresh end-to-end Docker run.",
          "That boundary is exactly why the project reads credibly: it says what works, what is optional, and what should be hardened next.",
        ],
      },
    ],
    stack: ["Python", "Spark", "Kafka", "dbt", "Airflow", "DuckDB", "Streamlit"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/logistics-data-engineering" }],
    featured: true,
    flagship: true,
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
