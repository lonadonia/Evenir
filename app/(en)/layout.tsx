import type { Metadata, Viewport } from "next";
import { archivo } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://evenir.cz"),
  title: { default: "Evenir — AI solutions and IT services for businesses", template: "%s" },
  description:
    "Custom AI solutions and AI products for sales, customer care and real estate — built on infrastructure we know how to run and secure.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
