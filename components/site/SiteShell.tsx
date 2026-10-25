import type { ReactNode } from "react";
import { copy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { NotesToggle } from "@/components/notes/NotesToggle";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({
  locale,
  alternateHref,
  children,
}: {
  locale: Locale;
  alternateHref: string;
  children: ReactNode;
}) {
  const n = copy[locale].notes;
  return (
    <>
      <Header locale={locale} alternateHref={alternateHref} />
      <main id="obsah" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={locale} />
      <NotesToggle label={n.toggle} on={n.on} off={n.off} draft={n.draft} />
    </>
  );
}
