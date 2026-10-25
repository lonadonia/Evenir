export type Locale = "cs" | "en";

export const locales: Locale[] = ["cs", "en"];

/** Internal routes of the redesigned pages, per locale. */
export const routes = {
  cs: {
    home: "/",
    ai: "/#ai-reseni",
    cases: "/#pripadove-studie",
    contact: "/#kontakt",
    about: "/#o-nas",
    services: "/sluzby",
    serviceGroup: (id: string) => `/sluzby#${id}`,
    caseStudy: (slug: string) => `/pripadove-studie/${slug}`,
  },
  en: {
    home: "/en",
    ai: "/en#ai-solutions",
    cases: "/en#case-studies",
    contact: "/en#contact",
    about: "/en#about",
    services: "/en/services",
    serviceGroup: (id: string) => `/en/services#${id}`,
    caseStudy: (slug: string) => `/en/case-studies/${slug}`,
  },
} as const;

/** Section anchors used on the homepage, per locale. */
export const anchors = {
  cs: { ai: "ai-reseni", cases: "pripadove-studie", contact: "kontakt", about: "o-nas", services: "sluzby-prehled" },
  en: { ai: "ai-solutions", cases: "case-studies", contact: "contact", about: "about", services: "services-overview" },
} as const;

/**
 * Existing evenir.cz destinations. Detail pages are outside the agreed redesign
 * scope, so links route to the live pages (annotated in the review notes).
 */
export const LIVE = "https://evenir.cz";
export const live = (path: string) => `${LIVE}${path}`;

export const otherLocale = (l: Locale): Locale => (l === "cs" ? "en" : "cs");

/** Map a page to its counterpart in the other locale. */
export function alternatePath(locale: Locale, page: "home" | "services" | { caseStudy: string }) {
  const target = otherLocale(locale);
  if (page === "home") return routes[target].home;
  if (page === "services") return routes[target].services;
  return routes[target].caseStudy(page.caseStudy);
}
