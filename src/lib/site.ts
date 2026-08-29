export const siteConfig = {
  name: "Uday Mukhija",
  title: "Uday Mukhija | Software Engineer",
  description:
    "Software engineer for backend-heavy product systems, realtime protocols, AI guardrails, evals, and data contracts.",
  location: "India",
};

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredUrl) {
    return "https://udaymukhija-portfolio.vercel.app";
  }

  return configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`;
}
