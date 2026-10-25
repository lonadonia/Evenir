import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { routes, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/Section";
import { Note } from "@/components/notes/Note";

/** How we work — four steps on one connector line (the schematic language again). */
export function Process({ locale }: { locale: Locale }) {
  const t = copy[locale].process;
  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden py-section">
      <div className="container-page relative">
        <Note n={7} text={notes.process[locale]} className="-top-10 left-0" />
        <SectionHeader
          id="process-title"
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleA}
              <span className="em-teal">{t.titleEm}</span>
            </>
          }
          lead={t.lead}
        />

        <ol className="relative mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* connector line (desktop) */}
          <span aria-hidden="true" className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-teal/20 via-teal to-teal/20 lg:block">
            <span className="process-pulse absolute -top-[3px] left-0 size-[7px] rounded-full bg-orange shadow-[0_0_12px_3px_rgb(255_130_67/0.6)]" />
          </span>
          {/* connector line (mobile) */}
          <span aria-hidden="true" className="absolute top-7 bottom-7 left-7 w-px bg-gradient-to-b from-teal via-teal/60 to-teal/10 lg:hidden" />
          {t.steps.map((s, i) => (
            <li key={s.title} className="reveal relative grid grid-cols-[3.5rem_1fr] gap-5 lg:block lg:text-center">
              <span className="relative z-10 grid size-14 place-items-center rounded-full border border-teal/30 bg-white shadow-card lg:mx-auto">
                <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-teal to-teal-deep text-small font-bold text-white tabular">
                  {i + 1}
                </span>
              </span>
              <div className="lg:mt-6">
                <h3 className="display-tight text-h4">{s.title}</h3>
                <p className="mt-2 text-small lg:mx-auto lg:max-w-[26ch]" data-draft>
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <ButtonLink href={routes[locale].contact} size="lg" icon="right">
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
