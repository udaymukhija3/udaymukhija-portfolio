export const resumeSummary = {
  eyebrow: "Resume",
  title: "Backend-focused software engineer building distributed systems",
  intro:
    "I work with Spring Boot, Go, FastAPI, PostgreSQL, Redis, Kafka, and WebSocket. The strongest signal is backend architecture: scalable API design, transactional consistency, caching, event-driven flows, and production-shaped infrastructure.",
  note: "Open to backend, platform, and data-intensive software engineering roles.",
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
    title: "Gathr",
    href: "/projects/gathr",
    summary: "Spring Boot social activity backend with PostgreSQL, Redis, WebSocket chat, feed ranking, matching, rewards, and reliability scoring.",
    bullets: [
      "Architected 16 backend subsystems including auth, feed ranking, reliability scoring, matching, messaging, rewards, and behavioral logging.",
      "Built realtime group chat, commitment mechanics, identity masking, confirmation windows, cancellation penalties, and transparent trust scoring.",
    ],
  },
  {
    title: "Habit Tracker Social",
    href: "/projects/habit-tracker-social",
    summary: "Spring Boot and React Native habit platform with JWT auth, WebSocket notifications, streak logic, Redis, PostgreSQL, and MongoDB.",
    bullets: [
      "Built 14 subsystems, 26 REST controllers, JWT refresh token rotation, and multi-database storage across PostgreSQL, Redis, and MongoDB.",
      "Implemented timezone-aware streak calculations, optimistic locking with @Version, and tiered Bucket4j/Caffeine rate limiting.",
    ],
  },
  {
    title: "Inventory Management System",
    href: "/projects/inventory-analytics-platform",
    summary: "Distributed inventory platform with Spring Boot, Kafka, Flink, Redis, PostgreSQL, transactional workflows, and anomaly DAGs.",
    bullets: [
      "Architected 4 microservices, 40+ REST endpoints, Kafka event streaming, and PostgreSQL-backed transactional inventory workflows.",
      "Implemented pessimistic locking, retry handling, cache-aside Redis reads, targeted invalidation, velocity scoring, and Airflow anomaly detection.",
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
