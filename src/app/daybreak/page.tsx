import type { Metadata } from "next";
import { Daybreak } from "../../components/Daybreak";

/* The earlier sunrise composition, kept reachable for comparison. */
export const metadata: Metadata = {
  title: { absolute: "DAYBREAK — Uday Mukhija" },
  alternates: { canonical: "/daybreak" },
  robots: { index: false, follow: true },
};

export default function DaybreakPage() {
  return <Daybreak />;
}
