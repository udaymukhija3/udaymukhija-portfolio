export const siteConfig = {
  name: "Uday Mukhija",
  title: "Uday Mukhija | Core Java Backend and ML Systems Engineer",
  description:
    "Core Java backend engineer with strong ML systems thinking and engineering range.",
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
