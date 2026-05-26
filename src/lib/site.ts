export const siteConfig = {
  name: "Uday Mukhija",
  title: "Uday Mukhija | Software Engineer",
  description:
    "Software engineer working on backend services (Java, Spring Boot), data platforms (Kafka, dbt, Airflow), and ML systems (LightGBM, FastAPI). Portfolio with case studies, proof artifacts, and source code.",
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
