import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PrintDefs } from "../../components/print/Print";
import "./print.css";

/* /print is a design study kept alongside the live site: a Japanese print set on a Swiss grid. Reachable by URL only. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PrintStudyLayout({ children }: { children: ReactNode }) {
  return <div id="print">
    <PrintDefs />
    {children}
  </div>;
}
