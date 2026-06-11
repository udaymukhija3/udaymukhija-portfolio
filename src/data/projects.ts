import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "gathrly",
    title: "Gathrly",
    label: "Social Activity Platform",
    status: "Public repo",
    category: "product",
    year: "2026",
    summary:
      "A neighborhood activity app with a Spring Boot backend, Expo mobile app, static web demo, feed ranking, realtime chat, reliability scoring, and privacy/safety flows.",
    description:
      "Gathrly helps people find small-group activities nearby: pick a hub, browse what is happening, join, chat, confirm, check in, and leave a Drop afterward. Technically it demonstrates a backend-heavy social product: Spring Boot, Postgres, Redis, Flyway, WebSocket chat, OTP auth, feed ranking, reliability mechanics, privacy export/delete, and launch-mode feature gates.",
    metrics: [
      { label: "Backend", value: "Spring Boot" },
      { label: "Mobile", value: "Expo RN" },
      { label: "Realtime", value: "STOMP WS" },
      { label: "Proof path", value: "Demo + API" },
    ],
    facts: [
      { label: "Scope", value: "Neighborhood activity product with mobile, backend, and static demo" },
      { label: "Role", value: "Backend architecture, product logic, trust/safety, mobile integration" },
      { label: "Status", value: "Public repo with local and cloud-friendly demo paths" },
      { label: "Proof", value: "Local repo README, LaunchManifest, web demo, backend API docs" },
      { label: "Local source", value: "/Users/udaymukhija/gathr-slice2-complete" },
      { label: "Best fit", value: "Backend product systems and social-platform roles" },
    ],
    system: [
      { label: "Product loop", value: "Hub selection, feed browse, activity join, group chat, confirmation, check-in, post-meet Drop" },
      { label: "Backend", value: "Spring Boot 3.2, Java 17, PostgreSQL, Flyway, Redis, Caffeine, JWT refresh rotation" },
      { label: "Realtime", value: "Activity-scoped STOMP/SockJS chat with fallback, typing, presence, rate limits, idempotent client message IDs" },
      { label: "Trust", value: "Reliability score, confirmation windows, no-show penalties, safety reports, privacy export and deletion" },
    ],
    evidenceNote:
      "The local repo is strongest as a backend product-systems sample: domain lifecycle, reliability logic, realtime chat, privacy flows, and a shareable static web demo.",
    highlights: [
      "Built the activity lifecycle from discovery to attendance, including feed sections, join/leave, confirmation, check-in, completion, feedback, and Drops.",
      "Modeled reliability as backend state with human-readable blocking reasons rather than simple UI messaging.",
      "Implemented realtime activity chat with WebSocket delivery paths, typing/presence, rate limiting, and blocked-user filtering.",
      "Kept the alpha honest with a static web demo, demo-mode backend deploy, and feature flags separating v1 surfaces from staged roadmap work.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Gathrly is about getting people from intent to actually showing up. The product loop is deliberately concrete: choose a neighborhood hub, find an activity, join a small group, chat, confirm, check in, and keep a lightweight memory afterward.",
          "The interesting product work is trust. Reliability, cancellation penalties, safety reports, blocked users, and privacy export/delete are treated as part of the core experience, not as future admin polish.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The backend demonstrates API boundaries, lifecycle state, transactional persistence, Flyway migrations, Redis-backed operational paths, Caffeine caching, JWT refresh rotation, and WebSocket chat.",
          "The repo also contains ML/recommendation substrate behind feature flags, but the honest alpha story is heuristic ranking plus event capture, not a trained production recommendation model.",
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
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Flyway", "WebSocket", "React Native"],
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
      "A daily word-grouping game where a Go backend owns the answer key, attempt state, idempotent guesses, puzzle publishing, moderation, analytics, and observability.",
    description:
      "VibeGrid is a daily semantic grouping puzzle: 16 tiles, 4 hidden categories, 4 mistakes, and spoiler-safe sharing. It demonstrates product-grade game state in Go: server-authoritative guesses, guest sessions, Postgres row locking, embedded migrations, public puzzle creation, admin publishing, moderation, analytics, health checks, metrics, and a static Next.js frontend served by the Go binary.",
    metrics: [
      { label: "Runtime", value: "One Go binary" },
      { label: "Guess safety", value: "Idempotent" },
      { label: "Storage", value: "Postgres/memory" },
      { label: "Ops", value: "Health + metrics" },
    ],
    facts: [
      { label: "Scope", value: "Daily puzzle product with backend-owned rules and publishing tools" },
      { label: "Role", value: "Go API, game rules, data model, Next.js UI, moderation/admin flow" },
      { label: "Status", value: "Public repo; demo-ready locally, permanent hosting not claimed" },
      { label: "Proof", value: "README, Go tests, migrations, smoke script, deployment docs" },
      { label: "Local source", value: "/Users/udaymukhija/Vibegrid" },
      { label: "Best fit", value: "Backend/product roles with correctness-heavy state" },
    ],
    system: [
      { label: "Game loop", value: "Daily puzzle, archive, user-created puzzle links, share payload, admin editor desk" },
      { label: "Rules", value: "Go API validates guesses and reveals only solved groups; group membership never ships to the browser" },
      { label: "Persistence", value: "Guest sessions, Postgres attempts and guesses, row locks, unique client guess IDs, in-memory fallback" },
      { label: "Operations", value: "Embedded static frontend, goose migrations, /healthz, /readyz, /metrics, structured logs, alert/dashboard starters" },
    ],
    evidenceNote:
      "This is a strong small-product backend sample because answer secrecy, idempotency, concurrency, admin publishing, moderation, and ops are all visible in the local repo.",
    highlights: [
      "Kept answer metadata server-side and made every guess pass through the Go rules engine.",
      "Used row locking plus client guess IDs so double clicks and retries do not corrupt attempt state.",
      "Built public puzzle creation and admin publishing instead of stopping at one static daily puzzle.",
      "Added moderation reports, SQL-derived game analytics, health/readiness endpoints, metrics, and deployment scaffolding.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "VibeGrid is a compact daily game, but it has the product surfaces that make it feel real: daily play, archive, share results, creator links, admin publishing, community reports, and policy pages.",
          "The product value is not just a puzzle screen. It is a repeatable puzzle operation with guest-first play and a path for community-created content.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The Go backend owns the important invariants: answer secrecy, attempts, guesses, completion, mistakes, sessions, publishing, moderation, and dynamic OG images.",
          "The durable path uses Postgres with migrations and transactional attempt updates, while the in-memory store keeps local demos frictionless.",
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
      "A private short-voice app with a Next.js client, Go API, magic-link auth, rooms, invites, media upload/playback, reactions, nudges, metrics, and deployment scaffolding.",
    description:
      "Murmur is a private voice-note product for close people. The MVP demonstrates a Go-backed product loop: sign in, create a room, invite someone, record up to 90 seconds, upload audio, play it back, react, mark heard state, and inspect loop-health metrics. It includes membership checks, server-side media duration validation, local and S3/R2 media paths, Web Push settings, and production startup guardrails.",
    metrics: [
      { label: "Voice cap", value: "90 seconds" },
      { label: "Auth", value: "Magic link" },
      { label: "Backend", value: "Go API" },
      { label: "Media", value: "Local + S3/R2" },
    ],
    facts: [
      { label: "Scope", value: "Private room-based voice MVP" },
      { label: "Role", value: "Go API, auth, access control, media flow, product UI" },
      { label: "Status", value: "Public repo with beta-quality local slice" },
      { label: "Proof", value: "README, VERIFY.md, Go service tests, deployment docs" },
      { label: "Local source", value: "/Users/udaymukhija/Murmur" },
      { label: "Best fit", value: "Backend/product roles around private media and access control" },
    ],
    system: [
      { label: "Product loop", value: "Magic-link sign-in, private room, invite, record, upload, play, react, nudge" },
      { label: "Backend", value: "Go net/http API with pgx, SQL migrations, sessions, events, notifications, metrics" },
      { label: "Privacy", value: "Room membership gates every room and murmur endpoint; production media redirects to short-lived signed URLs" },
      { label: "Deployment", value: "Next.js on Vercel, Go API on Render, managed Postgres, Resend, private S3/R2 media" },
    ],
    evidenceNote:
      "The local repo shows real product constraints: auth, private membership, media validation, playback state, reactions, metrics, and production guardrails.",
    highlights: [
      "Built the narrow private voice loop instead of a broad public audio feed.",
      "Made the Go API authoritative for sessions, room membership, invite acceptance, murmur creation, playback, and reactions.",
      "Verified media duration server-side so clients cannot bypass the length cap by lying about metadata.",
      "Added Web Push settings, nudge policy plumbing, loop-health metrics, and Prometheus-style operational metrics.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Murmur is intentionally small: it is for private voice moments between close people, not podcasts, public feeds, or long recordings.",
          "That clarity shapes the product decisions. Rooms are invite-only, the latest murmur matters, and the experience optimizes for a quick private ritual rather than endless chat.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The Go API owns auth, access control, media ingestion, room state, events, notifications, and metrics. The Next app is the UI shell and public origin.",
          "The repo includes local file-backed media for development and a production media path using private object storage plus presigned URLs.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would demo the two-person flow, then discuss the backend decisions: magic-link sessions, membership checks, invite tokens, duration validation, media serving, and deployment constraints.",
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
      "An operator-facing D2C support dashboard where a Go worker classifies tickets, retrieves context, applies deterministic rules, drafts a resolution, and waits for human approval.",
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
      "A web-first multiplayer fill-in-the-blank party game with a Go WebSocket engine, server-authoritative rooms, rotating judges, timers, redacted hands, reconnects, and single-container deploy support.",
    description:
      "Punchline is a live party game: host a room, share a four-letter code, join from phones, answer a prompt, let a rotating judge pick the funniest submission, and play to a score limit. Technically it demonstrates a server-authoritative realtime game loop in Go, a mobile-first Vite/React client, WebSocket snapshots redacted per viewer, auto-reconnect, AFK-safe timers, backend tests, Docker packaging, and a Fly.io single-instance deployment plan.",
    metrics: [
      { label: "Room code", value: "4 letters" },
      { label: "Transport", value: "WebSocket" },
      { label: "Runtime", value: "Single binary" },
      { label: "Scale note", value: "1 instance" },
    ],
    facts: [
      { label: "Scope", value: "Live multiplayer party game engine" },
      { label: "Role", value: "Go game engine, WebSocket protocol, React client, deployment shape" },
      { label: "Status", value: "Local v0 project; room state in memory" },
      { label: "Proof", value: "README, Go tests, Dockerfile, Fly config, seed cards" },
      { label: "Local source", value: "/Users/udaymukhija/punchline_codebase" },
      { label: "Best fit", value: "Realtime backend and product engineering roles" },
    ],
    system: [
      { label: "Gameplay", value: "Host room, guest join, judge rotates, answer cards submit blind, reveal, pick winner, score to limit" },
      { label: "Backend", value: "Go API plus WebSocket engine; server pushes room_state snapshots to connected players" },
      { label: "Fairness", value: "Viewer-specific redaction: only your own hand is visible, submissions stay hidden until reveal, authors hidden during judging" },
      { label: "Deployment", value: "Multi-stage Docker image serves API, WebSocket, and UI; must run single instance until state moves to Redis/Postgres" },
    ],
    evidenceNote:
      "Punchline is a clean realtime systems sample: authoritative state, WebSocket fanout, redacted snapshots, reconnect behavior, timers, and explicit scaling limits.",
    highlights: [
      "Built the live room loop with create, join, start, submit, reveal, pick winner, next round, end game, and play again messages.",
      "Kept game state server-authoritative so reconnects and refreshes recover from the room snapshot.",
      "Redacted room state per viewer to protect hands and preserve anonymous judging.",
      "Documented the real v0 limitation: in-memory rooms require a single running instance until a shared store is added.",
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
          "The local v0 is intentionally single-instance because rooms are in memory. That is not hidden; the README calls it out and leaves Postgres/Redis migrations as the next durability step.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would demo it with two browser windows, then explain redaction, judge rotation, timers, reconnects, and why scaling realtime room state needs a shared backend.",
          "The strongest signal is honest realtime engineering rather than a polished static game mockup.",
        ],
      },
    ],
    stack: ["Go", "WebSocket", "React", "Vite", "Docker", "Fly.io", "PostgreSQL planned"],
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
      "A daily market-decision game backed by a Bayesian inference engine, procedural puzzle generation, semantic validation, Prisma/Postgres attempts, analytics, rate limiting, and tests.",
    description:
      "Mini Market is a daily decision-quality game. Players read a binary contract, weigh noisy signals against the quoted price, choose buy/sell/pass, set confidence, and learn the fair value and expected value afterward. Technically it demonstrates a typed domain engine: Bayesian posterior calculation, procedural puzzle generation, semantic answer-key validation, attempts, archive, stats, analytics, share payloads, Prisma/Postgres persistence, in-memory local fallback, and Vitest coverage.",
    metrics: [
      { label: "Engine", value: "Bayesian" },
      { label: "Actions", value: "Buy/Sell/Pass" },
      { label: "Persistence", value: "Prisma/Postgres" },
      { label: "Tests", value: "Domain + API" },
    ],
    facts: [
      { label: "Scope", value: "Daily market-decision puzzle with explainable scoring" },
      { label: "Role", value: "Domain model, scoring engine, generator, API routes, product UI" },
      { label: "Status", value: "Public repo with local zero-setup fallback" },
      { label: "Proof", value: "README, tests, puzzle validator, Prisma schema, CI commands" },
      { label: "Local source", value: "/Users/udaymukhija/MiniMarket" },
      { label: "Best fit", value: "Product engineering roles with domain modeling" },
    ],
    system: [
      { label: "Product loop", value: "Daily contract, noisy signals, quoted price, buy/sell/pass decision, confidence, fair-value reveal" },
      { label: "Engine", value: "Closed-form posterior from prior and likelihood ratios, cross-checked with Monte Carlo tests" },
      { label: "Generator", value: "Procedural puzzles where difficulty, fair value, expected value, and explanation come from the model" },
      { label: "Persistence", value: "Prisma/Postgres attempts when configured; in-memory attempt store for local development" },
    ],
    evidenceNote:
      "Mini Market is strongest as a domain-engine project: the answer key is derived from a model, validated independently, and covered by tests.",
    highlights: [
      "Built a market-decision game around expected value and confidence instead of a generic trivia score.",
      "Derived puzzle answers from an explicit Bayesian model and cross-checked the math with Monte Carlo tests.",
      "Added procedural generation plus semantic validation so explanations are generated from the same engine as the answer.",
      "Implemented daily/archive routes, attempts, stats, analytics, sharing, rate limiting, and Prisma-backed persistence.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Mini Market teaches decision quality. The player is not rewarded for guessing a hidden fact alone; they are judged on whether they found the edge and sized confidence appropriately.",
          "The daily format gives it a small repeatable loop, while the reveal explains fair value and expected value in plain terms.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The engine computes posterior probability, fair value, expected value, and best action from explicit inputs. Puzzle generation samples scenarios and then asks the same engine to derive the answer.",
          "That matters because the game is not hand-waving the answer key. Tests can re-derive it and fail when content disagrees with the model.",
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
    status: "Local scaffold",
    category: "product",
    year: "2026",
    summary:
      "A voice-to-card web MVP scaffold with a Next.js recorder, Go API, Postgres persistence, idempotent recording creation, mock transcription/structuring, and provider seams.",
    description:
      "Ramble turns 30-90 seconds of messy speech into a title, summary, key points, tasks, tags, and a saved card. The local repo is honest about being a scaffold: the product loop runs with mock transcription and structuring, while Go provider seams allow Sarvam or another speech-to-text provider to replace the mock path later. It demonstrates clean backend boundaries for media capture, recordings, cards, tasks, search, edit, copy, delete, and provider integration.",
    metrics: [
      { label: "Modes", value: "Note/Task/Message" },
      { label: "Backend", value: "Go API" },
      { label: "Providers", value: "Mock + Sarvam seam" },
      { label: "Storage", value: "Postgres + disk" },
    ],
    facts: [
      { label: "Scope", value: "Voice note to structured card scaffold" },
      { label: "Role", value: "Product scope, Go API, data model, provider seams, frontend loop" },
      { label: "Status", value: "Local scaffold, not a finished MVP" },
      { label: "Proof", value: "README, product docs, Go build/test scripts, provider seam" },
      { label: "Local source", value: "/Users/udaymukhija/Ramble" },
      { label: "Best fit", value: "Backend/product roles involving async media and AI providers" },
    ],
    system: [
      { label: "Capture", value: "Record or upload short audio in the Next.js frontend" },
      { label: "Backend", value: "Go net/http API for recordings, cards, status, search, edit, and delete" },
      { label: "Processing", value: "Mock transcription and structuring now; Sarvam STT seam documented for real audio" },
      { label: "Persistence", value: "Postgres users, recordings, cards, tasks, plus local disk audio storage for dev" },
    ],
    evidenceNote:
      "Ramble is best framed as a scaffold with good boundaries: capture, idempotent recording creation, provider seams, card persistence, and search.",
    highlights: [
      "Locked v1 to three modes so the product does not sprawl into a broad assistant.",
      "Built the backend in Go around recordings, cards, status, and search before wiring paid providers.",
      "Kept transcription and structuring swappable through provider interfaces.",
      "Documented the follow-up path for real STT, queues, retries, auth, privacy controls, and provider-quality eval fixtures.",
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
          "Mock providers make the loop runnable, while the Sarvam seam documents how real code-mixed speech transcription slots in.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would be explicit that this is a scaffold. The value is the product boundary, data model, idempotent recording creation, and provider seam.",
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
    status: "Local scaffold",
    category: "product",
    year: "2026",
    summary:
      "A wardrobe purchase decision scaffold that scores whether a candidate item unlocks useful outfits against an existing closet, with explainable Buy/Wait/Skip verdicts.",
    description:
      "ClosetDelta asks one shopping question: does this new clothing item add useful outfits to what I already own? The scaffold demonstrates an explainable decision engine rather than a generic stylist. It uses manual wardrobe metadata, compatibility tables, rule-based scoring, redundancy checks, outfit-unlock logic, saved purchase analyses, a planned Prisma model, and focused tests around the scoring layer.",
    metrics: [
      { label: "Verdicts", value: "Buy/Wait/Skip" },
      { label: "Scoring", value: "Rule-based" },
      { label: "Inputs", value: "Wardrobe + item" },
      { label: "Tests", value: "Scoring layer" },
    ],
    facts: [
      { label: "Scope", value: "Wardrobe purchase decision scaffold" },
      { label: "Role", value: "Product scope, scoring model, UI components, API shape" },
      { label: "Status", value: "Local scaffold" },
      { label: "Proof", value: "README, docs, Prisma schema, scoring tests" },
      { label: "Local source", value: "/Users/udaymukhija/Closet" },
      { label: "Best fit", value: "Product engineering roles with explainable decision logic" },
    ],
    system: [
      { label: "Inputs", value: "Manual wardrobe metadata plus candidate item upload or URL" },
      { label: "Scoring", value: "Category compatibility, color fit, season overlap, formality distance, redundancy, outfit unlocks" },
      { label: "Output", value: "Buy, Wait, or Skip verdict with score breakdown and explanations" },
      { label: "Persistence", value: "Prisma model for wardrobe, candidates, analyses, and snapshot-hash idempotency" },
    ],
    evidenceNote:
      "ClosetDelta is early, but the product boundary is crisp: explainable outfit-unlock scoring before computer vision or marketplace features.",
    highlights: [
      "Scoped the MVP to one decision instead of a broad closet-management app.",
      "Started with manual metadata and transparent rules so verdicts can be inspected and debugged.",
      "Separated wardrobe state, candidate analysis, score breakdown, outfit unlocks, and history.",
      "Deferred computer vision, marketplace, native mobile, and generic AI styling until the core decision engine works.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "ClosetDelta is for the moment before buying clothes, not for managing every outfit forever.",
          "The product asks whether a new item is additive or redundant, then explains the verdict in terms the user can inspect.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The useful technical work is the scoring layer: compatibility, redundancy, seasonality, formality, and outfit unlocks.",
          "The scaffold keeps persistence and idempotency in view through the Prisma model and wardrobe snapshot hash, even though the app is still early.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would present ClosetDelta as a product-thinking and explainability sample rather than a finished AI fashion app.",
          "That framing is stronger because the current repo proves the decision logic, not computer vision accuracy.",
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
    status: "Public repo; pre-MVP",
    category: "product",
    year: "2026",
    summary:
      "A Spring Boot and React expense archive prototype for uploading receipts, running async OCR, reviewing extracted fields, categorizing spend, searching records, and exporting CSV.",
    description:
      "Receipt Scanner is a private archive for receipts, invoices, and payment screenshots. It is not framed as a finished OCR product: the local README says the build and demo are not currently green. What it demonstrates today is a substantial backend foundation for a personal expense archive: JWT auth, per-user ownership, Flyway schema, file validation, S3/MinIO storage, async processing, mock Google Vision fallback, rule-based parsing, status transitions, category analytics, and a React/Vite frontend.",
    metrics: [
      { label: "Backend", value: "Spring Boot 3.4" },
      { label: "Java", value: "21" },
      { label: "Storage", value: "MinIO/S3" },
      { label: "Status", value: "Pre-MVP" },
    ],
    facts: [
      { label: "Scope", value: "Private receipt and expense archive prototype" },
      { label: "Role", value: "Backend architecture, async OCR flow, auth, frontend shell" },
      { label: "Status", value: "Pre-MVP with known build/demo blockers" },
      { label: "Proof", value: "README, docs/ROADMAP.md, Flyway migrations, backend services" },
      { label: "Local source", value: "/Users/udaymukhija/receipt_scanner" },
      { label: "Best fit", value: "Backend roles where honest stabilization planning matters" },
    ],
    system: [
      { label: "Target loop", value: "Register, upload receipt image, extract fields, review/correct, categorize, search, summarize, export CSV" },
      { label: "Pipeline", value: "Upload stores file, saves PENDING receipt, triggers async OCR/parsing, writes COMPLETED/NEEDS_REVIEW/FAILED" },
      { label: "Backend", value: "Spring Boot, PostgreSQL, Flyway, JWT, S3-compatible storage, Google Vision mock fallback, Tika validation" },
      { label: "Boundary", value: "Experimental LayoutLM FastAPI scaffold exists but is not wired into the runtime and should not be claimed as shipped ML" },
    ],
    evidenceNote:
      "Receipt Scanner should be framed carefully: promising backend architecture and roadmap, but explicitly pre-MVP with known local blockers.",
    highlights: [
      "Built the intended async ingestion shape: immediate upload acknowledgement, background OCR/parsing, and review-needed status for low-confidence extraction.",
      "Added JWT auth, per-user data ownership, Flyway migrations, file validation, MinIO/S3-compatible storage, and category analytics foundations.",
      "Kept OCR replaceable with a mock fallback for local development rather than requiring Google Vision credentials.",
      "Documented the stabilization work honestly: build fixes, S3 config cleanup, and frontend auth wiring before end-to-end demo claims.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "Receipt Scanner is meant to become a corrected, searchable archive of personal spending proof. OCR is infrastructure, not the product itself.",
          "The useful user loop is upload, extract, review, correct, categorize, search, summarize, and export.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The backend shape is a modular Spring Boot app with auth, storage, validation, background processing, OCR abstraction, parsing, statuses, and analytics.",
          "The current repo is not green end to end, so the technical story should be about architecture and stabilization rather than production readiness.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would present this as a pre-MVP prototype with clear Release 0 work, not as a polished deployed scanner.",
          "That honesty helps: it shows judgment about what is built, what is broken, and why custom ML is deferred until user corrections exist.",
        ],
      },
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "MinIO/S3", "React", "Vite"],
    links: [{ label: "GitHub repo", href: "https://github.com/udaymukhija3/receipt_scanner" }],
    featured: false,
  },
  {
    slug: "logistics-data-engineering",
    title: "Logistics Data Engineering",
    label: "Data Platform",
    status: "Public repo",
    category: "data",
    year: "2026",
    summary:
      "A logistics lakehouse demo with generated fleet, shipment, and last-mile events, DuckDB/dbt marts, quality reports, Streamlit dashboard, and optional Kafka/Spark/Airflow depth.",
    description:
      "Logistics Data Engineering is a local data-platform project for fleet tracking, shipment SLAs, and last-mile operations. It demonstrates a verified sample path from generated parquet to DuckDB source views to dbt marts to quality reports to Streamlit, plus a deeper architecture path with simulators, Kafka, Spark, Airflow, and customer-mode CSV/Parquet ingestion.",
    metrics: [
      { label: "Demo data", value: "500 shipments" },
      { label: "Fleet", value: "30 vehicles" },
      { label: "Ops", value: "60 shifts" },
      { label: "Verified path", value: "DuckDB/dbt" },
    ],
    facts: [
      { label: "Scope", value: "Logistics data platform and operator dashboard" },
      { label: "Role", value: "Pipeline design, dbt marts, quality checks, dashboard, deploy page" },
      { label: "Status", value: "Public repo with local and Vercel/HF demo paths" },
      { label: "Proof", value: "README, Makefile demo path, dbt project, quality reports, Streamlit app" },
      { label: "Local source", value: "/Users/udaymukhija/logistics" },
      { label: "Best fit", value: "Data engineering and analytics platform roles" },
    ],
    system: [
      { label: "Domains", value: "Fleet telematics, shipment tracking, last-mile delivery execution" },
      { label: "Verified path", value: "Sample parquet -> DuckDB source views -> dbt marts -> quality reports -> Streamlit" },
      { label: "Marts", value: "Trip reconstruction, shipment journeys, agent/zone daily facts, dashboard-ready counts and KPIs" },
      { label: "Depth path", value: "Simulators, Kafka, Spark Bronze/Silver layers, Airflow DAG, customer batch dropzone" },
    ],
    evidenceNote:
      "The local repo is useful because it separates the verified DuckDB/dbt demo path from the heavier streaming architecture path.",
    highlights: [
      "Modeled three related logistics domains instead of one synthetic stream.",
      "Built a simple proof path that runs without Docker-heavy infrastructure: generate sample data, build marts, run quality checks, open Streamlit.",
      "Added a recruiter-facing Vercel page that embeds the running dashboard and explains the data flow.",
      "Kept Kafka, Spark, and Airflow as deeper architecture options rather than pretending the whole stack is required for the first demo.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "The product story is a small logistics control tower. Operators want to understand trips, shipment journeys, delivery attempts, agent shifts, and data quality.",
          "The dashboard reads built artifacts rather than hand-coded marketing numbers, so the demo ties back to generated events and marts.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The verified path is intentionally pragmatic: sample parquet, DuckDB source views, dbt models/tests, JSON quality reports, and Streamlit.",
          "The deeper path shows how the same domain could expand into simulators, Kafka topics, Spark processing, and Airflow orchestration.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would start with the dashboard and then trace one metric backward through dbt and source data.",
          "The honest boundary is that the local sample path is the strongest proof; the streaming stack is architecture depth unless freshly run end to end.",
        ],
      },
    ],
    stack: ["Python", "DuckDB", "dbt", "Streamlit", "Kafka", "Spark", "Airflow"],
    links: [
      { label: "GitHub repo", href: "https://github.com/udaymukhija3/logistics-data-engineering" },
      { label: "Demo page", href: "https://logistics-data-engineering.vercel.app/" },
    ],
    featured: true,
    flagship: true,
  },
  {
    slug: "inventory-management-sys",
    title: "Inventory Management System",
    label: "Inventory Data Platform",
    status: "Public repo",
    category: "data",
    year: "2026",
    summary:
      "An inventory operations service plus data-engineering spine: Spring Boot writes, transactional outbox, Kafka, idempotent Python ETL, Redis, FastAPI analytics, frontend monitor, and stockout backtest gate.",
    description:
      "Inventory Management System is an operational inventory backend with a data platform attached. Every write flows through a transactional outbox into Kafka, a Python ETL pipeline materializes analytics into Postgres/Redis/Parquet, FastAPI serves metrics, and a frontend monitor shows run status. The project defends a business metric with a stockout-prevention backtest and CI gate rather than only CRUD endpoints.",
    metrics: [
      { label: "Backtest gate", value: "60% recall" },
      { label: "Event path", value: "Outbox -> Kafka" },
      { label: "Serving", value: "FastAPI + Redis" },
      { label: "Proof", value: "make demo" },
    ],
    facts: [
      { label: "Scope", value: "Inventory operations service plus analytics pipeline" },
      { label: "Role", value: "Backend services, event flow, ETL, analytics API, demo proof artifacts" },
      { label: "Status", value: "Public repo with supported local demo path" },
      { label: "Proof", value: "README, make demo, artifacts/demo, backtest harness, Docker Compose" },
      { label: "Local source", value: "/Users/udaymukhija/inventory_management_sys" },
      { label: "Best fit", value: "Backend, data platform, and distributed-systems roles" },
    ],
    system: [
      { label: "Operational path", value: "Spring Boot inventory-service handles products, warehouses, adjustments, reservations, sales, receipts" },
      { label: "Event path", value: "Transactional outbox writes in same DB transaction, relay publishes to Kafka with retry/give-up behavior" },
      { label: "Analytics path", value: "Python ETL writes current metrics, metric history, Redis hot reads, Parquet manifests, and data quality runs" },
      { label: "Decision path", value: "Stockout-prevention backtest records recall, precision, estimated dollars saved, and fails CI below threshold" },
    ],
    evidenceNote:
      "This repo has one of the clearest proof paths: `make demo` produces API, DB, Redis, Parquet, and summary artifacts for the supported stack.",
    highlights: [
      "Built the supported local path around inventory-service, data-pipeline-service, analytics-service, frontend, Postgres, Redis, Kafka, Prometheus, and Grafana.",
      "Used a transactional outbox to avoid dual writes between inventory mutations and Kafka publication.",
      "Made the ETL idempotent through processed-event tracking and separated current metrics from metric history.",
      "Added a stockout-prevention backtest so the project has a business metric with recall, precision, and estimated value saved.",
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
          "The analytics service and Redis cache give the project a serving story, while Parquet manifests and DB run tables give it an audit trail.",
        ],
      },
      {
        title: "How I would present it",
        paragraphs: [
          "I would run the supported demo path and inspect the artifacts: before/after inventory, analytics payload, pipeline run, data quality, Redis key, and Parquet output.",
          "The strongest resume angle is not trained forecasting yet; it is event-driven inventory analytics with a deterministic stockout-prevention backtest.",
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
      "An artifact-backed grocery recommender with data contracts, leakage-aware preprocessing, LightGBM/XGBoost rankers, calibration, baseline lift, FastAPI serving, and a browser demo.",
    description:
      "Instacart Reorder Recommender predicts which products a shopper is likely to reorder in the next basket. It demonstrates ML engineering beyond a notebook: raw-data contracts, dataset fingerprints, deterministic splits, point-in-time features, candidate and full-basket evaluation, calibration, thresholding, baseline lift, saved run artifacts, a FastAPI service, monitoring endpoints, and a demo UI backed by artifacts.",
    metrics: [
      { label: "Candidate F1", value: "0.5665" },
      { label: "Basket F1", value: "0.4159" },
      { label: "Lift", value: "1.67x recency" },
      { label: "Products", value: "49,688" },
    ],
    facts: [
      { label: "Scope", value: "Artifact-backed grocery reorder recommender" },
      { label: "Role", value: "Data contracts, feature engineering, model evaluation, serving API" },
      { label: "Status", value: "Local case study with checked-in artifacts" },
      { label: "Proof", value: "README, verify_run_20260304, feature contract, API demo path" },
      { label: "Local source", value: "/Users/udaymukhija/Instacart" },
      { label: "Best fit", value: "Applied ML and backend-adjacent ML systems roles" },
    ],
    system: [
      { label: "Data path", value: "Raw Instacart CSVs, schema checks, referential integrity, deterministic user splits, dataset fingerprints" },
      { label: "Features", value: "User, product, aisle, department, user-product, time, recency, and reorder-history features" },
      { label: "Evaluation", value: "Candidate reorder and full-basket contracts, baseline lift, slice metrics, calibration plots, threshold curves" },
      { label: "Serving", value: "FastAPI loads model, feature schema, processed feature tables, product metadata, monitoring state" },
    ],
    evidenceNote:
      "The strongest proof is the checked-in March 4, 2026 verification run and artifact-backed API path.",
    highlights: [
      "Evaluated candidate ranking separately from full-basket reconstruction so the metrics do not overstate product value.",
      "Saved feature contracts and fingerprints so training and serving can be checked against the same artifact boundary.",
      "Reported LightGBM temporal candidate F1 of 0.5665 and full-basket F1 of 0.4159, plus 1.67x lift over recency.",
      "Exposed recommendations, portfolio evidence, health, monitoring, and latency metadata through FastAPI.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "The product question is straightforward: for a known shopper, which items should appear in a buy-again shelf or smart cart suggestion?",
          "That is a practical recommender surface because grocery buying has rhythm, basket context, and repeated products.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The repo is strongest where many recommender demos are weak: contracts, leakage control, split protocol, evaluation boundaries, calibration, and serving parity.",
          "The FastAPI app loads saved artifacts and returns ranked products with feature-version, request ID, and latency metadata.",
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
      "A production-oriented energy forecasting system with strict feature contracts, two LightGBM models, baseline leaderboards, walk-forward backtests, API/CLI serving, metrics, and monitoring artifacts.",
    description:
      "Enefit Prosumer Forecasting predicts Estonian prosumer consumption and production. It demonstrates leakage-resistant time-series ML engineering: schema-validated ingestion, causal weather and price joins, target-specific LightGBM models, required baselines, feature-contract enforcement across training/API/CLI, walk-forward backtesting, ablations, Prometheus metrics, drift checks, retrain artifacts, and recruiter demo evidence under docs/assets.",
    metrics: [
      { label: "Rows", value: "2.0M+" },
      { label: "Features", value: "106" },
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
      { label: "Data path", value: "Raw Kaggle tables, schema validation, feature layers, lineage reports, causal joins" },
      { label: "Model layer", value: "Separate consumption and production LightGBM artifacts with baseline leaderboards" },
      { label: "Evaluation", value: "Holdout metrics, per-target reports, walk-forward backtests, ablation matrix, robustness report" },
      { label: "Serving", value: "FastAPI and CLI inference reuse the same feature contract and saved production pointers" },
    ],
    evidenceNote:
      "Enefit is a strong ML systems entry because it connects leakage control, artifacts, backtests, serving, and monitoring instead of only reporting model scores.",
    highlights: [
      "Built separate consumption and production model artifacts rather than forcing one target shape.",
      "Used strict feature contracts across training, API inference, and CLI inference.",
      "Generated demo evidence for health, model info, predictions, metrics, OpenAPI, CLI output, training metrics, backtests, monitoring, and error analysis.",
      "Documented limitations around closed-loop evaluation cost, in-memory serving caches, fallback modes, and live-outcome monitoring.",
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
          "The honest boundary is that monitoring artifacts prove scheduled drift/retrain checks, not realized online accuracy from production traffic.",
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
      "A production-shaped IEEE-CIS fraud scorer with chronology-safe splits, feature contracts, calibrated probabilities, cost-aware thresholding, deploy bundles, FastAPI serving, drift checks, and proof artifacts.",
    description:
      "Fraud Detection Platform is built around the operational risks of fraud ML: temporal leakage, train/serve mismatch, arbitrary thresholds, poor calibration, challenger promotion, drift, and serving observability. The checked-in local project merges transaction and identity data, validates contracts, trains a LightGBM artifact, calibrates probability, selects a cost-aware threshold, packages a deploy bundle, serves predictions through FastAPI, and exposes proof packs, drift reports, and challenger benchmarks.",
    metrics: [
      { label: "AUC-ROC", value: "0.8658" },
      { label: "AUC-PR", value: "0.4806" },
      { label: "Threshold", value: "0.0700" },
      { label: "Features", value: "411" },
    ],
    facts: [
      { label: "Scope", value: "Production-shaped fraud scoring system" },
      { label: "Role", value: "Feature path, calibration, thresholding, serving, monitoring artifacts" },
      { label: "Status", value: "Local case study with checked-in raw data and deploy bundle" },
      { label: "Proof", value: "README, evaluation report, deploy bundle, proof pack, drift report" },
      { label: "Local source", value: "/Users/udaymukhija/fraud" },
      { label: "Best fit", value: "Applied ML and risk-oriented backend roles" },
    ],
    system: [
      { label: "Data path", value: "IEEE-CIS transaction/identity merge with raw and processed contracts" },
      { label: "Protocol", value: "Chronological train, calibration, and untouched test slices under train_calibration_test_v1" },
      { label: "Decisioning", value: "Platt calibration plus threshold selected from false-positive and false-negative costs" },
      { label: "Serving", value: "FastAPI loads deploy bundle with model, feature pipeline, schema, operating point, metadata, manifest" },
    ],
    evidenceNote:
      "Fraud is compelling because the repo exposes uncomfortable operational evidence too: challenger results, critical drift, and in-memory enrichment limits.",
    highlights: [
      "Separated model fitting, calibration, threshold selection, and final test reporting on chronological slices.",
      "Selected threshold 0.0700 from explicit cost assumptions rather than a default 0.5 cutoff.",
      "Packaged model, feature pipeline, schema, operating point, metadata, and manifest into a coherent deploy bundle.",
      "Kept challenger and drift reports visible, including a stronger CatBoost offline result and a critical drift report.",
    ],
    sections: [
      {
        title: "Product perspective",
        paragraphs: [
          "The product is a fraud review service, not just a classifier. It needs risk scores, reasons, thresholds, latency metadata, monitoring, and evidence for why a transaction was flagged.",
          "The business readout matters because fraud decisions trade off caught fraud against customer friction.",
        ],
      },
      {
        title: "Technical perspective",
        paragraphs: [
          "The system demonstrates chronology-safe evaluation, feature contracts, calibration, cost-based thresholding, bundle-based serving, drift checks, and proof-pack generation.",
          "The API serves single and batch predictions, health, metrics, model info, demo summary, and a browser console from the checked-in bundle.",
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
  { id: "product", label: "Product Systems" },
  { id: "data", label: "Data Platforms" },
  { id: "ml", label: "ML Systems" },
] as const;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
