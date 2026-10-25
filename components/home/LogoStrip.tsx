/* eslint-disable @next/next/no-img-element -- client logos are the client's existing SVG assets */
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import type { Locale } from "@/lib/i18n";
import { Note } from "@/components/notes/Note";

/** Logos carried over from the live site (set unchanged). r = viewBox aspect ratio. */
const LOGOS = [
  { file: "generali", name: "Generali", r: 82.75 / 68.48 },
  { file: "allianz", name: "Allianz", r: 270.39 / 70.17 },
  { file: "dhl", name: "DHL", r: 194.31 / 33.8 },
  { file: "accenture", name: "Accenture", r: 194.31 / 68.03 },
  { file: "hcl", name: "HCLTech", r: 194.31 / 42.69 },
  { file: "pimco", name: "PIMCO", r: 270.39 / 36.26 },
  { file: "pewag", name: "pewag", r: 61.41 / 19.54 },
  { file: "drees", name: "Drees & Sommer", r: 267.57 / 89.37 },
  { file: "msmt", name: "Ministerstvo školství, mládeže a tělovýchovy", r: 156.45 / 74.68 },
  { file: "cvut", name: "České vysoké učení technické v Praze", r: 153.18 / 74.68 },
  { file: "chmu", name: "Český hydrometeorologický ústav", r: 270.39 / 102.29 },
  { file: "volarik", name: "Volarik Capital", r: 61.41 / 35.22 },
];

/** Optical sizing: equal visual area per logo, capped height/width. */
const AREA = 2900;
const size = (r: number) => {
  let h = Math.min(46, Math.sqrt(AREA / r));
  if (h * r > 132) h = 132 / r;
  return { h: Math.round(h), w: Math.round(h * r) };
};

export function LogoStrip({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="logos-title" className="relative border-y border-line bg-white">
      <div className="container-page relative py-9 lg:py-10">
        <Note n={3} text={notes.logos[locale]} className="-top-4 right-4" align="end" />
        <div className="grid items-center gap-y-6 lg:grid-cols-12 lg:gap-x-8">
          <h2 id="logos-title" className="text-small font-semibold text-graphite lg:col-span-2">
            {copy[locale].logos.title}
          </h2>
          <ul className="grid grid-cols-3 items-center gap-x-6 gap-y-7 sm:grid-cols-4 lg:col-span-10 lg:grid-cols-6 lg:gap-x-10">
            {LOGOS.map((l) => {
              const { h, w } = size(l.r);
              return (
                <li key={l.file} className="flex h-12 items-center justify-center lg:justify-start">
                  <img
                    src={`/clients/${l.file}.svg`}
                    alt={l.name}
                    width={w}
                    height={h}
                    loading="lazy"
                    className="h-auto max-w-full scale-90 opacity-80 grayscale sm:scale-100"
                    style={{ width: w }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
