import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { serviceGroups } from "@/content/services";
import { anchors, routes, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceGlyph } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Section";
import { Note } from "@/components/notes/Note";

/** Homepage index of the non-AI service areas — AI is the front door, not a replacement. */
export function Foundations({ locale }: { locale: Locale }) {
  const t = copy[locale].foundations;
  const r = routes[locale];
  const groups = serviceGroups.slice(1);

  return (
    <section id={anchors[locale].services} aria-labelledby="foundations-title" className="on-mist relative isolate overflow-hidden bg-mist-50 py-section">
      <div aria-hidden="true" className="grid-lines-light absolute inset-0 -z-10" />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-4">
          <Note n={8} text={notes.foundations[locale]} className="-top-10 left-0" />
          <div className="reveal lg:sticky lg:top-28">
            <Eyebrow>{locale === "cs" ? "IT služby" : "IT services"}</Eyebrow>
            <h2 id="foundations-title" className="display mt-5 text-h2">
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

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:gap-6">
          {groups.map((g) => {
            const shown = g.services.slice(0, 4);
            const rest = g.services.length - shown.length;
            return (
              <li key={g.id[locale]} className="reveal">
                <article
                  data-spotlight
                  className="group relative flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-lift sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-md bg-gradient-to-br from-teal to-teal-deep text-white shadow-[0_10px_24px_-12px_rgb(25_146_155/0.9)]">
                      <ServiceGlyph icon={g.services[0].icon} className="size-5.5" />
                    </span>
                    <span className="rounded-full bg-mist-100 px-2.5 py-1 text-caption font-semibold text-teal-ink tabular">
                      {copy[locale].services.count(g.services.length)}
                    </span>
                  </div>
                  <h3 className="display-tight mt-6 text-h4">
                    <Link href={r.serviceGroup(g.id[locale])} className="inline-flex items-center gap-2 hover:text-teal-ink">
                      {g.title[locale]}
                      <ArrowRight aria-hidden="true" className="size-4 -translate-x-1 opacity-0 transition-[opacity,transform] group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </h3>
                  <p className="mt-2 text-small">{g.intro[locale]}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {shown.map((s) => (
                      <li key={s.id}>
                        <Link
                          href={r.serviceGroup(s.id)}
                          className="inline-flex min-h-9 items-center rounded-full border border-line bg-mist-50 px-3 text-caption font-semibold text-ink transition-colors hover:border-teal-ink hover:bg-white"
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
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
