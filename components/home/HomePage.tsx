import type { Locale } from "@/lib/i18n";
import { alternatePath } from "@/lib/i18n";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "./Hero";
import { LogoStrip } from "./LogoStrip";
import { AiPortfolio } from "./AiPortfolio";
import { Foundations } from "./Foundations";
import { CaseStudies } from "./CaseStudies";
import { About } from "./About";
import { Contact } from "./Contact";

/**
 * Recommended homepage order (design recommendation, not client-prescribed):
 * hero → proof logos → AI portfolio (Custom AI first) → foundations (non-AI areas)
 * → case studies → about → contact.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <SiteShell locale={locale} alternateHref={alternatePath(locale, "home")}>
      <Hero locale={locale} />
      <LogoStrip locale={locale} />
      <AiPortfolio locale={locale} />
      <Foundations locale={locale} />
      <CaseStudies locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
    </SiteShell>
  );
}
