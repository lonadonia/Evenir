import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { caseStudies } from "@/content/case-studies";
import { anchors, routes, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { Note } from "@/components/notes/Note";

/** Proof-of-work block. Story previews share their visual treatment with the case-study template. */
export function CaseStudies({ locale }: { locale: Locale }) {
  const t = copy[locale].cases;
  const r = routes[locale];
  const [lead, ...rest] = caseStudies;

  return (
    <section id={anchors[locale].cases} aria-labelledby="cases-title" className="relative py-section">
      <div className="container-page">
        <header className="relative grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Note n={7} text={notes.cases[locale]} className="-top-10 left-0" />
          <h2 id="cases-title" className="display text-h2 lg:col-span-6">
            {t.titleA}
            <span className="em-teal">{t.titleEm}</span>
          </h2>
          <p className="max-w-[46ch] text-lead lg:col-span-6 lg:justify-self-end" data-draft>
            {t.lead}
          </p>
        </header>

        <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12">
          <li className="lg:col-span-7 lg:row-span-2">
            <StoryCard locale={locale} story={lead} href={r.caseStudy(lead.slug[locale])} large />
          </li>
          {rest.map((s) => (
            <li key={s.id} className="lg:col-span-5">
              <StoryCard locale={locale} story={s} href={r.caseStudy(s.slug[locale])} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-5 rounded-lg border border-line bg-mist-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="display-tight text-h4 text-ink">{t.ctaTitle}</p>
            <p className="mt-1 text-small">{t.ctaText}</p>
          </div>
          <ButtonLink href={r.contact} variant="primary" className="shrink-0">
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
  return (
    <article className={`group relative flex h-full overflow-hidden rounded-lg border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-teal/50 hover:shadow-card ${large ? "flex-col" : "flex-col sm:flex-row"}`}>
      <div
        className={`placeholder-hatch relative grid place-items-center ${
          large ? "aspect-[2/1] w-full sm:aspect-[16/8]" : "aspect-[5/2] w-full sm:aspect-auto sm:w-[40%] sm:shrink-0"
        }`}
      >
        <span className="flex flex-col items-center gap-2 px-4 text-center text-caption font-semibold text-teal-ink">
          <ImageIcon aria-hidden="true" className="size-6" strokeWidth={1.75} />
          {t.imageSlot}
        </span>
        <span className="label absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-ink shadow-card">{t.sample}</span>
      </div>
      <div className={`flex flex-1 flex-col ${large ? "p-6 sm:p-8" : "p-6"}`}>
        <p className="text-caption font-semibold text-teal-ink">{story.product[locale]}</p>
        <h3 className={`display-tight mt-2 text-ink ${large ? "text-h3" : "text-h4"}`}>
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {story.title[locale]}
          </Link>
        </h3>
        <p className="mt-3 text-small">{story.summary[locale]}</p>
        {large && (
          <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-sm border border-dashed border-line-strong px-3 py-2 text-caption font-semibold text-graphite">
            <span aria-hidden="true" className="tabular text-ink">—</span>
            {t.metricSlot}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-small font-semibold text-teal-ink" aria-hidden="true">
          <span className="underline decoration-teal-ink/40 underline-offset-4 group-hover:decoration-teal-ink">{t.read}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
        </span>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-lg ring-teal ring-offset-2 group-has-[a:focus-visible]:ring-[2.5px]" aria-hidden="true" />
    </article>
  );
}
