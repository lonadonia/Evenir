import type { Locale } from "@/lib/i18n";
import { live } from "@/lib/i18n";

/**
 * Service inventory, taken from the navigation of the live evenir.cz site.
 * Names are verbatim; descriptions are WORKING COPY (draft) until the client
 * supplies approved texts. "Custom AI Solutions for Businesses" is listed first
 * in the AI group per the brief.
 */

type T = Record<Locale, string>;

export type ServiceKind = "solution" | "product" | "service" | "platform";
export type ServiceIcon =
  | "sparkles"
  | "trending"
  | "headset"
  | "building"
  | "shield"
  | "lock"
  | "bug"
  | "key"
  | "radar"
  | "activity"
  | "server"
  | "network"
  | "cloud"
  | "layers"
  | "grid"
  | "users"
  | "workflow"
  | "gauge";

export type Service = {
  id: string;
  name: T;
  description: T;
  kind: ServiceKind;
  icon: ServiceIcon;
  href: string; // existing destination on evenir.cz
  featured?: boolean;
  keywords?: string;
};

export type ServiceGroup = {
  id: T; // anchor id per locale
  title: T;
  intro: T;
  extraLink?: { label: T; href: string };
  services: Service[];
};

export const kindLabel: Record<ServiceKind, T> = {
  solution: { cs: "Řešení na míru", en: "Custom solution" },
  product: { cs: "AI produkt", en: "AI product" },
  service: { cs: "Služba", en: "Service" },
  platform: { cs: "Platforma", en: "Platform" },
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: { cs: "ai-a-automatizace", en: "ai-and-automation" },
    title: { cs: "AI a automatizace", en: "AI & automation" },
    intro: {
      cs: "Řešení na míru a hotové AI produkty pro obchod, zákaznickou péči i konkrétní obory.",
      en: "Custom solutions and ready-made AI products for sales, customer care and specific industries.",
    },
    services: [
      {
        id: "custom-ai",
        featured: true,
        kind: "solution",
        icon: "sparkles",
        href: live("/ai/"),
        name: { cs: "AI řešení na míru pro firmy", en: "Custom AI solutions for businesses" },
        description: {
          cs: "AI nástroje navržené podle Vašich procesů a dat, napojené na systémy, které už používáte, a provozované v zabezpečeném prostředí.",
          en: "AI tools designed around your processes and data, connected to the systems you already use and run in a secured environment.",
        },
        keywords: "custom na míru automatizace dokumenty asistent",
      },
      {
        id: "ai-sales",
        kind: "product",
        icon: "trending",
        href: live("/evenir-ai/"),
        name: { cs: "Evenir AI Sales", en: "Evenir AI Sales" },
        description: {
          cs: "AI podpora pro obchodní tým: méně rutinní práce kolem poptávek, více času na zákazníky.",
          en: "AI support for your sales team: less routine work around enquiries, more time for customers.",
        },
        keywords: "obchod sales poptávky leady",
      },
      {
        id: "call-care-ai",
        kind: "product",
        icon: "headset",
        href: live("/call-care-ai/"),
        name: { cs: "Call Care AI", en: "Call Care AI" },
        description: {
          cs: "AI pro zákaznickou linku a práci s telefonáty.",
          en: "AI for your customer line and the way you handle calls.",
        },
        keywords: "hovory call centrum zákaznická péče linka",
      },
      {
        id: "real-estate-ai",
        kind: "product",
        icon: "building",
        href: live("/real-estate/"),
        name: { cs: "Real Estate AI", en: "Real Estate AI" },
        description: {
          cs: "AI nástroje pro realitní kanceláře a správu nemovitostí.",
          en: "AI tools for real-estate agencies and property management.",
        },
        keywords: "reality nemovitosti realitní",
      },
    ],
  },
  {
    id: { cs: "kyberneticka-bezpecnost", en: "cyber-security" },
    title: { cs: "Kybernetická bezpečnost", en: "Cyber security" },
    intro: {
      cs: "Prověříme, zabezpečíme a ohlídáme systémy, na kterých stojí Vaše podnikání.",
      en: "We assess, harden and watch over the systems your business depends on.",
    },
    extraLink: {
      label: { cs: "Ceník kybernetické bezpečnosti", en: "Cyber security pricing" },
      href: live("/cenik/"),
    },
    services: [
      {
        id: "cyber-security",
        kind: "service",
        icon: "shield",
        href: live("/cyber-security/"),
        name: { cs: "Cyber security", en: "Cyber security" },
        description: {
          cs: "Přehled našich bezpečnostních služeb — od prvního posouzení po dlouhodobý dohled.",
          en: "Our security services at a glance — from a first assessment to ongoing oversight.",
        },
      },
      {
        id: "hardening",
        kind: "service",
        icon: "lock",
        href: live("/cyber-security/hardening/"),
        name: { cs: "Hardening", en: "Hardening" },
        description: {
          cs: "Zpevnění konfigurace serverů, stanic a služeb podle osvědčených bezpečnostních standardů.",
          en: "Tightening the configuration of servers, endpoints and services against proven security baselines.",
        },
      },
      {
        id: "penetracni-testy",
        kind: "service",
        icon: "bug",
        href: live("/cyber-security/penetracni-testy/"),
        name: { cs: "Penetrační testy", en: "Penetration testing" },
        description: {
          cs: "Řízené testování odolnosti Vašich systémů s výstupní zprávou a doporučeními.",
          en: "Controlled testing of how your systems hold up against attack, with a report and recommendations.",
        },
        keywords: "pentest",
      },
      {
        id: "pki",
        kind: "service",
        icon: "key",
        href: live("/cyber-security/pki-infrastruktura/"),
        name: { cs: "PKI infrastruktura", en: "PKI infrastructure" },
        description: {
          cs: "Návrh a správa certifikátů a infrastruktury veřejných klíčů.",
          en: "Design and management of certificates and public-key infrastructure.",
        },
        keywords: "certifikáty",
      },
      {
        id: "scanning-reporting",
        kind: "service",
        icon: "radar",
        href: live("/cyber-security/scanning-and-reporting/"),
        name: { cs: "Scanning and Reporting", en: "Scanning and Reporting" },
        description: {
          cs: "Pravidelné skenování zranitelností a srozumitelné reporty pro IT i vedení firmy.",
          en: "Regular vulnerability scanning with clear reports for both IT and management.",
        },
        keywords: "zranitelnosti",
      },
      {
        id: "siem",
        kind: "service",
        icon: "activity",
        href: live("/cyber-security/siem-solution/"),
        name: { cs: "SIEM Solution", en: "SIEM Solution" },
        description: {
          cs: "Sběr a vyhodnocování bezpečnostních událostí z celé infrastruktury na jednom místě.",
          en: "Collecting and evaluating security events from across your infrastructure in one place.",
        },
        keywords: "logy události",
      },
    ],
  },
  {
    id: { cs: "it-provoz-a-infrastruktura", en: "it-operations" },
    title: { cs: "IT provoz a infrastruktura", en: "IT operations & infrastructure" },
    intro: {
      cs: "Spolehlivý chod systémů a nástrojů, se kterými Váš tým pracuje každý den.",
      en: "Reliable operation of the systems and tools your team works with every day.",
    },
    services: [
      {
        id: "outsourcing-it",
        kind: "service",
        icon: "server",
        href: live("/outsourcing-it/"),
        name: { cs: "Outsourcing IT", en: "IT outsourcing" },
        description: {
          cs: "Převezmeme správu Vašeho IT, abyste se mohli naplno věnovat podnikání.",
          en: "We take over the running of your IT so you can focus fully on the business.",
        },
      },
      {
        id: "sprava-infrastruktury",
        kind: "service",
        icon: "network",
        href: live("/sprava-infrastruktury/"),
        name: { cs: "Správa infrastruktury", en: "Infrastructure management" },
        description: {
          cs: "Dohled, údržba a rozvoj serverů, sítí a přidružených procesů.",
          en: "Monitoring, maintenance and development of servers, networks and related processes.",
        },
      },
      {
        id: "cloud",
        kind: "service",
        icon: "cloud",
        href: live("/cloud/"),
        name: { cs: "Cloud", en: "Cloud" },
        description: {
          cs: "Návrh, migrace a provoz cloudových prostředí.",
          en: "Design, migration and operation of cloud environments.",
        },
      },
      {
        id: "virtualizace",
        kind: "service",
        icon: "layers",
        href: live("/virtualizace/"),
        name: { cs: "Virtualizace", en: "Virtualisation" },
        description: {
          cs: "Lepší využití hardwaru díky virtualizaci serverů a pracovních stanic.",
          en: "Better use of hardware through server and workstation virtualisation.",
        },
      },
      {
        id: "microsoft-365",
        kind: "service",
        icon: "grid",
        href: live("/microsoft-365/"),
        name: { cs: "Microsoft 365", en: "Microsoft 365" },
        description: {
          cs: "Nasazení, správa a zabezpečení Microsoft 365 pro celý Váš tým.",
          en: "Deployment, administration and security of Microsoft 365 for your whole team.",
        },
        keywords: "office teams",
      },
    ],
  },
  {
    id: { cs: "lide-a-kapacity", en: "people-and-capacity" },
    title: { cs: "Lidé a kapacity", en: "People & capacity" },
    intro: {
      cs: "Odborníci do Vašeho týmu tam, kde chybí vlastní kapacity.",
      en: "Specialists for your team where in-house capacity runs short.",
    },
    services: [
      {
        id: "outsourcing-kapacit",
        kind: "service",
        icon: "users",
        href: live("/outsourcing-pracovnich-kapacit/"),
        name: { cs: "Outsourcing pracovních kapacit", en: "IT staff outsourcing" },
        description: {
          cs: "IT specialisté do Vašeho týmu — na konkrétní projekt i dlouhodobě.",
          en: "IT specialists for your team — for a single project or long term.",
        },
        keywords: "recruitment nábor specialisté",
      },
    ],
  },
  {
    id: { cs: "technologie-a-platformy", en: "technologies-and-platforms" },
    title: { cs: "Technologie a platformy", en: "Technologies & platforms" },
    intro: {
      cs: "Platformy, se kterými pracujeme a které pro klienty nasazujeme.",
      en: "Platforms we work with and deploy for our clients.",
    },
    services: [
      {
        id: "vmware",
        kind: "platform",
        icon: "layers",
        href: live("/vmware/"),
        name: { cs: "VMware", en: "VMware" },
        description: {
          cs: "Návrh, provoz a podpora virtualizačních prostředí VMware.",
          en: "Design, operation and support of VMware virtualisation environments.",
        },
      },
      {
        id: "power-platform",
        kind: "platform",
        icon: "workflow",
        href: live("/power-platform/"),
        name: { cs: "Power Platform", en: "Power Platform" },
        description: {
          cs: "Firemní aplikace a automatizace procesů v Microsoft Power Platform.",
          en: "Business apps and process automation on Microsoft Power Platform.",
        },
        keywords: "automatizace low-code",
      },
      {
        id: "zabbix",
        kind: "platform",
        icon: "gauge",
        href: live("/zabbix/"),
        name: { cs: "Zabbix", en: "Zabbix" },
        description: {
          cs: "Monitoring infrastruktury a služeb s přehlednými upozorněními.",
          en: "Monitoring of infrastructure and services with clear alerting.",
        },
        keywords: "monitoring dohled",
      },
    ],
  },
];

export const aiGroup = serviceGroups[0];
export const allServices = serviceGroups.flatMap((g) => g.services);
