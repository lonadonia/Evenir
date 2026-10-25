/* eslint-disable @next/next/no-img-element -- partner badges are the client's original assets */
import { Network, ShieldCheck, LockKeyhole } from "lucide-react";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { anchors, routes, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { Note } from "@/components/notes/Note";
import { HeroSchematic } from "./HeroSchematic";
import { LogoMarquee } from "./LogoStrip";

/**
 * Dark, immersive hero. The header sits transparently on top of it.
 * Order on every breakpoint: eyebrow → headline → lead → actions → partners → console.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale].hero;
  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark surface-abyss relative isolate -mt-16 overflow-hidden text-mist lg:-mt-[4.75rem]"
    >
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-abyss/60" />

      <div className="container-page pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-20">
        <div className="relative">
          <Note n={1} text={notes.hero[locale]} className="-top-3 -left-2 sm:-left-10" />
          <p className="enter enter-1 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 py-1.5 ps-2 pe-4 text-caption font-semibold text-mist backdrop-blur">
            <span className="relative grid size-5 place-items-center rounded-full bg-orange/15">
              <span aria-hidden="true" className="absolute inset-0 animate-signal rounded-full bg-orange/40 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-orange" />
            </span>
            {t.kicker}
          </p>
          <h1 id="hero-title" className="display enter enter-2 mt-6 max-w-[13.2em] text-[clamp(2.5rem,1.3rem+4.6vw,5rem)] leading-[1] text-white" data-draft>
            {t.titleA}
            <span className="em-teal">{t.titleEm1}</span>
            {t.titleB}
            <span className="em-teal">{t.titleEm2}</span>
            {t.titleC}
          </h1>
        </div>

        <div className="mt-10 grid items-start gap-y-14 lg:mt-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="enter enter-3 lg:col-span-4 lg:pt-4">
            <p className="max-w-[44ch] text-lead text-mist/90" data-draft>
              {t.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:max-w-[22rem] lg:flex-col lg:items-stretch">
              <ButtonLink href={`#${anchors[locale].ai}`} size="lg" icon="down" className="shadow-[0_12px_40px_-12px_rgb(255_130_67/0.7)]">
                {t.primary}
              </ButtonLink>
              <ButtonLink href={routes[locale].contact} variant="secondaryOnDark" size="lg">
                {t.secondary}
              </ButtonLink>
            </div>
            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-caption font-semibold text-mist/70">{t.partners}</p>
              <ul className="mt-3 flex flex-wrap items-center gap-3">
                <li className="grid h-11 place-items-center rounded-sm border border-white/12 bg-white/[0.04] px-3">
                  <img src="/partners/microsoft-csp.svg" alt="Microsoft Cloud Solution Provider" className="h-6 w-auto" />
                </li>
                <li className="grid h-11 place-items-center rounded-sm border border-white/12 bg-white/[0.04] px-3">
                  <img src="/partners/dell-technologies.webp" alt="Dell Technologies Authorized Partner" className="h-5 w-auto" />
                </li>
              </ul>
            </div>
          </div>

          <div className="enter enter-4 relative lg:col-span-8">
            <Note n={2} text={notes.schematic[locale]} className="-top-4 right-2" align="end" />
            {/* glow behind the console */}
            <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(25_146_155/0.35),transparent)] blur-2xl" />
            <div className="glass relative overflow-hidden rounded-xl shadow-glow">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-white/20" />
                    <span className="size-2.5 rounded-full bg-white/20" />
                    <span className="size-2.5 rounded-full bg-white/20" />
                  </span>
                  <span className="hidden text-caption font-semibold text-mist/80 sm:inline">{t.console}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/20 px-2.5 py-1 text-caption font-semibold text-teal-glow">
                  <LockKeyhole aria-hidden="true" className="size-3.5" strokeWidth={2.25} />
                  {t.consoleStatus}
                </span>
              </div>
              <div className="px-3 py-6 sm:px-6 sm:py-8">
                <HeroSchematic labels={t.schematic} tone="dark" />
              </div>
            </div>
            {/* floating badges */}
            <div className="float-slow absolute -top-7 left-[40%] hidden items-center gap-3 rounded-md bg-white px-4 py-3 shadow-lift xl:flex" data-draft>
              <span className="grid size-9 place-items-center rounded-sm bg-mist-100 text-teal-ink">
                <Network aria-hidden="true" className="size-5" strokeWidth={1.9} />
              </span>
              <span className="text-small font-semibold text-ink">{t.badge1}</span>
            </div>
            <div className="float-slower absolute -right-4 -bottom-6 hidden items-center gap-3 rounded-md bg-white px-4 py-3 shadow-lift xl:flex" data-draft>
              <span className="grid size-9 place-items-center rounded-sm bg-orange-tint text-orange-ink">
                <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={1.9} />
              </span>
              <span className="text-small font-semibold text-ink">{t.badge2}</span>
            </div>
          </div>
        </div>
      </div>

      <LogoMarquee locale={locale} />
    </section>
  );
}
