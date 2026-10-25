import { Archivo } from "next/font/google";

/**
 * Archivo (OFL, Omnibus-Type) — one variable family with a width axis.
 * Expanded widths (110–116) carry the display voice and echo the extended
 * EVENIR wordmark; normal width carries reading text. latin-ext covers
 * Czech (ě š č ř ž ů) and German (ä ö ü ß).
 */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
