import { ArrowUpRight, Check } from "lucide-react";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { aiGroup, kindLabel } from "@/content/services";
import { anchors, routes, type Locale } from "@/lib/i18n";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { ServiceGlyph } from "@/components/ui/icons";
import { Note } from "@/components/notes/Note";
import { ProductVisual } from "./ProductVisual";

export function AiPortfolio({ locale }: { locale: Locale }) {
  const t = copy[locale].portfolio;
  const [featured, ...products] = aiGroup.services;
  const ext = copy[locale].nav.external;

  return (
    <section id={anchors[locale].ai} aria-labelledby="ai-title" className="relative py-section">
      <div className="container-page">
        <header className="relative grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Note n={4} text={notes.portfolioOrder[locale]} className="-top-10 left-0" />
          <h2 id="ai-title" className="display text-h2 lg:col-span-7">
            {t.titleA}
            <span className="em-teal">{t.titleEm}</span>
          </h2>
          <p className="max-w-[46ch] text-lead lg:col-span-5 lg:justify-self-end" data-draft>
            {t.lead}
          </p>
        </header>

        {/* 1 · Featured: Custom AI Solutions for Businesses — first in reading order on every breakpoint */}
        <article
          aria-labelledby="featured-title"
          className="on-dark relative mt-12 overflow-hidden rounded-xl bg-teal-deep text-mist lg:mt-16"
        >
          <div className="grid lg:grid-cols-12">
            <div className="relative p-6 sm:p-10 lg:col-span-7 lg:p-12 xl:p-14">
              <p className="label inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-mist">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-orange" />
                {t.featuredBadge}
              </p>
              <div className="mt-7 flex items-start gap-4">
                <span className="mt-1 hidden size-12 shrink-0 place-items-center rounded-md bg-white/8 text-orange ring-1 ring-white/15 sm:grid">
                  <ServiceGlyph icon={featured.icon} className="size-6" />
                </span>
                <div>
                  <p className="text-caption font-semibold text-mist/80">{kindLabel[featured.kind][locale]}</p>
                  <h3 id="featured-title" className="display-tight mt-1 text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] leading-[1.08] text-white">
                    {featured.name[locale]}
                  </h3>
                </div>
              </div>
              <p className="mt-5 max-w-[56ch] text-lead text-mist" data-draft>
                {featured.description[locale]}
              </p>
              <h4 className="mt-8 text-small font-semibold text-white">{t.areasTitle}</h4>
              <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2" data-draft>
                {t.areas.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-small text-mist">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-orange" strokeWidth={2.5} />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <ButtonLink href={routes[locale].contact} size="lg">
                  {t.featuredPrimary}
                </ButtonLink>
                <ArrowLink href={featured.href} external tone="light" hint={ext}>
                  {t.featuredSecondary}
                </ArrowLink>
              </div>
            </div>
            <div className="relative border-t border-white/10 bg-teal-night/40 px-6 py-8 sm:px-10 lg:col-span-5 lg:border-t-0 lg:border-l lg:px-8 lg:py-12">
              <div className="flex h-full items-center">
                <ProductVisual kind="custom-ai" tone="dark" className="mx-auto max-w-[26rem]" />
              </div>
            </div>
          </div>
        </article>

        {/* 2 · Ready-made products — one consistent card pattern */}
        <div className="relative mt-14 lg:mt-16">
          <Note n={5} text={notes.productLinks[locale]} className="-top-4 right-0" align="end" />
          <h3 className="display-tight text-h4 text-ink">{t.productsTitle}</h3>
          <ul className="mt-6 grid gap-5 md:grid-cols-3 lg:gap-6">
            {products.map((p) => (
              <li key={p.id}>
                <article className="group relative flex h-full flex-col rounded-lg border border-line bg-white p-2 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-card focus-within:border-teal/60">
                  <div className="rounded-md bg-mist-50 px-6 py-6 transition-colors group-hover:bg-mist-100">
                    <ProductVisual kind={p.id} className="mx-auto max-w-[15rem]" />
                  </div>
                  <div className="flex flex-1 flex-col px-4 pt-5 pb-4">
                    <p className="text-caption font-semibold text-teal-ink">{kindLabel[p.kind][locale]}</p>
                    <h4 className="display-tight mt-1.5 text-h4 text-ink">{p.name[locale]}</h4>
                    <p className="mt-2 text-small text-graphite" data-draft>
                      {p.description[locale]}
                    </p>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener"
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-small font-semibold text-teal-ink after:absolute after:inset-0 after:rounded-lg after:content-['']"
                    >
                      <span className="underline decoration-teal-ink/40 underline-offset-4 group-hover:decoration-teal-ink">
                        {t.productLink}
                        <span className="sr-only">
                          : {p.name[locale]} ({ext})
                        </span>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
