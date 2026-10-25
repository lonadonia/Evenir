import { Mail, MapPin, Phone } from "lucide-react";
import { copy, contact } from "@/content/site";
import { notes } from "@/content/notes";
import { anchors, live, type Locale } from "@/lib/i18n";
import { Note } from "@/components/notes/Note";
import { Eyebrow } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";

export function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale].contactSection;
  return (
    <section id={anchors[locale].contact} aria-labelledby="contact-title" className="on-dark surface-abyss relative isolate overflow-hidden py-section text-mist">
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="reveal lg:col-span-5">
          <Eyebrow tone="dark">{locale === "cs" ? "Kontakt" : "Contact"}</Eyebrow>
          <h2 id="contact-title" className="display mt-5 text-h2 text-white">
            {t.titleA}
            <span className="em-teal">{t.titleEm}</span>
            {t.titleB}
          </h2>
          <p className="mt-6 max-w-[42ch] text-lead text-mist" data-draft>
            {t.lead}
          </p>
          <p className="mt-10 text-small font-semibold text-white">{t.or}</p>
          <ul className="mt-4 grid gap-4">
            <li>
              <a href={`mailto:${contact.email}`} className="group inline-flex items-center gap-3 text-lead font-semibold text-white">
                <span className="grid size-11 place-items-center rounded-md bg-white/8 ring-1 ring-white/15 group-hover:bg-white/12">
                  <Mail aria-hidden="true" className="size-5 text-orange" strokeWidth={2} />
                </span>
                <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white">{contact.email}</span>
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="group inline-flex items-center gap-3 text-lead font-semibold text-white tabular">
                <span className="grid size-11 place-items-center rounded-md bg-white/8 ring-1 ring-white/15 group-hover:bg-white/12">
                  <Phone aria-hidden="true" className="size-5 text-orange" strokeWidth={2} />
                </span>
                <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white">{contact.phone}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-mist">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-white/8 ring-1 ring-white/15">
                <MapPin aria-hidden="true" className="size-5 text-orange" strokeWidth={2} />
              </span>
              <address className="pt-2.5 not-italic">
                {contact.street}, {contact.city}, <span className="tabular">{contact.zip}</span>
              </address>
            </li>
          </ul>
        </div>
        <div className="reveal relative lg:col-span-7">
          <Note n={11} text={notes.form[locale]} className="-top-4 right-4" align="end" />
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(25_146_155/0.35),transparent)] blur-2xl" />
          <div className="on-light rounded-xl bg-white p-6 text-graphite shadow-glow sm:p-10">
            <ContactForm t={copy[locale].form} privacyHref={live("/ochrana-osobnich-udaju/")} />
          </div>
        </div>
      </div>
    </section>
  );
}
