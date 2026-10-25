import { ArrowUpRight, Check, Mail, Phone } from "lucide-react";
import { copy, contact } from "@/content/site";
import { notes } from "@/content/notes";
import { aiGroup, kindLabel } from "@/content/services";
import { anchors, routes, type Locale } from "@/lib/i18n";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { ServiceGlyph } from "@/components/ui/icons";
import { SectionHeader } from "@/components/ui/Section";
import { Note } from "@/components/notes/Note";
import { CallMockup, CustomMockup, EstateMockup, SalesMockup } from "./ProductMockups";

const MOCKUPS: Record<string, (p: { locale: Locale }) => React.ReactElement> = {
  "ai-sales": SalesMockup,
  "call-care-ai": CallMockup,
  "real-estate-ai": EstateMockup,
};

/**
 * Bento portfolio. DOM and visual order: Custom AI (large, first) → AI Sales →
 * Call Care AI → Real Estate AI → consultation tile.
 */
export function AiPortfolio({ locale }: { locale: Locale }) {
  const t = copy[locale].portfolio;
  const [featured, ...products] = aiGroup.services;
  const ext = copy[locale].nav.external;

  return (
    <section id={anchors[locale].ai} aria-labelledby="ai-title" className="relative isolate overflow-hidden py-section">
      <div aria-hidden="true" className="grid-lines-light absolute inset-x-0 top-0 -z-10 h-[40rem]" />
      <div className="container-page">
        <div className="relative">
          <Note n={4} text={notes.portfolioOrder[locale]} className="-top-10 left-0" />
          <SectionHeader
            id="ai-title"
            eyebrow={t.eyebrow}
            title={
              <>
                {t.titleA}
                <span className="em-teal">{t.titleEm}</span>
              </>
            }
            lead={t.lead}
          />
        </div>

        <div className="relative mt-12 lg:mt-16">
        <Note n={5} text={notes.productLinks[locale]} className="-top-4 right-0" align="end" />
        <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">

          {/* 1 · Featured: Custom AI Solutions for Businesses */}
          <li className="reveal lg:col-span-2 lg:row-span-2">
            <article
              aria-labelledby="featured-title"
              data-spotlight
              style={{ "--spot": "rgb(92 198 205 / 0.16)" } as React.CSSProperties}
              className="on-dark surface-deep relative flex h-full flex-col overflow-hidden rounded-xl text-mist shadow-lift"
            >
              <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-70" />
              <div className="p-6 sm:p-10 lg:p-12">
                <p className="label inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-mist">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-orange" />
                  {t.featuredBadge}
                </p>
                <div className="mt-7 flex items-start gap-4">
                  <span className="mt-1 hidden size-12 shrink-0 place-items-center rounded-md bg-gradient-to-br from-orange to-[#ff9f6e] text-ink shadow-[0_10px_30px_-10px_rgb(255_130_67/0.8)] sm:grid">
                    <ServiceGlyph icon={featured.icon} className="size-6" />
                  </span>
                  <div>
                    <p className="text-caption font-semibold text-teal-glow">{kindLabel[featured.kind][locale]}</p>
                    <h3 id="featured-title" className="display mt-1 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.05] text-white">
                      {featured.name[locale]}
                    </h3>
                  </div>
                </div>
                <p className="mt-5 max-w-[54ch] text-lead text-mist" data-draft>
                  {featured.description[locale]}
                </p>
                <h4 className="mt-8 text-small font-semibold text-white">{t.areasTitle}</h4>
                <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2" data-draft>
                  {t.areas.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-small text-mist">
                      <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-orange/20">
                        <Check aria-hidden="true" className="size-3 text-orange" strokeWidth={3} />
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <ButtonLink href={routes[locale].contact} size="lg" className="shadow-[0_12px_40px_-14px_rgb(255_130_67/0.8)]">
                    {t.featuredPrimary}
                  </ButtonLink>
                  <ArrowLink href={featured.href} external tone="light" hint={ext}>
                    {t.featuredSecondary}
                  </ArrowLink>
                </div>
              </div>
              <div className="mt-auto border-t border-white/10 bg-abyss/30 px-6 py-8 sm:px-10">
                <CustomMockup locale={locale} />
              </div>
            </article>
          </li>

          {/* 2–4 · Products — one consistent tile pattern */}
          {products.map((p) => {
            const Mock = MOCKUPS[p.id];
            return (
              <li key={p.id} className="reveal">
                <article
                  data-spotlight
                  className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-xl border border-line shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-lift"
                >
                  <div className="relative overflow-hidden border-b border-line bg-gradient-to-br from-mist-50 to-mist-100">
                    <div aria-hidden="true" className="grid-lines-light absolute inset-0" />
                    {Mock && <Mock locale={locale} />}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-md bg-teal-deep text-teal-glow">
                        <ServiceGlyph icon={p.icon} className="size-5" />
                      </span>
                      <div>
                        <p className="text-caption font-semibold text-teal-ink">{kindLabel[p.kind][locale]}</p>
                        <h3 className="display-tight text-h4 text-ink">{p.name[locale]}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-small text-graphite" data-draft>
                      {p.description[locale]}
                    </p>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener"
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-small font-semibold text-teal-ink after:absolute after:inset-0 after:rounded-xl after:content-['']"
                    >
                      <span className="underline decoration-teal-ink/40 underline-offset-4 group-hover:decoration-teal-ink">
                        {t.productLink}
                        <span className="sr-only">
                          : {p.name[locale]} ({ext})
                        </span>
                      </span>
                      <span className="grid size-7 place-items-center rounded-full bg-mist-100 transition-colors group-hover:bg-teal-ink group-hover:text-white">
                        <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
                      </span>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}

          {/* 5 · Consultation tile */}
          <li className="reveal lg:col-span-2">
            <div className="relative flex h-full flex-col justify-center gap-8 overflow-hidden rounded-xl border border-line bg-mist-50 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div aria-hidden="true" className="grid-lines-light absolute inset-0 -z-0" />
              <div className="relative max-w-[30rem]">
                <p className="display text-h3 text-ink">{t.ctaTitle}</p>
                <p className="mt-3 text-body">{t.ctaText}</p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-small font-semibold text-ink">
                  <li>
                    <a href={`mailto:${contact.email}`} className="inline-flex min-h-8 items-center gap-2 hover:text-teal-ink">
                      <Mail aria-hidden="true" className="size-4 text-teal-ink" strokeWidth={2} />
                      {contact.email}
                    </a>
                  </li>
                  <li>
                    <a href={contact.phoneHref} className="inline-flex min-h-8 items-center gap-2 tabular hover:text-teal-ink">
                      <Phone aria-hidden="true" className="size-4 text-teal-ink" strokeWidth={2} />
                      {contact.phone}
                    </a>
                  </li>
                </ul>
              </div>
              <ButtonLink href={routes[locale].contact} size="lg" icon="right" className="relative shrink-0">
                {t.ctaButton}
              </ButtonLink>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </section>
  );
}
