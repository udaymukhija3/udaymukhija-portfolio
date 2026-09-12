import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.DAYBREAK_EXPORT === "1" ? { output: "export" as const, images: { unoptimized: true } } : {}),
  agentRules: false,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
