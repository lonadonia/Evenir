import type { Locale } from "@/lib/i18n";

/**
 * Review annotations shown when "Design notes" is switched on.
 * They are the in-browser equivalent of Figma comments: decisions, draft
 * markers, open questions and destinations that are outside the agreed scope.
 */
type Note = Record<Locale, string>;

export const notes = {
  hero: {
    cs: "NÁVRH TEXTU: nadpis a perex jsou pracovní, vycházejí z hlasu značky („Ušetříme Vám čas, starosti i peníze“). Hlavní CTA vede na sekci AI řešení na této stránce, vedlejší na kontaktní formulář.",
    en: "DRAFT COPY: headline and lead are working copy built on the brand's own line (“We save you time, worry and money”). Primary CTA scrolls to the AI portfolio on this page; secondary goes to the contact form.",
  },
  schematic: {
    cs: "Ilustrační schéma, ne popis konkrétní funkce. Vstupy a výstupy upravíme podle schváleného katalogu. Animace pulzů se vypne při „omezit pohyb“.",
    en: "Illustrative diagram, not a description of a specific feature. Inputs and outputs will follow the approved catalogue. Pulse animation stops when reduced motion is requested.",
  },
  logos: {
    cs: "Loga převzata ze stávajícího webu evenir.cz. Před spuštěním potvrdit, že je lze dál zveřejňovat.",
    en: "Logos carried over from the current evenir.cz site. Confirm they may still be published before launch.",
  },
  portfolioOrder: {
    cs: "Pořadí podle zadání: AI řešení na míru je první na desktopu i mobilu. Produkty vycházejí z navigace stávajícího webu — finální katalog potvrdí klient (otevřená otázka č. 3).",
    en: "Order per brief: Custom AI Solutions comes first on desktop and mobile. Products are taken from the current site's navigation — the client confirms the final catalogue (open decision #3).",
  },
  productLinks: {
    cs: "Detailní stránky produktů nejsou v rozsahu redesignu. Odkazy vedou na stávající stránky evenir.cz (otevřená otázka č. 2).",
    en: "Product detail pages are not in the redesign scope. Links go to the existing evenir.cz pages (open decision #2).",
  },
  why: {
    cs: "NÁVRH OBSAHU: čtyři důvody vycházejí z existujících služeb Evenir (bezpečnost, Microsoft 365, cloud, infrastruktura, sídlo v Praze). Formulace potvrdí klient.",
    en: "DRAFT CONTENT: the four reasons are derived from Evenir's existing services (security, Microsoft 365, cloud, infrastructure, Prague office). The client confirms the wording.",
  },
  process: {
    cs: "NÁVRH OBSAHU: doporučený postup spolupráce. Kroky a jejich popis upravíme podle skutečného procesu Evenir.",
    en: "DRAFT CONTENT: a recommended engagement process. Steps and descriptions will be adjusted to Evenir's actual process.",
  },
  foundations: {
    cs: "Ne-AI služby zůstávají viditelné — AI je vstupní branou, ne náhradou. Která oblast zůstane v navigaci, potvrdí klient (otevřená otázka č. 5).",
    en: "Non-AI services stay visible — AI is the front door, not a replacement. The client confirms which areas stay in navigation (open decision #5).",
  },
  cases: {
    cs: "Zástupný obsah: žádné jméno klienta, čísla ani citace nejsou vymyšlené. Samostatná stránka s výpisem studií není v rozsahu (otevřená otázka č. 4), proto zde chybí odkaz „všechny studie“.",
    en: "Placeholder content: no client names, figures or quotes are invented. A separate case-study listing is not in scope (open decision #4), hence no “all stories” link.",
  },
  about: {
    cs: "Text „O nás“ je doslovně ze stávajícího webu. Fotografie a partnerská loga jsou stávající podklady klienta.",
    en: "The About text is verbatim from the current site. Photo and partner badges are the client's existing assets.",
  },
  form: {
    cs: "Stávající formulář se zachovanými poli. V návrhu se nic neodesílá — potvrzení je označené jako ukázka. Napojení řeší volitelná implementace v CMS.",
    en: "The existing form with its fields unchanged. Nothing is sent in this preview — the confirmation is labelled as a demo. Wiring belongs to the optional CMS implementation.",
  },
  nav: {
    cs: "„Případové studie“ vede na sekci na hlavní stránce (výpis není v rozsahu). „O nás“, „Kariéra“ a detaily služeb vedou na stávající stránky. DE vede na stávající německou verzi.",
    en: "“Case studies” goes to the homepage section (no listing page in scope). “About”, “Careers” and service details go to existing pages. DE goes to the current German site.",
  },
  catalogue: {
    cs: "Vyhledávání je NAVRŽENÁ funkce — vyžaduje souhlas klienta. Rejstřík oblastí funguje i bez něj. Nová služba = nový řádek ve skupině, struktura se nemění.",
    en: "Search is a PROPOSED feature — it needs the client's agreement. The area index works without it. A new service is a new row in a group; the structure doesn't change.",
  },
  catalogueCopy: {
    cs: "Názvy služeb jsou ze stávajícího webu, popisy jsou pracovní (max. ~140 znaků, aby řádky zůstaly čitelné).",
    en: "Service names come from the current site; descriptions are working copy (max ~140 characters to keep rows scannable).",
  },
  caseTemplate: {
    cs: "Šablona pro duplikaci. Volitelné sloty (kontext, čísla, galerie, citace) se při chybějícím obsahu skryjí a rozvržení se přeskládá.",
    en: "Template for duplication. Optional slots (context, figures, gallery, quote) collapse when content is missing and the layout re-flows.",
  },
} satisfies Record<string, Note>;

export type NoteKey = keyof typeof notes;

export const openDecisions: Record<Locale, string[]> = {
  cs: [
    "Co přesně zahrnují „kompletní desktopové a mobilní flow“ nad rámec tří popsaných typů stránek?",
    "Které detailní stránky produktů a služeb (pokud vůbec) potřebují nový design?",
    "Jaký je schválený katalog AI produktů a očekávaná velikost rozšířeného katalogu služeb?",
    "Je potřeba samostatná stránka s výpisem případových studií?",
    "Které stávající ne-AI služby zůstanou v navigaci a hierarchii stránek?",
    "Které jazykové verze jsou součástí dodávky (dnes CS, EN, DE)?",
    "Kolik kol revizí představuje „X“?",
    "Jaký CMS se používá a jaká implementační podpora se má nacenit zvlášť?",
  ],
  en: [
    "What does “full desktop and mobile flows” include beyond the three described page types?",
    "Which product and service detail pages, if any, need new designs?",
    "What is the approved AI product catalogue and the expected size of the expanded services catalogue?",
    "Is a separate case-study listing page needed?",
    "Which existing non-AI services stay in the navigation and page hierarchy?",
    "Which content languages are included (today: CS, EN, DE)?",
    "How many revision rounds does “X” represent?",
    "Which CMS is in use, and what implementation support should be priced separately?",
  ],
};
