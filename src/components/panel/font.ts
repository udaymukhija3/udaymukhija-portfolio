import localFont from "next/font/local";

/* Instrument Sans carries every panel page; nothing else is set in it. */
export const grotesk = localFont({
  src: "../../fonts/daybreak/instrument-sans-variable.woff2",
  weight: "400 700",
  variable: "--font-grotesk-face",
  display: "swap",
  adjustFontFallback: "Arial",
});
