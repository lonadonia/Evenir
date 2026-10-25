import Link from "next/link";
import { copy } from "@/content/site";
import { notes } from "@/content/notes";
import { kindLabel, serviceGroups, allServices } from "@/content/services";
import { alternatePath, routes, type Locale } from "@/lib/i18n";
import { SiteShell } from "@/components/site/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { Note } from "@/components/notes/Note";
import { Catalogue, type CatalogueGroup, type CatalogueText } from "./Catalogue";

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = copy[locale].services;
  const r = routes[locale];
  const n = allServices.length;

  const groups: CatalogueGroup[] = serviceGroups.map((g) => ({
    id: g.id[locale],
    title: g.title[locale],
    intro: g.intro[locale],
    extraLink: g.extraLink ? { label: g.extraLink.label[locale], href: g.extraLink.href } : undefined,
    items: g.services.map((s) => ({
      id: s.id,
      name: s.name[locale],
      description: s.description[locale],
      kind: kindLabel[s.kind][locale],
      icon: s.icon,
      href: s.href,
      featured: s.featured,
      keywords: s.keywords ?? "",
    })),
  }));

  const range = Array.from({ length: n + 1 }, (_, i) => i);
  const text: CatalogueText = {
    filterLabel: t.filterLabel,
    filterPlaceholder: t.filterPlaceholder,
    groupsLabel: t.groupsLabel,
    detail: t.detail,
    empty: t.empty,
    emptyHint: t.emptyHint,
    clear: t.clear,
    featuredBadge: copy[locale].portfolio.featuredBadge,
    external: copy[locale].nav.external,
    contactHref: r.contact,
    contactLabel: t.cta,
    counts: Object.fromEntries(range.map((i) => [i, t.count(i)])),
    results: Object.fromEntries(range.map((i) => [i, t.results(i)])),
  };

  return (
    <SiteShell locale={locale} alternateHref={alternatePath(locale, "services")} overlay>
      <section
        aria-labelledby="services-title"
        className="on-dark surface-abyss relative isolate -mt-16 overflow-hidden text-mist lg:-mt-[4.75rem]"
      >
        <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
        <div className="container-page pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
          <nav aria-label="Breadcrumb" className="enter enter-1">
            <ol className="flex items-center gap-2 text-caption text-mist/75">
              <li>
                <Link href={r.home} className="link">
                  {t.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-white">
                {t.title}
              </li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 id="services-title" className="display enter enter-2 text-[clamp(2.375rem,1.3rem+4vw,4.5rem)] leading-[1.02] text-white lg:col-span-8">
              {t.titleA}
              <span className="em-teal">{t.titleEm}</span>
            </h1>
            <div className="enter enter-3 lg:col-span-4">
              <p className="text-lead text-mist/90" data-draft>
                {t.lead}
              </p>
              <dl className="mt-6 flex gap-3">
                <div className="glass rounded-md px-4 py-3">
                  <dt className="text-caption text-mist/75">{locale === "cs" ? "Služby" : "Services"}</dt>
                  <dd className="display text-h3 leading-none text-white tabular">{n}</dd>
                </div>
                <div className="glass rounded-md px-4 py-3">
                  <dt className="text-caption text-mist/75">{locale === "cs" ? "Oblasti" : "Areas"}</dt>
                  <dd className="display text-h3 leading-none text-white tabular">{serviceGroups.length}</dd>
                </div>
              </dl>
            </div>
          </div>
          <ul className="enter enter-4 mt-10 flex flex-wrap gap-2 lg:mt-14">
            {groups.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/14 bg-white/5 px-4 text-small font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  {g.title}
                  <span className="rounded-full bg-white/10 px-1.5 text-caption text-mist tabular">{g.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-page py-12 lg:py-16">
        <Catalogue
          groups={groups}
          t={text}
          notes={
            <>
              <Note n={1} text={notes.catalogue[locale]} className="-top-10 left-0" />
              <Note n={2} text={notes.catalogueCopy[locale]} className="-top-10 left-10" />
            </>
          }
        />
      </div>

      <section className="container-page pb-section">
        <div className="on-dark surface-deep relative flex flex-col gap-6 overflow-hidden rounded-xl p-8 text-mist sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
          <div className="relative">
            <h2 className="display text-h3 text-white">{t.ctaTitle}</h2>
            <p className="mt-2 max-w-[48ch]">{t.ctaText}</p>
          </div>
          <ButtonLink href={r.contact} size="lg" className="relative shrink-0 shadow-[0_12px_40px_-14px_rgb(255_130_67/0.8)]">
            {t.cta}
          </ButtonLink>
        </div>
      </section>
    </SiteShell>
  );
}
