"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Menu, X, Mail, Phone } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { ServiceGlyph } from "@/components/ui/icons";
import type { ServiceIcon } from "@/content/services";

export type NavItem = {
  id: string;
  name: string;
  description?: string;
  href: string;
  icon: ServiceIcon;
  external?: boolean;
};
export type NavGroup = { title: string; href: string; items: { name: string; href: string }[] };

export type NavData = {
  homeHref: string;
  homeLabel: string;
  labels: {
    ai: string;
    services: string;
    cases: string;
    about: string;
    careers: string;
    contactCta: string;
    menu: string;
    close: string;
    allServices: string;
    aiAll: string;
    aiIntro: string;
    language: string;
    mainNav: string;
    external: string;
    featuredBadge: string;
  };
  ai: { featured: NavItem; products: NavItem[]; allHref: string };
  services: { groups: NavGroup[]; allHref: string };
  casesHref: string;
  aboutHref: string;
  careersHref: string;
  contactHref: string;
  langs: { code: string; href: string; current: boolean; external?: boolean; label: string }[];
  contact: { email: string; phone: string; phoneHref: string };
};

type MenuKey = "ai" | "services" | null;

export function SiteNav({ data, logo }: { data: NavData; logo: React.ReactNode }) {
  const [open, setOpen] = useState<MenuKey>(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const aiId = useId();
  const svcId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop menus on Escape / outside click / focus leaving the nav.
  useEffect(() => {
    if (!open) return;
    const current = open;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        triggers.current[current]?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const onBlurNav = (e: React.FocusEvent) => {
    if (navRef.current && !navRef.current.contains(e.relatedTarget as Node)) setOpen(null);
  };

  const toggle = (k: Exclude<MenuKey, null>) => setOpen((o) => (o === k ? null : k));
  const closeAll = useCallback(() => setOpen(null), []);

  const L = data.labels;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/92 backdrop-blur-md transition-[border-color,box-shadow] duration-200 supports-[backdrop-filter]:bg-white/85 ${
        scrolled || open ? "border-line shadow-[0_6px_24px_-18px_rgb(6_46_49/0.35)]" : "border-transparent"
      }`}
    >
      <div ref={navRef} onBlur={onBlurNav} className="container-page flex h-16 items-center gap-6 lg:h-[4.75rem]">
        {logo}

        <nav aria-label={L.mainNav} className="ms-auto hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            <li>
              <MenuTrigger
                label={L.ai}
                expanded={open === "ai"}
                controls={aiId}
                onClick={() => toggle("ai")}
                refCb={(el) => {
                  triggers.current.ai = el;
                }}
              />
            </li>
            <li>
              <MenuTrigger
                label={L.services}
                expanded={open === "services"}
                controls={svcId}
                onClick={() => toggle("services")}
                refCb={(el) => {
                  triggers.current.services = el;
                }}
              />
            </li>
            <li>
              <TopLink href={data.casesHref} onClick={closeAll}>
                {L.cases}
              </TopLink>
            </li>
            <li>
              <TopLink href={data.aboutHref} onClick={closeAll}>
                {L.about}
              </TopLink>
            </li>
            <li className="hidden xl:block">
              <TopLink href={data.careersHref} external>
                {L.careers}
              </TopLink>
            </li>
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-3 lg:ms-0">
          <LangSwitch langs={data.langs} label={L.language} className="hidden lg:flex" />
          <span className="hidden lg:block">
            <Link href={data.contactHref} onClick={closeAll} className={buttonClass("secondary", "sm")}>
              {L.contactCta}
            </Link>
          </span>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-haspopup="dialog"
            aria-expanded={drawer}
            className="-me-2 inline-flex h-11 items-center gap-2 rounded-md px-3 font-semibold text-ink hover:bg-mist-100 lg:hidden"
          >
            <span className="text-small">{L.menu}</span>
            <Menu aria-hidden="true" className="size-5" strokeWidth={2} />
          </button>
        </div>

        {/* AI mega panel */}
        <div
          id={aiId}
          hidden={open !== "ai"}
          className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-pop lg:block"
        >
          <div className="container-page grid grid-cols-12 gap-6 py-8">
            <div className="col-span-5">
              <SmartLink
                item={data.ai.featured}
                hint={L.external}
                onClick={closeAll}
                className="group flex h-full flex-col rounded-lg bg-teal-deep p-6 text-white transition-colors hover:bg-teal-night"
              >
                <span className="label mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-mist">
                  <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />
                  {L.featuredBadge}
                </span>
                <ServiceGlyph icon={data.ai.featured.icon} className="mb-4 size-7 text-orange" />
                <span className="display-tight text-h4 text-white">{data.ai.featured.name}</span>
                <span className="mt-2 text-small text-mist/90">{data.ai.featured.description}</span>
              </SmartLink>
            </div>
            <div className="col-span-7 flex flex-col">
              <p className="mb-3 text-small text-graphite">{L.aiIntro}</p>
              <ul className="grid gap-1">
                {data.ai.products.map((p) => (
                  <li key={p.id}>
                    <SmartLink
                      item={p}
                      hint={L.external}
                      onClick={closeAll}
                      className="group flex items-start gap-4 rounded-md p-3 transition-colors hover:bg-mist-50"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-mist-100 text-teal-ink group-hover:bg-mist">
                        <ServiceGlyph icon={p.icon} className="size-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-ink">{p.name}</span>
                        <span className="block text-small text-graphite">{p.description}</span>
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
              <Link href={data.ai.allHref} onClick={closeAll} className="link mt-auto ms-3 pt-3 text-small font-semibold">
                {L.aiAll}
              </Link>
            </div>
          </div>
        </div>

        {/* Services mega panel */}
        <div
          id={svcId}
          hidden={open !== "services"}
          className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-pop lg:block"
        >
          <div className="container-page py-8">
            <div className="grid grid-cols-5 gap-6">
              {data.services.groups.map((g) => (
                <div key={g.href}>
                  <Link
                    href={g.href}
                    onClick={closeAll}
                    className="display-tight mb-3 block border-b border-line pb-3 text-[1rem] text-ink hover:text-teal-ink"
                  >
                    {g.title}
                  </Link>
                  <ul className="grid gap-0.5">
                    {g.items.map((it) => (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          onClick={closeAll}
                          className="-mx-2 block rounded-sm px-2 py-1.5 text-small text-graphite hover:bg-mist-50 hover:text-ink"
                        >
                          {it.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
              <Link href={data.services.allHref} onClick={closeAll} className={buttonClass("primary", "sm")}>
                {L.allServices}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} data={data} />
    </header>
  );
}

/** Internal route → next/link; existing evenir.cz page → new tab with a screen-reader hint. */
function SmartLink({
  item,
  hint,
  onClick,
  className,
  children,
}: {
  item: { href: string; external?: boolean };
  hint: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener" onClick={onClick} className={className}>
        {children}
        <span className="sr-only"> ({hint})</span>
      </a>
    );
  }
  return (
    <Link href={item.href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

function MenuTrigger({
  label,
  expanded,
  controls,
  onClick,
  refCb,
}: {
  label: string;
  expanded: boolean;
  controls: string;
  onClick: () => void;
  refCb: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={refCb}
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={`inline-flex h-11 items-center gap-1.5 rounded-md px-3 text-[0.96875rem] font-semibold transition-colors ${
        expanded ? "bg-mist-100 text-ink" : "text-ink hover:bg-mist-50"
      }`}
    >
      {label}
      <ChevronDown
        aria-hidden="true"
        strokeWidth={2.25}
        className={`size-4 text-teal-ink transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      />
    </button>
  );
}

function TopLink({
  href,
  children,
  onClick,
  external,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  external?: boolean;
}) {
  const cls =
    "inline-flex h-11 items-center rounded-md px-3 text-[0.96875rem] font-semibold text-ink transition-colors hover:bg-mist-50";
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}

function LangSwitch({
  langs,
  label,
  className = "",
  tone = "light",
}: {
  langs: NavData["langs"];
  label: string;
  className?: string;
  tone?: "light" | "drawer";
}) {
  return (
    <ul aria-label={label} className={`items-center gap-0.5 ${className}`}>
      {langs.map((l) => (
        <li key={l.code}>
          {l.current ? (
            <span
              aria-current="true"
              className="grid h-9 min-w-9 place-items-center rounded-sm bg-mist-100 px-2 text-caption font-bold text-ink"
            >
              <abbr title={l.label} className="no-underline">
                {l.code}
              </abbr>
            </span>
          ) : (
            <a
              href={l.href}
              hrefLang={l.code.toLowerCase()}
              lang={l.code.toLowerCase()}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
              className={`grid h-9 min-w-9 place-items-center rounded-sm px-2 text-caption font-semibold hover:bg-mist-50 ${
                tone === "drawer" ? "text-ink" : "text-graphite hover:text-ink"
              }`}
            >
              <abbr title={l.label} className="no-underline">
                {l.code}
              </abbr>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function MobileDrawer({ open, onClose, data }: { open: boolean; onClose: () => void; data: NavData }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [section, setSection] = useState<MenuKey>("ai");
  const L = data.labels;
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const list = Array.from(focusables).filter((el) => el.offsetParent !== null);
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  // Portal to <body>: the sticky header uses backdrop-filter, which would
  // otherwise become the containing block of this fixed-position drawer.
  return createPortal(
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-teal-night/50 backdrop-blur-[2px]"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 end-0 flex w-full max-w-[26rem] flex-col bg-white shadow-pop motion-safe:animate-[drawer-in_260ms_var(--ease-out)]"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <h2 id={titleId} className="label text-graphite">
            {L.menu}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="-me-2 inline-flex h-11 items-center gap-2 rounded-md px-3 font-semibold text-ink hover:bg-mist-100"
          >
            <span className="text-small">{L.close}</span>
            <X aria-hidden="true" className="size-5" strokeWidth={2} />
          </button>
        </div>

        <nav aria-label={L.mainNav} className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <ul className="divide-y divide-line">
            <li>
              <AccordionButton expanded={section === "ai"} onClick={() => setSection(section === "ai" ? null : "ai")}>
                {L.ai}
              </AccordionButton>
              {section === "ai" && (
                <ul className="grid gap-1 pb-4">
                  <li>
                    <SmartLink
                      item={data.ai.featured}
                      hint={L.external}
                      onClick={onClose}
                      className="flex items-start gap-3 rounded-md bg-teal-deep p-4 text-white"
                    >
                      <ServiceGlyph icon={data.ai.featured.icon} className="mt-0.5 size-5 shrink-0 text-orange" />
                      <span>
                        <span className="block font-semibold">{data.ai.featured.name}</span>
                        <span className="mt-0.5 block text-caption text-mist">{L.featuredBadge}</span>
                      </span>
                    </SmartLink>
                  </li>
                  {data.ai.products.map((p) => (
                    <li key={p.id}>
                      <SmartLink
                        item={p}
                        hint={L.external}
                        onClick={onClose}
                        className="flex min-h-12 items-center gap-3 rounded-md px-4 py-2.5 font-semibold text-ink hover:bg-mist-50"
                      >
                        <ServiceGlyph icon={p.icon} className="size-5 shrink-0 text-teal-ink" />
                        {p.name}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <AccordionButton
                expanded={section === "services"}
                onClick={() => setSection(section === "services" ? null : "services")}
              >
                {L.services}
              </AccordionButton>
              {section === "services" && (
                <ul className="grid gap-1 pb-4">
                  {data.services.groups.map((g) => (
                    <li key={g.href}>
                      <Link
                        href={g.href}
                        onClick={onClose}
                        className="flex min-h-12 items-center justify-between rounded-md px-4 py-2.5 font-semibold text-ink hover:bg-mist-50"
                      >
                        {g.title}
                        <span className="text-caption font-normal text-graphite tabular">{g.items.length}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="px-4 pt-2">
                    <Link href={data.services.allHref} onClick={onClose} className="link font-semibold">
                      {L.allServices}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link href={data.casesHref} onClick={onClose} className="flex min-h-14 items-center text-[1.0625rem] font-semibold text-ink">
                {L.cases}
              </Link>
            </li>
            <li>
              <Link href={data.aboutHref} onClick={onClose} className="flex min-h-14 items-center text-[1.0625rem] font-semibold text-ink">
                {L.about}
              </Link>
            </li>
            <li>
              <a
                href={data.careersHref}
                target="_blank"
                rel="noopener"
                className="flex min-h-14 items-center text-[1.0625rem] font-semibold text-ink"
              >
                {L.careers}
              </a>
            </li>
          </ul>
        </nav>

        <div className="shrink-0 border-t border-line bg-mist-50 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Link href={data.contactHref} onClick={onClose} className={buttonClass("primary", "md", "w-full")}>
            {L.contactCta}
          </Link>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="grid gap-1 text-small">
              <a href={`mailto:${data.contact.email}`} className="inline-flex items-center gap-2 font-semibold text-ink">
                <Mail aria-hidden="true" className="size-4 text-teal-ink" strokeWidth={2} />
                {data.contact.email}
              </a>
              <a href={data.contact.phoneHref} className="inline-flex items-center gap-2 font-semibold text-ink tabular">
                <Phone aria-hidden="true" className="size-4 text-teal-ink" strokeWidth={2} />
                {data.contact.phone}
              </a>
            </div>
            <LangSwitch langs={data.langs} label={L.language} className="flex" tone="drawer" />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function AccordionButton({
  expanded,
  onClick,
  children,
}: {
  expanded: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={onClick}
      className="flex min-h-14 w-full items-center justify-between text-start text-[1.0625rem] font-semibold text-ink"
    >
      {children}
      <ChevronDown
        aria-hidden="true"
        strokeWidth={2.25}
        className={`size-5 text-teal-ink transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      />
    </button>
  );
}
