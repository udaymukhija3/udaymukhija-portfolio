import { projects } from "./projects";

/* The homepage panel shows three projects. Descriptors and descriptions are
   written for the panel's line lengths; the readout's stack is a named subset
   of the project record and its timeline comes straight from it, so the band
   can never drift from the case study. */
export type PanelProject = {
  id: "gathr" | "vibegrid" | "murmur";
  title: string;
  descriptor: string;
  description: string;
  href: string;
  stack: string[];
  timeline: string;
};

const panelCopy = [
  {
    id: "gathr",
    slug: "gathrly",
    descriptor: "Small-group social planning",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Expo"],
    description:
      "Local plans for two to six people: discover, join, chat, show up. The backend owns state, reliability and safety.",
  },
  {
    id: "vibegrid",
    slug: "vibegrid",
    descriptor: "Daily crew ritual",
    stack: ["Go", "Next.js", "PostgreSQL", "TypeScript"],
    description:
      "Four fragments, one title, once a day. Judge the crew’s cards blind; authors and votes reveal the day after.",
  },
  {
    id: "murmur",
    slug: "murmur",
    descriptor: "Private voice notes",
    stack: ["Go", "Next.js", "PostgreSQL", "S3/R2"],
    description:
      "Invite-only rooms for voice notes up to ninety seconds, with heard receipts, reactions and saved notes.",
  },
] as const;

export const panelProjects: PanelProject[] = panelCopy.map((entry) => {
  const project = projects.find((candidate) => candidate.slug === entry.slug);
  if (!project) throw new Error(`Panel project "${entry.slug}" is missing from projects.ts`);
  for (const item of entry.stack) {
    if (!project.stack.includes(item)) throw new Error(`Panel readout lists "${item}", which "${entry.slug}" does not claim`);
  }
  return {
    id: entry.id,
    title: project.title,
    descriptor: entry.descriptor,
    description: entry.description,
    href: `/panel/work/${project.slug}`,
    stack: [...entry.stack],
    timeline: project.timeline.replace("-", "–"),
  };
});
