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
const AREA = 2600;
const size = (r: number) => {
  let h = Math.min(44, Math.sqrt(AREA / r));
  if (h * r > 128) h = 128 / r;
  return { h: Math.round(h), w: Math.round(h * r) };
};

/**
 * Client logos as a slow, endless band at the foot of the dark hero.
 * Rendered twice for a seamless loop; the copy is hidden from assistive tech.
 * Pauses on hover; static (wrapping) when reduced motion is requested.
 */
export function LogoMarquee({ locale }: { locale: Locale }) {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pe-14 sm:gap-20 sm:pe-20">
      {LOGOS.map((l) => {
        const { h, w } = size(l.r);
        return (
          <li key={l.file} className="flex h-12 items-center">
            <img
              src={`/clients/${l.file}.svg`}
              alt={hidden ? "" : l.name}
              width={w}
              height={h}
              loading="lazy"
              className="h-auto opacity-60 brightness-0 invert transition-opacity hover:opacity-100"
              style={{ width: w }}
            />
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="relative border-t border-white/10 bg-abyss/40">
      <div className="container-page relative flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:gap-10">
        <Note n={3} text={notes.logos[locale]} className="-top-4 right-4" align="end" />
        <h2 className="shrink-0 text-small font-semibold text-mist/80 lg:max-w-[12rem]">{copy[locale].logos.title}</h2>
        <div className="marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee-track flex w-max motion-reduce:w-auto motion-reduce:flex-wrap">
            {list(false)}
            <div className="motion-reduce:hidden">{list(true)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
