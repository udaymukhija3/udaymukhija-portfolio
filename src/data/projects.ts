import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "gathr",
    title: "Gathr",
    label: "Full-Stack Social",
    status: "Public repo",
    category: "product",
    year: "2025",
    summary:
      "Solo-built social planning product focused on a hard problem: getting users from lightweight interest to actual attendance.",
    description:
      "A full-stack product case study about trust, commitments, ranking inputs, and resilient realtime coordination.",
    metrics: [
      { label: "North star", value: "Attendance" },
      { label: "Realtime", value: "WS -> polling" },
      { label: "Decisioning", value: "Canonical rec events" },
      { label: "Rollouts", value: "14 feature flags" },
    ],
    facts: [
      { label: "Scope", value: "Solo product prototype" },
      { label: "Role", value: "Product, backend, mobile, ranking systems" },
      { label: "Status", value: "Self-directed build with public repo" },
      { label: "Proof", value: "End-to-end flows and documented architecture" },
      { label: "What I owned", value: "Discovery, chat, trust systems, API contracts" },
      { label: "Best fit", value: "Startup full-stack and product-minded backend roles" },
    ],
    system: [
      { label: "Mobile surface", value: "Discovery, commitments, trust cues, and group chat" },
      { label: "Core backend", value: "Spring Boot APIs, Postgres, Redis, flags, messaging" },
      { label: "Decision layer", value: "Recommendation events, ranking inputs, notification gating" },
      { label: "Reliability layer", value: "Fallback-first chat and rollout controls" },
    ],
    evidenceNote:
      "This is a public solo build. The strongest signal here is product framing, system design, and end-to-end ownership, not proof of live production scale.",
    highlights: [
      "Framed the product around attendance rather than shallow engagement.",
      "Combined discovery, micro-commitments, trust signals, and realtime chat into one coherent system.",
      "Treated recommendation events and notification gating as product infrastructure, not side details.",
      "Added fallbacks and rollout controls so degraded conditions stay visible and survivable.",
    ],
    sections: [
      {
        title: "What this is",
        paragraphs: [
          "Gathr started from a product question that felt more interesting than a standard event app: why do people drop off between saying they are interested and actually showing up? That pushed the project toward trust, coordination, and behavior design rather than just feed mechanics.",
          "I built it as a full-stack product prototype so I could work through the whole system: mobile flows, backend contracts, discovery logic, chat, and the instrumentation needed to reason about attendance as the real outcome.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The main product decision was to treat attendance as the north star. That led to features like micro-commitments, visible reliability, trust-aware discovery, and notification value gating rather than generic engagement loops.",
          "The main engineering decision was to define a canonical recommendation event contract so feed, search, and related surfaces could share the same behavioral pipeline. That is the kind of contract work I want more of in real product teams.",
        ],
      },
      {
        title: "Tradeoffs and cuts",
        paragraphs: [
          "I deliberately optimized for coherence over breadth. Some of the branded product ideas are there because they helped clarify trust and follow-through, but I kept the strongest emphasis on a small set of system behaviors: decide, commit, coordinate, attend.",
          "I also chose fallback-heavy shipping over polished realtime perfection. WebSocket chat falls back to polling, feature flags gate releases, and the product can keep functioning when ideal conditions are not available.",
        ],
      },
      {
        title: "Outcomes and verified properties",
        paragraphs: [
          "What is genuinely proven here is an end-to-end product architecture: discovery, commitments, trust signals, messaging, and rollout controls live in one coherent build with a public repo.",
          "What is not proven is live consumer scale. I treat that honestly because I would rather be explicit about the evidence than imply production adoption that is not there.",
        ],
      },
      {
        title: "What I would do next",
        paragraphs: [
          "If I kept pushing this project, I would narrow the surface area around the strongest loop, add explicit onboarding experiments around first commitment, and tighten the recommendation evaluation around attendance-quality outcomes rather than feature breadth.",
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
    summary:
      "Behavior-change platform with web and mobile clients, wearable-aware sync, and trust-preserving automation.",
    description:
      "A full-stack case study about reducing tracking friction without letting automation corrupt user state.",
    metrics: [
      { label: "Clients", value: "Web + mobile" },
      { label: "Sync", value: "Manual + wearable" },
      { label: "Auth", value: "JWT + OAuth" },
      { label: "Realtime", value: "WS + Redis" },
    ],
    facts: [
      { label: "Scope", value: "Solo full-stack product build" },
      { label: "Role", value: "Backend, web, mobile, product logic" },
      { label: "Status", value: "Self-directed build with public repo" },
      { label: "Proof", value: "End-to-end flows, auth model, sync rules, tests" },
      { label: "What I owned", value: "User state, automation rules, social layer, API contracts" },
      { label: "Best fit", value: "Backend and full-stack product roles" },
    ],
    system: [
      { label: "Clients", value: "React web app and React Native mobile experience" },
      { label: "Core backend", value: "Spring Boot APIs, Redis, relational state, notifications" },
      { label: "Automation", value: "Manual, wearable, and hybrid completion flows" },
      { label: "Social layer", value: "Activity feeds, accountability, competitions, realtime updates" },
    ],
    evidenceNote:
      "This is a public repo and a complete product build. The best proof is the coherence between sync rules, user-state trust, auth, and the surrounding social product design.",
    highlights: [
      "Built the product around week 2-3 dropoff rather than a generic habit checklist.",
      "Used confidence-scored automation so external data does not silently corrupt user state.",
      "Treated the social layer as a retention system, not a decorative add-on.",
      "Added security and async boundaries that make the system read like real backend work, not a toy app.",
    ],
    sections: [
      {
        title: "What this is",
        paragraphs: [
          "Most habit products fail after the novelty period. I used this project to explore what happens when the system tries to reduce tracking friction while still keeping progress trustworthy.",
          "That led to a full-stack build with web and mobile clients, social accountability features, automation rules, and a backend that has to decide when it is safe to update user state on the user's behalf.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The defining product decision was to treat trust as part of the habit loop. If auto-tracking makes progress feel fake, the product breaks. That is why the automation path is confidence-scored and can ask for confirmation instead of pretending certainty.",
          "The defining backend decision was to separate auth, provider sync, notifications, and user-state logic cleanly enough that each one can evolve without turning the whole system into a single brittle request path.",
        ],
      },
      {
        title: "Tradeoffs and cuts",
        paragraphs: [
          "I chose coherence over trying to prove every possible gamification feature. The project includes social and motivational mechanics, but the strongest throughline is reducing friction while preserving trust.",
          "I also kept the intelligence grounded. The AI-related pieces are secondary; the more important engineering decisions live in sync rules, auth, reminders, and bounded user-state updates.",
        ],
      },
      {
        title: "Outcomes and verified properties",
        paragraphs: [
          "What this project proves well is that I can design and connect multiple product surfaces around a tricky state-management problem: automation, social features, and backend rules all have to agree about what happened.",
          "What it does not prove is scale in a live consumer product. I would rather position it honestly as a strong systems build than oversell it as production experience.",
        ],
      },
      {
        title: "What I would do next",
        paragraphs: [
          "The next move would be sharper focus on one or two retention loops, plus better experiment scaffolding around activation, first-week consistency, and the tradeoff between manual control and automated convenience.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "React", "React Native", "MySQL", "Redis", "WebSocket"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/habit-tracker-social" }],
    featured: false,
    flagship: false,
  },
  {
    slug: "inventory-analytics-platform",
    title: "Event-Driven Inventory Analytics",
    label: "Backend and Data Platform",
    status: "Public repo",
    category: "data",
    year: "2024",
    summary:
      "Event-driven inventory platform that combines transactional writes, Kafka events, and multi-sink analytics materialization.",
    description:
      "A backend and data-platform case study around inventory mutations, typed events, ETL, and honest documentation of unfinished serving boundaries.",
    metrics: [
      { label: "Operational writes", value: "Postgres + audit" },
      { label: "Events", value: "Kafka mutations" },
      { label: "Analytics", value: "3 sinks" },
      { label: "Known gap", value: "Serving path split" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed backend and analytics build" },
      { label: "Role", value: "Service design, events, ETL, API boundary" },
      { label: "Status", value: "Public repo with verified local path" },
      { label: "Proof", value: "Mutations can land in analytical outputs end to end" },
      { label: "What I owned", value: "Operational service, event flow, ETL, quality checks" },
      { label: "Best fit", value: "Backend, platform, and event-driven roles" },
    ],
    system: [
      { label: "Operational service", value: "Transactional inventory writes, audit trail, typed mutations" },
      { label: "Event stream", value: "Kafka events emitted from stock changes and reservations" },
      { label: "ETL and marts", value: "Python and Airflow path materializing Postgres, Redis, Parquet" },
      { label: "Serving boundary", value: "Analytics API exists, but the read path is not fully unified yet" },
    ],
    evidenceNote:
      "This project is strongest as backend and data-platform proof. The repo shows a real event-driven shape and also calls out the incomplete serving boundary instead of pretending the system is more polished than it is.",
    highlights: [
      "Captured inventory writes transactionally, then emitted typed events rather than treating analytics as an afterthought.",
      "Published analytical outputs to multiple sinks with rerun-safe logic.",
      "Used explicit data quality checks instead of relying on informal assumptions.",
      "Documented the gap between the ETL outputs and the separate analytics serving path.",
    ],
    sections: [
      {
        title: "What this is",
        paragraphs: [
          "This project combines an operational inventory backend with an analytics publication path. The interesting part is not CRUD alone; it is the bridge between transactional correctness and downstream analytics consumption.",
          "I used it as a way to practice event-driven thinking: write once transactionally, emit typed mutations, materialize analytical views, and keep replayability and data quality visible.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The strongest design choice was to treat the event stream as a first-class boundary. That makes the architecture more useful for backend and platform discussions than a single service with reporting bolted on.",
          "The second useful decision was to publish to multiple sinks with business-key discipline and rerun-safe upserts. That moves the project closer to the kind of messy operational analytics work real teams deal with.",
        ],
      },
      {
        title: "Tradeoffs and known gap",
        paragraphs: [
          "The repo is more honest than polished in one important way: the analytics API is not yet reading from the exact same publication path as the ETL outputs. I kept that limitation explicit because that kind of boundary mismatch matters.",
          "That means the project is excellent for showing design judgment and event-driven architecture, but it is not a finished platform with one perfectly unified serving story.",
        ],
      },
      {
        title: "Outcomes and verified properties",
        paragraphs: [
          "What is proven is the system shape: transactional writes, event emission, multi-sink materialization, and quality checks all exist in code with a verifiable local path.",
          "What is not proven is full production hardening. I would rather have that honesty be part of the case study than smooth it over with confident language.",
        ],
      },
      {
        title: "What I would do next",
        paragraphs: [
          "The next step would be to collapse the serving split, tighten the publication contract, and expose a single trustworthy analytics path through one API surface with clearer operational dashboards.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Airflow", "Python"],
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
      "Prediction-market analytics stack spanning marts, calibrated modeling, feature serving boundaries, and streaming paths.",
    description:
      "An ML-platform case study focused on data modeling, evaluation discipline, and clean serving boundaries rather than model hype.",
    metrics: [
      { label: "Validation", value: "Time-aware" },
      { label: "Invariant", value: "Zero-sum dbt test" },
      { label: "Serving", value: "FastAPI + Spring" },
      { label: "Streaming", value: "Python + Flink" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML platform case study" },
      { label: "Role", value: "Data modeling, evaluation design, API boundaries" },
      { label: "Status", value: "Case study with no public repo linked here" },
      { label: "Proof", value: "Evaluation design and architecture documentation" },
      { label: "What I owned", value: "Marts, model framing, serving split, stream path" },
      { label: "Best fit", value: "ML platform and data-intensive backend roles" },
    ],
    system: [
      { label: "Batch layer", value: "Trades transformed into marts and model-ready features" },
      { label: "Model layer", value: "Mispricing model with calibration-aware evaluation" },
      { label: "Serving layer", value: "FastAPI inference behind a Spring Boot public contract" },
      { label: "Realtime path", value: "Python consumer today, Flink path for scale-up" },
    ],
    evidenceNote:
      "There is no public repo linked for this one. The strongest signal is evaluation and boundary design: the case study is useful if you care about platform judgment more than repo depth.",
    highlights: [
      "Modeled maker and taker positions explicitly instead of flattening trade behavior.",
      "Compared against market-aware baselines with time-aware validation and calibration metrics.",
      "Separated inference from public API concerns with a clear FastAPI and Spring Boot boundary.",
      "Included both a simple realtime path and a more scalable Flink direction.",
    ],
    sections: [
      {
        title: "What this is",
        paragraphs: [
          "I wanted a project that felt closer to an ML platform than a single notebook or training script. Prediction markets were useful because they force you to care about calibration, feature contracts, and temporal honesty.",
          "The result is a case study that combines marts, model evaluation, serving boundaries, and a credible stream-processing scale-up path.",
        ],
      },
      {
        title: "Data and evaluation rigor",
        paragraphs: [
          "The most interesting choice was the maker and taker decomposition. It is a better analytical frame than collapsing matched trades into one flat record because it preserves who actually captured edge.",
          "I also kept the evaluation grounded in baselines and calibration rather than trying to impress with model complexity alone.",
        ],
      },
      {
        title: "Serving boundary",
        paragraphs: [
          "FastAPI owns inference and feature alignment, while Spring Boot owns auth, caching, retries, and the public analytics contract. That is the kind of service split I like because it makes ownership clearer.",
          "The realtime layer is also intentionally staged: simple first, scalable later, with the scale-up path visible in the case study instead of hand-waved away.",
        ],
      },
      {
        title: "What is proven and what is not",
        paragraphs: [
          "This project proves that I think carefully about data modeling, evaluation discipline, and public contract design in ML-heavy systems.",
          "It is weaker as a proof artifact than the public-repo flagship projects because the evidence is mostly in the case study itself rather than a linked repository.",
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
    summary:
      "Leakage-resistant reorder recommender with deterministic splits, calibration, and serving contracts.",
    description:
      "A recommendation-system case study built around point-in-time preprocessing, honest evaluation, and training-serving parity.",
    metrics: [
      { label: "Candidate F1", value: "0.5665" },
      { label: "Basket F1", value: "0.4159" },
      { label: "Calibration", value: "Held-out split" },
      { label: "Serving", value: "Versioned contract" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML systems project" },
      { label: "Role", value: "Pipeline design, evaluation, inference contract" },
      { label: "Status", value: "Case study with no public repo linked here" },
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
    evidenceNote:
      "The strongest proof here is engineering discipline around leakage, evaluation, and inference contracts. It is less useful as a product signal than the flagship full-stack projects.",
    highlights: [
      "Built point-in-time preprocessing and leakage tests rather than trusting feature intuition.",
      "Separated candidate quality from full-basket quality so offline evaluation stays honest.",
      "Tuned thresholds on a dedicated calibration slice instead of shipping raw probabilities.",
      "Used the same versioned feature contract in training and inference.",
    ],
    sections: [
      {
        title: "What this is",
        paragraphs: [
          "This project is intentionally about the parts of recommendation systems that usually get skipped in portfolios: leakage control, evaluation design, and serving parity.",
          "I built it to show that I care about the data path and the online contract as much as the model itself.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The most important decision was to make the preprocessing point-in-time and deterministic. That keeps the offline numbers more believable.",
          "The second was to separate candidate ranking from full-basket quality, which makes the evaluation story more honest and easier to defend.",
        ],
      },
      {
        title: "What is proven",
        paragraphs: [
          "The offline metrics are useful, but the bigger signal is the feature contract and evaluation rigor. That is what makes the project relevant for ML systems conversations.",
          "The project is a better signal for engineering judgment than for flashy model innovation.",
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
    summary:
      "Dual-model energy forecasting system with causal joins, temporal features, and contract-validated serving.",
    description:
      "A forecasting case study focused on leakage-resistant joins, target-specific modeling, and reusable training-serving contracts.",
    metrics: [
      { label: "Rows", value: "2.0M" },
      { label: "Features", value: "106" },
      { label: "Holdout MAE", value: "46.33 / 89.70" },
      { label: "Serving", value: "Shared contract" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML systems build" },
      { label: "Role", value: "Data pipeline, feature design, serving contract" },
      { label: "Status", value: "Public repo with reproducible artifacts" },
      { label: "Proof", value: "Walk-forward evaluation and versioned artifacts" },
      { label: "What I owned", value: "Data joins, features, dual models, serving path" },
      { label: "Best fit", value: "Forecasting, ML systems, and backend-adjacent ML roles" },
    ],
    system: [
      { label: "Data joins", value: "As-of weather and price joins with origin-time discipline" },
      { label: "Feature path", value: "Temporal, autoregressive, and segment-prior features" },
      { label: "Model layer", value: "Separate consumption and production models" },
      { label: "Serving path", value: "Shared feature contract with fallback defaults" },
    ],
    evidenceNote:
      "This is a public repo with good proof of ML systems discipline. The strongest signal is careful temporal handling and contract reuse, not a claim about operating a production energy platform.",
    highlights: [
      "Used causal joins and time-aware aggregates so the data path stays believable.",
      "Trained separate models for different targets instead of forcing one generic approach.",
      "Shared a feature contract across training and serving.",
      "Included walk-forward backtesting and reusable artifacts.",
    ],
    sections: [
      {
        title: "What this is",
        paragraphs: [
          "This project is about making a forecasting pipeline believable. Energy data is a good fit for that because leakage can hide in joins and temporal features very easily.",
          "I used the build to practice causal data work, target-specific modeling, and a serving path that stays aligned with training.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The biggest decision was to keep the joins explicitly causal and the artifacts split by target. That avoids a lot of hidden confusion and makes the system easier to explain.",
          "The second was to preserve the feature contract into serving instead of letting the online path collapse into a toy version of the model.",
        ],
      },
      {
        title: "What is proven",
        paragraphs: [
          "The repo proves a disciplined ML systems path: causal joins, walk-forward thinking, shared contracts, and reproducible outputs.",
          "It is a solid technical proof artifact even though it is still a self-directed build rather than an operated business system.",
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
    summary:
      "Chronology-safe fraud system with calibrated decisioning, challenger benchmarking, and contract-aware serving.",
    description:
      "A fraud case study focused on temporal leakage, thresholding, calibration, and deployable inference boundaries.",
    metrics: [
      { label: "AUC-ROC", value: "0.8360" },
      { label: "AUC-PR", value: "0.4198" },
      { label: "Calibration", value: "Threshold-aware" },
      { label: "Tests", value: "64 passed" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed ML systems project" },
      { label: "Role", value: "Evaluation design, decisioning, inference service" },
      { label: "Status", value: "Case study with no public repo linked here" },
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
    evidenceNote:
      "This project is strongest as an ML systems artifact: it shows decisioning maturity and deployment awareness more than product depth.",
    highlights: [
      "Treated chronology and leakage as first-class concerns.",
      "Focused on calibration and thresholding rather than leaderboard thinking alone.",
      "Included a challenger framing instead of assuming one model is final.",
      "Wrapped the model in a serving contract instead of stopping at offline results.",
    ],
    sections: [
      {
        title: "What this is",
        paragraphs: [
          "I wanted one project in the portfolio that was clearly about decision quality under class imbalance and deployment constraints. Fraud data is useful because evaluation shortcuts show up fast.",
          "The project therefore emphasizes leakage control, calibration, and deployable inference more than raw feature volume.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The biggest choice was to make the chronology and thresholding story explicit. That produces a more credible system discussion than quoting AUC alone.",
          "The second was to keep challenger benchmarking in the frame so the project reads like a system that could evolve rather than a one-shot training run.",
        ],
      },
      {
        title: "What is proven",
        paragraphs: [
          "The strongest signal is engineering maturity around deployable decisioning. That is why the serving and calibration story matters as much as the offline scores.",
          "As with the other private or case-study-only entries, it is weaker as a trust artifact than the public flagship projects.",
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
    summary:
      "Smaller ML service build with a clean train-to-serving path and a stricter v2 validation track.",
    description:
      "A compact clustering service that is more useful for artifact discipline and API design than for raw model complexity.",
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
      { label: "Proof", value: "Runnable baseline plus stricter validation pipeline" },
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
      "This is one of the smaller projects in the portfolio. I keep it because it shows discipline around artifacts and API boundaries, not because it is the strongest standalone proof piece.",
    highlights: [
      "Kept a runnable baseline path instead of letting the project become a dead-end experimentation folder.",
      "Persisted model metadata so the output stays inspectable.",
      "Built a stricter v2 path with stronger validation expectations.",
      "Wrapped the project in tests and packaging so it reads like a service, not just training code.",
    ],
    sections: [
      {
        title: "What this is",
        paragraphs: [
          "This is a compact ML service build. I keep it in the portfolio because smaller systems can still show useful engineering habits if the train-to-serving path is clean.",
          "The point here is not model novelty. The point is stable artifacts, explicit metadata, and a service contract that can be inspected and tested.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The best decision was to keep both a stable baseline and a more ambitious v2 path. That preserves a working demo while letting the validation and feature path get stricter over time.",
          "The second was to make the API contract and model metadata explicit so the project is explainable without opening the training code first.",
        ],
      },
      {
        title: "What is proven",
        paragraphs: [
          "This project proves smaller-scale service discipline: artifacts, metadata, tests, packaging, and predictable APIs.",
          "It is intentionally not a flagship project. It works better as supporting evidence that the bigger systems are not the only place I think about contracts and maintainability.",
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
    summary:
      "Streaming plus batch logistics platform with Bronze/Silver layers, quality checks, and a verified local demo path.",
    description:
      "A data-platform case study combining event ingestion, transforms, warehouse-style marts, orchestration, and explicit proof of the local happy path.",
    metrics: [
      { label: "Tests", value: "77 passed" },
      { label: "Quality", value: "31 / 31 checks" },
      { label: "Demo", value: "Bronze + Silver" },
      { label: "Domains", value: "3 data streams" },
    ],
    facts: [
      { label: "Scope", value: "Self-directed data engineering build" },
      { label: "Role", value: "Pipeline shape, quality framework, demo path" },
      { label: "Status", value: "Public repo with verified local run" },
      { label: "Proof", value: "Sample-mode path with passing tests and checks" },
      { label: "What I owned", value: "Data layers, validation, orchestration story" },
      { label: "Best fit", value: "Data platform and backend-adjacent pipeline roles" },
    ],
    system: [
      { label: "Operational domains", value: "Fleet, shipment, and last-mile event streams" },
      { label: "Data layers", value: "Bronze landing, Silver reconstruction, warehouse marts" },
      { label: "Quality", value: "Reusable framework across Spark and DuckDB-style checks" },
      { label: "Demo path", value: "Verified local sample run with reproducible outputs" },
    ],
    evidenceNote:
      "This repo is strong because it is explicit about the proof boundary: the local sample path is verified, and the full live stack is presented as architecture rather than falsely claimed as a polished demo.",
    highlights: [
      "Modeled three operational domains instead of a single synthetic data stream.",
      "Built layered processing and validation rather than stopping at ingestion.",
      "Added a reusable quality framework with timestamped reports.",
      "Separated the verified local path from the broader target architecture.",
    ],
    sections: [
      {
        title: "What this is",
        paragraphs: [
          "I wanted one project that looked like a real data platform rather than a single ETL script. Logistics was useful because it naturally spans multiple event-heavy domains and both streaming and batch thinking.",
          "The project therefore combines ingestion, layered transforms, quality checks, orchestration, and a dashboard-facing mart story.",
        ],
      },
      {
        title: "Key decisions",
        paragraphs: [
          "The best decision was to encode correctness directly in the platform through reusable checks instead of treating validation as documentation or tribal knowledge.",
          "The second was to keep a verified sample-mode path so the portfolio proves something concrete rather than only describing a target architecture.",
        ],
      },
      {
        title: "Tradeoffs",
        paragraphs: [
          "The architecture is broader than the fully verified runtime path. I think that is acceptable as long as the distinction stays explicit, which is why the case study separates the local proof path from the larger intended stack.",
          "That tradeoff keeps the project honest while still making the scale-up design visible.",
        ],
      },
      {
        title: "What is proven",
        paragraphs: [
          "The strongest evidence is the verified local run, the passing tests, and the quality framework. Those give the project a concrete proof base.",
          "It remains a portfolio build, but it is a useful one because the proof boundary is explicit.",
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
