import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { caseStudies } from "@/content/case-studies";
import { allServices } from "@/content/services";
import { anchors, routes, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceGlyph } from "@/components/ui/icons";
import { SectionHeader } from "@/components/ui/Section";
import { Note } from "@/components/notes/Note";
import { CaseCover } from "@/components/case/CaseCover";

/** Proof-of-work block. Story previews share their cover treatment with the case-study template. */
export function CaseStudies({ locale }: { locale: Locale }) {
  const t = copy[locale].cases;
  const r = routes[locale];
  const [lead, ...rest] = caseStudies;

  return (
    <section id={anchors[locale].cases} aria-labelledby="cases-title" className="relative py-section">
      <div className="container-page">
        <div className="relative">
          <Note n={9} text={notes.cases[locale]} className="-top-10 left-0" />
          <SectionHeader
            id="cases-title"
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

        <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12">
          <li className="reveal lg:col-span-7 lg:row-span-2">
            <StoryCard locale={locale} story={lead} href={r.caseStudy(lead.slug[locale])} large />
          </li>
          {rest.map((s) => (
            <li key={s.id} className="reveal lg:col-span-5">
              <StoryCard locale={locale} story={s} href={r.caseStudy(s.slug[locale])} />
            </li>
          ))}
        </ul>

        <div className="reveal on-dark surface-deep relative mt-10 flex flex-col gap-6 overflow-hidden rounded-xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
          <div className="relative">
            <p className="display text-h3 text-white">{t.ctaTitle}</p>
            <p className="mt-2 text-mist/90">{t.ctaText}</p>
          </div>
          <ButtonLink href={r.contact} size="lg" className="relative shrink-0 shadow-[0_12px_40px_-14px_rgb(255_130_67/0.8)]">
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function StoryCard({
  locale,
  story,
  href,
  large = false,
}: {
  locale: Locale;
  story: (typeof caseStudies)[number];
  href: string;
  large?: boolean;
}) {
  const t = copy[locale].cases;
  const service = allServices.find((s) => s.id === story.serviceId);
  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-xl border border-line bg-white shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-lift ${
        large ? "flex-col" : "flex-col sm:flex-row"
      }`}
    >
      <CaseCover
        story={story}
        locale={locale}
        size={large ? "lg" : "sm"}
        className={large ? "aspect-[16/10] w-full" : "aspect-[16/9] w-full sm:aspect-auto sm:w-[44%] sm:shrink-0"}
      />
      <div className={`flex flex-1 flex-col ${large ? "p-7 sm:p-9" : "p-6"}`}>
        <p className="inline-flex items-center gap-2 text-caption font-semibold text-teal-ink">
          {service && <ServiceGlyph icon={service.icon} className="size-4" />}
          {story.product[locale]}
        </p>
        <h3 className={`display-tight mt-2 text-ink ${large ? "text-h3" : "text-h4"}`}>
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {story.title[locale]}
          </Link>
        </h3>
        <p className="mt-3 text-small">{story.summary[locale]}</p>
        {large && (
          <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-md border border-dashed border-line-strong bg-mist-50 px-3 py-2 text-caption font-semibold text-graphite">
            <span aria-hidden="true" className="tabular text-ink">—</span>
            {t.metricSlot}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-small font-semibold text-teal-ink" aria-hidden="true">
          <span className="underline decoration-teal-ink/40 underline-offset-4 group-hover:decoration-teal-ink">{t.read}</span>
          <span className="grid size-7 place-items-center rounded-full bg-mist-100 transition-colors group-hover:bg-teal-ink group-hover:text-white">
            <ArrowRight className="size-4" strokeWidth={2} />
          </span>
        </span>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-teal ring-offset-2 group-has-[a:focus-visible]:ring-[2.5px]" aria-hidden="true" />
    </article>
  );
}
