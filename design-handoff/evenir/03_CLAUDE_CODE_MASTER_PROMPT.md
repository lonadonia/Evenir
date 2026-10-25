# 03 · Claude Code master prompt — continue or implement the Evenir redesign

Copy everything below the line into a new Claude Code session opened on this repository.

---

You are continuing the Evenir website redesign. The repository already contains a working, token-driven Next.js 16 (App Router, TypeScript, Tailwind CSS v4) prototype of the agreed pages. Read `AGENTS.md` and the version-matched docs in `node_modules/next/dist/docs/` before changing framework code — this Next.js version differs from older APIs (Cache Components are on; `params` are Promises; multiple root layouts are used per locale).

## Ground truth — do not change without the client's approval
- Logo: use only `public/brand/evenir-logo.svg` (colour) and `public/brand/evenir-logo-white.svg` (footer). Never redraw, recolour or re-proportion it.
- Brand colours (exact): `#19929B` teal, `#5B5B5B` graphite, `#D5E9EB` mist, `#FF8243` orange. All tokens live in `app/globals.css` `@theme`; documentation mirrors them in `content/tokens.ts`.
- Orange is never used as text on white and white is never used on orange (2.46:1). Primary buttons are orange with ink text.
- “Custom AI Solutions for Businesses” (`custom-ai`) must stay first wherever AI offerings are listed: homepage portfolio, navigation (desktop and mobile), catalogue.
- No invented clients, figures, quotes, certifications or outcomes. Case-study content in `content/case-studies.ts` is placeholder and must stay visibly labelled until the client supplies approved material.
- Non-AI services stay visible; nothing from the current site's service list is removed.

## Structure
- `app/(cs)` Czech (primary, `lang="cs"`), `app/(en)/en` English, `app/(docs)` style guide and review board (`lang="en"`).
- Copy: `content/site.ts` (interface strings), `content/services.ts` (catalogue), `content/case-studies.ts`, `content/notes.ts` (design annotations + open decisions), `content/requirements.ts` (traceability).
- Components: `components/site` (header/nav/drawer/footer), `components/home`, `components/services`, `components/case`, `components/ui` (Button, Field, icons), `components/notes` (annotation layer), `components/docs`.
- Signature visuals: `components/home/HeroSchematic.tsx` and `components/home/ProductVisual.tsx` (pure SVG).

## Tasks you may be asked to do next
1. **Replace placeholders with approved content** — edit only the `content/` modules; keep string lengths within the documented limits (service descriptions ≤ ~140 characters). Remove the “Ukázkový obsah” labels only for stories the client approved.
2. **Add a service** — append an entry to the right group in `content/services.ts` (id, name cs/en, description cs/en, kind, icon, href). Nothing else changes.
3. **Add a case study** — append to `content/case-studies.ts`; omit optional fields (context, metrics, media, testimonial) when not supplied — the template collapses them.
4. **Implement on the client's CMS** (only if commissioned; observed CMS is WordPress + Elementor + Polylang — confirm first): rebuild the tokens as Elementor global colours/fonts (Archivo, Google Fonts, latin-ext), recreate components as Elementor templates/global widgets, keep the existing form plugin and its fields, and keep URLs of existing detail pages.
5. **Wire the contact form** — only to a service the client names and authorises. Until then the prototype must keep saying “Ukázka návrhu — zpráva nebyla odeslána”.

## Quality bar before any commit
- `npm run lint`, `npx tsc --noEmit`, `npm run build` all exit 0.
- `node scripts/qa-shoot.mjs http://localhost:3000 --out qa/run --paths /,/sluzby,/pripadove-studie/ukazka-zakaznicka-linka,/en --hide-notes` → 0 flagged items (overflow, console errors, alt text, heading order, unnamed controls, 24px targets, tiny text).
- `node scripts/qa-interactions.mjs http://localhost:3000 --out qa/int` → all checks pass (menus, drawer focus trap, form states, catalogue search, story navigation).
- Look at the screenshots yourself at 1440 and 390 before claiming anything is done.
- Never deploy to production, change DNS or add secrets without explicit authorisation. Push feature branches; previews only.
