import type { ReactNode } from "react";
import { copy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { NotesToggle } from "@/components/notes/NotesToggle";
import { Spotlight } from "@/components/ui/Spotlight";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({
  locale,
  alternateHref,
  overlay = false,
  children,
}: {
  locale: Locale;
  alternateHref: string;
  /** Page opens with a dark hero: the header starts transparent over it. */
  overlay?: boolean;
  children: ReactNode;
}) {
  const n = copy[locale].notes;
  return (
    <>
      <Header locale={locale} alternateHref={alternateHref} overlay={overlay} />
      <main id="obsah" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={locale} />
      <NotesToggle label={n.toggle} on={n.on} off={n.off} draft={n.draft} />
      <Spotlight />
    </>
  );
}
