export type ProjectCategory = "product" | "ml" | "data";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectSection = {
  title: string;
  paragraphs: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  label: string;
  status: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  description: string;
  metrics: ProjectMetric[];
  facts: ProjectFact[];
  system: ProjectFact[];
  highlights: string[];
  sections: ProjectSection[];
  stack: string[];
  links: ProjectLink[];
  evidenceNote: string;
  featured?: boolean;
  flagship?: boolean;
};
