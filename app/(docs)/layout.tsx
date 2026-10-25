import type { Metadata } from "next";
import { archivo } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://evenir.cz"),
  title: { default: "Evenir redesign — design system", template: "%s · Evenir redesign" },
  robots: { index: false, follow: false },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} antialiased`}>
      <body className="bg-mist-50">{children}</body>
    </html>
  );
}
