import type { Metadata } from "next";
import { Print } from "../../../components/print/Print";

export const metadata: Metadata = { title: "The fjord" };

/** The second sheet on its own: the fjord in spring, from a photograph. */
export default function FjordSheetPage() {
  return <div className="print-sheet-page">
    <Print sheet="fjord" className="print-sheet" fit="meet" />
  </div>;
}
