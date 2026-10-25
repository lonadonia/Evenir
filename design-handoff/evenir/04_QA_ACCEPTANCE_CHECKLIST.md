# 04 · QA & acceptance checklist — Evenir

Evidence was produced on 2026-10-25 against the production build (`next build` + `next start`), and re-run in full after the v2 visual upgrade (dark lit surfaces, bento portfolio, new sections). The results below are the v2 run.

## Commands

| Check | Command | Result |
|---|---|---|
| Lint | `npx eslint .` | exit 0 |
| Types | `npx tsc --noEmit` | exit 0 |
| Build | `npx next build` | exit 0 — 17 routes, all static or prerendered |
| Visual/a11y scan | `node scripts/qa-shoot.mjs http://localhost:3001 --paths <11 routes> --widths 1440,1024,768,390,360` | 55 captures, **0 flagged** (overflow, console errors, failed requests, alt, h1 count, heading order, unnamed controls, targets < 24px, text < 12px, lang, description) |
| Interactions | `node scripts/qa-interactions.mjs http://localhost:3001` | **27/27 pass** |
| 404 | `curl /neexistuje` | HTTP 404 with designed page |

Screens: `design-handoff/evenir/screens/` (v2 full pages at 1440 and 390, hero crop, plus menu, drawer, form and catalogue states).

### v2 contrast additions (computed)

| Pair | Ratio |
|---|---|
| Mist 85% / Abyss (hero lead, card text) | 10.24:1 |
| Mist 70% / Abyss (small labels) | 7.34:1 |
| Teal glow / Teal deep | 4.94:1 |
| Orange ink / Orange tint (badges) | 5.20:1 |
| White / AI core gradient mid `#0F5F65` | 7.38:1 |

### v2 findings fixed during QA

- Scroll-linked reveal left the case-study block at zero opacity in full-page captures → removed; sections are never hidden.
- A floating hero badge covered the “Hovory” chip → moved onto the empty part of the console's title bar.
- QA script captured the header mid smooth-scroll (looked opaque) → script now scrolls instantly; header verified transparent at top on all three dark-hero pages.
- About photo sometimes captured as its blur placeholder → loads eagerly.

## Brief §13 acceptance checklist

| Item | Status | Evidence |
|---|---|---|
| Logo unchanged; four brand colours preserved | VERIFIED_PASS | Original SVGs in `public/brand`; tokens in `globals.css`; `/styleguide#colours` |
| Homepage communicates AI focus immediately | VERIFIED_PASS | Hero h1 + eyebrow + schematic above the fold at 1440/390 |
| Hero has headline, visual and direct action to AI offerings | VERIFIED_PASS | Interaction check “Hero CTA → #ai-reseni” |
| Custom AI first in the portfolio on desktop and mobile | VERIFIED_PASS | Interaction checks (portfolio + mobile menu); DOM order |
| Portfolio clearer, consistent pattern | VERIFIED_PASS | One product-card component; featured card |
| Case-study entry block + reusable template | VERIFIED_PASS | `/#pripadove-studie`; 3 template variants; check “Minimal variant collapses optional slots 5 → 3” |
| Services page handles a larger catalogue | VERIFIED_PASS | Grouped rows, area index, counts; stress-test row in style guide |
| One coherent system (type, spacing, buttons, icons, forms) | VERIFIED_PASS | `/styleguide` |
| Desktop + mobile flows covered; unresolved destinations annotated | VERIFIED_PASS | `/board#frames`, `/board#flows`; design notes layer (`?notes=1`) |
| Figma work editable and reusable | **BLOCKED_EXTERNAL** | Native `.fig` files were not produced in this run. Delivered as a coded, token-driven prototype ready for HTML-to-Figma import (see 05). |
| Style guide covers colours, fonts, button states, spacing tokens | VERIFIED_PASS | `/styleguide` sections 1–5 |
| Placeholder copy and unconfirmed claims marked | VERIFIED_PASS | “Ukázkový obsah” labels; draft outlines in notes mode; notes 1–9 |
| Revision allowance and optional CMS support stated accurately | VERIFIED_PASS | Open decisions #7 and #8 (X not invented) |

## Accessibility notes (not a certification)

- Contrast measured for every documented pair; failures are listed as “not used”. One defect was found and fixed during QA: the first input-border tone measured 2.17:1 and was replaced with `#7F9496` (3.19:1).
- Keyboard: disclosure menus (Enter/Space, Esc returns focus), mobile drawer with focus trap and focus return, skip link, visible focus rings that switch colour on dark surfaces.
- Forms: visible labels, required markers with screen-reader text, inline errors linked via `aria-describedby`, focused error summary with links.
- Motion: only the schematic pulses; hidden under `prefers-reduced-motion` (static nodes shown instead).

## Design critique (v2, after two further loops)

| Area | Score /5 | Main fix made |
|---|---|---|
| Brief fidelity | 5 | — |
| Hierarchy (squint test) | 4.5 | Hero recomposed: wide statement headline, larger schematic |
| Typography | 4.5 | — |
| Colour | 4.5 | Input border contrast fixed |
| Composition & rhythm | 4.5 | Dark–light alternation, bento grid, overlapping covers and badges |
| Distinctiveness | 4.5 | Glowing signal schematic in a console, product mini-interfaces |
| Signature move | 4.5 | Reused in product cards and case-study template |
| Copy | 4 | Draft — needs client approval |
| Responsiveness | 4.5 | 1024 hero fixed; drawer containing-block bug fixed |
| Accessibility | 4.5 | — |
| Motion restraint | 5 | — |
| Polish | 4.5 | Lift shadows, pointer highlight, logo marquee, footer watermark, new OG images |

## Known limitations

- Live evenir.cz pages could not be opened from the build environment; product descriptions are working copy from product names only.
- The team photo source is 800 × 533 px; request the original for sharper retina rendering.
- English copy is a review translation, not approved copy. German is linked to the current DE site only.
