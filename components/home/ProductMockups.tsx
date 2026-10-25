import { BedDouble, Building2, FileText, Headset, Mail, MapPin, Maximize2, Sparkles, UserRound, Database, BarChart3, LayoutGrid } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * Illustrative product interfaces for the portfolio tiles.
 * Skeleton bars stand in for content: no invented figures, names or features —
 * only the product's domain (sales enquiries, calls, properties) is suggested.
 */

const L = {
  cs: {
    enquiry: "Nová poptávka",
    priority: "Priorita",
    call: "Hovor",
    live: "Probíhá",
    property: "Nemovitost",
    modules: ["Dokumenty", "E-maily", "Microsoft 365", "CRM", "Interní data", "Reporty"],
    core: "Vaše AI",
  },
  en: {
    enquiry: "New enquiry",
    priority: "Priority",
    call: "Call",
    live: "Live",
    property: "Property",
    modules: ["Documents", "Emails", "Microsoft 365", "CRM", "Internal data", "Reports"],
    core: "Your AI",
  },
} as const;

const Bar = ({ w, tone = "line" }: { w: string; tone?: "line" | "ink" | "teal" }) => (
  <span
    className={`block h-2 rounded-full ${tone === "ink" ? "bg-ink/70" : tone === "teal" ? "bg-teal/70" : "bg-line"}`}
    style={{ width: w }}
  />
);

export function SalesMockup({ locale }: { locale: Locale }) {
  const t = L[locale];
  return (
    <div aria-hidden="true" className="relative h-full min-h-48 p-5 sm:p-6">
      <div className="absolute top-6 right-5 w-[58%] rotate-[4deg] rounded-md bg-white/80 p-3 shadow-card ring-1 ring-line">
        <Bar w="70%" />
        <div className="mt-2">
          <Bar w="45%" />
        </div>
      </div>
      <div className="relative w-[82%] rounded-md bg-white p-4 shadow-lift ring-1 ring-orange/40 transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist-100 text-teal-ink">
            <UserRound className="size-4.5" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-caption font-semibold text-ink">{t.enquiry}</p>
            <div className="mt-1.5">
              <Bar w="60%" />
            </div>
          </div>
          <span className="rounded-full bg-orange-tint px-2 py-0.5 text-caption font-semibold text-orange-ink">{t.priority}</span>
        </div>
        <div className="mt-4 grid gap-2">
          <Bar w="92%" />
          <Bar w="76%" />
          <Bar w="58%" />
        </div>
      </div>
      <div className="absolute right-5 bottom-5 flex h-20 items-end gap-1.5 rounded-md bg-white px-3 pt-3 pb-3 shadow-card ring-1 ring-line">
        {[35, 55, 42, 70, 88].map((h, i) => (
          <span key={i} className={`w-3 rounded-sm ${i === 4 ? "bg-orange" : "bg-teal/70"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function CallMockup({ locale }: { locale: Locale }) {
  const t = L[locale];
  const bars = [30, 55, 80, 45, 95, 60, 35, 70, 50, 85, 40, 65, 30, 55, 75];
  return (
    <div aria-hidden="true" className="relative h-full min-h-48 p-5 sm:p-6">
      <div className="rounded-md bg-white p-4 shadow-lift ring-1 ring-line transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-caption font-semibold text-ink">
            <span className="grid size-7 place-items-center rounded-full bg-teal-deep text-white">
              <Headset className="size-3.5" strokeWidth={2.25} />
            </span>
            {t.call}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mist-100 px-2 py-0.5 text-caption font-semibold text-teal-ink">
            <span className="blink size-1.5 rounded-full bg-orange" />
            {t.live}
          </span>
        </div>
        <div className="mt-4 flex h-10 items-center gap-[3px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`wave-bar w-1.5 rounded-full ${i === 4 || i === 9 ? "bg-orange" : "bg-teal/80"}`}
              style={{ height: `${h}%`, animationDelay: `${(i % 5) * 0.12}s` }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 ms-auto w-[78%] rounded-md rounded-tr-xs bg-teal-deep p-3 shadow-card">
        <span className="block h-2 w-[85%] rounded-full bg-white/50" />
        <span className="mt-2 block h-2 w-[60%] rounded-full bg-white/30" />
      </div>
      <div className="mt-2 w-[70%] rounded-md rounded-tl-xs bg-white p-3 shadow-card ring-1 ring-line">
        <Bar w="80%" />
        <div className="mt-2">
          <Bar w="50%" />
        </div>
      </div>
    </div>
  );
}

export function EstateMockup({ locale }: { locale: Locale }) {
  const t = L[locale];
  return (
    <div aria-hidden="true" className="relative h-full min-h-48 p-5 sm:p-6">
      <div className="overflow-hidden rounded-md bg-white shadow-lift ring-1 ring-line transition-transform duration-500 group-hover:-translate-y-1">
        <div className="relative h-24 bg-gradient-to-br from-teal-deep via-[#0f5f65] to-teal">
          <div className="grid-lines absolute inset-0 opacity-60" />
          <Building2 className="absolute bottom-3 left-4 size-10 text-white/85" strokeWidth={1.5} />
          <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white shadow-card">
            <MapPin className="size-4 text-orange-ink" strokeWidth={2.25} />
          </span>
        </div>
        <div className="p-3.5">
          <p className="text-caption font-semibold text-ink">{t.property}</p>
          <div className="mt-2">
            <Bar w="70%" />
          </div>
          <div className="mt-3 flex gap-2">
            {[BedDouble, Maximize2].map((I, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-mist-50 px-2 py-1 ring-1 ring-line">
                <I className="size-3.5 text-teal-ink" strokeWidth={2} />
                <span className="block h-1.5 w-6 rounded-full bg-line" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <span className="float-slow absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-orange text-ink shadow-[0_10px_30px_-8px_rgb(255_130_67/0.8)]">
        <Sparkles className="size-5" strokeWidth={2} />
      </span>
    </div>
  );
}

/** Featured Custom AI visual: your systems as modules around a tailored core. */
export function CustomMockup({ locale }: { locale: Locale }) {
  const t = L[locale];
  const icons = [FileText, Mail, LayoutGrid, UserRound, Database, BarChart3];
  // positions on a 2 × 3 ring around the core (percent of the box)
  const pos = [
    "top-[6%] left-[2%]",
    "top-[40%] left-0",
    "bottom-[6%] left-[2%]",
    "top-[6%] right-[2%]",
    "top-[40%] right-0",
    "bottom-[6%] right-[2%]",
  ];
  return (
    <div aria-hidden="true" className="@container relative mx-auto aspect-[5/4] w-full max-w-[30rem]">
      <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <filter id="cm-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        {[
          "M110 62 H170 Q190 62 190 82 V150 Q190 170 210 170",
          "M100 200 H210",
          "M110 338 H170 Q190 338 190 318 V250 Q190 230 210 230",
          "M390 62 H330 Q310 62 310 82 V150 Q310 170 290 170",
          "M400 200 H290",
          "M390 338 H330 Q310 338 310 318 V250 Q310 230 290 230",
        ].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#3fb3bb" strokeWidth="5" opacity="0.3" filter="url(#cm-blur)" />
            <path d={d} stroke="#3fb3bb" strokeWidth="1.5" strokeDasharray={i % 2 ? "0" : "4 5"} />
          </g>
        ))}
        <circle cx="250" cy="200" r="120" fill="url(#cm-halo)" />
        <radialGradient id="cm-halo">
          <stop offset="0" stopColor="#19929b" stopOpacity="0.45" />
          <stop offset="1" stopColor="#19929b" stopOpacity="0" />
        </radialGradient>
      </svg>
      {/* core */}
      <div className="absolute top-1/2 left-1/2 grid size-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28%] bg-gradient-to-br from-[#1aa3ad] via-[#0f5f65] to-[#0a3f43] shadow-[0_0_0_1px_rgb(140_230_236/0.45),0_20px_60px_-10px_rgb(25_146_155/0.8)]">
        <div className="text-center">
          <span className="relative mx-auto grid size-9 place-items-center">
            <span className="absolute inset-0 animate-signal rounded-full bg-orange/50 motion-reduce:hidden" />
            <span className="relative grid size-9 place-items-center rounded-full bg-orange text-ink">
              <Sparkles className="size-4.5" strokeWidth={2.25} />
            </span>
          </span>
          <span className="display-tight mt-2 block text-small text-white">{t.core}</span>
        </div>
      </div>
      {t.modules.map((m, i) => {
        const Icon = icons[i];
        return (
          <span
            key={m}
            className={`absolute ${pos[i]} inline-flex items-center gap-2 rounded-md border border-white/14 bg-white/[0.07] p-2 text-caption font-semibold text-white backdrop-blur @min-[22rem]:w-[36%] @min-[22rem]:px-2.5 @min-[26rem]:w-auto @min-[26rem]:min-w-[8.5rem]`}
          >
            <Icon className="size-4 shrink-0 text-teal-glow" strokeWidth={2} />
            <span className="hidden truncate @min-[22rem]:inline">{m}</span>
          </span>
        );
      })}
    </div>
  );
}
