import { Layers, Network, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import type { Locale } from "@/lib/i18n";
import { SectionHeader } from "@/components/ui/Section";
import { Note } from "@/components/notes/Note";

const ICONS: Record<string, LucideIcon> = { shield: ShieldCheck, network: Network, layers: Layers, users: Users };

/** Why Evenir — the trust argument for executives wary of AI hype. */
export function WhyEvenir({ locale }: { locale: Locale }) {
  const t = copy[locale].why;
  return (
    <section aria-labelledby="why-title" className="on-dark surface-abyss relative isolate overflow-hidden py-section text-mist">
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
      <div className="container-page relative">
        <Note n={6} text={notes.why[locale]} className="-top-8 left-0" />
        <SectionHeader
          id="why-title"
          tone="dark"
          align="center"
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleA}
              <span className="em-teal">{t.titleEm}</span>
            </>
          }
          lead={t.lead}
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {t.items.map((it, i) => {
            const Icon = ICONS[it.icon];
            return (
              <li key={it.title} className="reveal">
                <article
                  data-spotlight
                  style={{ "--spot": "rgb(92 198 205 / 0.18)" } as React.CSSProperties}
                  className="glass group relative h-full rounded-xl p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/25 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-md bg-gradient-to-br from-teal to-teal-deep text-white shadow-[0_10px_30px_-10px_rgb(25_146_155/0.9)] ring-1 ring-white/15">
                      <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                    </span>
                    <span aria-hidden="true" className="display text-[2rem] leading-none text-white/10 tabular">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="display-tight mt-6 text-h4 text-white">{it.title}</h3>
                  <p className="mt-2.5 text-small text-mist/85" data-draft>
                    {it.text}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
