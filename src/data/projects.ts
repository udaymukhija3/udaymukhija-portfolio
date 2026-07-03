import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "gathrly",
    title: "Gathr",
    label: "Private-Alpha Social Planning",
    status: "Public repo",
    category: "product",
    year: "2026",
    summary:
      "A private-alpha local planning product for reliable small-group activities, with joining, confirmation, group chat, reliability scoring, safety, privacy, and a reviewer demo.",
    description:
      "Gathr turns local intent into small plans: pick a neighborhood hub, see what is happening soon, join a 2-6 person activity, chat with the group, show up, and save places worth remembering. The current repo is a private-alpha/recruiter-demo codebase that demonstrates backend-heavy product systems: Spring Boot, Postgres, Redis, Flyway, phone OTP auth, WebSocket/STOMP chat, reliability mechanics, safety/report flows, privacy export/delete, launch flags, and recommender-system substrate while the alpha feed remains heuristic/fallback-first.",
    metrics: [
      { label: "Backend", value: "Spring Boot" },
      { label: "Mobile", value: "Expo RN" },
      { label: "Launch hub", value: "Koramangala" },
      { label: "Channel", value: "Private beta" },
    ],
    facts: [
      { label: "Scope", value: "Private-alpha local social planning product with mobile, backend, and static demo" },
      { label: "Role", value: "Backend architecture, product logic, trust/safety, mobile integration" },
      { label: "Status", value: "Public repo with a private-beta/TestFlight-style launch boundary" },
      { label: "Proof", value: "README, LaunchManifest, static web demo, backend/mobile verification docs" },
      { label: "Local source", value: "/Users/udaymukhija/gathr-slice2-complete" },
      { label: "Best fit", value: "Backend product systems and social-platform roles" },
    ],
    system: [
      { label: "Product loop", value: "Hub selection, feed browse, activity join, group chat, confirmation, check-in, post-meet Drop" },
      { label: "Backend", value: "Spring Boot, PostgreSQL, Flyway, Redis, Caffeine, JWT refresh rotation, Docker/Render demo path" },
      { label: "Realtime", value: "Activity-scoped STOMP/SockJS chat with fallback, typing, presence, rate limits, idempotent client message IDs" },
      { label: "Launch boundary", value: "Private beta channel, one coded hub, Expo push provider, account deletion, non-core surfaces frozen off" },
    ],
    evidenceNote:
      "Best evaluated as a private-alpha local planning system with trust, safety, reliability, privacy, and recommender infrastructure.",
    evaluationPath: [
      "Open the GitHub repo and start with the README plus static web demo notes.",
      "Read the architecture section below for lifecycle state, auth, realtime chat, privacy, and launch boundaries.",
      "Inspect the LaunchManifest, backend/mobile verification docs, and WebSocket/STOMP chat paths referenced by the repo.",
      "Run the documented verification path before treating it as more than a private-alpha reviewer demo.",
    ],
    highlights: [
      "Built the activity lifecycle from discovery to attendance, including feed sections, join/leave, confirmation, check-in, completion, feedback, and Drops.",
      "Modeled reliability as backend state with human-readable blocking reasons rather than simple UI messaging.",
      "Implemented realtime activity chat with WebSocket delivery paths, typing/presence, rate limiting, and blocked-user filtering.",
      "Kept the alpha honest with a static sample-data web preview, demo-mode backend deploy, launch flags, and a clear boundary between heuristic ranking and future model-backed ranking.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Gathr is about getting people from intent to actually showing up. The product loop is deliberately concrete: choose a neighborhood hub, find an activity, join a small group, chat, confirm, check in, and keep a lightweight memory afterward.",
          "The interesting product work is trust. Reliability, cancellation penalties, safety reports, blocked users, and privacy export/delete are treated as part of the core experience, not as future admin polish.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The backend demonstrates API boundaries, lifecycle state, transactional persistence, Flyway migrations, Redis-backed operational paths, Caffeine caching, JWT refresh rotation, and WebSocket chat.",
          "The repo also contains recommender substrate: event tracking, feature-store concepts, ONNX/model-serving hooks, promotion gates, semantic search, and graph ideas. The honest alpha story is still heuristic/fallback-first ranking, not a trained production recommendation model.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would start with the static web demo to show the loop quickly, then go into the backend: activity state transitions, reliability score updates, chat delivery, privacy endpoints, and launch-mode configuration.",
          "The strongest interview angle is product logic under real constraints: attendance, trust, safety, privacy, realtime communication, and staged rollout.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Flyway", "WebSocket/STOMP", "Expo"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/gathrly" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "vibegrid",
    title: "VibeGrid",
    label: "Daily Puzzle Product",
    status: "Public repo",
    category: "product",
    year: "2026",
    summary:
      "A daily semantic grouping puzzle where the server owns answer secrecy, guest attempts, community puzzles, admin publishing, moderation, analytics, and observability.",
    description:
      "VibeGrid is a daily semantic grouping puzzle: 16 tiles, 4 hidden vibe-based categories, 4 mistakes, and spoiler-safe sharing. The local repo includes the core game loop, durable Postgres path, community puzzle links, password-backed admin desk, moderation queue, reports and appeals, migrations, CI, Docker, Fly/Render deploy config, structured logs, health/readiness probes, metrics, and monitoring templates. A quick demo runs without a database; Postgres unlocks the full product surface.",
    metrics: [
      { label: "Runtime", value: "One Go binary" },
      { label: "Guess safety", value: "Idempotent" },
      { label: "Full path", value: "Postgres" },
      { label: "Ops", value: "Health + metrics" },
    ],
    facts: [
      { label: "Scope", value: "Daily puzzle product with backend-owned rules and publishing tools" },
      { label: "Role", value: "Go API, game rules, data model, Next.js UI, moderation/admin flow" },
      { label: "Status", value: "Public repo; deploy-ready locally, permanent production URL not claimed" },
      { label: "Proof", value: "README, Go tests, migrations, smoke script, deployment docs" },
      { label: "Local source", value: "/Users/udaymukhija/Vibegrid" },
      { label: "Best fit", value: "Backend/product roles with correctness-heavy state" },
    ],
    system: [
      { label: "Game loop", value: "Daily puzzle, archive, create/share links, profile stats, share images, admin editor desk" },
      { label: "Rules", value: "Go API validates guesses and reveals only solved groups; group membership never ships to the browser" },
      { label: "Persistence", value: "Guest session cookie, Postgres attempts/streaks/stats with idempotent guess handling, in-memory quick-demo fallback" },
      { label: "Operations", value: "Embedded frontend, SQL migrations, /healthz, /readyz, /metrics, structured logs, security headers, rate limits, smoke tests" },
    ],
    evidenceNote:
      "The repo proves more than gameplay: answer secrecy, idempotency, community creation, admin publishing, moderation, analytics, and same-origin deploy scaffolding are visible.",
    evaluationPath: [
      "Open the GitHub repo and run the no-database quick demo described in the README.",
      "Read the architecture section below for rules, persistence, and operations.",
      "Run the Go tests and smoke script from the repo docs.",
      "Inspect the migrations plus /healthz, /readyz, /metrics, rate limits, and deploy configuration.",
    ],
    highlights: [
      "Kept answer metadata server-side and made every guess pass through the Go rules engine.",
      "Used row locking plus client guess IDs so double clicks and retries do not corrupt attempt state.",
      "Built public puzzle creation, archive/share links, admin publishing, reports, appeals, moderation audit logs, and policy pages instead of stopping at one static daily puzzle.",
      "Added SQL-derived game analytics, health/readiness endpoints, Prometheus-style metrics, route-aware security headers, rate limits, and Fly/Render deployment scaffolding.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "VibeGrid is a compact daily game, but it has the product surfaces that make it feel real: daily play, archive, share results, creator links, admin publishing, reports, appeals, moderation, and policy pages.",
          "The product value is not just a puzzle screen. It is a repeatable puzzle operation with guest-first play and a path for community-created content.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The Go backend owns the important invariants: answer secrecy, attempts, guesses, completion, mistakes, sessions, publishing, moderation, and dynamic OG images.",
          "The durable path uses Postgres with migrations and idempotent transactional attempt updates. The in-memory path keeps the no-database demo playable, but create/admin/moderation depth needs Postgres.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would explain this as a small app where correctness matters. The browser can never inspect the solution, and repeated submissions are safe by design.",
          "The second angle is launch readiness: one container, health checks, metrics, CSP/security headers, smoke tests, and a clear Fly.io plus Postgres path.",
        ],
      },
    ],
    stack: ["Go", "Next.js", "React", "TypeScript", "PostgreSQL", "pgx", "Tailwind CSS"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/Vibegrid" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "murmur",
    title: "Murmur",
    label: "Private Voice Product",
    status: "Public repo",
    category: "product",
    year: "2026",
    summary:
      "A private short-voice app with magic-link sign-in, invite-only rooms, media upload and playback, heard receipts, reactions, saved notes, nudges, notifications, and metrics.",
    description:
      "Murmur is a private voice-note product for close people. The Go-backed web MVP demonstrates the core loop: sign in, create a private room, invite someone, record up to 90 seconds, upload audio, play it back, update heard state, react, save, and export/delete account data. It includes membership checks on room, murmur, and media access; server-side audio-duration validation; SSE room updates; quiet hours and nudge plumbing; Web Push subscription management; PWA installability wiring; loop-health metrics; and a production deployment plan for Vercel, Render, managed Postgres, Resend, and private S3/R2 media.",
    metrics: [
      { label: "Voice cap", value: "90 seconds" },
      { label: "Auth", value: "Magic link" },
      { label: "Backend", value: "Go API" },
      { label: "Retention", value: "Saved murmurs" },
    ],
    facts: [
      { label: "Scope", value: "Private room-based voice MVP" },
      { label: "Role", value: "Go API, auth, access control, media flow, product UI" },
      { label: "Status", value: "Public repo; local MVP and production-capable scaffold, permanent URL not claimed" },
      { label: "Proof", value: "README, VERIFY.md, Go service tests, deployment docs" },
      { label: "Local source", value: "/Users/udaymukhija/Murmur" },
      { label: "Best fit", value: "Backend/product roles around private media and access control" },
    ],
    system: [
      { label: "Product loop", value: "Magic-link sign-in, private room, invite, record, upload, play, heard state, react, save, nudge" },
      { label: "Backend", value: "Go net/http API with pgx, SQL migrations, sessions, events, notifications, metrics" },
      { label: "Privacy", value: "Room membership gates room, murmur, and media endpoints; saved murmurs remain visible to the saver after normal expiry" },
      { label: "Deployment", value: "Next.js on Vercel, Go API on Render, managed Postgres, Resend, private S3/R2 media" },
    ],
    evidenceNote:
      "Best evaluated as a private voice loop with saved-note retention and PWA installability; permanent production URL and offline-first behavior are outside the claim.",
    highlights: [
      "Built the narrow private voice loop instead of a broad public audio feed.",
      "Made the Go API authoritative for sessions, room membership, invite acceptance, murmur creation, playback, and reactions.",
      "Verified media duration server-side so clients cannot bypass the length cap by lying about metadata.",
      "Added saved murmurs, account export/delete, Web Push settings, nudge policy plumbing, PWA installability, loop-health metrics, and Prometheus-style operational metrics.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Murmur is intentionally small: it is for private voice moments between close people, not podcasts, public feeds, or long recordings.",
          "That clarity shapes the product decisions. Rooms are invite-only, the latest murmur matters, saved murmurs can outlive normal expiry for the saver, and the experience optimizes for a quick private ritual rather than endless chat.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The Go API owns auth, access control, media ingestion, room state, events, notifications, and metrics. The Next app is the UI shell and public origin.",
          "The repo includes local file-backed media for development and a production media path using private object storage plus presigned URLs. PWA wiring covers installability and push handling, not full offline-first behavior.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would demo the two-person flow, then discuss the backend decisions: magic-link sessions, membership checks, invite tokens, duration validation, media serving, saved murmur retention, PWA wiring, and deployment constraints.",
          "The strongest signal is that the hard parts of a private media product are already treated as backend contracts.",
        ],
      },
    ],
    stack: ["Go", "Next.js", "React", "TypeScript", "PostgreSQL", "pgx", "S3/R2"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/Murmur" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "resolveops",
    title: "ResolveOps",
    label: "AI Support Workflow",
    status: "Local project",
    category: "product",
    year: "2026",
    summary:
      "An operator-facing D2C support dashboard that classifies tickets, retrieves order and policy context, proposes safe resolutions, drafts replies, and waits for human approval.",
    description:
      "ResolveOps is an AI order-issue resolver for Shopify-style D2C stores. It demonstrates the safer version of an AI workflow: LLM-style inference proposes, deterministic workflow and human approval decide. The local project includes a Go API and worker, Postgres schema and seed data, Redis-backed async jobs, a Next.js dashboard, retrieval over policies/orders/products/prior tickets, approval decisions, audit logs, monitoring, and a golden eval endpoint.",
    metrics: [
      { label: "Golden cases", value: "20" },
      { label: "Queue", value: "Redis" },
      { label: "Backend", value: "Go" },
      { label: "Decisioning", value: "Human gated" },
    ],
    facts: [
      { label: "Scope", value: "Operator console for AI-assisted order support" },
      { label: "Role", value: "Workflow design, Go API/worker, rule engine, dashboard, evals" },
      { label: "Status", value: "Local project with Docker Compose demo path" },
      { label: "Proof", value: "README, schema/seed SQL, workflow code, eval endpoint, monitoring payload" },
      { label: "Local source", value: "/Users/udaymukhija/resolveops" },
      { label: "Best fit", value: "AI product engineering and backend workflow roles" },
    ],
    system: [
      { label: "Data model", value: "Tenants, users, customers, products, variants, orders, shipments, tickets, policies, audit tables" },
      { label: "Workflow", value: "Classify, retrieve context, apply deterministic rules, propose action, draft reply, require approval" },
      { label: "Safety", value: "No autonomous refunds; risky delivery/refund/damaged-item cases are blocked or escalated" },
      { label: "Monitoring", value: "Latency, cost, fallback rate, confidence, approval/rejection/escalation, intent mix, eval summary" },
    ],
    evidenceNote:
      "ResolveOps is valuable because it frames AI as workflow infrastructure: retrieval, deterministic guardrails, human approval, auditability, and evals.",
    highlights: [
      "Built an agent dashboard around real support operations rather than a customer-facing chatbot.",
      "Used Redis jobs so analysis is async and auditable instead of blocking the ticket page.",
      "Combined retrieval with deterministic refund/return/exchange/delivery rules before a human approval step.",
      "Added audit logs, monitoring payloads, five polished demo tickets, and a 20-case golden eval suite.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "ResolveOps helps support agents handle order issues without handing decisions to an autonomous bot.",
          "The product promise is practical: collect order, policy, shipment, product, and prior-ticket context; propose a resolution; let the agent approve, edit, escalate, or reject it.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The backend separates ingestion, async analysis, retrieval, rule execution, proposal storage, human decisions, audit logs, monitoring, and evals.",
          "The key design choice is that deterministic rules sit between the model-like classifier and any business action.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would walk through one ticket, show the retrieved citations and rule output, then approve or edit the reply.",
          "The engineering discussion should focus on safe AI workflows: async jobs, full-text retrieval, policy citations, rule gates, audit trails, and evaluation cases.",
        ],
      },
    ],
    stack: ["Go", "Next.js", "PostgreSQL", "Redis", "Docker Compose", "Full-text search", "TypeScript"],
    links: [],
    featured: true,
    flagship: true,
  },
  {
    slug: "punchline",
    title: "Punchline",
    label: "Realtime Party Game",
    status: "Local project",
    category: "product",
    year: "2026",
    summary:
      "A playable web-first multiplayer party game with server-authoritative rooms, rotating judges, timers, private per-player views, reconnects, smoke tests, and deployment routing notes.",
    description:
      "Punchline is a live party game: host a room, share a 4-character code or invite link, join from phones, answer a prompt, let a rotating judge pick the funniest submission, and play to a score limit. It demonstrates a production-leaning realtime backend: server-authoritative Go room engine, custom WebSocket transport, redacted room snapshots per viewer, guest-token reconnects, host-only controls, timers, bounded socket queues, origin checks, health/readiness probes, smoke tests, a Vite/React client, one-container API/WS/UI runtime, and optional Postgres room ownership leases for Fly.io replay routing. Active gameplay state is still in memory on the owning process.",
    metrics: [
      { label: "Room code", value: "4 letters" },
      { label: "Transport", value: "WebSocket" },
      { label: "Routing", value: "Fly-Replay" },
      { label: "State", value: "In memory" },
    ],
    facts: [
      { label: "Scope", value: "Live multiplayer party game engine" },
      { label: "Role", value: "Go game engine, WebSocket protocol, React client, deployment shape" },
      { label: "Status", value: "Playable local v0; optional Postgres ownership registry, no durable game recovery yet" },
      { label: "Proof", value: "README, Go tests, frontend build, Dockerfile, Fly config, realtime smoke script" },
      { label: "Local source", value: "/Users/udaymukhija/punchline_codebase" },
      { label: "Best fit", value: "Realtime backend and product engineering roles" },
    ],
    system: [
      { label: "Gameplay", value: "Host room, guest join, judge rotates, answer cards submit blind, reveal, pick winner, score to limit" },
      { label: "Backend", value: "Go API plus WebSocket engine; server pushes room_state snapshots to connected players" },
      { label: "Fairness", value: "Viewer-specific redaction: only your own hand is visible, submissions stay hidden until reveal, authors hidden during judging" },
      { label: "Routing", value: "Optional Postgres room code leases let wrong-machine API/WS requests return 421 plus Fly-Replay before upgrade" },
    ],
    evidenceNote:
      "Punchline is a clean realtime systems sample with optional shared room ownership routing; it still keeps active gameplay state in memory, and that limit is explicit.",
    highlights: [
      "Built the live room loop with create, join, start, submit, reveal, pick winner, next round, end game, and play again messages.",
      "Kept game state server-authoritative so reconnects and refreshes recover from the room snapshot.",
      "Redacted room state per viewer to protect hands and preserve anonymous judging.",
      "Added production hardening around one-container runtime, probes, security headers, origin checks, socket limits, idle eviction, local room caps, smoke testing, and optional Postgres room ownership leases.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Punchline is designed to be instantly playable: no install, a host shares a short code, and players join from phones.",
          "The product loop is familiar but technically demanding because everyone needs a consistent view of the room while each player sees different private information.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The Go backend owns the game state and broadcasts WebSocket snapshots. The frontend reconnects after refresh and renders viewer-specific state.",
          "Postgres is used only as an optional room ownership registry for multi-machine routing, not as durable active-game storage. If the owning process restarts, full room-state recovery is still future work.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would demo it with two browser windows, then explain redaction, judge rotation, timers, guest-token reconnects, bounded WebSocket fanout, and the Fly-Replay room ownership path.",
          "The strongest signal is honest realtime engineering rather than a polished static game mockup.",
        ],
      },
    ],
    stack: ["Go", "WebSocket", "React", "Vite", "Docker", "Fly.io", "PostgreSQL"],
    links: [],
    featured: true,
  },
  {
    slug: "mini-market",
    title: "Mini Market",
    label: "Decision Puzzle Product",
    status: "Public repo",
    category: "product",
    year: "2026",
    summary:
      "A daily market-decision game that tests expected-value judgment with generated puzzles, hidden answer keys, one-attempt sessions, profile stats, sharing, analytics, and tests.",
    description:
      "Mini Market is a daily decision-quality game. Players read a binary contract, weigh noisy signals against the quoted price, choose buy/sell/pass, set confidence, and learn the fair value and expected value afterward. It is a working Next.js app, not a static demo: daily puzzles are deterministically generated from calendar dates, public APIs hide solution data before submission, anonymous sessions get one attempt per puzzle, profile pages show streaks and calibration, sharing uses native/clipboard/SVG paths, and analytics/rate limits persist in Postgres when configured with an in-memory local fallback.",
    metrics: [
      { label: "Engine", value: "Bayesian" },
      { label: "Actions", value: "Buy/Sell/Pass" },
      { label: "Persistence", value: "Prisma/Postgres" },
      { label: "Backend", value: "Next routes" },
    ],
    facts: [
      { label: "Scope", value: "Daily market-decision puzzle with explainable scoring" },
      { label: "Role", value: "Domain model, scoring engine, generator, API routes, product UI" },
      { label: "Status", value: "Public repo; working local app, production hardening still partial" },
      { label: "Proof", value: "README, tests, puzzle validator, Prisma schema, CI commands" },
      { label: "Local source", value: "/Users/udaymukhija/MiniMarket" },
      { label: "Best fit", value: "Product engineering roles with domain modeling" },
    ],
    system: [
      { label: "Product loop", value: "Daily contract, noisy signals, quoted price, buy/sell/pass decision, confidence, fair-value reveal, share result" },
      { label: "Engine", value: "Closed-form posterior from prior and likelihood ratios, cross-checked with Monte Carlo tests" },
      { label: "Generator", value: "Deterministic daily puzzles starting 2026-05-23 with semantic validation against recomputed answer keys" },
      { label: "Persistence", value: "Prisma/Postgres puzzles, attempts, analytics, and rate-limit buckets when configured; in-memory fallback for local demos" },
    ],
    evidenceNote:
      "Mini Market is strongest as a domain-engine project: the answer key is derived from the model, revalidated, hidden until submission, and tested across domain/API/UI behavior.",
    highlights: [
      "Built a market-decision game around expected value and confidence instead of a generic trivia score.",
      "Derived puzzle answers from an explicit Bayesian model and cross-checked the math with Monte Carlo tests.",
      "Added deterministic daily generation plus semantic validation so explanations and answer keys stay tied to the same engine.",
      "Implemented daily/archive/profile/glossary routes, one-attempt behavior, calibration stats, analytics, sharing, rate limiting, and Prisma-backed persistence.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Mini Market teaches decision quality. The player is not rewarded for guessing a hidden fact alone; they are judged on whether they found the edge and sized confidence appropriately.",
          "The daily format gives it a small repeatable loop, while the reveal explains fair value, expected value, edge capture, and confidence in plain terms.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The engine computes posterior probability, fair value, expected value, and best action from explicit inputs. Puzzle generation samples scenarios and then asks the same engine to derive the answer.",
          "That matters because the game is not hand-waving the answer key. Validation recomputes the answer, public APIs withhold solution data, and tests cover the domain logic, route behavior, analytics, and rate limiting.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would start with the product loop, then open the engine: prior, signals, likelihood ratios, posterior, fair value, action choice, and explanation.",
          "The portfolio value is the domain boundary: product UI on top, tested inference/scoring core underneath.",
        ],
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Vitest"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/mini-market" }],
    featured: true,
  },
  {
    slug: "ramble",
    title: "Ramble",
    label: "Voice Notes Product",
    status: "Local MVP scaffold",
    category: "product",
    year: "2026",
    summary:
      "A voice-to-structured-card MVP scaffold that records or uploads audio, creates saved cards, supports search/edit/copy/delete, and keeps provider boundaries clear.",
    description:
      "Ramble turns 30-90 seconds of messy speech into a title, summary, key points, tasks, tags, and a saved card. The current repo is a working web MVP scaffold: the Next.js frontend records or uploads audio, the Go net/http API creates recordings idempotently with clientUploadId, persists recordings/cards/tasks in Postgres, polls status, lists recent cards, searches card text/tags, and supports open/edit/save/copy/delete. Mock transcription and structuring keep the loop runnable by default, while a Sarvam Saaras v3 transcription adapter proves the provider seam for real speech-to-text.",
    metrics: [
      { label: "Modes", value: "Note/Task/Message" },
      { label: "Backend", value: "Go API" },
      { label: "STT", value: "Mock + Sarvam" },
      { label: "Storage", value: "Postgres + disk" },
    ],
    facts: [
      { label: "Scope", value: "Voice note to structured card scaffold" },
      { label: "Role", value: "Product scope, Go API, data model, provider seams, frontend loop" },
      { label: "Status", value: "Working local MVP scaffold; demo-grade auth and inline processing" },
      { label: "Proof", value: "README, product docs, Go build/test scripts, provider seam" },
      { label: "Local source", value: "/Users/udaymukhija/Ramble" },
      { label: "Best fit", value: "Backend/product roles involving async media and AI providers" },
    ],
    system: [
      { label: "Capture", value: "Record in browser or upload audio, then create a recording through multipart POST" },
      { label: "Backend", value: "Go net/http API for recordings, status polling, cards, transforms, search, edit, and delete" },
      { label: "Processing", value: "Mock transcription/structuring by default; optional Sarvam Saaras v3 STT through provider config" },
      { label: "Boundary", value: "Per-browser demo user ids, inline processing, local/ephemeral audio storage, and SQL text search are not beta-ready auth/queue/search" },
    ],
    evidenceNote:
      "Ramble is best framed as a working MVP scaffold with good boundaries: capture, idempotent uploads, provider seams, Postgres cards/tasks, search, and honest demo-grade limits.",
    highlights: [
      "Locked v1 to three modes so the product does not sprawl into a broad assistant.",
      "Built the backend in Go around idempotent audio uploads, recordings, status polling, cards, transforms, search, edit, copy, and delete.",
      "Kept transcription and structuring swappable through provider interfaces, with Sarvam STT available behind config.",
      "Documented the follow-up path for production auth, queues/retries, cost controls, privacy/retention controls, durable object storage, and better structuring providers.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Ramble focuses on the moment after someone talks into their phone and wants a useful artifact, not a raw transcript.",
          "The v1 promise is deliberately narrow: turn a short spoken mess into a note, task, or message card that can be saved, copied, edited, searched, or deleted.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The local implementation proves the architecture before paid providers are introduced. The Go API owns recordings, cards, status, search, and provider orchestration.",
          "Mock providers make the loop runnable, while the Sarvam adapter shows how real speech transcription slots in. The unfinished parts are also explicit: no production auth, no background worker, no semantic search, no production LLM structuring, and no durable user-audio storage.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would be explicit that this is a scaffold, not a launched SaaS. The value is the product boundary, Go/Postgres model, idempotent recording creation, provider seam, and full local voice-to-card loop.",
          "The next serious step is quality evaluation for real transcription and structured-output providers.",
        ],
      },
    ],
    stack: ["Go", "Next.js", "React", "TypeScript", "PostgreSQL", "pgx", "Tailwind CSS"],
    links: [],
    featured: true,
  },
  {
    slug: "closetdelta",
    title: "ClosetDelta",
    label: "Wardrobe Decision Engine",
    status: "Local MVP",
    category: "product",
    year: "2026",
    summary:
      "A local wardrobe purchase decision app that scores whether a candidate item unlocks useful outfits against an existing closet, then saves the verdict, evidence, and feedback for deterministic scoring updates.",
    description:
      "ClosetDelta asks one shopping question: does this new clothing item add enough useful outfits to what I already own? The current repo is a local/demo MVP, not a production wardrobe platform. It has wardrobe and candidate CRUD, manual metadata, upload/URL image input, rule-based scoring for pairing/color/season/formality/redundancy/outfit unlocks, Buy/Wait/Skip verdicts, quick-read previews, saved analysis history, candidate and wardrobe snapshots, closest-overlap evidence, agree/disagree feedback, and deterministic learning that tunes pair-score weights from saved corrections.",
    metrics: [
      { label: "Verdicts", value: "Buy/Wait/Skip" },
      { label: "Scoring", value: "Rule-based" },
      { label: "Store", value: "JSON dev store" },
      { label: "Learning", value: "Feedback tuned" },
    ],
    facts: [
      { label: "Scope", value: "Local wardrobe-aware purchase decision workflow" },
      { label: "Role", value: "Product scope, scoring model, UI components, API shape" },
      { label: "Status", value: "Local MVP; not production-ready, no accounts or hosted storage" },
      { label: "Proof", value: "README, app routes, dev store, scoring/feedback tests, Prisma schema" },
      { label: "Local source", value: "/Users/udaymukhija/Closet" },
      { label: "Best fit", value: "Product engineering roles with explainable decision logic" },
    ],
    system: [
      { label: "Inputs", value: "Manual wardrobe and candidate metadata plus upload or source URL image input" },
      { label: "Scoring", value: "Category compatibility, color fit, season overlap, formality distance, redundancy, outfit unlocks" },
      { label: "Output", value: "Buy, Wait, or Skip verdict with score breakdown, outfit examples, overlap evidence, and explanation" },
      { label: "Persistence", value: "JSON-backed development store with candidate/wardrobe snapshots, scoring-weight hash idempotency, and feedback learning" },
    ],
    evidenceNote:
      "ClosetDelta is no longer just a scaffold: it has a local product loop, saved analyses, snapshots, and feedback learning, while still avoiding claims about CV, auth, or production persistence.",
    highlights: [
      "Scoped the MVP to one decision instead of a broad closet-management app.",
      "Started with manual metadata and transparent rules so verdicts can be inspected and debugged.",
      "Persisted analyses with candidate and wardrobe snapshots so feedback remains meaningful after closet edits.",
      "Added agree/disagree feedback that deterministically tunes pair-score weights from saved corrections.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "ClosetDelta is for the moment before buying clothes, not for managing every outfit forever.",
          "The product asks whether a new item is additive or redundant, then explains the verdict through outfit examples, compatibility signals, closest-overlap evidence, and saved decision history.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The useful technical work is the scoring layer: compatibility, redundancy, seasonality, formality, and outfit unlocks.",
          "The current runtime uses a JSON development store, not Prisma/Postgres, but it still models persistence concerns through snapshots, scoring-weight hashes, idempotent analysis creation, Zod API validation, and focused Vitest coverage.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would present ClosetDelta as a product-thinking and explainability sample rather than a finished AI fashion app.",
          "That framing is stronger because the current repo proves the decision logic, feedback loop, and local workflow, not computer vision accuracy, marketplace scraping, or production auth.",
        ],
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "Tailwind CSS", "Vitest"],
    links: [],
    featured: true,
  },
  {
    slug: "receipt-scanner",
    title: "Receipt Scanner",
    label: "Expense Archive",
    status: "Public repo; local MVP",
    category: "product",
    year: "2026",
    summary:
      "A private expense archive with receipt upload, async extraction, user correction, review and confirmation, archive search, monthly summaries, CSV export, and smoke proof.",
    description:
      "Receipt Scanner is a private archive for receipts, invoices, and payment screenshots. The current README says the local MVP loop is implemented and scriptable: registration/login, JWT-protected upload, S3-compatible object storage, async processing, mock OCR by default, optional Google Cloud Vision OCR, rule-based parsing, manual correction, review queue, confirmation, archive search/filter, monthly spending summary, CSV export, presigned image preview, account deletion, and a React/Vite UI for the core flows. It is still pre-production: no hosted deployment is claimed, and production storage/secrets/privacy/OCR setup still need hardening.",
    metrics: [
      { label: "Backend", value: "Spring Boot 3.4" },
      { label: "Java", value: "21" },
      { label: "Storage", value: "MinIO/S3" },
      { label: "Proof", value: "smoke.sh" },
    ],
    facts: [
      { label: "Scope", value: "Private receipt and expense archive with reviewable OCR workflow" },
      { label: "Role", value: "Backend architecture, async OCR flow, auth, frontend shell" },
      { label: "Status", value: "Local MVP loop implemented and scriptable; no live production deployment claimed" },
      { label: "Proof", value: "README, scripts/smoke.sh, JUnit/MockMvc/Testcontainers tests, frontend build script" },
      { label: "Local source", value: "/Users/udaymukhija/receipt_scanner" },
      { label: "Best fit", value: "Backend roles where honest stabilization planning matters" },
    ],
    system: [
      { label: "Product loop", value: "Register, upload image, process asynchronously, review/correct, confirm, search/filter, summarize, export CSV, delete account" },
      { label: "Pipeline", value: "Upload validates/stores private object, saves PENDING receipt, triggers worker, reads bytes for OCR, parses, and persists status/data" },
      { label: "Backend", value: "Spring Boot, PostgreSQL, Flyway, Spring Security JWT, S3-compatible storage, Google Vision optional, mock OCR default, Tika validation" },
      { label: "Boundary", value: "Experimental LayoutLM/FastAPI code under ml_service is not wired into the active runtime and should not be claimed as production ML" },
    ],
    evidenceNote:
      "Receipt Scanner has moved past the old blocker framing: the local API loop is scriptable, while production hosting and real OCR/storage hardening remain unclaimed.",
    highlights: [
      "Built the async ingestion shape: immediate upload acknowledgement, private object storage, background OCR/parsing, status transitions, and review-needed records.",
      "Added JWT auth, per-user ownership, account deletion, Flyway migrations, file validation, MinIO/S3-compatible storage, presigned previews, and category/monthly analytics.",
      "Kept OCR replaceable with deterministic mock OCR by default and optional Google Cloud Vision for credentialed runs.",
      "Added a repeatable smoke script that proves account creation, upload, processing, correction, review, confirmation, search, summary, CSV export, account deletion, and stale-token rejection.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Receipt Scanner is a corrected, searchable archive of personal spending proof. OCR is infrastructure, not the product itself.",
          "The useful user loop is upload, extract, review, correct, categorize, search, summarize, and export.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The backend shape is a modular Spring Boot app with auth, storage, validation, background processing, OCR abstraction, parsing, statuses, and analytics.",
          "The current proof path is local: backend tests, Testcontainers integration setup, frontend build, and `scripts/smoke.sh`. It should still not be presented as a hosted production product or a trained custom OCR system.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would present this as a local MVP with a real end-to-end backend loop, not as a polished deployed scanner.",
          "That honesty helps: it shows judgment about what is built, what still needs production hardening, and why custom ML is deferred until user corrections create useful training data.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "MinIO/S3", "React", "Vite"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/receipt_scanner" }],
    featured: false,
  },
  {
    slug: "logistics-data-engineering",
    title: "Logistics Customer Ops Pipeline",
    label: "Customer Data Pipeline",
    status: "Public repo",
    category: "data",
    year: "2026",
    summary:
      "A data engineering pipeline that turns messy logistics exports into trusted operations tables, reject reports, SLA views, exception reports, route productivity outputs, and a dashboard.",
    description:
      "Logistics Customer Ops Pipeline turns customer logistics exports into trusted daily operations tables. A config-driven ingestion layer maps raw CSV columns into canonical Bronze parquet, validates records with JSON Schema, writes reject reports for bad rows, and uses a SHA-based ledger for idempotent reruns. dbt then builds DuckDB staging/intermediate/mart models for shipments, SLA breaches, delivery exceptions, trips, and route productivity. The recruiter-facing local proof path runs ingestion, dbt, quality checks, CSV exports, verification, and a Streamlit control-tower dashboard.",
    metrics: [
      { label: "Core marts", value: "5 non-empty" },
      { label: "Exports", value: "5 CSVs" },
      { label: "Warehouse", value: "DuckDB/dbt" },
      { label: "Proof", value: "make customer-trial" },
    ],
    facts: [
      { label: "Scope", value: "Customer CSV exports to trusted logistics marts, reports, and dashboard" },
      { label: "Role", value: "Config-driven ingestion, validation, dbt marts, quality checks, exports, dashboard" },
      { label: "Status", value: "Public repo with working local customer demo; hosted page not treated as source of truth" },
      { label: "Proof", value: "README, make customer-trial, make customer-verify, dbt project, quality reports, Streamlit app" },
      { label: "Local source", value: "/Users/udaymukhija/logistics" },
      { label: "Best fit", value: "Data engineering and analytics platform roles" },
    ],
    system: [
      { label: "Ingestion", value: "Customer CSV exports -> config-driven mapping -> canonical Bronze parquet with contracts, rejects, and idempotency" },
      { label: "Modeling", value: "DuckDB source views plus dbt staging, intermediate, and mart layers" },
      { label: "Outputs", value: "Shipment summary, SLA breaches, delivery exceptions, trip summary, route productivity, and Streamlit dashboard" },
      { label: "Depth path", value: "Kafka, Spark, and Airflow exist as optional depth, not the main proof path" },
    ],
    evidenceNote:
      "The strongest proof is the local customer batch path: `make customer-trial` plus verification that the core marts and CSV exports are populated.",
    highlights: [
      "Built config-driven ingestion that maps messy customer exports into canonical Bronze parquet.",
      "Added JSON Schema validation, reject reports for bad rows, and an ingestion ledger so reruns skip identical files.",
      "Modeled shipments, SLA breaches, delivery exceptions, trips, and route productivity in DuckDB/dbt.",
      "Kept Kafka, Spark, and Airflow as optional architecture depth rather than leading with unverified streaming claims.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "The product story is a small logistics control tower for operators dealing with messy third-party exports.",
          "The dashboard and CSV reports read built artifacts rather than hand-coded marketing numbers, so the demo ties back to ingested files, reject evidence, quality checks, and marts.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The verified path is intentionally pragmatic: customer CSVs, config-driven transforms, Bronze parquet, DuckDB source views, dbt models, quality checks, CSV exports, and Streamlit.",
          "The deeper path shows how the same domain could expand into Kafka topics, Spark processing, and Airflow orchestration, but the local customer demo is the source of truth.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would start with the dashboard and then trace one metric backward through dbt and source data.",
          "The honest boundary is that the local customer batch path is the strongest proof; the streaming stack is architecture depth unless freshly run end to end.",
        ],
      },
    ],
    stack: ["Python", "DuckDB", "dbt", "Streamlit", "Kafka", "Spark", "Airflow"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/logistics-data-engineering" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "inventory-management-sys",
    title: "Stockout Prevention Data Pipeline",
    label: "Inventory Data Platform",
    status: "Public repo",
    category: "data",
    year: "2026",
    summary:
      "An inventory data pipeline that converts stock changes into validated analytics, run evidence, reporting outputs, serving payloads, and a stockout-prevention backtest.",
    description:
      "Stockout Prevention Data Pipeline is an inventory operations and analytics project. Spring Boot inventory writes publish through a transactional outbox into Kafka, idempotent Python ETL materializes current metrics and history into Postgres/Redis/Parquet, FastAPI serves analytics, dbt builds tested marts, and a frontend monitor shows the run state. The project defends a business metric with a deterministic stockout-prevention backtest that records recall, precision, and estimated dollars saved, with CI failing if recall drops below 60%.",
    metrics: [
      { label: "Backtest gate", value: "60% recall" },
      { label: "Event path", value: "Transactional handoff" },
      { label: "Serving", value: "Analytics payloads" },
      { label: "Proof", value: "make demo" },
    ],
    facts: [
      { label: "Scope", value: "Event-driven inventory analytics and stockout-prevention proof pipeline" },
      { label: "Role", value: "Backend services, event flow, ETL, analytics API, demo proof artifacts" },
      { label: "Status", value: "Public repo with supported local `make demo` path; no production ERP/auth claims" },
      { label: "Proof", value: "README, make demo, artifacts/demo, backtest harness, Docker Compose" },
      { label: "Local source", value: "/Users/udaymukhija/inventory_management_sys" },
      { label: "Best fit", value: "Backend, data platform, and distributed-systems roles" },
    ],
    system: [
      { label: "Operational path", value: "Spring Boot inventory-service handles products, warehouses, adjustments, reservations, sales, and receipts" },
      { label: "Event path", value: "Transactional outbox writes in same DB transaction, relay publishes to Kafka with retry/give-up behavior" },
      { label: "Analytics path", value: "Python ETL writes current metrics, metric history, processed-event logs, invalid-event rows, Redis hot reads, Parquet manifests, and DQ runs" },
      { label: "Decision path", value: "Stockout-prevention backtest records recall, precision, estimated dollars saved, and fails CI below threshold" },
    ],
    evidenceNote:
      "This repo has one of the clearest proof paths: `make demo` produces database, serving, data-quality, reporting, and backtest evidence for the supported workflow.",
    evaluationPath: [
      "Open the GitHub repo and run `make demo`.",
      "Inspect artifacts/demo, the backtest output, quality reports, and generated reporting artifacts.",
      "Read the architecture section below for operational writes, event handoff, processing, serving, and reporting.",
      "Check the README proof path and CI stockout-recall gate.",
    ],
    highlights: [
      "Built the supported local path around inventory writes, pipeline processing, analytics serving, dashboard views, event delivery, and monitoring.",
      "Used a transactional outbox to avoid dual writes between inventory mutations and downstream event publication.",
      "Made the ETL idempotent through processed-event tracking, persisted invalid events, and separated current metrics from metric history.",
      "Added reporting marts over daily sales and a stockout-prevention backtest with a 60% recall CI gate.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "The product covers day-to-day inventory operations and the analytics needed to prevent stockouts.",
          "The frontend monitor is read-only by design: it shows pipeline health, current metrics, data quality, and proof that an inventory write moved through the system.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The important technical choice is the event boundary. Inventory writes stay transactional, then outbox publication and ETL materialization handle downstream analytics.",
          "The analytics service and Redis cache give the project a serving story, while processed-event logs, invalid-event tables, Parquet manifests, dbt marts, and DB run tables give it an audit trail.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would run the supported demo path and inspect the artifacts: before/after inventory, analytics payload, pipeline run, data quality, Redis key, and Parquet output.",
          "The strongest resume angle is not real-time ML forecasting yet; it is event-driven inventory analytics with deterministic backtest evidence and a CI recall gate.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Python", "FastAPI"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/inventory-management-sys" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "instacart-reorder-recommender",
    title: "Instacart Reorder Recommender",
    label: "ML Recommender",
    status: "Local case study",
    category: "ml",
    year: "2026",
    summary:
      "A known-shopper grocery reorder recommender with leakage-aware data validation, saved training artifacts, calibrated ranking, baseline lift, serving endpoints, monitoring, and a browser demo.",
    description:
      "Instacart Reorder Recommender predicts which products a known Instacart shopper is likely to buy again in their next basket. It demonstrates ML engineering beyond a notebook: point-in-time data validation, feature contracts, leakage checks, deterministic demo bundle, LightGBM/XGBoost training, calibrated ranking, offline evaluation against realistic reorder baselines, saved run artifacts, FastAPI serving, OpenAPI docs, monitoring endpoints, Docker packaging, and a browser demo. It is not a cold-start discovery engine, chatbot cart assistant, online A/B-tested recommender, or proof of production revenue impact.",
    metrics: [
      { label: "Candidate F1", value: "0.5665" },
      { label: "Basket F1", value: "0.4159" },
      { label: "P@10/R@10", value: "0.5577/0.7025" },
      { label: "Tests", value: "93 passed" },
    ],
    facts: [
      { label: "Scope", value: "Artifact-backed grocery reorder recommender" },
      { label: "Role", value: "Data contracts, feature engineering, model evaluation, serving API" },
      { label: "Status", value: "Strong local/demo portfolio state with checked-in artifacts" },
      { label: "Proof", value: "README, verify_run_20260304, feature contract, resume_release evidence, API demo path" },
      { label: "Local source", value: "/Users/udaymukhija/Instacart" },
      { label: "Best fit", value: "Applied ML and backend-adjacent ML systems roles" },
    ],
    system: [
      { label: "Data path", value: "Raw Instacart CSVs, point-in-time validation, referential integrity, deterministic splits, dataset fingerprints" },
      { label: "Features", value: "65 serving features under contract ca27e59e71136bc1" },
      { label: "Evaluation", value: "Candidate reorder and full-basket contracts, baseline lift, slice metrics, calibration plots, threshold curves" },
      { label: "Serving", value: "FastAPI loads model artifacts, feature schema, processed feature tables, product metadata, demo bundle, and monitoring state" },
    ],
    evidenceNote:
      "The strongest proof is the checked-in March 4, 2026 verification run, resume_release evidence pack, and artifact-backed FastAPI/browser demo path.",
    highlights: [
      "Evaluated candidate ranking separately from full-basket reconstruction so the metrics do not overstate product value.",
      "Saved feature contracts and fingerprints so training and serving can be checked against the same artifact boundary.",
      "Reported LightGBM temporal candidate F1 of 0.5665, full-basket F1 of 0.4159, P@10 of 0.5577, R@10 of 0.7025, and 1.67x lift over recency.",
      "Exposed recommendations, portfolio overview, health, OpenAPI docs, monitoring, and latency metadata through FastAPI.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "The product question is straightforward: for a known shopper, which items should appear in a buy-again shelf or smart cart suggestion?",
          "That is a practical recommender surface because grocery buying has rhythm, basket context, and repeated products. It should not be framed as cold-start discovery or a live commerce impact claim.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The repo is strongest where many recommender demos are weak: contracts, leakage control, split protocol, evaluation boundaries, calibration, and serving parity.",
          "The FastAPI app loads saved artifacts and returns ranked products with feature version, request ID, fallback status, and latency metadata.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would show the portfolio endpoint and one recommendation request, then inspect the run summary and baseline lift table.",
          "The honest claim is artifact-backed offline ML plus local serving, not an online A/B-tested production recommender.",
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
    title: "Enefit Prosumer Forecasting",
    label: "ML Forecasting",
    status: "Public repo",
    category: "ml",
    year: "2026",
    summary:
      "An energy forecasting system with strict data contracts, separate consumption and production artifacts, baseline leaderboards, walk-forward backtests, serving paths, metrics, and demo evidence packs.",
    description:
      "Enefit Prosumer Forecasting predicts Estonian prosumer consumption and production. It demonstrates leakage-resistant time-series ML engineering: schema-validated ingestion, explicit processed data layers, causal weather and price joins, target-specific LightGBM artifacts, required baseline leaderboards on every run, strict feature-contract enforcement across training/API/CLI, optional uncertainty intervals, closed-loop walk-forward backtesting, ablation matrices, Prometheus metrics, drift/performance/retrain checks, and recruiter demo evidence under docs/assets.",
    metrics: [
      { label: "Rows", value: "2.0M+" },
      { label: "Contracts", value: "Strict" },
      { label: "Targets", value: "2 models" },
      { label: "Serving", value: "API + CLI" },
    ],
    facts: [
      { label: "Scope", value: "Forecasting system for energy consumption and production" },
      { label: "Role", value: "Data joins, feature engineering, model training, backtests, serving" },
      { label: "Status", value: "Public repo with evidence pack and deployment notes" },
      { label: "Proof", value: "README, docs/assets, feature contract, backtests, API artifacts" },
      { label: "Local source", value: "/Users/udaymukhija/Enefit Project" },
      { label: "Best fit", value: "Forecasting, ML systems, and backend-adjacent ML roles" },
    ],
    system: [
      { label: "Data path", value: "Raw Kaggle tables, schema validation, raw/staged/feature parquet layers, lineage reports, causal joins" },
      { label: "Model layer", value: "Separate consumption and production LightGBM artifacts, optional uncertainty path, and baseline leaderboards" },
      { label: "Evaluation", value: "Holdout metrics, per-target reports, walk-forward backtests, ablation matrix, robustness report" },
      { label: "Serving", value: "FastAPI and CLI inference reuse the same feature contract and saved production pointers" },
    ],
    evidenceNote:
      "Enefit is a strong ML systems entry because it connects leakage control, versioned artifacts, baselines, backtests, serving, monitoring, and evidence packs instead of only reporting model scores.",
    highlights: [
      "Built separate consumption and production model artifacts rather than forcing one target shape.",
      "Used strict feature contracts across training, API inference, and CLI inference.",
      "Generated demo evidence for health, model info, predictions, metrics, OpenAPI, CLI output, training metrics, baselines, backtests, monitoring, error analysis, and robustness scorecards.",
      "Documented limitations around closed-loop evaluation cost, in-memory serving caches, fallback modes, and lack of realized online accuracy against live outcomes.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "The product framing is forecast reliability for prosumer energy consumption and production.",
          "The system is useful because the output can be served through an API or batch/CLI path while carrying metadata about the model, feature contract, and run artifacts.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The hard part is avoiding time leakage. Weather, prices, target history, rolling features, and splits all need explicit handling.",
          "The repo also proves serving discipline: the same feature contract is used across training, API, and CLI inference.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would start with the feature contract and per-target artifacts, then show the API checks and docs/assets evidence pack.",
          "The honest boundary is that monitoring artifacts prove scheduled drift/retrain checks, not realized online accuracy from production traffic. For the fastest public recruiter link, the README points to deploying the Streamlit dashboard first and the FastAPI service afterward.",
        ],
      },
    ],
    stack: ["Python", "Pandas", "LightGBM", "FastAPI", "MLflow", "Prometheus", "Docker"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/enefit" }],
    featured: true,
    flagship: true,
  },
  {
    slug: "fraud-detection-platform",
    title: "Fraud Detection Platform",
    label: "ML Risk System",
    status: "Local case study",
    category: "ml",
    year: "2026",
    summary:
      "A production-shaped fraud scorer with chronology-safe evaluation, calibrated probabilities, cost-aware thresholds, a browser review console, drift checks, challenger reports, and proof artifacts.",
    description:
      "Fraud Detection Platform is built around the operational risks of fraud ML: temporal leakage, train/serve mismatch, arbitrary thresholds, poor calibration, challenger promotion, drift, and serving observability. The checked-in project merges transaction and identity data, preserves chronology through TransactionDT, validates offline and online feature contracts, trains a LightGBM artifact, calibrates probability with Platt scaling, selects a threshold from explicit false-positive/false-negative costs, packages a SHA256-manifest deploy bundle, serves predictions through FastAPI and a browser fraud review console, and exposes monitoring, proof packs, drift reports, and challenger benchmarks.",
    metrics: [
      { label: "AUC-ROC", value: "0.8658" },
      { label: "AUC-PR", value: "0.4806" },
      { label: "Threshold", value: "0.0700" },
      { label: "Net savings", value: "$308k" },
    ],
    facts: [
      { label: "Scope", value: "Production-shaped fraud scoring system" },
      { label: "Role", value: "Feature path, calibration, thresholding, serving, monitoring artifacts" },
      { label: "Status", value: "Portfolio/recruiter-ready local project; not a live payment production system" },
      { label: "Proof", value: "README, evaluation report, deploy bundle, proof pack, drift report" },
      { label: "Local source", value: "/Users/udaymukhija/fraud" },
      { label: "Best fit", value: "Applied ML and risk-oriented backend roles" },
    ],
    system: [
      { label: "Data path", value: "IEEE-CIS transaction/identity merge with raw and processed contracts" },
      { label: "Protocol", value: "Separate chronological model fitting, calibration, threshold selection, and final test reporting under train_calibration_test_v1" },
      { label: "Decisioning", value: "Platt calibration plus threshold 0.0700 selected from $10 false-positive and $100 false-negative costs" },
      { label: "Serving", value: "FastAPI loads deploy bundle with model, feature pipeline, schema, operating point, metadata, manifest, and browser console" },
    ],
    evidenceNote:
      "Fraud is compelling because the repo exposes uncomfortable operational evidence too: CatBoost is the offline challenger leader, drift is visible, and hosted latency should not be claimed without a fresh deployed benchmark.",
    highlights: [
      "Separated model fitting, calibration, threshold selection, and final test reporting on chronological slices.",
      "Selected threshold 0.0700 from explicit cost assumptions rather than a default 0.5 cutoff.",
      "Packaged model, feature pipeline, schema, operating point, metadata, and manifest into a coherent deploy bundle.",
      "Kept calibration, challenger, drift, monitoring, proof-pack, and business readout evidence visible, including a stronger CatBoost offline result.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "The product is a fraud review service, not just a classifier. It needs risk scores, reasons, thresholds, latency metadata, monitoring, and evidence for why a transaction was flagged.",
          "The business readout matters because fraud decisions trade off caught fraud against customer friction; the shipped threshold catches about 57.9% of fraud with about 5.6% customer friction under the README's assumptions.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The system demonstrates chronology-safe evaluation, feature contracts, calibration, cost-based thresholding, bundle-based serving, drift checks, and proof-pack generation.",
          "The API serves single and batch predictions, health, metrics, model info, demo summary, and a browser console from the checked-in bundle. Render config exists for permanent hosting; Cloudflare Tunnel is only an ephemeral screen-share path.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would show the latest shipped snapshot and business readout, then inspect the deploy bundle and one `/predict` response.",
          "The honest claim is production-shaped ML engineering. It is not a live fraud product, and the drift/challenger evidence should be discussed rather than buried.",
        ],
      },
    ],
    stack: ["Python", "LightGBM", "FastAPI", "Optuna", "MLflow", "Prometheus", "Grafana"],
    links: [],
    featured: true,
    flagship: true,
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "product", label: "Products" },
  { id: "data", label: "Data Engineering" },
  { id: "ml", label: "AI / ML" },
] as const;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
