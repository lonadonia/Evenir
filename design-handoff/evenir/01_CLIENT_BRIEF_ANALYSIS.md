# 01 · Client brief analysis — Evenir UX/UI redesign

## Inventory (what was actually available)

| Source | Status |
|---|---|
| Written brief (EN, 14 sections) | Read in full |
| Saved homepage `evenir.cz` (cs, 4.6 MB HTML, Elementor) | Read: structure, copy, navigation, embedded assets, CSS tokens |
| Live site `evenir.cz` and its AI product pages | **NOT VERIFIED** — blocked by this environment's network policy |
| Product descriptions for Evenir AI Sales, Call Care AI, Real Estate AI, Custom AI | **NOT SUPPLIED** — names only (from site navigation) |
| Case studies, metrics, testimonials | **NOT SUPPLIED** |
| Logo | Original SVG extracted from the saved page (colour + white footer version) |
| CMS | Observed as WordPress + Elementor + Polylang (cs/en/de) from page markup — **to confirm with client** |

Facts carried over verbatim from the saved page: navigation and service names, the hero claim *“Zefektivněte / Zkvalitněte / Zrychlete své podnikání”*, *“Ušetříme Vám čas, starosti i peníze.”*, the About text, the contact form (4 fields + consent), contacts and address, partner badges (Microsoft CSP, Dell Technologies, Industrial IT), 12 client logos, team photo, brand colours, and the darker teal `#157981` already used in the site CSS.

## Brief decode card

- **Literal:** redesign (not rebuild) of three page types — homepage, services catalogue, reusable case-study template — plus a concise style guide, in desktop + mobile, delivered as editable Figma. Up to X revisions. CMS implementation optional.
- **Commercial:** an established Prague IT services firm (outsourcing, M365, cyber security, cloud, infrastructure) is repositioning to lead with AI. Revenue action = a qualified enquiry about an AI offering; the site must route executives to the right offering and give them proof.
- **Human:** owners and executives who are curious about AI but wary of hype, cost and data risk. They trust vendors who already keep their systems running safely.
- **Core insight:** *Evenir must look like an AI company to executives who distrust AI hype; it wins by making AI feel engineered and accountable — the same calm control it already brings to infrastructure and security (“klid a jistota”).*

## Requirements traceability (summary)

Full table with live status: `/board#trace` (source: `content/requirements.ts`).

| ID | Level | Requirement | Source |
|---|---|---|---|
| REQ-001 | MUST | Logo unchanged | §4 |
| REQ-002 | MUST | Preserve #19929B, #5B5B5B, #D5E9EB, #FF8243 | §4 |
| REQ-003 | MUST | Preserve brand voice | §4 |
| REQ-004 | MUST | AI hero: headline + visual + direct action | §5.1 |
| REQ-005 | MUST | Custom AI Solutions first, desktop & mobile | §5.2, §13 (stated twice) |
| REQ-006 | MUST | Stronger visual portfolio, consistent pattern, clear routes | §5.2 |
| REQ-007 | MUST | Signposted case-study entry block | §5.3 |
| REQ-008 | MUST | Shared header/nav/footer/buttons/form | §5.4 |
| REQ-009 | MUST | Scalable, scannable Services catalogue | §6 |
| REQ-010 | MUST | Search/filter only as proposal | §6 |
| REQ-011 | MUST | Duplicable case-study template, coherent without optional slots | §7 |
| REQ-012 | MUST | One coherent UI system | §10 |
| REQ-013 | MUST | Desktop + mobile for every agreed page | §9 |
| REQ-014 | MUST | Style guide: colours, fonts, button states, spacing tokens | §10 |
| REQ-015 | MUST | 5 flows incl. mobile navigation | §8 |
| REQ-016 | MUST | No fabricated names, figures, quotes, outcomes | §5.3, §11 |
| REQ-017 | MUST | Keep non-AI services / access to existing content | §2, §8 |
| REQ-018 | SHOULD | Contrast, focus, labels, touch, no hover-only | §9 |
| REQ-019 | MUST | Editable Figma files | §12 |
| REQ-020 | SHOULD | Document reflow and long content | §6, §9 |
| REQ-021 | MUST | Record open decisions | §14 |
| REQ-022 | MUST | Fonts cover the content languages | §4, §11 |

## Assumptions (reversible defaults)

- **A-001** Czech is the primary language; English is provided for review; German links to the existing DE site.
- **A-002** AI portfolio = Custom AI Solutions + the three AI products in the current navigation (Evenir AI Sales, Call Care AI, Real Estate AI).
- **A-003** Product and service detail pages stay as they are; new pages link to the live URLs.
- **A-004** “Případové studie” in navigation points to the homepage block (no listing page).
- **A-005** All 19 existing services remain, grouped into five areas; nothing is removed.
- **A-006** Client logos from the current site may still be shown (to reconfirm).
- **A-007** The existing contact form keeps its four required fields; the prototype does not submit.

## Open decisions (from brief §14)

1. What “full desktop and mobile flows” includes beyond the three page types.
2. Which product/service detail pages, if any, need new designs.
3. The approved AI catalogue and expected size of the services catalogue.
4. Whether a case-study listing page is needed.
5. Which non-AI services stay in navigation and hierarchy.
6. Content languages (today CS, EN, DE).
7. The number of revision rounds (X).
8. CMS in use (observed: WordPress/Elementor) and scope of implementation support.
