"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { ServiceGlyph } from "@/components/ui/icons";
import type { ServiceIcon } from "@/content/services";

export type CatalogueItem = {
  id: string;
  name: string;
  description: string;
  kind: string;
  icon: ServiceIcon;
  href: string;
  featured?: boolean;
  keywords: string;
};
export type CatalogueGroup = {
  id: string;
  title: string;
  intro: string;
  extraLink?: { label: string; href: string };
  items: CatalogueItem[];
};
export type CatalogueText = {
  filterLabel: string;
  filterPlaceholder: string;
  groupsLabel: string;
  detail: string;
  empty: string;
  emptyHint: string;
  clear: string;
  featuredBadge: string;
  external: string;
  contactHref: string;
  contactLabel: string;
  counts: Record<number, string>;
  results: Record<number, string>;
};

const norm = (s: string) =>
  s
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export function Catalogue({ groups, t, notes }: { groups: CatalogueGroup[]; t: CatalogueText; notes?: React.ReactNode }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(groups[0]?.id);

  const filtered = useMemo(() => {
    const nq = norm(q.trim());
    if (!nq) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((it) => norm(`${it.name} ${it.description} ${it.keywords} ${g.title}`).includes(nq)),
      }))
      .filter((g) => g.items.length);
  }, [q, groups]);

  const total = filtered.reduce((n, g) => n + g.items.length, 0);

  // Scroll-spy for the area index
  useEffect(() => {
    const els = filtered.map((g) => document.getElementById(g.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* Rail: search (proposed) + area index */}
      <aside className="min-w-0 lg:col-span-3">
        <div className="relative lg:sticky lg:top-28">
          {notes}
          <label htmlFor="svc-filter" className="mb-2 block text-small font-semibold text-ink">
            {t.filterLabel}
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-teal-ink" strokeWidth={2} />
            <input
              id="svc-filter"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.filterPlaceholder}
              autoComplete="off"
              className="block h-13 w-full rounded-sm border-[1.5px] border-line-strong bg-white ps-11 pe-11 text-body text-ink outline-none placeholder:text-graphite/70 hover:border-graphite focus:border-teal-ink focus:shadow-[0_0_0_4px_rgb(25_146_155/0.22)] [&::-webkit-search-cancel-button]:hidden"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="absolute top-1/2 right-1.5 grid size-10 -translate-y-1/2 place-items-center rounded-sm text-graphite hover:bg-mist-100 hover:text-ink"
              >
                <X aria-hidden="true" className="size-4" strokeWidth={2.25} />
                <span className="sr-only">{t.clear}</span>
              </button>
            )}
          </div>
          <p aria-live="polite" className="mt-2 min-h-5 text-caption text-graphite tabular">
            {q ? t.results[total] : ""}
          </p>

          <nav aria-label={t.groupsLabel} className="mt-4 lg:mt-6">
            <p className="label mb-3 hidden text-graphite lg:block">{t.groupsLabel}</p>
            <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:gap-0.5 lg:overflow-visible lg:px-0">
              {filtered.map((g) => {
                const isActive = active === g.id;
                return (
                  <li key={g.id} className="shrink-0">
                    <a
                      href={`#${g.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`flex min-h-11 items-center justify-between gap-3 rounded-full border px-4 text-small font-semibold whitespace-nowrap transition-colors lg:rounded-sm lg:border-0 lg:border-s-2 lg:px-3 ${
                        isActive
                          ? "border-teal-ink bg-mist-100 text-ink lg:border-teal"
                          : "border-line text-graphite hover:bg-mist-50 hover:text-ink lg:border-transparent"
                      }`}
                    >
                      {g.title}
                      <span className="text-caption font-normal tabular">{g.items.length}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Groups */}
      <div className="min-w-0 lg:col-span-9">
        {total === 0 ? (
          <div className="rounded-lg border border-dashed border-line-strong bg-mist-50 px-6 py-14 text-center sm:px-10">
            <p className="display-tight text-h3 text-ink">{t.empty}</p>
            <p className="mx-auto mt-2 max-w-[44ch]">{t.emptyHint}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button type="button" onClick={() => setQ("")} className="link font-semibold">
                {t.clear}
              </button>
              <a href={t.contactHref} className="link font-semibold">
                {t.contactLabel}
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-16 lg:gap-20">
            {filtered.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`}>
                <header className="flex flex-col gap-3 border-b-2 border-ink pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                  <div>
                    <h2 id={`${g.id}-title`} className="display-tight text-h3">
                      {g.title}
                      <span className="ms-3 align-middle text-caption font-semibold text-graphite tabular">{t.counts[g.items.length]}</span>
                    </h2>
                    <p className="mt-2 max-w-[60ch] text-small">{g.intro}</p>
                  </div>
                  {g.extraLink && (
                    <a
                      href={g.extraLink.href}
                      target="_blank"
                      rel="noopener"
                      className="group inline-flex min-h-10 shrink-0 items-center gap-1.5 text-small font-semibold text-teal-ink"
                    >
                      <span className="underline decoration-teal-ink/40 underline-offset-4 group-hover:decoration-teal-ink">{g.extraLink.label}</span>
                      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
                      <span className="sr-only"> ({t.external})</span>
                    </a>
                  )}
                </header>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.id}>
                      <ServiceRow item={it} t={t} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Repeatable service component. New service = new row; text lengths may vary. */
export function ServiceRow({ item, t }: { item: CatalogueItem; t: Pick<CatalogueText, "detail" | "external" | "featuredBadge"> }) {
  return (
    <article
      id={item.id}
      className={`group relative scroll-mt-32 grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-2 border-b border-line py-6 transition-colors target:bg-orange-tint hover:bg-mist-50 sm:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)] sm:gap-x-6 sm:px-3 lg:grid-cols-[3rem_minmax(0,4fr)_minmax(0,6fr)_auto] ${
        item.featured ? "bg-mist-50/70" : ""
      }`}
    >
      {item.featured && <span aria-hidden="true" className="absolute inset-y-0 start-0 w-1 rounded-full bg-orange" />}
      <span
        className={`row-span-2 grid size-11 place-items-center rounded-md sm:row-span-1 sm:size-12 ${
          item.featured ? "bg-teal-deep text-orange" : "bg-mist-100 text-teal-ink group-hover:bg-mist"
        }`}
      >
        <ServiceGlyph icon={item.icon} className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-caption font-semibold text-teal-ink">
          {item.kind}
          {item.featured && <span className="ms-2 rounded-full bg-orange-tint px-2 py-0.5 text-ink">{t.featuredBadge}</span>}
        </p>
        <h3 className="display-tight mt-1 text-h4 break-words hyphens-auto">
          <a
            href={item.href}
            target="_blank"
            rel="noopener"
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {item.name}
            <span className="sr-only">
              {" "}
              — {t.detail} ({t.external})
            </span>
          </a>
        </h3>
      </div>
      <p className="col-start-2 text-small sm:col-start-3 sm:row-start-1 sm:self-center" data-draft>
        {item.description}
      </p>
      <span
        aria-hidden="true"
        className="col-start-2 inline-flex items-center gap-1.5 text-small font-semibold text-teal-ink sm:col-start-3 lg:col-start-4 lg:row-start-1 lg:self-center"
      >
        <span className="underline decoration-teal-ink/40 underline-offset-4 group-hover:decoration-teal-ink lg:sr-only">{t.detail}</span>
        <span className="grid size-9 place-items-center rounded-full transition-colors group-hover:bg-teal-ink group-hover:text-white lg:border lg:border-line">
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      </span>
      <span className="pointer-events-none absolute inset-0 ring-teal-ink ring-inset group-has-[a:focus-visible]:ring-[2.5px]" aria-hidden="true" />
    </article>
  );
}
