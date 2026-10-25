import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DocsShell, DocSection, Panel } from "@/components/docs/DocsShell";
import { requirements } from "@/content/requirements";
import { openDecisions } from "@/content/notes";

export const metadata: Metadata = {
  title: "Review board",
  description: "Evenir redesign — desktop and mobile frames, flows, requirement traceability and open decisions.",
};

const NAV = [
  { id: "frames", label: "Desktop & mobile frames" },
  { id: "flows", label: "Flows" },
  { id: "trace", label: "Requirements" },
  { id: "decisions", label: "Open decisions" },
  { id: "figma", label: "Figma handoff" },
];

const PAGES = [
  { name: "Homepage", cs: "/", en: "/en", h: 900 },
  { name: "Services catalogue", cs: "/sluzby", en: "/en/services", h: 900 },
  { name: "Case-study template · full", cs: "/pripadove-studie/ukazka-zakaznicka-linka", en: "/en/case-studies/sample-customer-line", h: 900 },
  { name: "Case-study template · minimal", cs: "/pripadove-studie/ukazka-interni-dokumenty", en: "/en/case-studies/sample-internal-documents", h: 900 },
];

function Frame({ src, w, h, scale, label }: { src: string; w: number; h: number; scale: number; label: string }) {
  return (
    <figure className="shrink-0">
      <div
        className="overflow-hidden rounded-md border border-line bg-white shadow-card"
        style={{ width: Math.round(w * scale), height: Math.round(h * scale) }}
      >
        <iframe
          src={src}
          title={label}
          loading="lazy"
          style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: "0 0", border: 0 }}
        />
      </div>
      <figcaption className="mt-2 text-caption text-graphite">{label}</figcaption>
    </figure>
  );
}

type Step = { label: string; href?: string; kind: "new" | "existing" | "state" };
const FLOWS: { id: string; title: string; steps: Step[]; note?: string }[] = [
  {
    id: "f1",
    title: "Homepage → AI portfolio / Services via the hero action",
    steps: [
      { label: "Homepage hero", href: "/", kind: "new" },
      { label: "“Prozkoumat AI řešení” ↓", href: "/#ai-reseni", kind: "new" },
      { label: "AI portfolio (Custom AI first)", href: "/#ai-reseni", kind: "new" },
      { label: "“Všechny služby” → Services", href: "/sluzby", kind: "new" },
    ],
  },
  {
    id: "f2",
    title: "Homepage portfolio → product / service destination",
    steps: [
      { label: "Product card", href: "/#ai-reseni", kind: "new" },
      { label: "“Detail produktu” ↗", kind: "state" },
      { label: "Existing page, e.g. evenir.cz/call-care-ai/", href: "https://evenir.cz/call-care-ai/", kind: "existing" },
    ],
    note: "Product detail pages are outside the agreed scope (open decision #2), so the route goes to the live page.",
  },
  {
    id: "f3",
    title: "Services catalogue → service destination",
    steps: [
      { label: "Services", href: "/sluzby", kind: "new" },
      { label: "Area index / search (proposed)", href: "/sluzby#kyberneticka-bezpecnost", kind: "new" },
      { label: "Service row ↗", kind: "state" },
      { label: "Existing page, e.g. evenir.cz/cyber-security/hardening/", href: "https://evenir.cz/cyber-security/hardening/", kind: "existing" },
    ],
  },
  {
    id: "f4",
    title: "Homepage case-study entry → individual story",
    steps: [
      { label: "“AI v praxi” block", href: "/#pripadove-studie", kind: "new" },
      { label: "Story preview", kind: "state" },
      { label: "Case-study template", href: "/pripadove-studie/ukazka-zakaznicka-linka", kind: "new" },
      { label: "Related product / consultation", href: "/#kontakt", kind: "new" },
    ],
    note: "No case-study listing page — breadcrumb “Případové studie” returns to the homepage block (open decision #4).",
  },
  {
    id: "f5",
    title: "Mobile navigation: open → use → close",
    steps: [
      { label: "“Menu” button (390px)", href: "/", kind: "new" },
      { label: "Drawer opens, focus on “Zavřít”", kind: "state" },
      { label: "AI řešení expanded · Custom AI first", kind: "state" },
      { label: "Tap a link → drawer closes & navigates", kind: "state" },
      { label: "Or Esc / “Zavřít” / tap outside → focus back on Menu", kind: "state" },
    ],
    note: "Open the homepage at phone width (or in the mobile frames above) to try it.",
  },
];

const statusTone = (s: string) =>
  s === "VERIFIED_PASS"
    ? "bg-mist-100 text-teal-ink"
    : s === "BLOCKED_EXTERNAL"
      ? "bg-danger-tint text-danger"
      : "bg-orange-tint text-ink";

export default function Board() {
  return (
    <DocsShell
      current="board"
      nav={NAV}
      title={
        <>
          Review <span className="em-teal">board</span>
        </>
      }
      intro={
        <p>
          The agreed page inventory side by side at the representative 1440px and 390px frames, the five requested flows,
          and how each brief requirement is covered. Frames are live — scroll and click inside them. Switch on
          “Poznámky k návrhu” inside a frame to see the design annotations.
        </p>
      }
    >
      <DocSection id="frames" title="Desktop & mobile frames" lead="Czech is the primary language; English versions use the same layouts and are linked under each page.">
        <div className="grid gap-14">
          {PAGES.map((p) => (
            <div key={p.cs} className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="display-tight text-h3">{p.name}</h3>
                <p className="flex gap-4 text-small font-semibold">
                  <Link href={p.cs} className="link inline-flex min-h-10 items-center">Open CS</Link>
                  <Link href={p.en} className="link inline-flex min-h-10 items-center">Open EN</Link>
                </p>
              </div>
              <div className="-mx-5 mt-5 flex items-start gap-6 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
                <Frame src={p.cs} w={1440} h={p.h} scale={0.5} label={`${p.name} · desktop 1440`} />
                <Frame src={p.cs} w={390} h={844} scale={0.54} label={`${p.name} · mobile 390`} />
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="flows" title="Flows" lead="New screens are teal; existing evenir.cz destinations (outside the agreed scope) are outlined; interaction states are mist.">
        <ul className="grid gap-5">
          {FLOWS.map((f, i) => (
            <li key={f.id}>
              <Panel label={`Flow ${i + 1} · ${f.title}`}>
                <ol className="flex flex-wrap items-center gap-2">
                  {f.steps.map((s, j) => {
                    const cls =
                      s.kind === "new"
                        ? "bg-teal-ink text-white"
                        : s.kind === "existing"
                          ? "border-[1.5px] border-dashed border-graphite text-ink"
                          : "bg-mist-100 text-ink";
                    const inner = (
                      <span className={`inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 py-1.5 text-small font-semibold ${cls}`}>
                        {s.label}
                        {s.kind === "existing" && <ArrowUpRight aria-hidden="true" className="size-4" />}
                      </span>
                    );
                    return (
                      <li key={j} className="flex items-center gap-2">
                        {s.href ? (
                          s.href.startsWith("http") ? (
                            <a href={s.href} target="_blank" rel="noopener">{inner}</a>
                          ) : (
                            <Link href={s.href}>{inner}</Link>
                          )
                        ) : (
                          inner
                        )}
                        {j < f.steps.length - 1 && <ArrowRight aria-hidden="true" className="size-4 text-graphite" />}
                      </li>
                    );
                  })}
                </ol>
                {f.note && <p className="mt-4 text-caption">{f.note}</p>}
              </Panel>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection id="trace" title="Requirement traceability" lead="Each brief requirement, where it lives, and its verification status.">
        <div className="overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[48rem] text-small">
            <thead className="bg-mist-50 text-caption text-graphite">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">ID</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Requirement</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Where</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {requirements.map((r) => (
                <tr key={r.id}>
                  <th scope="row" className="px-4 py-3 text-start align-top font-semibold whitespace-nowrap text-ink tabular">
                    {r.id}
                    <span className="block text-caption font-normal text-graphite">{r.level}</span>
                  </th>
                  <td className="px-4 py-3 align-top text-ink">{r.text}</td>
                  <td className="px-4 py-3 align-top">{r.where}</td>
                  <td className="px-4 py-3 align-top">
                    <span className={`rounded-full px-2.5 py-1 text-caption font-semibold whitespace-nowrap ${statusTone(r.status)}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection id="decisions" title="Open decisions" lead="To resolve with the client; none blocks review of this draft.">
        <ol className="grid gap-3">
          {openDecisions.en.map((d, i) => (
            <li key={d} className="grid grid-cols-[2.5rem_1fr] items-start gap-3 rounded-md border border-line bg-white p-4">
              <span className="grid size-8 place-items-center rounded-full bg-orange text-small font-bold text-ink tabular">{i + 1}</span>
              <span className="pt-1 text-ink">{d}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection
        id="figma"
        title="Figma handoff"
        lead="The brief asks for editable Figma files. This run produced the design as a coded, token-driven prototype; native .fig files were not generated."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Panel label="What exists now">
            <p className="text-small">Every screen, state and token is live code with semantic structure and Auto-Layout-like flex/grid rules — ready to be imported or rebuilt 1:1.</p>
          </Panel>
          <Panel label="Recommended route">
            <p className="text-small">Import each route at 1440 and 390 with an HTML-to-Figma importer, then convert repeated blocks to components and bind colours/type/spacing to Figma variables named exactly like the tokens here.</p>
          </Panel>
          <Panel label="File structure to deliver">
            <p className="text-small">00 Cover · 01 Style guide & components · 02 Desktop (Home, Services, Case study) · 03 Mobile · 04 Flows & notes.</p>
          </Panel>
        </div>
      </DocSection>
    </DocsShell>
  );
}
