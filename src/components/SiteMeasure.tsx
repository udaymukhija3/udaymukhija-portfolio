"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* The homepage's bone strip and vermilion horizon, carried onto every other
   route as a site map with reading progress. The homepage draws its own. */
const stops = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
];

export function SiteMeasure() {
  const pathname = usePathname() ?? "";
  if (pathname === "/" || pathname === "/daybreak" || pathname === "/alternate" || pathname === "/quiet") return null;
  const current = stops.findIndex(stop => stop.href !== "/" && pathname.startsWith(stop.href));
  return (
    <div className="site-ground">
      <nav className="site-measure" aria-label="Site">
        {stops.map((stop, i) => (
          <Link key={stop.href} href={stop.href} aria-current={current === i ? "page" : undefined}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span>{stop.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
