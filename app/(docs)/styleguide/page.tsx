import type { Metadata } from "next";
import { ArrowUpRight, Check, CircleAlert, CircleCheck, Info } from "lucide-react";
import { DocsShell, DocSection, Panel } from "@/components/docs/DocsShell";
import { Button, ArrowLink } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { ServiceGlyph, serviceIcons, ICON_STROKE } from "@/components/ui/icons";
import { ProductVisual } from "@/components/home/ProductVisual";
import { HeroSchematic } from "@/components/home/HeroSchematic";
import { StoryCard } from "@/components/home/CaseStudies";
import { ServiceRow } from "@/components/services/Catalogue";
import { brandColors, contrastPairs, radii, semanticSpacing, spacing, supportColors, typeScale } from "@/content/tokens";
import { caseStudies } from "@/content/case-studies";
import { copy } from "@/content/site";
import { contrast, rating } from "@/lib/color";
import type { ServiceIcon } from "@/content/services";

export const metadata: Metadata = {
  title: "Style guide",
  description: "Evenir redesign — colours, typography, button states, spacing tokens and shared components.",
};

const NAV = [
  { id: "colours", label: "Colours" },
  { id: "contrast", label: "Contrast" },
  { id: "typography", label: "Typography" },
  { id: "buttons", label: "Buttons & links" },
  { id: "spacing", label: "Spacing tokens" },
  { id: "grid", label: "Grid & breakpoints" },
  { id: "shape", label: "Shape & elevation" },
  { id: "icons", label: "Icons" },
  { id: "signature", label: "Signal schematic" },
  { id: "components", label: "Cards & rows" },
  { id: "navigation", label: "Navigation" },
  { id: "forms", label: "Form controls" },
  { id: "responsive", label: "Responsive rules" },
  { id: "motion", label: "Motion" },
];

const STATES = ["default", "hover", "focus", "active", "disabled"] as const;
const STATE_LABEL: Record<(typeof STATES)[number], string> = {
  default: "Default",
  hover: "Hover",
  focus: "Focus",
  active: "Pressed",
  disabled: "Disabled",
};

export default function StyleGuide() {
  const t = copy.cs;
  return (
    <DocsShell
      current="styleguide"
      nav={NAV}
      title={
        <>
          Evenir <span className="em-teal">UI system</span>
        </>
      }
      intro={
        <>
          <p>
            One coherent system behind the homepage, the services catalogue and the case-study template. Every value
            here is a live token from <code className="rounded-xs bg-mist-100 px-1.5 py-0.5 text-small text-ink">app/globals.css</code>{" "}
            — the same tokens the prototype renders with. Contrast ratios are computed on this page, not estimated.
          </p>
          <p className="mt-3 text-small">
            Mandatory and unchanged: the original logo asset and the four brand colours. Everything else is a design
            proposal for review.
          </p>
        </>
      }
    >
      {/* ── Colours ── */}
      <DocSection
        id="colours"
        title="Colours"
        lead="The four recognised brand colours are preserved exactly. Supporting tones are tints and shades of the same hues plus tinted neutrals, added only where readability needs them."
      >
        <h3 className="display-tight text-h4">Brand palette · mandatory</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {brandColors.map((c) => (
            <li key={c.hex} className="overflow-hidden rounded-lg border border-line bg-white">
              <div className="h-32" style={{ background: c.hex }} />
              <div className="p-5">
                <p className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-ink">{c.name}</span>
                  <code className="text-small text-ink tabular">{c.hex}</code>
                </p>
                <p className="mt-1 text-caption font-semibold text-teal-ink">--color-{c.token}</p>
                <p className="mt-3 text-small">{c.role}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3 className="display-tight mt-12 text-h4">Supporting tones · proposed</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {supportColors.map((c) => (
            <li key={c.hex} className="flex gap-4 rounded-md border border-line bg-white p-3">
              <span className="size-14 shrink-0 rounded-sm ring-1 ring-black/5" style={{ background: c.hex }} aria-hidden="true" />
              <span className="min-w-0">
                <span className="flex items-baseline gap-2">
                  <span className="text-small font-semibold text-ink">{c.name}</span>
                  <code className="text-caption tabular">{c.hex}</code>
                </span>
                <span className="mt-0.5 block text-caption leading-snug">{c.role}</span>
              </span>
            </li>
          ))}
        </ul>
        <Panel className="mt-8" label="Colour roles in one sentence">
          <p className="text-small">
            <strong className="text-ink">Teal</strong> says Evenir (emphasis, icons, lines) ·{" "}
            <strong className="text-ink">Graphite / ink</strong> carry the reading ·{" "}
            <strong className="text-ink">Mist</strong> separates surfaces ·{" "}
            <strong className="text-ink">Orange</strong> means “act here” and marks the AI signal — at most one orange
            action per view.
          </p>
        </Panel>
        <h3 className="display-tight mt-12 text-h4">Surfaces & depth</h3>
        <p className="mt-2 max-w-[70ch] text-small">
          Dark sections are lit, not flat: an abyss base with a teal glow from the top right and a faint orange glow from
          the bottom left, a 64px grid that fades out, and translucent “glass” panels. Light sections use white cards with
          teal-tinted shadows that lift on hover.
        </p>
        <ul className="mt-4 grid gap-4 md:grid-cols-4">
          <li className="on-dark surface-abyss relative h-40 overflow-hidden rounded-lg p-4 text-caption font-semibold text-white">
            <div aria-hidden="true" className="grid-lines absolute inset-0" />
            <span className="relative">surface-abyss + grid-lines</span>
          </li>
          <li className="on-dark surface-deep relative h-40 overflow-hidden rounded-lg p-4 text-caption font-semibold text-white">
            <span className="relative">surface-deep</span>
          </li>
          <li className="on-dark surface-abyss relative grid h-40 place-items-center overflow-hidden rounded-lg p-4">
            <span className="glass rounded-md px-4 py-3 text-caption font-semibold text-white">glass panel</span>
          </li>
          <li className="relative grid h-40 place-items-center overflow-hidden rounded-lg bg-mist-50 p-4">
            <span className="rounded-lg border border-line bg-white px-5 py-4 text-caption font-semibold text-ink shadow-lift">shadow-lift card</span>
          </li>
        </ul>
      </DocSection>

      {/* ── Contrast ── */}
      <DocSection
        id="contrast"
        title="Readable combinations"
        lead="WCAG 2.x contrast, computed from the hex values at build time. Body text needs 4.5:1; large text (≥ 24px, or ≥ 18.7px bold) and UI boundaries need 3:1."
      >
        <div className="overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[40rem] text-start text-small">
            <thead className="bg-mist-50 text-caption text-graphite">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Sample</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Foreground / background</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Ratio</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Rating</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {contrastPairs.map((p) => {
                const r = contrast(p.fg, p.bg);
                const rt = rating(r);
                return (
                  <tr key={p.fg + p.bg + p.use}>
                    <td className="px-4 py-3">
                      <span className="inline-grid h-10 w-16 place-items-center rounded-sm text-[1.0625rem] font-semibold ring-1 ring-black/5" style={{ color: p.fg, background: p.bg }}>
                        Aa
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink">
                      {p.fgName} / {p.bgName}
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink tabular">{r.toFixed(2)}:1</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-caption font-semibold ${
                          rt === "Fail" ? "bg-danger-tint text-danger" : rt === "AA large / UI" ? "bg-orange-tint text-ink" : "bg-mist-100 text-teal-ink"
                        }`}
                      >
                        {rt}
                      </span>
                    </td>
                    <td className="px-4 py-3">{p.use}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* ── Typography ── */}
      <DocSection
        id="typography"
        title="Typography"
        lead={
          <>
            <strong className="text-ink">Archivo</strong> (Omnibus-Type, SIL Open Font License) — one variable family
            with weight and width axes, Latin Extended for Czech and German. Display text runs at an expanded width
            (110–116%) that echoes the extended EVENIR wordmark; reading text stays at normal width. Sentence case
            throughout — no letter-spaced capitals over Czech diacritics.
          </>
        }
      >
        <Panel label="Script coverage — Czech and German">
          <p className="display text-h2 text-ink">Příliš žluťoučký kůň úpěl ďábelské ódy.</p>
          <p className="mt-3 text-lead">Größere Effizienz für Ihr Unternehmen — Ärger, Öl, Übung, ß.</p>
          <p className="mt-3 text-small tabular">0123456789 · +420 604 644 825 · 130 00 · 19 služeb</p>
        </Panel>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line">
          {typeScale.map((s) => (
            <li key={s.token} className="grid gap-4 bg-white p-5 md:grid-cols-[12rem_minmax(0,1fr)] md:items-baseline md:gap-8">
              <div className="text-caption">
                <p className="font-semibold text-ink">{s.token}</p>
                <p className="mt-1 tabular">
                  {s.mobile}px → {s.desktop}px · lh {s.lh}
                </p>
                <p className="tabular">{s.weight}</p>
                <p className="mt-1 text-graphite">{s.use}</p>
              </div>
              <p
                className={`min-w-0 truncate text-ink ${
                  s.token === "text-h1" || s.token === "text-h2" ? "display" : s.token === "text-h3" || s.token === "text-h4" ? "display-tight" : ""
                }`}
                style={{ fontSize: `var(--${s.token})`, lineHeight: s.lh }}
              >
                {s.token.startsWith("text-h") ? "Umělá inteligence pro Vaši firmu" : "Navrhujeme AI řešení na míru a stavíme je na bezpečné infrastruktuře."}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Panel label="Two-tone headline (brand device)">
            <p className="display text-h3 text-ink">
              Ušetříme Vám <span className="em-teal">čas</span>, starosti i <span className="em-teal">peníze</span>.
            </p>
            <p className="mt-3 text-caption">Carried over from evenir.cz. Teal only on 1–2 words, only at ≥ 24px.</p>
          </Panel>
          <Panel label="Measure">
            <p className="text-small">Reading text max 52–68 characters per line (max-w-[52ch]–[68ch]). Headings use text-wrap: balance.</p>
          </Panel>
          <Panel label="Numbers">
            <p className="text-small">
              Tabular figures for counts, phone numbers and metrics: <span className="tabular font-semibold text-ink">1 · 11 · 111</span>
            </p>
          </Panel>
        </div>
      </DocSection>

      {/* ── Buttons ── */}
      <DocSection
        id="buttons"
        title="Buttons & links"
        lead="Three button treatments and one text-link treatment. States are shown statically here; in the prototype they respond to pointer and keyboard. Minimum height 40px (48–56px on primary actions)."
      >
        <div className="overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[52rem] text-small">
            <thead className="bg-mist-50 text-caption text-graphite">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Variant</th>
                {STATES.map((s) => (
                  <th key={s} scope="col" className="px-4 py-3 text-start font-semibold">
                    {STATE_LABEL[s]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr>
                <th scope="row" className="px-4 py-5 text-start align-top">
                  <span className="font-semibold text-ink">Primary</span>
                  <span className="block text-caption font-normal">Orange · ink label · one per view</span>
                </th>
                {STATES.map((s) => (
                  <td key={s} className="px-4 py-5">
                    <Button state={s === "default" ? undefined : s} tabIndex={-1}>
                      Odeslat
                    </Button>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="px-4 py-5 text-start align-top">
                  <span className="font-semibold text-ink">Secondary</span>
                  <span className="block text-caption font-normal">Teal-ink outline</span>
                </th>
                {STATES.map((s) => (
                  <td key={s} className="px-4 py-5">
                    <Button variant="secondary" state={s === "default" ? undefined : s} tabIndex={-1}>
                      Všechny služby
                    </Button>
                  </td>
                ))}
              </tr>
              <tr className="on-dark bg-teal-deep">
                <th scope="row" className="px-4 py-5 text-start align-top">
                  <span className="font-semibold text-white">On dark</span>
                  <span className="block text-caption font-normal text-mist">Primary + white outline</span>
                </th>
                {STATES.map((s) => (
                  <td key={s} className="px-4 py-5">
                    <div className="flex flex-col items-start gap-3">
                      <Button state={s === "default" ? undefined : s} tabIndex={-1} size="sm">
                        Probrat záměr
                      </Button>
                      {s !== "disabled" && (
                        <Button variant="secondaryOnDark" state={s === "default" ? undefined : s} tabIndex={-1} size="sm">
                          Více
                        </Button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Panel label="Sizes">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" tabIndex={-1}>Small 40</Button>
              <Button size="md" tabIndex={-1}>Medium 48</Button>
              <Button size="lg" tabIndex={-1}>Large 56</Button>
            </div>
          </Panel>
          <Panel label="With direction icons — only when they add meaning">
            <div className="flex flex-wrap items-center gap-3">
              <Button icon="down" tabIndex={-1}>Prozkoumat AI řešení</Button>
              <Button variant="secondary" icon="right" tabIndex={-1}>Všechny služby</Button>
            </div>
            <p className="mt-3 text-caption">↓ scrolls on this page · → goes to another page · ↗ opens an existing evenir.cz page in a new tab.</p>
          </Panel>
          <Panel label="Text links">
            <p className="text-small">
              Inline <a href="#buttons" className="link">text link</a> inside a sentence.
            </p>
            <div className="mt-4 flex flex-wrap gap-6">
              <ArrowLink href="#buttons">Přečíst příběh</ArrowLink>
              <ArrowLink href="#buttons" external>
                Detail produktu
              </ArrowLink>
            </div>
            <p className="mt-3 text-caption">Hover: underline thickens 1 → 2px. Focus: 2.5px ring, 3px offset.</p>
          </Panel>
        </div>
        <Panel className="mt-4" label="Long labels">
          <div className="flex max-w-sm flex-col gap-3">
            <Button size="lg" className="w-full whitespace-normal! py-3 h-auto! min-h-14 text-center" tabIndex={-1}>
              Domluvit nezávaznou konzultaci k AI řešení na míru
            </Button>
            <p className="text-caption">Buttons never truncate: on narrow screens they go full-width and wrap to two lines with the same padding.</p>
          </div>
        </Panel>
      </DocSection>

      {/* ── Spacing ── */}
      <DocSection
        id="spacing"
        title="Spacing tokens"
        lead="A 4px base scale for component padding and gaps, plus fluid semantic tokens for page gutters and section rhythm."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel label="Base scale (Tailwind spacing × 4px)">
            <ul className="grid gap-2">
              {spacing.map((s) => (
                <li key={s.token} className="grid grid-cols-[3rem_3.5rem_minmax(0,1fr)] items-center gap-3 text-caption tabular">
                  <span className="font-semibold text-ink">{s.token}</span>
                  <span>{s.px}px</span>
                  <span className="h-3 max-w-full rounded-xs bg-teal" style={{ width: s.px * 2 }} aria-hidden="true" />
                </li>
              ))}
            </ul>
          </Panel>
          <Panel label="Semantic tokens">
            <ul className="divide-y divide-line">
              {semanticSpacing.map((s) => (
                <li key={s.token} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
                  <span className="text-small font-semibold text-ink">{s.token}</span>
                  <span className="text-small">
                    <span className="font-semibold text-ink tabular">{s.value}</span>
                    <span className="block">{s.use}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </DocSection>

      {/* ── Grid ── */}
      <DocSection
        id="grid"
        title="Grid & breakpoints"
        lead="Representative frames are 1440px (desktop) and 390px (mobile). These are design frames, not client-specified breakpoints; the layout is fluid between them."
      >
        <div className="grid gap-4">
          {[
            { name: "Desktop ≥ 1024", cols: 12, gap: "24–32px", note: "Content max 1280px, gutter 40px at 1440" },
            { name: "Tablet 640–1023", cols: 8, gap: "20–24px", note: "Two-column cards, stacked hero" },
            { name: "Mobile < 640", cols: 4, gap: "16px", note: "Single column, gutter 20px at 390" },
          ].map((g) => (
            <Panel key={g.name} label={`${g.name} · ${g.cols} columns · gap ${g.gap}`}>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${g.cols}, minmax(0, 1fr))` }} aria-hidden="true">
                {Array.from({ length: g.cols }).map((_, i) => (
                  <span key={i} className="h-12 rounded-xs bg-mist" />
                ))}
              </div>
              <p className="mt-3 text-caption">{g.note}</p>
            </Panel>
          ))}
        </div>
        <Panel className="mt-4" label="Breakpoints used in code">
          <ul className="grid gap-2 text-small sm:grid-cols-4">
            <li><strong className="text-ink">sm 640</strong> — hero schematic switches to the wide layout</li>
            <li><strong className="text-ink">md 768</strong> — product cards 3-up, story cards 2-up</li>
            <li><strong className="text-ink">lg 1024</strong> — full navigation, 12-column grid, sticky rails</li>
            <li><strong className="text-ink">xl 1280</strong> — Careers link joins the main navigation</li>
          </ul>
        </Panel>
      </DocSection>

      {/* ── Shape ── */}
      <DocSection id="shape" title="Shape & elevation" lead="Soft, cloud-like corners taken from the logo’s rounded mark. Nested radii follow inner = outer − padding.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {radii.map((r) => (
            <Panel key={r.token} label={`${r.token} · ${r.px}px`}>
              <div className="h-20 border-2 border-teal bg-mist-50" style={{ borderRadius: r.px }} aria-hidden="true" />
              <p className="mt-3 text-caption">{r.use}</p>
            </Panel>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-card">
            <p className="text-small font-semibold text-ink">shadow-card</p>
            <p className="text-caption">Hover lift on cards. Teal-tinted, never grey.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-pop">
            <p className="text-small font-semibold text-ink">shadow-pop</p>
            <p className="text-caption">Menus, drawers, form card, notes.</p>
          </div>
        </div>
      </DocSection>

      {/* ── Icons ── */}
      <DocSection id="icons" title="Icons" lead={`One set (Lucide, ISC licence), one stroke width (${ICON_STROKE}), sizes 16 / 20 / 24px. Icons sit in mist tiles on light surfaces and in translucent tiles with orange glyphs on dark surfaces.`}>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-9">
          {(Object.keys(serviceIcons) as ServiceIcon[]).map((k) => (
            <li key={k} className="flex flex-col items-center gap-2 rounded-md border border-line bg-white p-4">
              <span className="grid size-11 place-items-center rounded-md bg-mist-100 text-teal-ink">
                <ServiceGlyph icon={k} className="size-5" />
              </span>
              <span className="text-caption">{k}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      {/* ── Signature ── */}
      <DocSection
        id="signature"
        title="Signal schematic"
        lead="The signature visual language: network-diagram lines (Evenir’s home ground), a dashed security perimeter, and orange pulses as the only orange in an illustration. It is illustrative — it does not describe specific product features."
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <Panel label="Hero · wide (≥ 640px) and stacked (< 640px) compositions">
            <div className="rounded-md bg-mist-50 p-4">
              <HeroSchematic labels={t.hero.schematic} idPrefix="sg" />
            </div>
          </Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            {["custom-ai", "ai-sales", "call-care-ai", "real-estate-ai"].map((k) => (
              <Panel key={k} label={k}>
                <div className={`rounded-md p-3 ${k === "custom-ai" ? "bg-teal-deep" : "bg-mist-50"}`}>
                  <ProductVisual kind={k} tone={k === "custom-ai" ? "dark" : "light"} />
                </div>
              </Panel>
            ))}
          </div>
        </div>
        <ul className="mt-4 grid gap-2 text-small sm:grid-cols-3">
          <li className="flex gap-2"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />Stroke 1.5px teal, corner radius 10px</li>
          <li className="flex gap-2"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />One orange node per drawing</li>
          <li className="flex gap-2"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />Pure SVG — editable vectors in Figma</li>
        </ul>
      </DocSection>

      {/* ── Components ── */}
      <DocSection
        id="components"
        title="Cards & rows"
        lead="Repeated patterns, each shown with realistic and stress-test content. Text lengths vary; components grow vertically, never truncate titles."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel label="Story preview card — shared with the case-study template">
            <StoryCard locale="cs" story={caseStudies[1]} href="/pripadove-studie/ukazka-obchodni-poptavky" />
          </Panel>
          <Panel label="Product card">
            <article className="group relative flex flex-col rounded-lg border border-line bg-white p-2">
              <div className="rounded-md bg-mist-50 px-6 py-6">
                <ProductVisual kind="call-care-ai" className="mx-auto max-w-[15rem]" />
              </div>
              <div className="px-4 pt-5 pb-4">
                <p className="text-caption font-semibold text-teal-ink">AI produkt</p>
                <h4 className="display-tight mt-1.5 text-h4 text-ink">Call Care AI</h4>
                <p className="mt-2 text-small">AI pro zákaznickou linku a práci s telefonáty.</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-small font-semibold text-teal-ink">
                  <span className="underline decoration-teal-ink/40 underline-offset-4">Detail produktu</span>
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </div>
            </article>
          </Panel>
        </div>
        <Panel className="mt-6" label="Service row — default, featured and a long-content stress test">
          <ul>
            <li>
              <ServiceRow
                t={{ detail: "Detail služby", external: "otevře stávající stránku", featuredBadge: "Doporučujeme začít zde" }}
                item={{ id: "sg-featured", name: "AI řešení na míru pro firmy", description: "AI nástroje navržené podle Vašich procesů a dat, napojené na systémy, které už používáte.", kind: "Řešení na míru", icon: "sparkles", href: "#components", featured: true, keywords: "" }}
              />
            </li>
            <li>
              <ServiceRow
                t={{ detail: "Detail služby", external: "otevře stávající stránku", featuredBadge: "" }}
                item={{ id: "sg-default", name: "Penetrační testy", description: "Řízené testování odolnosti Vašich systémů s výstupní zprávou a doporučeními.", kind: "Služba", icon: "bug", href: "#components", keywords: "" }}
              />
            </li>
            <li>
              <ServiceRow
                t={{ detail: "Detail služby", external: "otevře stávající stránku", featuredBadge: "" }}
                item={{ id: "sg-long", name: "Bezpečnostní monitoring a vyhodnocování událostí infrastruktury (zátěžový test)", description: "Zátěžový test délky: popis o maximální doporučené délce kolem 140 znaků, aby bylo vidět, jak se řádek chová při dvou až třech řádcích textu.", kind: "Služba", icon: "activity", href: "#components", keywords: "" }}
              />
            </li>
          </ul>
          <p className="mt-4 text-caption">Adding a service = adding one row to a group in <code>content/services.ts</code>. A new area = a new group heading; the rail and counts update automatically.</p>
        </Panel>
        <Panel className="mt-6" label="Tags & badges">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-caption font-semibold text-teal-ink">AI produkt</span>
            <span className="label inline-flex items-center gap-2 rounded-full bg-teal-deep px-3 py-1.5 text-mist">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-orange" />
              Doporučujeme začít zde
            </span>
            <span className="label rounded-full bg-orange-tint px-2.5 py-1 text-ink">Ukázkový obsah</span>
            <span className="inline-flex min-h-9 items-center rounded-full border border-line px-3 text-caption font-semibold text-ink">Hardening</span>
            <span className="text-caption font-semibold tabular">6 služeb</span>
          </div>
        </Panel>
      </DocSection>

      {/* ── Navigation ── */}
      <DocSection id="navigation" title="Navigation" lead="Shared header across all pages. Both patterns are live in the prototype; this is their specification.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel label="Desktop ≥ 1024px">
            <ul className="grid gap-2 text-small">
              <li>· Logo → homepage. Order: AI řešení ▾ · Služby ▾ · Případové studie · O nás · Kariéra · CS/EN/DE · Kontaktujte nás.</li>
              <li>· “AI řešení” and “Služby” are disclosure buttons (click/Enter/Space), not hover-only. Esc closes and returns focus; clicking outside or tabbing away closes.</li>
              <li>· AI panel: Custom AI first as a dark featured tile, then the three products.</li>
              <li>· Services panel: the five areas with their services → catalogue anchors.</li>
              <li>· Header gains a hairline + soft shadow after 8px of scroll.</li>
            </ul>
          </Panel>
          <Panel label="Mobile < 1024px">
            <ul className="grid gap-2 text-small">
              <li>· “Menu” button with a visible label (not icon-only) opens a right-hand drawer (dialog, focus trapped, body scroll locked).</li>
              <li>· AI řešení opens by default — Custom AI first. Služby lists areas with counts.</li>
              <li>· Sticky footer inside the drawer: primary contact action, e-mail, phone and language.</li>
              <li>· Close: “Zavřít” button, Esc, or tapping the dimmed page. Focus returns to the Menu button.</li>
              <li>· All rows ≥ 48px tall.</li>
            </ul>
          </Panel>
        </div>
      </DocSection>

      {/* ── Forms ── */}
      <DocSection
        id="forms"
        title="Form controls"
        lead="The existing contact form, its four fields and consent unchanged. Labels are always visible above fields; errors are announced, summarised and linked."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel label="Field states">
            <div className="grid gap-5">
              <Field id="sg-default" label="Jméno a příjmení" required placeholder="" tabIndex={-1} readOnly value="" />
              <Field id="sg-focus" label="E-mail · focused" required state="focus" tabIndex={-1} readOnly value="jana.novak" />
              <Field id="sg-filled" label="Telefonní číslo · filled" required tabIndex={-1} readOnly value="+420 777 123 456" />
              <Field id="sg-error" label="E-mail · error" required error="Zadejte e-mail ve tvaru jmeno@firma.cz." tabIndex={-1} readOnly value="jana@" />
              <Field id="sg-disabled" label="Disabled" state="disabled" value="Nelze upravit" readOnly />
            </div>
          </Panel>
          <div className="grid content-start gap-6">
            <Panel label="Error summary (on submit)">
              <div className="rounded-md border-[1.5px] border-danger/40 bg-danger-tint p-4 text-small text-ink">
                <p className="flex items-center gap-2 font-semibold text-danger">
                  <CircleAlert aria-hidden="true" className="size-4" strokeWidth={2.25} />
                  Formulář obsahuje chyby. Opravte prosím zvýrazněná pole.
                </p>
                <ul className="mt-2 grid gap-1 ps-6">
                  <li><a className="link" href="#forms">E-mail</a></li>
                  <li><a className="link" href="#forms">Zpráva</a></li>
                </ul>
              </div>
            </Panel>
            <Panel label="Confirmation (prototype states it was not sent)">
              <span className="grid size-12 place-items-center rounded-full bg-mist-100 text-teal-ink">
                <CircleCheck aria-hidden="true" className="size-6" strokeWidth={2} />
              </span>
              <p className="display-tight mt-4 text-h4 text-ink">Děkujeme, zprávu máme.</p>
              <p className="mt-1 text-small">Ozveme se Vám na uvedený e-mail nebo telefon.</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-sm bg-orange-tint px-3 py-2 text-caption font-semibold text-ink">
                <Info aria-hidden="true" className="size-4" strokeWidth={2.25} />
                Ukázka návrhu — zpráva nebyla odeslána
              </p>
            </Panel>
            <Panel label="Search field (services catalogue · proposed)">
              <p className="text-small">Same field anatomy with a leading search icon and a clear button. Results count is announced politely; an empty state offers “clear” and “write to us”.</p>
            </Panel>
          </div>
        </div>
      </DocSection>

      {/* ── Responsive ── */}
      <DocSection id="responsive" title="Responsive rules" lead="How each pattern reflows between the 1440px and 390px frames.">
        <div className="overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[46rem] text-small">
            <thead className="bg-mist-50 text-caption text-graphite">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Pattern</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Desktop (1440)</th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">Mobile (390)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ["Hero", "Text 6–7 cols left, schematic 5–6 cols right in a mist console panel", "Text first (same order: headline → lead → actions), buttons full width, schematic recomposed vertically below"],
                ["Hero schematic", "Inputs left → secured core → outputs right", "Inputs as a row on top → core → outputs as a row below; labels wrap to 2 lines"],
                ["AI portfolio", "Featured Custom AI full width (text 7 / visual 5), products 3-up", "Featured card first, visual moves below text; products stack 1-up"],
                ["Logo strip", "Label + 6 × 2 logos", "Label above, 3 × 4 logos"],
                ["Foundations", "Sticky intro 4 cols + 2 × 2 area grid", "Intro, then areas stacked; chips wrap"],
                ["Case studies", "Lead story 7 cols, two stories stacked in 5 cols", "All stories stacked, image slot shortens to 5:2"],
                ["Services catalogue", "Sticky rail (search + area index) 3 cols, rows in 9 cols as 4-column grid", "Search full width, area index becomes a horizontal chip scroller, rows stack (icon · title / description / link)"],
                ["Case-study template", "Meta table beside title, sticky contents rail", "Meta table 2 × 2 under title; contents rail hidden; blocks stack"],
                ["Navigation", "Inline links + disclosure mega panels", "Menu button → full-height drawer"],
                ["Typography", "h1 70 / h2 52 / body 17", "h1 38 / h2 32 / body 17 (fluid clamp in between)"],
                ["Section spacing", "136px", "72px (fluid)"],
              ].map(([a, b, c]) => (
                <tr key={a}>
                  <th scope="row" className="px-4 py-3 text-start font-semibold text-ink">{a}</th>
                  <td className="px-4 py-3">{b}</td>
                  <td className="px-4 py-3">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* ── Motion ── */}
      <DocSection id="motion" title="Motion" lead="Motion answers actions or carries the one signature story. Transform and opacity only.">
        <div className="grid gap-4 md:grid-cols-3">
          <Panel label="Signal pulses">
            <p className="text-small">2.0–2.8s linear travel along schematic paths, staggered. Hidden under prefers-reduced-motion, replaced by static orange nodes.</p>
          </Panel>
          <Panel label="Interface">
            <p className="text-small">150–200ms ease-out for hover/focus colour, 1px press, chevrons rotate 180°, arrows nudge 2px. Drawer slides in 260ms.</p>
          </Panel>
          <Panel label="Not used">
            <p className="text-small">No scroll-triggered fade-ups, no parallax, no auto-rotating headline (the old rotating verbs are now one static sentence).</p>
          </Panel>
        </div>
      </DocSection>
    </DocsShell>
  );
}
