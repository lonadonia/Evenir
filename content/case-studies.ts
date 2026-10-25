import type { Locale } from "@/lib/i18n";

/**
 * Case-study PLACEHOLDERS. No client has approved a story yet, so nothing here
 * names a client, quotes a person or states a result. Topics map to the
 * existing AI offerings; every slot the client must fill is marked as such.
 *
 * The three samples deliberately carry different amounts of content to prove
 * the template stays coherent when optional slots are missing:
 *   1 · full     — context, metrics, media, testimonial
 *   2 · partial  — metrics + media, no testimonial
 *   3 · minimal  — no metrics, no media, no testimonial
 */

type T = Record<Locale, string>;

export type CaseStudy = {
  id: string;
  slug: T;
  serviceId: string; // links to content/services.ts
  product: T;
  title: T;
  summary: T;
  challenge: { lead: T; points: T[] };
  solution: { lead: T; steps: { title: T; text: T }[] };
  outcomes: { lead: T; metrics?: { label: T }[] };
  media?: { caption: T }[];
  context?: boolean;
  testimonial?: boolean;
  variant: { cs: string; en: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "customer-line",
    slug: { cs: "ukazka-zakaznicka-linka", en: "sample-customer-line" },
    serviceId: "call-care-ai",
    product: { cs: "Call Care AI", en: "Call Care AI" },
    variant: { cs: "Plná verze šablony", en: "Full template" },
    title: {
      cs: "AI asistent pro zákaznickou linku",
      en: "An AI assistant for the customer line",
    },
    summary: {
      cs: "Ukázka struktury příběhu: výchozí situace na zákaznické lince, nasazení Call Care AI a výsledky, které doloží klient.",
      en: "A sample of the story structure: the starting point on the customer line, how Call Care AI was introduced, and results the client will evidence.",
    },
    challenge: {
      lead: {
        cs: "Zákaznická linka denně řeší velké množství opakovaných dotazů. Operátoři tráví čas rutinou a na složitější požadavky jim zbývá méně prostoru.",
        en: "The customer line handles a large number of repeated questions every day. Operators spend their time on routine and have less room for complex requests.",
      },
      points: [
        { cs: "Opakované dotazy zahlcují první linii", en: "Repeated questions crowd the first line" },
        { cs: "Informace z hovorů se ručně přepisují", en: "Call details are re-typed by hand" },
        { cs: "Vedení chybí přehled o tématech hovorů", en: "Management lacks an overview of call topics" },
      ],
    },
    solution: {
      lead: {
        cs: "Popis řešení bude vycházet z podkladů klienta. Šablona počítá se třemi kroky, které lze zkrátit nebo doplnit.",
        en: "The solution description will follow the client's material. The template allows for three steps that can be shortened or extended.",
      },
      steps: [
        {
          title: { cs: "Analýza hovorů a procesů", en: "Analysing calls and processes" },
          text: {
            cs: "Jaká data a scénáře jsme na začátku prošli a co z nich vyplynulo.",
            en: "Which data and scenarios we reviewed at the start, and what came out of it.",
          },
        },
        {
          title: { cs: "Napojení na systémy klienta", en: "Connecting the client's systems" },
          text: {
            cs: "Se kterými systémy AI pracuje a jak je zajištěna bezpečnost dat.",
            en: "Which systems the AI works with and how data security is ensured.",
          },
        },
        {
          title: { cs: "Nasazení a provoz", en: "Roll-out and operation" },
          text: {
            cs: "Jak probíhalo spuštění, zaškolení týmu a co zajišťujeme dlouhodobě.",
            en: "How launch and team onboarding went, and what we look after long term.",
          },
        },
      ],
    },
    outcomes: {
      lead: {
        cs: "Výsledky zveřejníme jen s daty, která klient potvrdí. Šablona nabízí až tři měřitelné ukazatele a krátký komentář.",
        en: "Results are published only with figures the client confirms. The template offers up to three measurable indicators and a short commentary.",
      },
      metrics: [
        { label: { cs: "Ukazatel 1 — doplní klient", en: "Indicator 1 — supplied by client" } },
        { label: { cs: "Ukazatel 2 — doplní klient", en: "Indicator 2 — supplied by client" } },
        { label: { cs: "Ukazatel 3 — doplní klient", en: "Indicator 3 — supplied by client" } },
      ],
    },
    media: [
      { caption: { cs: "Fotografie z projektu nebo screenshot řešení", en: "Project photo or solution screenshot" } },
      { caption: { cs: "Doplňkový obrázek (volitelný)", en: "Supporting image (optional)" } },
    ],
    context: true,
    testimonial: true,
  },
  {
    id: "sales-enquiries",
    slug: { cs: "ukazka-obchodni-poptavky", en: "sample-sales-enquiries" },
    serviceId: "ai-sales",
    product: { cs: "Evenir AI Sales", en: "Evenir AI Sales" },
    variant: { cs: "Šablona bez citace", en: "Template without testimonial" },
    title: {
      cs: "Rychlejší práce s obchodními poptávkami",
      en: "Faster handling of sales enquiries",
    },
    summary: {
      cs: "Ukázka příběhu s měřitelnými výsledky, ale bez citace klienta — šablona se přizpůsobí.",
      en: "A sample story with measurable results but no client quote — the template adapts.",
    },
    challenge: {
      lead: {
        cs: "Obchodní tým tráví hodně času tříděním a doplňováním poptávek, než se dostane k samotnému jednání se zákazníkem.",
        en: "The sales team spends a lot of time sorting and completing enquiries before getting to the actual customer conversation.",
      },
      points: [
        { cs: "Poptávky přicházejí z více kanálů", en: "Enquiries arrive through several channels" },
        { cs: "Chybí jednotné hodnocení priorit", en: "No consistent way to prioritise" },
      ],
    },
    solution: {
      lead: {
        cs: "Popis nasazení Evenir AI Sales doplníme podle podkladů klienta.",
        en: "The description of the Evenir AI Sales roll-out will follow the client's material.",
      },
      steps: [
        {
          title: { cs: "Mapování obchodního procesu", en: "Mapping the sales process" },
          text: {
            cs: "Kde vznikají poptávky a kdo s nimi dále pracuje.",
            en: "Where enquiries originate and who handles them next.",
          },
        },
        {
          title: { cs: "Nasazení a zaškolení týmu", en: "Roll-out and team onboarding" },
          text: {
            cs: "Jak se AI zapojila do každodenní práce obchodníků.",
            en: "How the AI fits into the sales team's daily work.",
          },
        },
      ],
    },
    outcomes: {
      lead: {
        cs: "Ukazatele doplníme po schválení klientem.",
        en: "Indicators will be added once approved by the client.",
      },
      metrics: [
        { label: { cs: "Ukazatel 1 — doplní klient", en: "Indicator 1 — supplied by client" } },
        { label: { cs: "Ukazatel 2 — doplní klient", en: "Indicator 2 — supplied by client" } },
      ],
    },
    media: [{ caption: { cs: "Screenshot řešení", en: "Solution screenshot" } }],
  },
  {
    id: "internal-documents",
    slug: { cs: "ukazka-interni-dokumenty", en: "sample-internal-documents" },
    serviceId: "custom-ai",
    product: { cs: "AI řešení na míru", en: "Custom AI solution" },
    variant: { cs: "Minimální verze šablony", en: "Minimal template" },
    title: {
      cs: "AI asistent nad interními dokumenty",
      en: "An AI assistant for internal documents",
    },
    summary: {
      cs: "Ukázka nejkratší verze příběhu: bez čísel, obrázků a citace. I tak zůstává čitelná a úplná.",
      en: "A sample of the shortest story: no figures, images or quote — and still complete and readable.",
    },
    challenge: {
      lead: {
        cs: "Firemní know-how je rozptýlené v dokumentech, e-mailech a sdílených složkách a dohledat správnou informaci zabere čas.",
        en: "Company know-how is scattered across documents, emails and shared folders, and finding the right information takes time.",
      },
      points: [],
    },
    solution: {
      lead: {
        cs: "Řešení na míru navržené podle struktury dat a oprávnění klienta. Podrobnosti doplníme z podkladů projektu.",
        en: "A custom solution designed around the client's data structure and permissions. Details will follow from the project material.",
      },
      steps: [],
    },
    outcomes: {
      lead: {
        cs: "Kvalitativní shrnutí přínosů doplní klient. Pokud čísla nejsou k dispozici, sekce zůstane textová.",
        en: "A qualitative summary of the benefits will be supplied by the client. Without figures, this section stays text-only.",
      },
    },
  },
];

export const findCaseStudy = (locale: Locale, slug: string) =>
  caseStudies.find((c) => c.slug[locale] === decodeURIComponent(slug));
