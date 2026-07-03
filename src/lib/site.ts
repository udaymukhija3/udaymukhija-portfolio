export const siteConfig = {
  name: "Uday Mukhija",
  title: "Uday Mukhija | Software Engineer",
  description:
    "Software engineer building backend-heavy products, realtime systems, AI workflows, data platforms, and ML systems with strong fundamentals around state, contracts, evals, reliability, and proof paths.",
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
