import type { Metadata } from "next";
import type { ReactNode } from "react";

/* /panel is a design prototype kept alongside the live site. It is reachable by URL only. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PanelPrototypeLayout({ children }: { children: ReactNode }) {
  return children;
}
