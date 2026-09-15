import type { Metadata } from "next";
import { Panel } from "../../components/panel/Panel";

export const metadata: Metadata = {
  title: "Panel prototype",
  description: "A grid-led homepage prototype: one panel of rules, type, and space.",
};

export default function PanelPrototypePage() {
  return <Panel />;
}
