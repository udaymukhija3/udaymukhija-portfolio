export const siteConfig = {
  name: "Uday Mukhija",
  title: "Uday Mukhija | Backend and Full-Stack Engineer",
  description:
    "Backend and full-stack engineer building product systems, APIs, and data-heavy ML workflows.",
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
