import Link from "next/link";
import { ArrowUpRight, ImageIcon, Quote } from "lucide-react";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { allServices, kindLabel } from "@/content/services";
import { alternatePath, routes, type Locale } from "@/lib/i18n";
import { SiteShell } from "@/components/site/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceGlyph } from "@/components/ui/icons";
import { Note } from "@/components/notes/Note";
import { ProductVisual } from "@/components/home/ProductVisual";
import { StoryCard } from "@/components/home/CaseStudies";

/**
 * Reusable case-study template. Every block below is a slot; optional slots
 * (context, metrics, media, testimonial, solution steps, challenge points)
 * collapse when the story has no content for them.
 */
export function CaseStudyPage({ locale, story }: { locale: Locale; story: CaseStudy }) {
  const t = copy[locale].caseStudy;
  const r = routes[locale];
  const service = allServices.find((s) => s.id === story.serviceId)!;
  const ext = copy[locale].nav.external;

  const sections = [
    story.context && { id: "kontext", label: t.context },
    { id: "vyzva", label: t.challenge },
    { id: "reseni", label: t.solutionTitle },
    { id: "vysledky", label: t.outcomes },
    story.media?.length && { id: "z-projektu", label: t.gallery },
  ].filter(Boolean) as { id: string; label: string }[];

  const others = caseStudies.filter((c) => c.id !== story.id);

  return (
    <SiteShell locale={locale} alternateHref={alternatePath(locale, { caseStudy: story.slug[locale === "cs" ? "en" : "cs"] })}>
      {/* Review bar — part of the prototype, not of the final page */}
      <div className="border-b border-dashed border-orange/60 bg-orange-tint">
        <div className="container-page flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative text-caption font-semibold text-ink">
            <Note n={1} text={notes.caseTemplate[locale]} className="-top-1.5 -left-10 hidden sm:block" />
            {t.templateBar}
          </div>
          <nav aria-label={t.switchLabel}>
            <ul className="flex flex-wrap gap-1.5">
              {caseStudies.map((c) => {
                const current = c.id === story.id;
                return (
                  <li key={c.id}>
                    <Link
                      href={r.caseStudy(c.slug[locale])}
                      aria-current={current ? "page" : undefined}
                      className={`inline-flex min-h-9 items-center rounded-full px-3 text-caption font-semibold transition-colors ${
                        current ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line hover:ring-line-strong"
                      }`}
                    >
                      {c.variant[locale]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* 1 · Title + summary + meta */}
      <header className="container-page pt-8 lg:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-caption text-graphite">
            <li>
              <Link href={r.home} className="link">
                {t.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={r.cases} className="link">
                {t.breadcrumbCases}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-ink">
              {story.title[locale]}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-small font-semibold text-teal-ink">
              <ServiceGlyph icon={service.icon} className="size-4" />
              {story.product[locale]}
              <span className="label rounded-full bg-orange-tint px-2.5 py-0.5 text-ink">{copy[locale].cases.sample}</span>
            </p>
            <h1 className="display mt-5 text-h1">{story.title[locale]}</h1>
            <p className="mt-6 max-w-[56ch] text-lead">{story.summary[locale]}</p>
          </div>
          <dl className="grid grid-cols-2 content-start gap-px self-end overflow-hidden rounded-lg border border-line bg-line text-small lg:col-span-5 lg:col-start-8">
            <Meta label={t.client} value={t.clientSlot} slot />
            <Meta label={t.industry} value={t.industrySlot} slot />
            <Meta
              label={t.solution}
              value={
                <a href={service.href} target="_blank" rel="noopener" className="link font-semibold">
                  {service.name[locale]}
                  <span className="sr-only"> ({ext})</span>
                </a>
              }
            />
            <Meta label={t.duration} value={t.durationSlot} slot />
          </dl>
        </div>

        {story.media?.length ? (
          <ImageSlot label={t.heroImage} note={t.imageNote} className="mt-12 aspect-[16/9] sm:aspect-[21/9] lg:mt-16" large />
        ) : null}
      </header>

      {/* Body */}
      <div className="container-page grid gap-12 py-section lg:grid-cols-12 lg:gap-8">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label={locale === "cs" ? "Obsah příběhu" : "Story contents"} className="sticky top-28">
            <ul className="grid gap-0.5 border-s border-line">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ms-px block border-s-2 border-transparent py-1.5 ps-4 text-small font-semibold text-graphite hover:border-teal hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="grid gap-16 lg:col-span-8 lg:col-start-5 lg:gap-20">
          {story.context && (
            <Block id="kontext" title={t.context} slot={locale === "cs" ? "Slot · volitelný" : "Slot · optional"}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="placeholder-hatch grid h-20 w-40 shrink-0 place-items-center rounded-md border border-dashed border-line-strong text-caption font-semibold text-teal-ink">
                  {t.logoSlot}
                </div>
                <p className="text-body">{t.contextText}</p>
              </div>
            </Block>
          )}

          <Block id="vyzva" title={t.challenge} slot={locale === "cs" ? "Slot · povinný" : "Slot · required"}>
            <p className="text-lead text-ink">{story.challenge.lead[locale]}</p>
            {story.challenge.points.length > 0 && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {story.challenge.points.map((p) => (
                  <li key={p.cs} className="rounded-md border border-line bg-white p-5 text-small font-semibold text-ink">
                    <span aria-hidden="true" className="mb-4 block h-1 w-8 rounded-full bg-orange" />
                    {p[locale]}
                  </li>
                ))}
              </ul>
            )}
          </Block>

          <Block id="reseni" title={t.solutionTitle} slot={locale === "cs" ? "Slot · povinný" : "Slot · required"}>
            <p className="text-lead text-ink">{story.solution.lead[locale]}</p>
            <div className={`mt-8 grid gap-8 ${story.solution.steps.length ? "md:grid-cols-[minmax(0,1fr)_16rem]" : ""}`}>
              {story.solution.steps.length > 0 && (
                <ol className="grid gap-0">
                  {story.solution.steps.map((s, i) => (
                    <li key={s.title.cs} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-8 last:pb-0">
                      {i < story.solution.steps.length - 1 && (
                        <span aria-hidden="true" className="absolute top-10 bottom-0 left-5 w-px bg-line" />
                      )}
                      <span className="relative grid size-10 place-items-center rounded-full border-[1.5px] border-teal bg-white text-small font-bold text-teal-ink tabular">
                        {i + 1}
                      </span>
                      <div className="pt-1.5">
                        <h3 className="display-tight text-h4">{s.title[locale]}</h3>
                        <p className="mt-1.5 text-small">{s.text[locale]}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
              <div className="self-start rounded-lg bg-mist-50 p-6">
                <ProductVisual kind={story.serviceId} className="mx-auto max-w-[16rem]" />
              </div>
            </div>
          </Block>

          <Block id="vysledky" title={t.outcomes} slot={locale === "cs" ? "Slot · čísla volitelná" : "Slot · figures optional"}>
            <p className="text-lead text-ink">{story.outcomes.lead[locale]}</p>
            {story.outcomes.metrics?.length ? (
              <ul className={`mt-8 grid gap-4 ${story.outcomes.metrics.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                {story.outcomes.metrics.map((m) => (
                  <li key={m.label.cs} className="rounded-lg border border-dashed border-line-strong bg-white p-6">
                    <p className="display text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none text-teal tabular" aria-hidden="true">
                      {t.metricValue}
                    </p>
                    <p className="mt-4 text-small font-semibold text-graphite">{m.label[locale]}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </Block>

          {story.media?.length ? (
            <Block id="z-projektu" title={t.gallery} slot={locale === "cs" ? "Slot · volitelný" : "Slot · optional"}>
              <ul className={`grid gap-4 ${story.media.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {story.media.map((m) => (
                  <li key={m.caption.cs}>
                    <figure>
                      <ImageSlot label={locale === "cs" ? "Obrázek" : "Image"} note={t.imageNote} className="aspect-[4/3]" />
                      <figcaption className="mt-2 text-caption text-graphite">{m.caption[locale]}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {story.testimonial && (
            <figure className="relative rounded-xl bg-mist-50 p-8 sm:p-12">
              <span className="slot-label absolute -top-3 left-8 rounded-full bg-orange px-2.5 py-0.5 text-caption font-bold text-ink">
                {locale === "cs" ? "Slot · volitelný" : "Slot · optional"}
              </span>
              <Quote aria-hidden="true" className="size-10 text-teal" strokeWidth={1.5} />
              <blockquote className="display-tight mt-5 text-h3 text-ink">
                <p>{t.testimonial}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 text-small">
                <span className="placeholder-hatch size-12 rounded-full border border-dashed border-line-strong" aria-hidden="true" />
                <span className="font-semibold text-graphite">{t.testimonialBy}</span>
              </figcaption>
            </figure>
          )}
        </article>
      </div>

      {/* Next step */}
      <section aria-labelledby="next-title" className="on-dark bg-teal-deep py-section-sm text-mist">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="next-title" className="display text-h2 text-white">
              {t.nextTitle}
            </h2>
            <p className="mt-4 max-w-[44ch] text-lead">{t.nextText}</p>
            <ButtonLink href={r.contact} size="lg" className="mt-8">
              {t.nextCta}
            </ButtonLink>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="label text-mist/80">{t.related}</p>
            <a
              href={service.href}
              target="_blank"
              rel="noopener"
              className="group mt-3 flex items-center gap-5 rounded-lg bg-white/6 p-5 ring-1 ring-white/15 transition-colors hover:bg-white/10"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-md bg-white/10 text-orange">
                <ServiceGlyph icon={service.icon} className="size-6" />
              </span>
              <span className="flex-1">
                <span className="block text-caption text-mist/80">{kindLabel[service.kind][locale]}</span>
                <span className="display-tight block text-h4 text-white">{service.name[locale]}</span>
                <span className="sr-only"> ({ext})</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="size-5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="container-page py-section">
        <h2 id="more-title" className="display text-h3">
          {t.more}
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {others.map((s) => (
            <li key={s.id}>
              <StoryCard locale={locale} story={s} href={r.caseStudy(s.slug[locale])} />
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}

function Meta({ label, value, slot }: { label: string; value: React.ReactNode; slot?: boolean }) {
  return (
    <div className="bg-white p-5">
      <dt className="text-caption font-semibold text-graphite">{label}</dt>
      <dd className={`mt-1 ${slot ? "text-graphite italic" : "text-ink"}`}>{value}</dd>
    </div>
  );
}

function Block({ id, title, slot, children }: { id: string; title: string; slot: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-28">
      <span className="slot-label absolute -top-7 left-0 rounded-full bg-orange px-2.5 py-0.5 text-caption font-bold text-ink">{slot}</span>
      <h2 id={`${id}-title`} className="display-tight border-t-2 border-ink pt-5 text-h3">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ImageSlot({ label, note, className = "", large = false }: { label: string; note: string; className?: string; large?: boolean }) {
  return (
    <div className={`placeholder-hatch grid place-items-center rounded-lg border border-dashed border-line-strong ${className}`}>
      <span className="flex flex-col items-center gap-2 px-6 text-center text-small font-semibold text-teal-ink">
        <ImageIcon aria-hidden="true" className={large ? "size-8" : "size-6"} strokeWidth={1.5} />
        {label}
        <span className="text-caption font-normal text-graphite">({note})</span>
      </span>
    </div>
  );
}
