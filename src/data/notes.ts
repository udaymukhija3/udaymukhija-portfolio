export const notesIntro = {
  eyebrow: "Notes",
  title: "A small place for what I am interested in, reading, and working on",
  summary:
    "This is meant to be lighter than the case studies. It is where I can show curiosity, current focus, and the kinds of systems or ideas I keep returning to.",
};

export const noteEntries = [
  {
    slug: "interests",
    eyebrow: "Current interests",
    title: "What I keep circling back to",
    summary:
      "I keep coming back to the same class of problems: service boundaries that stay clean over time, event-driven systems that are replayable, and ML workflows that are easier to trust because the evaluation path is honest.",
    items: [
      "Spring Boot service design that stays understandable as the product gets messier",
      "Feature contracts, temporal validation, and serving boundaries in ML systems",
      "The places where product behavior and backend architecture shape each other",
    ],
  },
  {
    slug: "reading",
    eyebrow: "Currently reading",
    title: "What I am reading right now",
    summary:
      "Mostly long-form writing and technical material on backend system design, ranking and recommendation loops, evaluation discipline, and the operational side of ML.",
    items: [
      "System design writing on contracts, failure modes, and event-driven architectures",
      "ML systems material on calibration, leakage control, and training-serving parity",
      "Product and engineering essays that sharpen prioritization and technical judgment",
    ],
  },
  {
    slug: "working-on",
    eyebrow: "Working on now",
    title: "What I am actively tightening",
    summary:
      "Right now I am pushing the portfolio toward a cleaner story: Core Java backend engineering on one side, ML systems thinking and implementation on the other.",
    items: [
      "Making the strongest backend case studies easier to scan and defend",
      "Improving the proof layer around ML-system-heavy projects",
      "Keeping a place on the site for lighter notes that do not belong inside project writeups",
    ],
  },
];
