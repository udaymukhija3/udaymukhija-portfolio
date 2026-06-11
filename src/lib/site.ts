export const siteConfig = {
  name: "Uday Mukhija",
  title: "Uday Mukhija | Software Engineer",
  description:
    "Software engineer building backend-heavy products, data platforms, and ML systems with Spring Boot, Go, FastAPI, Next.js, PostgreSQL, Redis, Kafka, and artifact-backed proof paths.",
  location: "India",
};

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredUrl) {
    return "http://localhost:3000";
  }

  return configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`;
}
