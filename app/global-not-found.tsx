import type { Metadata } from "next";
import { archivo } from "@/lib/fonts";
import { SiteShell } from "@/components/site/SiteShell";
import { NotFoundBody } from "@/components/site/NotFoundBody";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stránka nenalezena — Evenir",
  description: "Požadovaná stránka neexistuje.",
};

export default function GlobalNotFound() {
  return (
    <html lang="cs" className={`${archivo.variable} antialiased`}>
      <body>
        <SiteShell locale="cs" alternateHref="/en">
          <NotFoundBody locale="cs" />
        </SiteShell>
      </body>
    </html>
  );
}
