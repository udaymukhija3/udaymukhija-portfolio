import type { Metadata } from "next";
import { HomeWorkbench } from "../components/HomeWorkbench";
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
      <HomeWorkbench
        projects={selectedProjects}
        profileLinks={[githubLink, linkedInLink].filter(
          (link): link is NonNullable<typeof link> => Boolean(link),
        )}
        emailHref={emailLink?.href ?? "mailto:udaymukhija3@gmail.com"}
      />
    </>
  );
}
