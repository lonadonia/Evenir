import type { Locale } from "@/lib/i18n";
import { alternatePath } from "@/lib/i18n";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "./Hero";
import { AiPortfolio } from "./AiPortfolio";
import { WhyEvenir } from "./WhyEvenir";
import { Process } from "./Process";
import { Foundations } from "./Foundations";
import { CaseStudies } from "./CaseStudies";
import { About } from "./About";
import { Contact } from "./Contact";

/**
 * Recommended homepage order (design recommendation, not client-prescribed):
 * dark hero with client logos → AI portfolio (Custom AI first) → why Evenir →
 * how we work → foundations (non-AI areas) → case studies → about → contact.
 * Surfaces alternate dark / light so every section has its own rhythm.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <SiteShell locale={locale} alternateHref={alternatePath(locale, "home")} overlay>
      <Hero locale={locale} />
      <AiPortfolio locale={locale} />
      <WhyEvenir locale={locale} />
      <Process locale={locale} />
      <Foundations locale={locale} />
      <CaseStudies locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
    </SiteShell>
  );
}
