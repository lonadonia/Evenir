/* eslint-disable @next/next/no-img-element -- partner badges are the client's original assets */
import Image from "next/image";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { anchors, live, type Locale } from "@/lib/i18n";
import { ArrowLink } from "@/components/ui/Button";
import { Note } from "@/components/notes/Note";
import team from "@/public/photos/team-meeting.jpg";

export function About({ locale }: { locale: Locale }) {
  const t = copy[locale].about;
  const ext = copy[locale].nav.external;
  return (
    <section id={anchors[locale].about} aria-labelledby="about-title" className="relative pb-section">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6 lg:col-start-1">
          <Note n={8} text={notes.about[locale]} className="-top-4 -left-2" />
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={team}
              alt={t.photoAlt}
              sizes="(min-width: 1024px) 40rem, 100vw"
              placeholder="blur"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id="about-title" className="display text-h2">
            {t.title}
          </h2>
          <p className="mt-6 text-lead text-ink">{t.text}</p>
          <p className="mt-4 max-w-[48ch]">{t.text2}</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <ArrowLink href={live("/o-nas/")} external hint={ext}>
              {t.more}
            </ArrowLink>
            <ArrowLink href={live("/kariera/")} external hint={ext}>
              {t.careers}
            </ArrowLink>
          </div>
          <div className="mt-10 border-t border-line pt-6">
            <p className="text-caption font-semibold text-graphite">{t.partners}</p>
            <ul className="mt-4 flex flex-wrap items-center gap-3">
              <li className="grid h-12 place-items-center rounded-sm bg-teal-night px-3">
                <img src="/partners/microsoft-csp.svg" alt="Microsoft Cloud Solution Provider" className="h-7 w-auto" />
              </li>
              <li className="grid h-12 place-items-center rounded-sm bg-teal-night px-3">
                <img src="/partners/dell-technologies.webp" alt="Dell Technologies Authorized Partner" className="h-6 w-auto" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
