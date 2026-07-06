import Link from "next/link";
import type { Metadata } from "next";
import { StructuredData } from "../components/StructuredData";
import { projects } from "../data/projects";
import { educationItems } from "../data/resume";
import { contactLinks, skills } from "../data/siteContent";
import { getSiteUrl, siteConfig } from "../lib/site";

const emailLink = contactLinks.find((link) => link.label === "Email");
const personEmail = emailLink ? emailLink.href.replace(/^mailto:/, "") : undefined;

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const selectedProjectSlugs = ["gathrly", "vibegrid", "murmur", "punchline", "mini-market"];

const projectCues: Record<string, string> = {
  gathrly: "Attendance, reliability, safety, privacy.",
  vibegrid: "Server-owned rules and publishing.",
  murmur: "Private rooms and media access.",
  punchline: "Realtime rooms and reconnect behavior.",
  "mini-market": "Bayesian scoring and testable decisions.",
};

function getSelectedProjects() {
  return selectedProjectSlugs.flatMap((slug) => {
    const project = projects.find((item) => item.slug === slug);

    return project ? [project] : [];
  });
}

export default function HomePage() {
  const selectedProjects = getSelectedProjects();
  const socialLinks = contactLinks.filter((link) => link.href.startsWith("http"));
  const githubLink = contactLinks.find((link) => link.label === "GitHub");
  const linkedInLink = contactLinks.find((link) => link.label === "LinkedIn");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Software Engineer",
    description: siteConfig.description,
    url: siteUrl,
    ...(personEmail ? { email: personEmail } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.location,
    },
    knowsAbout: skills,
    alumniOf: educationItems.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.school,
    })),
    sameAs: socialLinks.map((link) => link.href),
  };

  return (
    <>
      <StructuredData data={personJsonLd} />

      <section className="home-index" aria-labelledby="home-title">
        <div className="container home-index-shell">
          <h1 id="home-title">Uday Mukhija</h1>
          <p className="home-line">Software engineer for systems that have to hold up.</p>

          <nav id="work" className="home-work" aria-labelledby="selected-work-title">
            <p id="selected-work-title" className="eyebrow">
              Selected work
            </p>
            <ul>
              {selectedProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`${project.title}: ${projectCues[project.slug] ?? project.label}`}
                  >
                    <span className="home-work-title">{project.title}</span>
                    <span className="home-work-cue">{projectCues[project.slug] ?? project.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="home-socials" aria-label="Profile links">
            {githubLink ? (
              <a href={githubLink.href} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
            {linkedInLink ? (
              <a href={linkedInLink.href} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
