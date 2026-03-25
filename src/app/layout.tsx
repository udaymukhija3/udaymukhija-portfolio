import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NavBar } from "../components/NavBar";
import { getSiteUrl, siteConfig } from "../lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

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
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <NavBar />
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="container footer-shell">
            <p>© {new Date().getFullYear()} Uday Mukhija</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
