export type ProjectCategory = "backend" | "ml" | "frontend";

export type Project = {
  slug: string;
  title: string;
  label: string;
  status: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  description: string;
  content: string[];
  stack: string[];
  links: {
    label: string;
    href: string;
  }[];
  featured?: boolean;
};
