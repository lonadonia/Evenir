import type { Metadata, Viewport } from "next";
import { archivo } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://evenir.cz"),
  title: { default: "Evenir — AI řešení a IT služby pro firmy", template: "%s" },
  description:
    "AI řešení na míru, AI produkty pro obchod, zákaznickou péči a reality — postavené na infrastruktuře, kterou umíme spravovat a zabezpečit.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function CsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${archivo.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
