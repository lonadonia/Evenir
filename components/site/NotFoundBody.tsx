import { copy } from "@/content/site";
import { routes, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";

export function NotFoundBody({ locale }: { locale: Locale }) {
  const t = copy[locale].notFound;
  return (
    <section className="container-page grid min-h-[60vh] items-center py-section">
      <div className="max-w-[40rem]">
        <p className="display text-[clamp(4rem,3rem+5vw,8rem)] leading-none text-teal tabular" aria-hidden="true">
          404
        </p>
        <h1 className="display mt-6 text-h2">{t.title}</h1>
        <p className="mt-4 text-lead">{t.text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={routes[locale].home}>{t.home}</ButtonLink>
          <ButtonLink href={routes[locale].services} variant="secondary">
            {t.services}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
