import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { NavBar } from "../components/NavBar";
import { SiteMeasure } from "../components/SiteMeasure";
import { contactLinks, resumeHref } from "../data/siteContent";
import { getSiteUrl, siteConfig } from "../lib/site";
import "./globals.css";
import "./daybreak-shell.css";
import "./system.css";
import "./context-shell.css";
import "./quiet/quiet.css";

const siteUrl = getSiteUrl();

const humanist = localFont({
  src: "../fonts/quiet/source-sans-3-variable.woff2",
  weight: "200 900",
  style: "normal",
  variable: "--font-humanist-face",
  preload: false,
  display: "swap",
  adjustFontFallback: "Arial",
});

/* Self-hosted OFL type. The retained Daybreak route keeps its serif;
   the editorial system uses Space Grotesk and IBM Plex Mono. */
const serif = localFont({
  src: [
    { path: "../fonts/daybreak/instrument-serif-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/daybreak/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif-face",
  preload: false,
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const sans = localFont({
  src: [
    { path: "../fonts/optical/space-grotesk-regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/optical/space-grotesk-medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-sans-face",
  preload: false,
  display: "swap",
  adjustFontFallback: "Arial",
});
const mono = localFont({
  src: "../fonts/optical/ibm-plex-mono-regular.ttf",
  weight: "400",
  variable: "--font-mono-face",
  preload: false,
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const githubLink = contactLinks.find((link) => link.label === "GitHub");
  const linkedInLink = contactLinks.find((link) => link.label === "LinkedIn");

  return (
    <html lang="en" className={`${humanist.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <NavBar />
        <main id="main-content">{children}</main>
        <SiteMeasure />
        <footer className="site-footer">
          <div className="container footer-shell">
            <p>© {new Date().getFullYear()} Uday Mukhija</p>
            <nav aria-label="Secondary">
              {githubLink ? <a href={githubLink.href} target="_blank" rel="noreferrer">GitHub</a> : null}
              {linkedInLink ? <a href={linkedInLink.href} target="_blank" rel="noreferrer">LinkedIn</a> : null}
              <a href={resumeHref} target={resumeHref.startsWith("http") ? "_blank" : undefined} rel={resumeHref.startsWith("http") ? "noreferrer" : undefined}>Resume</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
