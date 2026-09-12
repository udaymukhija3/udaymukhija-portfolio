import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DAYBREAK — Uday Mukhija",
    short_name: "Uday Mukhija",
    description: "Portfolio site for Uday Mukhija.",
    start_url: "/",
    display: "standalone",
    background_color: "#080f22",
    theme_color: "#080f22",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
