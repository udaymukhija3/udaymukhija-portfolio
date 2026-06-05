export const resumeHref = process.env.NEXT_PUBLIC_RESUME_URL || "/resume";

export const skills = [
  "Java",
  "Spring Boot",
  "Go",
  "FastAPI",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "WebSocket",
  "REST APIs",
  "JPA/Hibernate",
  "JWT Auth",
  "ACID transactions",
  "Caching",
  "Rate limiting",
  "Docker",
  "AWS",
  "Python",
];

export const snapshotItems = [
  { label: "Focus", value: "Backend and distributed systems" },
  { label: "Main stack", value: "Java, Spring Boot, Go, FastAPI, PostgreSQL, Redis" },
  { label: "Strengths", value: "APIs, transactions, caching, event-driven flows" },
  { label: "Learning now", value: "CI/CD, observability, integration testing, cloud deployment" },
  { label: "Best proof", value: "Gathr, Habit Tracker Social, Inventory Management" },
  { label: "Based in", value: "India" },
];

export const aboutBlurb =
  "If you're skimming, start with these. They show how I think about backend boundaries, transactional consistency, realtime behavior, and product systems.";

export const pillarCards = [
  {
    title: "Backend",
    body:
      "Java and Spring Boot services, API boundaries, transactional state, realtime flows, caching, and event-driven systems.",
    links: [
      { label: "Gathr", href: "/projects/gathr" },
      { label: "Habit Tracker Social", href: "/projects/habit-tracker-social" },
      { label: "Inventory Management", href: "/projects/inventory-analytics-platform" },
    ],
  },
  {
    title: "Currently sharpening",
    body:
      "CI/CD, observability, integration testing, cloud deployment, message-driven services, and system design.",
    links: [
      { label: "Inventory Management", href: "/projects/inventory-analytics-platform" },
      { label: "Gathr", href: "/projects/gathr" },
    ],
  },
];

export const workPrinciples = [
  {
    title: "Keep the contract clear",
    body: "I prefer explicit APIs, simple state transitions, and systems that are easy to reason about under failure.",
  },
  {
    title: "Make correctness visible",
    body:
      "For backend work, I care about transaction boundaries, cache behavior, retries, rate limits, and observability hooks.",
  },
];

export const contactLinks = [
  { label: "Email", href: "mailto:udaymukhija3@gmail.com" },
  { label: "GitHub", href: "https://github.com/udaymukhija3" },
  { label: "LinkedIn", href: "https://linkedin.com/in/udaymukhija" },
  { label: "Resume", href: resumeHref },
];
