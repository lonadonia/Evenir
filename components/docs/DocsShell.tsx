import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/site/Logo";

export function DocsShell({
  title,
  intro,
  nav,
  current,
  children,
}: {
  title: ReactNode;
  intro: ReactNode;
  nav: { id: string; label: string }[];
  current: "styleguide" | "board";
  children: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-6 px-5 lg:px-10">
          <span className="hidden sm:contents">
            <Logo href="/" className="h-6" label="Evenir — homepage (CS)" />
          </span>
          <span className="hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
          <p className="hidden text-small font-semibold text-ink sm:block">Redesign · design system</p>
          <nav aria-label="Design documents" className="ms-auto min-w-0 overflow-x-auto [scrollbar-width:none]">
            <ul className="flex items-center gap-1 text-small font-semibold whitespace-nowrap">
              {[
                { href: "/styleguide", label: "Style guide", key: "styleguide" },
                { href: "/board", label: "Review board", key: "board" },
                { href: "/", label: "Prototype", key: "cs" },
                { href: "/en", label: "EN", key: "en" },
              ].map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    aria-current={current === l.key ? "page" : undefined}
                    className={`inline-flex h-10 items-center rounded-md px-3 ${current === l.key ? "bg-mist-100 text-ink" : "text-graphite hover:bg-mist-50 hover:text-ink"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-16">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24">
            <ul className="grid gap-0.5 border-s border-line text-small">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="-ms-px block border-s-2 border-transparent py-1.5 ps-4 font-semibold text-graphite hover:border-teal hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main id="obsah" className="min-w-0">
          <h1 className="display text-h1">{title}</h1>
          <div className="mt-5 max-w-[68ch] text-lead">{intro}</div>
          {children}
        </main>
      </div>
    </>
  );
}

export function DocSection({ id, title, lead, children }: { id: string; title: string; lead?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="mt-20 scroll-mt-24 border-t-2 border-ink pt-6">
      <h2 id={`${id}-t`} className="display-tight text-h2">
        {title}
      </h2>
      {lead && <div className="mt-3 max-w-[70ch] text-body">{lead}</div>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function Panel({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div className={`rounded-lg border border-line bg-white ${className}`}>
      {label && <p className="border-b border-line px-5 py-3 text-caption font-semibold text-graphite">{label}</p>}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
