import Link from "next/link";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { serviceGroups } from "@/content/services";
import { anchors, routes, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceGlyph } from "@/components/ui/icons";
import { Note } from "@/components/notes/Note";

/** Homepage index of the non-AI service areas — AI is the front door, not a replacement. */
export function Foundations({ locale }: { locale: Locale }) {
  const t = copy[locale].foundations;
  const r = routes[locale];
  const groups = serviceGroups.slice(1);

  return (
    <section id={anchors[locale].services} aria-labelledby="foundations-title" className="on-mist relative bg-mist-50 py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-4">
          <Note n={6} text={notes.foundations[locale]} className="-top-10 left-0" />
          <div className="lg:sticky lg:top-28">
            <h2 id="foundations-title" className="display text-h2">
              {t.titleA}
              <span className="em-teal">{t.titleEm}</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-lead" data-draft>
              {t.lead}
            </p>
            <ButtonLink href={r.services} variant="secondary" icon="right" className="mt-8">
              {t.cta}
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {groups.map((g) => {
            const shown = g.services.slice(0, 4);
            const rest = g.services.length - shown.length;
            return (
              <li key={g.id[locale]} className="flex flex-col bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-md bg-mist-100 text-teal-ink">
                    <ServiceGlyph icon={g.services[0].icon} className="size-5" />
                  </span>
                  <span className="text-caption font-semibold text-graphite tabular">
                    {copy[locale].services.count(g.services.length)}
                  </span>
                </div>
                <h3 className="display-tight mt-6 text-h4">
                  <Link href={r.serviceGroup(g.id[locale])} className="hover:text-teal-ink hover:underline hover:underline-offset-4">
                    {g.title[locale]}
                  </Link>
                </h3>
                <p className="mt-2 text-small">{g.intro[locale]}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {shown.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={r.serviceGroup(s.id)}
                        className="inline-flex min-h-9 items-center rounded-full border border-line px-3 text-caption font-semibold text-ink transition-colors hover:border-teal-ink hover:bg-mist-50"
                      >
                        {s.name[locale]}
                      </Link>
                    </li>
                  ))}
                  {rest > 0 && (
                    <li>
                      <Link
                        href={r.serviceGroup(g.id[locale])}
                        className="inline-flex min-h-9 items-center rounded-full px-3 text-caption font-semibold text-teal-ink underline underline-offset-4"
                      >
                        +{rest} {t.more}
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
