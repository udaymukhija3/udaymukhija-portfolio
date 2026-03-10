import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Uday Mukhija | Software Engineer",
    short_name: "Uday Mukhija",
    description: "Portfolio site for Uday Mukhija.",
    start_url: "/",
    display: "standalone",
    background_color: "#111916",
    theme_color: "#111916",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
