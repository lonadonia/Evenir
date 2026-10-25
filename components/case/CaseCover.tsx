import { ImageIcon } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/content/site";
import { CallMockup, CustomMockup, EstateMockup, SalesMockup } from "@/components/home/ProductMockups";

const MOCK: Record<string, (p: { locale: Locale }) => React.ReactElement> = {
  "call-care-ai": CallMockup,
  "ai-sales": SalesMockup,
  "real-estate-ai": EstateMockup,
  "custom-ai": CustomMockup,
};

/**
 * Designed cover for a story until the client supplies project photography.
 * Brand surface + the product's interface motif; clearly labelled as sample.
 */
export function CaseCover({
  story,
  locale,
  className = "",
  size = "md",
}: {
  story: CaseStudy;
  locale: Locale;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const Mock = MOCK[story.serviceId];
  const t = copy[locale].cases;
  const width = size === "lg" ? "max-w-[26rem]" : size === "md" ? "max-w-[20rem]" : "max-w-[15rem]";
  return (
    <div className={`on-dark surface-deep relative isolate grid place-items-center overflow-hidden ${className}`}>
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(25_146_155/0.5),transparent)]" />
      <div className={`w-full ${width} px-4 transition-transform duration-500 group-hover:scale-[1.03]`}>{Mock && <Mock locale={locale} />}</div>
      <span className="label absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-ink shadow-card">{t.sample}</span>
      {size !== "sm" && (
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1 text-caption text-mist backdrop-blur">
          <ImageIcon aria-hidden="true" className="size-3.5" strokeWidth={2} />
          {t.imageSlot}
        </span>
      )}
    </div>
  );
}
