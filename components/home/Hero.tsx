import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { anchors, routes, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Note } from "@/components/notes/Note";
import { HeroSchematic } from "./HeroSchematic";

/**
 * Hero: the headline runs wide as one statement; the lead + actions and the
 * signal schematic sit beneath it as one composition. On mobile the order is
 * identical — headline → lead → actions → schematic (recomposed vertically).
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale].hero;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page pt-10 pb-14 sm:pt-14 lg:pt-16 lg:pb-20">
        <div className="relative">
          <Note n={1} text={notes.hero[locale]} className="-top-3 -left-2 sm:-left-10" />
          <Eyebrow>{t.kicker}</Eyebrow>
          <h1 id="hero-title" className="display mt-5 max-w-[13.5em] text-h1 text-ink" data-draft>
            {t.titleA}
            <span className="em-teal">{t.titleEm1}</span>
            {t.titleB}
            <span className="em-teal">{t.titleEm2}</span>
            {t.titleC}
          </h1>
        </div>
        <div className="mt-8 grid items-start gap-y-12 lg:mt-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:pt-6 xl:col-span-4">
            <p className="max-w-[46ch] text-lead text-graphite" data-draft>
              {t.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:max-w-[22rem] lg:flex-col lg:items-stretch">
              <ButtonLink href={`#${anchors[locale].ai}`} size="lg" icon="down">
                {t.primary}
              </ButtonLink>
              <ButtonLink href={routes[locale].contact} variant="secondary" size="lg">
                {t.secondary}
              </ButtonLink>
            </div>
          </div>
          <div className="relative lg:col-span-7 xl:col-span-8">
            <Note n={2} text={notes.schematic[locale]} className="-top-4 right-2" align="end" />
            <div className="relative -mx-2 rounded-xl border border-line/80 bg-mist-50 px-3 py-6 sm:mx-0 sm:px-6 sm:py-8 lg:px-8">
              <HeroSchematic labels={t.schematic} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
