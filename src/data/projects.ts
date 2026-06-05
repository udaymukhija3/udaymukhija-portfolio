import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "gathr",
    title: "Gathr",
    label: "Backend Social Platform",
    status: "Present",
    category: "product",
    year: "2025",
    summary:
      "I architected a Spring Boot backend across 16 subsystems for auth, feed ranking, matching, messaging, rewards, reliability scoring, and behavioral logging.",
    description:
      "Gathr is a backend-heavy social activity system with PostgreSQL, Redis, WebSocket chat, algorithmic feed ranking, multi-dimensional matching, commitment mechanics, reliability scoring, and behavioral event capture for future recommendation pipelines.",
    metrics: [
      { label: "Subsystems", value: "16" },
      { label: "Core backend", value: "Spring Boot" },
      { label: "Realtime", value: "WebSocket" },
      { label: "Trust loop", value: "Reliability" },
    ],
    facts: [
      { label: "Scope", value: "Backend-first social activity platform" },
      { label: "Role", value: "Backend architecture, product logic, realtime flows" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "Subsystem inventory, launch manifest, smoke checklist" },
      { label: "What I owned", value: "Auth, ranking, matching, chat, reliability, rewards, APIs" },
      { label: "Best fit", value: "Backend and product-systems roles" },
    ],
    system: [
      { label: "Mobile loop", value: "Hub selection, feed browse, create, join, chat, confirm, check in" },
      { label: "Backend", value: "Auth, activity lifecycle, reliability scoring, matching, messaging, rewards" },
      { label: "Ranking", value: "Freshness, scarcity, host reliability, social proof, and fallback paths" },
      { label: "Trust", value: "Identity masking, 2-hour confirmations, cancellation penalties, trust scoring" },
    ],
    evidenceNote:
      "The repo is strongest as a backend architecture sample: subsystem boundaries, trust mechanics, realtime chat, ranking contracts, and launch smoke docs.",
    highlights: [
      "Architected a Spring Boot backend with PostgreSQL across 16 subsystems including auth, feed ranking, reliability scoring, matching, messaging, rewards, and behavioral logging.",
      "Designed feed ranking using freshness, scarcity, host reliability, and social proof.",
      "Built multi-dimensional matching based on interests, preferences, network proximity, and co-attendance history.",
      "Implemented realtime group chat with WebSocket delivery confirmation, typing indicators, and behavioral event capture.",
      "Built commitment and reliability mechanics including identity masking, 2-hour confirmation windows, tiered cancellation penalties, and transparent trust scoring.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "Gathr is a social activity backend built around the path from discovery to attendance.",
          "The system covers auth, feed ranking, matching, activity lifecycle, messaging, reliability scoring, rewards, behavioral logging, and notification-ready event capture.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I treated trust and attendance as backend domain concepts instead of UI-only behavior.",
          "The result is explicit logic for confirmations, cancellation penalties, identity masking, host reliability, scarcity, social proof, and co-attendance history.",
        ],
      },
      {
        title: "Backend depth",
        paragraphs: [
          "The strongest interview path is the backend: subsystem boundaries, lifecycle state, ranking signals, realtime chat, and reliability mechanics.",
          "I would present recommendation and behavioral logging as pipeline-ready system design rather than claiming production-scale ML traffic.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would add deeper integration testing around activity lifecycle transitions, WebSocket delivery semantics, feed-ranking fallbacks, and reliability-score updates.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "WebSocket", "React Native", "TypeScript"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/gathrly" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "habit-tracker-social",
    title: "Habit Tracker Social",
    label: "Backend Social Platform",
    status: "Public repo",
    category: "product",
    year: "2024",
    summary:
      "I built a social habit backend with 14 subsystems, 26 REST controllers, WebSocket notifications, JWT refresh rotation, and multi-database storage.",
    description:
      "Habit Tracker Social is a Spring Boot and React Native platform with PostgreSQL, Redis, MongoDB, WebSocket notifications, JWT refresh token rotation, timezone-aware streak logic, optimistic locking, and tiered API rate limiting.",
    metrics: [
      { label: "Subsystems", value: "14" },
      { label: "Controllers", value: "26" },
      { label: "Storage", value: "Postgres/Redis/Mongo" },
      { label: "Auth", value: "JWT refresh" },
    ],
    facts: [
      { label: "Scope", value: "Full-stack social habit platform" },
      { label: "Role", value: "Backend, mobile, product logic" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "Controllers, auth flows, WebSocket paths, locking and rate-limit code" },
      { label: "What I owned", value: "Habit state, auth, streaks, social flows, notifications" },
      { label: "Best fit", value: "Backend and product-systems roles" },
    ],
    system: [
      { label: "Backend", value: "Spring Boot APIs, PostgreSQL, Redis, MongoDB, WebSocket" },
      { label: "Auth", value: "JWT refresh token rotation and session caching" },
      { label: "Streaks", value: "Timezone-aware daily, weekly, monthly, and skip-preservation logic" },
      { label: "Reliability", value: "Optimistic locking, Redis caching, Bucket4j and Caffeine rate limits" },
    ],
    evidenceNote:
      "The repo is useful as a backend sample because it combines auth, realtime notifications, streak calculations, locking, caching, and route-specific rate limits.",
    highlights: [
      "Built a full-stack social habit platform with 14 subsystems, 26 REST controllers, WebSocket notifications, JWT refresh token rotation, and multi-database storage using PostgreSQL, Redis, and MongoDB.",
      "Architected a timezone-aware streak engine with daily, weekly, and monthly frequency calculations plus skip-preservation logic.",
      "Implemented race-condition-safe points updates using JPA optimistic locking with @Version.",
      "Integrated Redis for session caching and low-latency data access.",
      "Engineered tiered API rate limiting using Bucket4j token buckets and Caffeine cache.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built a social habit platform with Spring Boot APIs, React Native screens, WebSocket notifications, and multi-database persistence.",
          "The backend covers auth, habit state, completions, streak calculations, social flows, notifications, points, sessions, and rate-limited API traffic.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I made streak integrity a backend concern. Daily, weekly, and monthly frequencies account for user timezones, and skip-preservation logic keeps missed-day handling explicit.",
          "For write safety, points updates use JPA optimistic locking, while Redis and route-specific rate limits protect hot paths and auth surfaces.",
        ],
      },
      {
        title: "Backend depth",
        paragraphs: [
          "The strongest parts are the API surface, auth lifecycle, streak engine, realtime notification path, concurrency control, cache usage, and rate-limiting policy.",
          "I would discuss it as a backend systems project first, with the mobile app proving that the API contract supports a real product loop.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would deepen integration tests around streak boundaries, token rotation, concurrent points writes, and rate-limit tiers.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "React Native", "PostgreSQL", "Redis", "MongoDB", "WebSocket"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/habit-tracker-social" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "inventory-analytics-platform",
    title: "Inventory Management System",
    label: "Distributed Backend",
    status: "Public repo",
    category: "data",
    year: "2023",
    summary:
      "I architected a distributed inventory platform with 4 microservices, 40+ REST endpoints, Kafka event streaming, and transactional PostgreSQL workflows.",
    description:
      "Inventory Management System is a backend and data platform with Spring Boot microservices, Kafka event streaming, Flink processing, Redis cache-aside reads, PostgreSQL transactional inventory workflows, pessimistic locking, retry handling, and Airflow anomaly detection.",
    metrics: [
      { label: "Microservices", value: "4" },
      { label: "API surface", value: "40+ endpoints" },
      { label: "Streaming", value: "Kafka" },
      { label: "Read path", value: "Sub-10ms cache" },
    ],
    facts: [
      { label: "Scope", value: "Distributed inventory backend" },
      { label: "Role", value: "Microservices, transactions, streaming, caching, anomaly detection" },
      { label: "Status", value: "Public repo" },
      { label: "Proof", value: "Service boundaries, REST endpoints, lock handling, cache invalidation, DAGs" },
      { label: "What I owned", value: "Inventory workflows, event streaming, Redis read paths, anomaly jobs" },
      { label: "Best fit", value: "Backend, platform, and distributed-systems roles" },
    ],
    system: [
      { label: "Service layer", value: "4 Spring Boot microservices with 40+ REST endpoints" },
      { label: "Write path", value: "PostgreSQL transactions, pessimistic locking, retry handling, stock conflict prevention" },
      { label: "Event path", value: "Kafka event streaming with Flink processing for inventory signals" },
      { label: "Read path", value: "Redis cache-aside strategy with targeted invalidation and velocity scoring" },
    ],
    evidenceNote:
      "The repo is strongest for distributed backend discussion: transactional inventory workflows, lock choices, Kafka events, Redis caching, and Airflow anomaly DAGs.",
    highlights: [
      "Architected a distributed inventory platform with 4 microservices, 40+ REST endpoints, Kafka event streaming, and PostgreSQL-backed transactional inventory workflows.",
      "Implemented concurrency-safe inventory updates using pessimistic locking, retry handling, and transaction boundaries to prevent stock conflicts across distributed services.",
      "Designed Redis cache-aside strategy with targeted invalidation and velocity scoring, achieving sub-10ms read paths for high-demand inventory data.",
      "Built 5 Airflow DAGs to detect 7 categories of data anomalies and support reliable automated reporting for inventory operations.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built this as a distributed inventory management backend with separate services, REST APIs, event streaming, and transactional inventory workflows.",
          "The system covers stock updates, inventory reads, Kafka event flow, Redis cache-aside access, Flink processing, and Airflow-backed operational anomaly detection.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I treated stock correctness as the core backend problem. Inventory updates use transaction boundaries, pessimistic locking, and retry handling to prevent stock conflicts.",
          "For reads, I used Redis cache-aside behavior with targeted invalidation so hot inventory data stays fast without hiding consistency rules.",
        ],
      },
      {
        title: "Event and data paths",
        paragraphs: [
          "Kafka carries inventory events across services, while Flink and Airflow support downstream processing and reporting.",
          "The Airflow layer detects 7 categories of data anomalies across 5 DAGs, which gives the project an operations story beyond CRUD endpoints.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would add stronger contract tests between services, replay tests for Kafka events, and dashboards around cache hit rates, lock retries, and stock-conflict prevention.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "Kafka", "Flink", "Redis", "PostgreSQL", "Airflow"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/inventory-management-sys" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "vibegrid",
    title: "VibeGrid",
    label: "Go Product Backend",
    status: "Local MVP",
    category: "product",
    year: "2026",
    summary:
      "I built a daily semantic grouping puzzle with server-authoritative rules, anonymous sessions, idempotent guesses, Postgres-backed attempts, and puzzle authoring flows.",
    description:
      "VibeGrid is a daily word-grouping puzzle product built with a Go API and Next.js client. The backend owns game rules, sessions, attempts, idempotency, puzzle authoring, and completion stats, with Postgres for durable attempts and an in-memory path for local development.",
    metrics: [
      { label: "Game rules", value: "Go API" },
      { label: "Attempt safety", value: "Idempotent" },
      { label: "Storage", value: "Postgres/in-memory" },
      { label: "Authoring", value: "Editor + builder" },
    ],
    facts: [
      { label: "Scope", value: "Daily puzzle product with Go backend and Next.js client" },
      { label: "Role", value: "Backend rules, data model, product UI, authoring flow" },
      { label: "Status", value: "Local MVP repo" },
      { label: "Proof", value: "README, Go tests, Postgres migrations, editor and builder routes" },
      { label: "What I owned", value: "Game state, sessions, attempt locking, idempotency, stats" },
      { label: "Best fit", value: "Backend/product roles with correctness-heavy state" },
    ],
    system: [
      { label: "Client", value: "Next.js App Router UI with daily, archive, builder, and play-by-link routes" },
      { label: "Rules", value: "Go service validates guesses without sending answer metadata to the browser" },
      { label: "Persistence", value: "Postgres attempts, migrations, anonymous session cookies, in-memory fallback" },
      { label: "Reliability", value: "Row locking and client guess IDs make retries and double-clicks safe" },
    ],
    evidenceNote:
      "This is the strongest of the new local projects: the answer key stays server-side, guesses are idempotent, attempts can be transaction-safe in Postgres, and the repo includes backend tests.",
    highlights: [
      "Kept the answer key off the client by having the Go API validate guesses and reveal groups only after a correct submission.",
      "Made guess submission idempotent with client guess IDs and transaction-safe attempt updates for the Postgres path.",
      "Used storage interfaces so the product runs locally with an in-memory store while preserving a durable Postgres implementation.",
      "Added authoring surfaces for an editor desk and public puzzle builder instead of stopping at a static daily puzzle.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built VibeGrid as a small but complete puzzle product: 16 tiles, four hidden semantic groups, limited mistakes, a spoiler-safe share result, and routes for daily play, archives, custom puzzles, and admin authoring.",
          "The important part is that the game state is not decorative client state. The Go service owns attempts, sessions, guess validation, reveal state, and puzzle publishing boundaries.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I treated answer leakage and double submission as the real backend problems. The browser gets tile text and IDs, not group membership, while guess attempts are designed around idempotency and row-level safety.",
          "I also kept storage pluggable so local development stays easy without weakening the Postgres path I would discuss in an interview.",
        ],
      },
      {
        title: "Evidence",
        paragraphs: [
          "The repo documents the Go API, Postgres migrations, anonymous sessions, editor desk, public builder, and concurrency-oriented tests.",
          "The supported local path runs without a database, while the durable path uses Postgres with startup migrations and attempt locking.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would add Playwright coverage for the core daily puzzle and builder flows, plus basic observability around failed submissions, duplicate guesses, and admin publishing conflicts.",
        ],
      },
    ],
    stack: ["Go", "Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "Vitest"],
    links: [],
    featured: true,
  },
  {
    slug: "murmur",
    title: "Murmur",
    label: "Private Voice Product",
    status: "Local MVP",
    category: "product",
    year: "2026",
    summary:
      "I built a private short-voice MVP with a Next.js client, Go API, magic-link sessions, rooms, invites, murmurs, reactions, and membership access control.",
    description:
      "Murmur is a private voice-note product for close relationships. The local MVP slice includes a Next.js web client, Go API, Postgres migrations, magic-link auth with hashed session tokens, room and invite flows, local audio storage, murmur creation, reactions, and ownership-aware deletion.",
    metrics: [
      { label: "Voice loop", value: "15 seconds" },
      { label: "Auth", value: "Magic link" },
      { label: "Backend", value: "Go API" },
      { label: "Data", value: "Postgres" },
    ],
    facts: [
      { label: "Scope", value: "Private room-based voice MVP" },
      { label: "Role", value: "Backend API, auth, product loop, web client" },
      { label: "Status", value: "Local MVP repo" },
      { label: "Proof", value: "README, API contract, migrations, Go service tests" },
      { label: "What I owned", value: "Auth, room membership, invites, audio upload, reactions" },
      { label: "Best fit", value: "Backend/product roles around access control and private media" },
    ],
    system: [
      { label: "Client", value: "Next.js App Router screens for login, rooms, invites, settings, and playback" },
      { label: "Auth", value: "Magic-link login, hashed tokens, database-backed sessions, httpOnly cookie" },
      { label: "Product graph", value: "Rooms, memberships, invite tokens, murmurs, reactions, soft deletion" },
      { label: "Media", value: "Browser MediaRecorder upload to Go-served local audio storage for MVP" },
    ],
    evidenceNote:
      "The local repo is useful because it already has real auth, membership checks, invite handling, media endpoints, migrations, and Go service tests around the risky parts.",
    highlights: [
      "Built the core loop from sign-in to private room creation, invite acceptance, recording, playback, and reaction.",
      "Made the Go API the authority for session identity and membership access on room and murmur endpoints.",
      "Added service tests covering access control, invites, duration rules, reactions, deletion, and latest-murmur repair.",
      "Kept the product intentionally small: close-person voice moments before push notifications, widgets, or AI captions.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built Murmur as a private voice MVP rather than a general social audio app.",
          "The core flow is narrow: sign in, create a private room, invite one person, record a short murmur, send it, play it back, and react.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I treated privacy as a backend contract. Room membership checks sit on the service path instead of relying on UI hiding.",
          "The MVP uses local audio storage and magic-link auth so the product loop can be validated before introducing production media storage, push notifications, or mobile shells.",
        ],
      },
      {
        title: "Evidence",
        paragraphs: [
          "The README and engineering plan document the Go API, Postgres migrations, magic-link auth, membership guards, invite acceptance, reactions, and service test suite.",
          "CI is planned around Go vet, Go race tests with Postgres, frontend linting, typecheck, and build.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would add server-side duration verification, object storage, expiry cleanup, rate limiting, and browser tests for the create-room to send-and-react flow.",
        ],
      },
    ],
    stack: ["Go", "Next.js", "React", "TypeScript", "PostgreSQL", "pgx", "Tailwind CSS"],
    links: [],
    featured: true,
  },
  {
    slug: "ramble",
    title: "Ramble",
    label: "Voice Notes Product",
    status: "Local scaffold",
    category: "product",
    year: "2026",
    summary:
      "I scaffolded a voice-to-card product with a Next.js recorder, Go API, Postgres persistence, idempotent uploads, mock transcription, structured card output, and search.",
    description:
      "Ramble turns short spoken notes into titles, summaries, key points, tasks, tags, and saved cards. The repo is an honest scaffold: the frontend and Go backend boundaries are present, mock providers make the flow runnable, and provider seams leave room for real transcription and structured-output adapters.",
    metrics: [
      { label: "V1 modes", value: "3" },
      { label: "Backend", value: "Go API" },
      { label: "Providers", value: "Mock + Sarvam path" },
      { label: "Storage", value: "Postgres + disk" },
    ],
    facts: [
      { label: "Scope", value: "Voice-note product scaffold with real backend boundaries" },
      { label: "Role", value: "Product scope, Go API, data model, provider seams" },
      { label: "Status", value: "Local scaffold repo" },
      { label: "Proof", value: "README, engineering plan, Go build/test scripts, provider seams" },
      { label: "What I owned", value: "Recording API, cards, tasks, search, mock processing flow" },
      { label: "Best fit", value: "Backend/product roles involving async media and AI providers" },
    ],
    system: [
      { label: "Capture", value: "Record or upload short audio from a Next.js frontend" },
      { label: "Backend", value: "Go API for recordings, cards, status, search, edit, and delete" },
      { label: "Processing", value: "Mock transcription and structuring today, provider adapters next" },
      { label: "Persistence", value: "Postgres schema for users, recordings, cards, and extracted tasks" },
    ],
    evidenceNote:
      "This one is explicitly a scaffold, but the boundaries are good: Go owns recordings and cards, uploads are idempotent, providers are swappable, and the product loop runs locally with mocks.",
    highlights: [
      "Locked the v1 promise to 30-90 seconds of speech turning into a note, task, or message card.",
      "Designed the Go backend around recording creation, idempotent upload IDs, local storage, processing status, cards, tasks, and search.",
      "Kept transcription and structuring behind provider interfaces so OpenAI or Sarvam can replace mock providers without rewriting the product loop.",
      "Documented the follow-up path for queues, retries, object storage, auth, rate limits, and privacy controls.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built Ramble as a scaffold for a voice-to-structured-note product.",
          "The first local loop records or uploads audio, sends it to a Go API, creates a recording, runs mock processing, saves a card, and supports list, detail, search, copy, edit, and delete surfaces.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I kept the product promise narrow: NOTE, TASK, and MESSAGE modes instead of a broad AI assistant.",
          "I also put the backend in Go from day one so future queues, provider calls, storage, retries, and authorization do not have to be extracted later.",
        ],
      },
      {
        title: "Evidence",
        paragraphs: [
          "The README is direct that this is not a finished MVP yet, which makes the project easier to discuss honestly.",
          "The useful evidence is in the architecture: idempotent recording creation, local processing, Postgres models, provider seams, and backend build/test scripts.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would wire real transcription and structured-output providers, add a queue/worker path, introduce auth, and build provider-quality eval fixtures before any beta claim.",
        ],
      },
    ],
    stack: ["Go", "Next.js", "React", "TypeScript", "PostgreSQL", "pgx", "Tailwind CSS"],
    links: [],
  },
  {
    slug: "mini-market",
    title: "Mini Market",
    label: "Puzzle Product",
    status: "Local scaffold",
    category: "product",
    year: "2026",
    summary:
      "I built a daily market-making puzzle scaffold with typed puzzle seeds, confidence scoring, session attempts, Prisma/Postgres storage, and Vitest coverage for the domain engine.",
    description:
      "Mini Market is a daily market-making puzzle where players infer hidden value from partial information. The current Mode C MVP asks players to infer the goal suit from private card counts and a public trade tape, submit confidence, and receive a score plus explanation.",
    metrics: [
      { label: "MVP mode", value: "Infer the Suit" },
      { label: "Seeds", value: "5 puzzles" },
      { label: "Attempts", value: "Session-scoped" },
      { label: "Tests", value: "Vitest domain" },
    ],
    facts: [
      { label: "Scope", value: "Daily market-making puzzle scaffold" },
      { label: "Role", value: "Domain model, scoring engine, API routes, persistence boundary" },
      { label: "Status", value: "Local scaffold repo" },
      { label: "Proof", value: "README, engineering plan, tests, seed validation script" },
      { label: "What I owned", value: "Puzzle model, scoring, attempts, archive, stats APIs" },
      { label: "Best fit", value: "Product engineering roles with domain modeling" },
    ],
    system: [
      { label: "Puzzle loop", value: "Daily route, archive, private info, trade tape, confidence answer" },
      { label: "Domain layer", value: "Typed puzzle model, scoring, explanations, validation" },
      { label: "Persistence", value: "Prisma/Postgres repository with in-memory fallback for local dev" },
      { label: "APIs", value: "Today, archive, attempt submission, stats, and puzzle hydration" },
    ],
    evidenceNote:
      "Mini Market is a smaller product scaffold, but it has a clean domain boundary: typed puzzle data, confidence scoring, validation, attempt persistence, and tests.",
    highlights: [
      "Started with one concrete game mode instead of building a vague prediction-market sandbox.",
      "Modeled the puzzle around private evidence, public trade tape signals, confidence, payoff, and explanation.",
      "Added Prisma/Postgres for durable puzzle and attempt storage with an in-memory fallback for local development.",
      "Included Vitest coverage for scoring, puzzle loading, validation, market service behavior, and engine paths.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built Mini Market as a daily puzzle about probabilistic market reasoning.",
          "The player sees partial information, interprets a public trade tape, chooses an answer with confidence, and gets an explainable score.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I chose one MVP mode, Infer the Suit, so the domain engine could be tested without carrying several half-finished game types.",
          "The persistence layer can use Prisma/Postgres when configured or an in-memory repository locally, which keeps the product easy to run while preserving the database shape.",
        ],
      },
      {
        title: "Evidence",
        paragraphs: [
          "The scaffold includes routes for the current puzzle, archive, attempts, and stats; five sample puzzle seeds; a validation script; and tests around the scoring and engine code.",
          "It is best presented as a product/domain-modeling sample, not as a large backend platform.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would add completion state to the archive, sharing, E2E tests for the daily loop, analytics events, rate limiting, and an admin publish workflow.",
        ],
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Vitest"],
    links: [],
  },
  {
    slug: "closetdelta",
    title: "ClosetDelta / Outfit Unlock",
    label: "Decision Engine",
    status: "Local scaffold",
    category: "product",
    year: "2026",
    summary:
      "I built a wardrobe decision-engine scaffold that scores whether a candidate clothing item unlocks useful outfits against an existing closet, with explainable Buy/Wait/Skip verdicts.",
    description:
      "ClosetDelta is a shopping decision engine, not a generic stylist. The MVP uses manual wardrobe metadata, rule-based compatibility, redundancy scoring, outfit-unlock logic, saved purchase analyses, and focused tests around the explainable scoring layer.",
    metrics: [
      { label: "Verdicts", value: "Buy/Wait/Skip" },
      { label: "Scoring", value: "Rule-based" },
      { label: "Idempotency", value: "Snapshot hash" },
      { label: "Tests", value: "Scoring rules" },
    ],
    facts: [
      { label: "Scope", value: "Wardrobe purchase decision scaffold" },
      { label: "Role", value: "Product scope, scoring model, UI surfaces, API shape" },
      { label: "Status", value: "Local scaffold repo" },
      { label: "Proof", value: "README, product docs, engineering roadmap, scoring tests" },
      { label: "What I owned", value: "Compatibility rules, redundancy logic, verdicts, analysis history" },
      { label: "Best fit", value: "Product engineering roles with explainable decision logic" },
    ],
    system: [
      { label: "Inputs", value: "Wardrobe item metadata and candidate item metadata or URL" },
      { label: "Scoring", value: "Category pairing, color compatibility, season overlap, formality, redundancy" },
      { label: "Output", value: "Buy, Wait, or Skip verdict with score breakdown and outfit unlocks" },
      { label: "Persistence", value: "Prisma schema planned around wardrobe, candidates, analyses, and snapshot hashes" },
    ],
    evidenceNote:
      "ClosetDelta is an early scaffold, but the product boundary is crisp: explainable outfit-unlock scoring, saved analyses, idempotency by wardrobe snapshot, and focused tests.",
    highlights: [
      "Scoped the MVP to one shopping question: does this item add useful outfits to what I already own?",
      "Built rule-based scoring for compatibility, redundancy, seasonality, formality, and outfit unlocks before adding computer vision.",
      "Separated wardrobe, candidate, verdict, score breakdown, and analysis-history UI components.",
      "Documented the path from local dev storage to Prisma persistence, upload validation, private images, and Playwright coverage.",
    ],
    sections: [
      {
        title: "What I built",
        paragraphs: [
          "I built ClosetDelta as a focused decision engine for clothing purchases.",
          "Instead of trying to be a full closet manager, the MVP asks whether a new item unlocks enough useful outfits against the wardrobe someone already has.",
        ],
      },
      {
        title: "Choices I made",
        paragraphs: [
          "I started with manual metadata and explainable rules because trust matters more than a flashy black-box styling answer at this stage.",
          "The scoring layer can explain compatibility, redundancy, color fit, season overlap, formality distance, and verdict thresholds.",
        ],
      },
      {
        title: "Evidence",
        paragraphs: [
          "The repo includes product docs, a Prisma data model, UI components for wardrobe and candidate analysis, and tests for scoring and color compatibility.",
          "It is still a scaffold, so I would present the decision logic and product boundary rather than claim finished production readiness.",
        ],
      },
      {
        title: "What I'd do next",
        paragraphs: [
          "I would finish Prisma-backed persistence, add API validation with Zod, save real analyses, add duplicate-analysis tests, and validate the main flow with Playwright.",
        ],
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "Zod", "Tailwind CSS", "Vitest"],
    links: [],
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
