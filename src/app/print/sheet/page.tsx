import type { Metadata } from "next";
import { Print } from "../../../components/print/Print";

export const metadata: Metadata = { title: "The print" };

/** The whole sheet, for looking at the drawing on its own. */
export default function SheetPage() {
  return <div className="print-sheet-page">
    <Print className="print-sheet" fit="meet" />
  </div>;
}
