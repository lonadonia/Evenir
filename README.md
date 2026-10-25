# Evenir — UX/UI redesign prototype

A coded, token-driven design prototype for the Evenir website redesign: AI-first homepage, scalable services catalogue, reusable case-study template, style guide and review board — desktop and mobile, Czech (primary) and English.

| Route | What |
|---|---|
| `/` · `/en` | Homepage (hero, AI portfolio with Custom AI first, foundations, case studies, about, contact) |
| `/sluzby` · `/en/services` | Services catalogue (5 areas, 19 services, proposed search) |
| `/pripadove-studie/ukazka-zakaznicka-linka` | Case-study template — full |
| `/pripadove-studie/ukazka-obchodni-poptavky` | Case-study template — without testimonial |
| `/pripadove-studie/ukazka-interni-dokumenty` | Case-study template — minimal |
| `/styleguide` | Colours + computed contrast, type, button states, spacing tokens, components, forms, responsive rules |
| `/board` | Desktop & mobile frames, flows, requirement traceability, open decisions |

Add `?notes=1` to any page (or use the “Poznámky k návrhu” switch) to show design annotations and draft-copy markers.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## QA

```bash
node scripts/qa-shoot.mjs http://localhost:3000 --out qa/run --paths /,/sluzby,/en --hide-notes
node scripts/qa-interactions.mjs http://localhost:3000 --out qa/int
```

Both need Playwright with Chromium available.

## Where things live

- Tokens: `app/globals.css` (`@theme`)
- Copy & data: `content/` (site strings, services, case studies, notes, requirements)
- Components: `components/`
- Handoff: `design-handoff/evenir/` (brief analysis, blueprint, master prompt, QA checklist, delivery notes, screenshots)

Placeholder content is labelled as such. No client names, figures or quotes have been invented. The contact form does not submit in this prototype.
