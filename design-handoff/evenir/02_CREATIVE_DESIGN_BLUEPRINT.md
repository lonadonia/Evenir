# 02 · Creative design blueprint — Evenir

## The client's world (raw material)

Cloud with a padlock (the logo) · server racks · network topology drawings · SIEM event streams · Zabbix graphs · hardening checklists · PKI certificates and keys · Microsoft 365 tenants · VMware clusters · call queues and transcripts · sales pipelines · floor plans and listings · Jičínská street, Žižkov · formal “Vy/Vám” · the brand line *“čas, starosti i peníze”* · *“klid a jistota v digitálním světě”*.

## Territories considered

| | A · Clear console (safe-excellent) | **B · Signal schematic (brand-forward) — chosen** | C · Operations ledger (unexpected) |
|---|---|---|---|
| Layout DNA | Even 12-col grid, card rows | Wide statement headlines, asymmetric splits, one dark featured block per page | Dense index tables, mono labels |
| Type voice | Neutral grotesk | Archivo expanded (echoes the wide EVENIR wordmark) + normal width for reading | Mono + condensed |
| Colour logic | Teal everywhere | Teal = Evenir, orange = act / AI signal, deep teal for the one featured moment | Near-monochrome graphite |
| Imagery | Stock/isometric | Code-drawn network diagrams with a dashed security perimeter | Data tables as image |
| Motion | Fades | Orange pulses travelling along connectors (reduced-motion safe) | None |

**Why B:** it turns Evenir's real strength — running and securing infrastructure — into the visual language of its AI offer, so the AI looks engineered rather than hyped. A was competent but generic; C was too cold for executives.

## Signature move

**The signal schematic.** In the hero, company data (e-mails, calls, documents, CRM) enters a dashed *secured perimeter* around the Evenir AI core and leaves as outputs for the team. The same line language (1.5px teal, rounded orthogonal connectors, one orange node) is reused for each product card, the featured Custom AI block and the case-study solution section. Orange appears only as the primary action and as the signal — so the eye links “AI” and “act here”.

Supporting device kept from the current site: **the two-tone headline** — an ink sentence with one or two teal words (“…ušetří **čas**, starosti i **peníze**.”).

## Generic-default check

- Centered hero + two buttons + three identical cards → replaced by a wide statement headline over a split of lead/actions and a live diagram.
- Purple/blue gradients, glass, blobs → none; flat brand colours and line drawings.
- Tracked uppercase eyebrows everywhere → one eyebrow (hero) only; sentence case throughout (Czech diacritics stay legible).
- Fade-up on every section → no scroll animations at all.
- Default font (Inter/Montserrat/Poppins) → Archivo with width axis, chosen for the logo echo and Czech/German coverage.

## Design system (tokens live in `app/globals.css`)

- **Colours:** brand four unchanged; support tones derived from them (teal-ink `#157981` from the live CSS, teal-deep, teal-night, mist tints, ink, line, line-strong, orange-soft/tint, danger). Every pair is measured on `/styleguide#contrast`.
- **Type scale:** h1 38→70, h2 32→52, h3 22→28, h4 20, lead 18→21, body 17, small 15, caption 13 (fluid `clamp()`).
- **Space:** 4px base; gutter 20→40; section 72→136; compact band 48→80.
- **Shape:** radii 6/10/14/20/32 with nested-radius rule; teal-tinted shadows.
- **Icons:** Lucide, stroke 1.75, in mist tiles (light) or translucent tiles with orange glyphs (dark).

## Page blueprints

### Homepage (recommended order — a design recommendation, not client-prescribed)
1. **Hero** — eyebrow “AI pro firmy” · two-tone h1 (DRAFT) · lead (DRAFT) · primary “Prozkoumat AI řešení” (↓ scrolls to portfolio) · secondary “Domluvit konzultaci” (→ form) · signal schematic. Mobile: same order, schematic recomposed vertically.
2. **Client logos** — the 12 logos from the current site, optically size-normalised (to reconfirm).
3. **AI portfolio** — featured dark card *AI řešení na míru pro firmy* (first in DOM and on every breakpoint) with typical areas and two routes; then three product cards with one identical pattern (kind · name · description · visual · “Detail produktu ↗”).
4. **Foundations** — “AI stavíme na pevných základech”: the four non-AI areas as a 2×2 index with chips to catalogue anchors + “Všechny služby”.
5. **AI v praxi** — three story previews (lead + two), visibly labelled *Ukázkový obsah*, metric slot left empty, CTA band.
6. **O nás** — verbatim About text, team photo, partner badges.
7. **Contact** — the existing form (4 required fields + consent) on a deep-teal band with direct contacts.

### Services catalogue (`/sluzby`)
Intro band (h1, lead, count “19 služeb · 5 oblastí”) → sticky rail (search *proposed* + area index with counts and scroll-spy) → five groups, each a heading + intro + rows. **Service row** = icon · kind · name · description · ↗. Featured row gets an orange edge and badge. New service = one new row; new area = one new group. Mobile: chips scroller for areas; rows stack.

### Case-study template (`/pripadove-studie/[slug]`)
Review bar (variant switcher) → breadcrumb → product tag + *Ukázkový obsah* → h1 + summary → meta table (client, industry, solution, length) → hero image slot → sticky contents rail + blocks: Context (opt.) · Challenge (req.) · Solution with steps (opt.) and product schematic · Results with up to 3 metric slots (opt.) · Gallery (opt.) · Testimonial (opt.) → next step band (CTA + related offering) → more stories. Three samples prove full / partial / minimal content.

## Flows
See `/board#flows`: hero → portfolio/services; portfolio → product (existing page); catalogue → service (existing page); case-study entry → story → next step; mobile navigation open/use/close.
