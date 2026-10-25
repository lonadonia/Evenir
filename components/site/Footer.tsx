/* eslint-disable @next/next/no-img-element -- partner badges are the client's original assets */
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { copy, contact } from "@/content/site";
import { aiGroup, serviceGroups } from "@/content/services";
import { live, routes, type Locale } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const r = routes[locale];
  const ext = <span className="sr-only"> ({t.nav.external})</span>;

  return (
    <footer className="on-dark relative isolate overflow-hidden border-t border-white/10 bg-abyss text-mist">
      {/* watermark: the original white logo, unchanged, very low opacity */}
      <img
        src="/brand/evenir-logo-white.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6%] -bottom-[4%] -z-10 w-[70%] max-w-[64rem] opacity-[0.035] select-none"
      />
      <div aria-hidden="true" className="absolute -top-40 left-1/3 -z-10 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(25_146_155/0.18),transparent)]" />
      <div className="container-page grid gap-12 pt-16 pb-10 md:grid-cols-12 md:gap-8 lg:pt-20">
        <div className="md:col-span-12 lg:col-span-4">
          <Logo href={r.home} variant="white" className="h-7" label={locale === "cs" ? "Evenir — hlavní stránka" : "Evenir — homepage"} />
          <ul className="mt-6 flex gap-2">
            <li>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener"
                className="inline-flex h-10 items-center rounded-sm border border-white/25 px-3.5 text-small font-semibold text-white hover:border-white/60 hover:bg-white/5"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener"
                className="inline-flex h-10 items-center rounded-sm border border-white/25 px-3.5 text-small font-semibold text-white hover:border-white/60 hover:bg-white/5"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label={t.footer.help} className="md:col-span-7 lg:col-span-5">
          <h2 className="display-tight text-[1rem] text-white">{t.footer.help}</h2>
          <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            <ul className="grid content-start gap-2 text-small">
              {aiGroup.services.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener" className="text-mist/90 hover:text-white hover:underline">
                    {s.name[locale]}
                    {ext}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="grid content-start gap-2 text-small">
              {serviceGroups.slice(1).map((g) => (
                <li key={g.id[locale]}>
                  <Link href={r.serviceGroup(g.id[locale])} className="text-mist/90 hover:text-white hover:underline">
                    {g.title[locale]}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href={r.services} className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                  {t.nav.allServices}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="md:col-span-5 lg:col-span-3">
          <h2 className="display-tight text-[1rem] text-white">{t.footer.quick}</h2>
          <ul className="mt-5 grid gap-3 text-small">
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex min-h-8 items-center gap-2.5 font-semibold text-white hover:underline">
                <Mail aria-hidden="true" className="size-4 text-teal" strokeWidth={2} />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="inline-flex min-h-8 items-center gap-2.5 font-semibold text-white tabular hover:underline">
                <Phone aria-hidden="true" className="size-4 text-teal" strokeWidth={2} />
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-2.5 text-mist/90">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-teal" strokeWidth={2} />
              <address className="not-italic">
                {contact.street}
                <br />
                {contact.city}
                <br />
                <span className="tabular">{contact.zip}</span>
              </address>
            </li>
          </ul>
          <h2 className="display-tight mt-8 text-[1rem] text-white">{t.footer.company}</h2>
          <ul className="mt-4 grid gap-2 text-small">
            <li>
              <a href={live("/o-nas/")} target="_blank" rel="noopener" className="text-mist/90 hover:text-white hover:underline">
                {t.nav.about}
                {ext}
              </a>
            </li>
            <li>
              <a href={live("/kariera/")} target="_blank" rel="noopener" className="text-mist/90 hover:text-white hover:underline">
                {t.nav.careers}
                {ext}
              </a>
            </li>
            <li>
              <Link href={r.contact} className="text-mist/90 hover:text-white hover:underline">
                {t.nav.contactCta}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-6 border-t border-white/12 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="sr-only">{t.footer.partners}</p>
            <ul className="flex flex-wrap items-center gap-3">
              <li className="grid h-12 place-items-center rounded-sm border border-white/15 px-3">
                <img src="/partners/microsoft-csp.svg" alt="Microsoft Cloud Solution Provider" className="h-7 w-auto" />
              </li>
              <li className="grid h-12 place-items-center rounded-sm border border-white/15 px-3">
                <img src="/partners/dell-technologies.webp" alt="Dell Technologies Authorized Partner" className="h-6 w-auto" />
              </li>
              <li className="grid h-12 place-items-center rounded-sm border border-white/15 px-3">
                <img src="/partners/industrial-it.svg" alt="Powered by Industrial IT" className="h-7 w-auto" />
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 text-caption text-mist/80 sm:flex-row sm:items-center sm:gap-6">
            <p>©2026 EVENIR.cz. {t.footer.rights}</p>
            <ul className="flex gap-5">
              <li>
                <a href={live("/obchodni-podminky/")} target="_blank" rel="noopener" className="hover:text-white hover:underline">
                  {t.footer.terms}
                  {ext}
                </a>
              </li>
              <li>
                <a href={live("/ochrana-osobnich-udaju/")} target="_blank" rel="noopener" className="hover:text-white hover:underline">
                  {t.footer.privacy}
                  {ext}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
