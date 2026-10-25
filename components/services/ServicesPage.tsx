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
    <SiteShell locale={locale} alternateHref={alternatePath(locale, "services")}>
      <section aria-labelledby="services-title" className="border-b border-line bg-mist-50">
        <div className="container-page pt-8 pb-14 lg:pt-10 lg:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-caption text-graphite">
              <li>
                <Link href={r.home} className="link">
                  {t.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-ink">
                {t.title}
              </li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 id="services-title" className="display text-h1 lg:col-span-8">
              {t.titleA}
              <span className="em-teal">{t.titleEm}</span>
            </h1>
            <div className="lg:col-span-4">
              <p className="text-lead" data-draft>
                {t.lead}
              </p>
              <p className="mt-4 text-small font-semibold text-ink tabular">
                {t.count(n)} · {serviceGroups.length} {locale === "cs" ? "oblastí" : "areas"}
              </p>
            </div>
          </div>
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
        <div className="on-dark flex flex-col gap-6 rounded-xl bg-teal-deep p-8 text-mist sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="display text-h3 text-white">{t.ctaTitle}</h2>
            <p className="mt-2 max-w-[48ch]">{t.ctaText}</p>
          </div>
          <ButtonLink href={r.contact} size="lg" className="shrink-0">
            {t.cta}
          </ButtonLink>
        </div>
      </section>
    </SiteShell>
  );
}
