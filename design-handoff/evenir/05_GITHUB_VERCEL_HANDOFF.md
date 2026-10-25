# 05 · GitHub & Vercel handoff — Evenir

## GitHub

- Repository: `lonadonia/Evenir` (https://github.com/lonadonia/Evenir)
- Branch: `claude/evenir-ux-ui-redesign-6rlvoj`
- First commit: `28eaf11` (the repository was empty, so this branch is currently its only, and therefore default, branch)
- No pull request has been opened.

## Vercel

- Team: *hakim's projects*. New project: `evenir-redesign` (`prj_aQzkKIi9njeh43K0pGQOcWWxXjnc`), framework Next.js, Node 22.
- Deployment `dpl_6MCivbZvtQ9u3h9aq2xxFq5wtG6S` from commit `28eaf11` — state **READY**:
  - https://evenir-redesign.vercel.app
  - https://evenir-redesign-atc6jlq7m-hakims-projects-8cc34b62.vercel.app (immutable deployment URL)
- Verified through Vercel's authenticated fetch: `/`, `/sluzby`, `/pripadove-studie/ukazka-interni-dokumenty` and `/board` return HTTP 200 with the expected titles and headings, and `noindex`.
- **Target note:** the request did not specify a target, but Vercel labelled the deployment *production* because the new project took the repository's only branch as its production branch. This is a new, isolated project: no custom domain, no DNS change, and no existing project was touched. All pages send `noindex`. If you prefer, rename the production branch in Vercel → Project → Settings → Git (e.g. to `main`) so feature branches deploy as previews, or delete the project.
- The project was created by a one-off deployment and is **not** connected to the repository for automatic deploys. To deploy future pushes automatically, connect `lonadonia/Evenir` in the project's Git settings.
- **Access:** the team default *Vercel Authentication* is enabled on this project (all deployments except custom domains), so people outside the team are asked to log in. To show the client, create a shareable link in Project → Settings → Deployment Protection, or turn protection off there. This setting was deliberately left unchanged.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Pages: `/`, `/en`, `/sluzby`, `/en/services`, `/pripadove-studie/ukazka-zakaznicka-linka` (full), `/pripadove-studie/ukazka-obchodni-poptavky` (no quote), `/pripadove-studie/ukazka-interni-dokumenty` (minimal), `/styleguide`, `/board`. Add `?notes=1` to see design annotations.

## Getting the design into Figma (brief deliverable)

Native `.fig` files were not generated in this run. Recommended route:

1. Run the site (locally or from the deployment URL).
2. Import `/`, `/sluzby` and one case-study variant at 1440 px and 390 px with an HTML-to-Figma importer plugin; import `/styleguide` once.
3. In Figma, create variables named after the tokens in `app/globals.css` (`color/teal`, `color/teal-ink`, `space/gutter`, `radius/lg`, …) and bind imported layers to them.
4. Convert repeated blocks to components with variants: Button (primary/secondary/on-dark × default/hover/focus/pressed/disabled), Field (default/focus/filled/error/disabled), Product card, Story card, Service row (default/featured), Nav header (desktop/mobile + drawer).
5. Organise pages: 00 Cover · 01 Style guide & components · 02 Desktop · 03 Mobile · 04 Flows & notes (copy from `/board`).

## Client actions needed

- Approve or rewrite the draft hero copy and the product/service descriptions.
- Confirm the AI product catalogue (open decision #3) and whether client logos may still be shown.
- Supply case studies with consented facts, metrics and quotes; supply hi-res originals of the team photo.
- Answer the eight open decisions (see `/board#decisions`).
