import { copy, contact } from "@/content/site";
import { aiGroup, serviceGroups } from "@/content/services";
import { live, routes, type Locale } from "@/lib/i18n";
import { Logo } from "./Logo";
import { SiteNav, type NavData } from "./SiteNav";

export function Header({ locale, alternateHref }: { locale: Locale; alternateHref: string }) {
  const t = copy[locale];
  const r = routes[locale];
  const [featured, ...products] = aiGroup.services;

  const data: NavData = {
    homeHref: r.home,
    homeLabel: "Evenir",
    labels: { ...t.nav, featuredBadge: t.portfolio.featuredBadge },
    ai: {
      featured: {
        id: featured.id,
        name: featured.name[locale],
        description: featured.description[locale],
        href: featured.href,
        external: true,
        icon: featured.icon,
      },
      products: products.map((p) => ({
        id: p.id,
        name: p.name[locale],
        description: p.description[locale],
        href: p.href,
        external: true,
        icon: p.icon,
      })),
      allHref: r.ai,
    },
    services: {
      allHref: r.services,
      groups: serviceGroups.map((g) => ({
        title: g.title[locale],
        href: r.serviceGroup(g.id[locale]),
        items: g.services.map((s) => ({ name: s.name[locale], href: r.serviceGroup(s.id) })),
      })),
    },
    casesHref: r.cases,
    aboutHref: r.about,
    careersHref: live("/kariera/"),
    contactHref: r.contact,
    langs: [
      { code: "CS", label: "Čeština", href: locale === "cs" ? r.home : alternateHref, current: locale === "cs" },
      { code: "EN", label: "English", href: locale === "en" ? r.home : alternateHref, current: locale === "en" },
      { code: "DE", label: "Deutsch", href: live("/de/homepage-3/"), current: false, external: true },
    ],
    contact: { email: contact.email, phone: contact.phone, phoneHref: contact.phoneHref },
  };

  return (
    <>
      <a
        href="#obsah"
        className="sr-only fixed top-3 left-3 z-[70] rounded-md bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only"
      >
        {t.skip}
      </a>
      <SiteNav data={data} logo={<Logo href={r.home} className="h-[1.6rem] lg:h-[1.85rem]" label={locale === "cs" ? "Evenir — hlavní stránka" : "Evenir — homepage"} />} />
    </>
  );
}
