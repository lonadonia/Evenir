/* eslint-disable @next/next/no-img-element -- partner badges are the client's original assets */
import Image from "next/image";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { allServices, serviceGroups } from "@/content/services";
import { anchors, live, type Locale } from "@/lib/i18n";
import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Note } from "@/components/notes/Note";
import team from "@/public/photos/team-meeting.jpg";

export function About({ locale }: { locale: Locale }) {
  const t = copy[locale].about;
  const ext = copy[locale].nav.external;
  const facts = [
    { value: String(allServices.length), label: locale === "cs" ? "služeb v nabídce" : "services offered" },
    { value: String(serviceGroups.length), label: locale === "cs" ? "oblastí AI a IT" : "AI & IT areas" },
    { value: "CS · EN · DE", label: locale === "cs" ? "jazykové verze webu" : "website languages" },
  ];
  return (
    <section id={anchors[locale].about} aria-labelledby="about-title" className="relative overflow-hidden pb-section">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="reveal relative lg:col-span-6">
          <Note n={10} text={notes.about[locale]} className="-top-4 -left-2 z-40" />
          <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-teal/25 via-mist to-orange/20 blur-xl" />
          <div className="relative overflow-hidden rounded-xl shadow-lift ring-1 ring-black/5">
            <Image
              src={team}
              alt={t.photoAlt}
              sizes="(min-width: 1024px) 40rem, 100vw"
              placeholder="blur"
              loading="eager"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss/55 via-transparent to-transparent" />
          </div>
          <div className="float-slow absolute -right-3 -bottom-8 rounded-lg bg-white p-4 shadow-lift ring-1 ring-line sm:-right-8">
            <p className="text-caption font-semibold text-graphite">{t.partners}</p>
            <ul className="mt-2.5 flex items-center gap-2">
              <li className="grid h-10 place-items-center rounded-sm bg-teal-night px-2.5">
                <img src="/partners/microsoft-csp.svg" alt="Microsoft Cloud Solution Provider" className="h-6 w-auto" />
              </li>
              <li className="grid h-10 place-items-center rounded-sm bg-teal-night px-2.5">
                <img src="/partners/dell-technologies.webp" alt="Dell Technologies Authorized Partner" className="h-5 w-auto" />
              </li>
            </ul>
          </div>
        </div>
        <div className="reveal lg:col-span-5 lg:col-start-8">
          <Eyebrow>{locale === "cs" ? "Kdo jsme" : "Who we are"}</Eyebrow>
          <h2 id="about-title" className="display mt-5 text-h2">
            {t.title}
          </h2>
          <p className="mt-6 text-lead text-ink">{t.text}</p>
          <p className="mt-4 max-w-[48ch]">{t.text2}</p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="display block text-[clamp(1.25rem,1rem+1.2vw,2rem)] leading-none text-teal-ink tabular">{f.value}</span>
                  <span className="mt-2 block text-caption font-semibold text-graphite">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <ArrowLink href={live("/o-nas/")} external hint={ext}>
              {t.more}
            </ArrowLink>
            <ArrowLink href={live("/kariera/")} external hint={ext}>
              {t.careers}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
