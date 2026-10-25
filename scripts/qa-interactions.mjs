#!/usr/bin/env node
/**
 * Interaction QA for the agreed flows: desktop menus, mobile drawer (open/use/close,
 * focus handling), hero CTA, contact form (errors → confirmation), catalogue search
 * (results + empty state), case-study variants, notes layer. Saves state screenshots.
 *
 * Usage: node scripts/qa-interactions.mjs <baseUrl> --out <dir>
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const { chromium } = createRequire(import.meta.url)("playwright");
const base = process.argv[2] ?? "http://localhost:3000";
const outIdx = process.argv.indexOf("--out");
const out = outIdx > 0 ? process.argv[outIdx + 1] : "qa/interactions";
fs.mkdirSync(out, { recursive: true });

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};
const shot = (page, name, full = false) => page.screenshot({ path: path.join(out, `${name}.png`), fullPage: full });

const browser = await chromium.launch();

/* ── Desktop ── */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base + "/", { waitUntil: "networkidle" });

  // Flow 1: hero CTA scrolls to the AI portfolio
  await page.getByRole("link", { name: "Prozkoumat AI řešení" }).click();
  await page.waitForTimeout(900);
  check("Hero CTA → #ai-reseni", page.url().endsWith("#ai-reseni"), page.url());
  const firstCard = await page.locator("#ai-reseni article h3").first().textContent();
  check("Custom AI is the first offering in the portfolio", /na míru/.test(firstCard ?? ""), firstCard ?? "");

  // AI mega menu via keyboard
  await page.evaluate(() => window.scrollTo(0, 0));
  const aiBtn = page.getByRole("button", { name: "AI řešení" });
  await aiBtn.focus();
  await page.keyboard.press("Enter");
  check("AI menu opens with Enter", (await aiBtn.getAttribute("aria-expanded")) === "true");
  await shot(page, "desktop_ai_menu");
  await page.keyboard.press("Escape");
  check("AI menu closes with Escape", (await aiBtn.getAttribute("aria-expanded")) === "false");
  check("Focus returns to the AI trigger", await aiBtn.evaluate((el) => el === document.activeElement));

  // Services mega menu via click, then outside click
  const svcBtn = page.getByRole("button", { name: "Služby" });
  await svcBtn.click();
  await shot(page, "desktop_services_menu");
  check("Services menu opens on click", (await svcBtn.getAttribute("aria-expanded")) === "true");
  await page.mouse.click(700, 800);
  check("Services menu closes on outside click", (await svcBtn.getAttribute("aria-expanded")) === "false");

  // Contact form: errors then success
  await page.goto(base + "/#kontakt", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Odeslat" }).click();
  await page.waitForTimeout(200);
  const invalid = await page.locator('[aria-invalid="true"]').count();
  check("Empty submit marks 4 invalid fields", invalid === 4, `${invalid} invalid`);
  const summaryFocused = await page.evaluate(() => document.activeElement?.getAttribute("role") === "alert");
  check("Error summary receives focus", summaryFocused);
  await page.locator("#kontakt").screenshot({ path: path.join(out, "form_errors.png") });
  await page.fill("#cf-name", "Jana Nováková");
  await page.fill("#cf-email", "jana@firma.cz");
  await page.fill("#cf-phone", "+420 777 123 456");
  await page.fill("#cf-message", "Zajímá nás AI asistent pro zákaznickou linku.");
  await page.getByRole("button", { name: "Odeslat" }).click();
  await page.waitForSelector('[role="status"]', { timeout: 3000 });
  const demo = await page.locator('[role="status"]').textContent();
  check("Confirmation shows and states the preview did not send", /nebyla odeslána/.test(demo ?? ""));
  await page.locator("#kontakt").screenshot({ path: path.join(out, "form_confirmation.png") });

  // Notes layer
  await page.goto(base + "/?notes=1", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const pins = await page.locator(".note-pin").evaluateAll((els) => els.filter((e) => getComputedStyle(e).display !== "none").length);
  check("Design notes layer shows annotation pins", pins >= 8, `${pins} pins visible`);
  await page.locator(".note-pin button").first().click();
  await shot(page, "desktop_notes_on");
  await page.goto(base + "/?notes=0", { waitUntil: "networkidle" });

  // Catalogue search
  await page.goto(base + "/sluzby", { waitUntil: "networkidle" });
  await page.fill("#svc-filter", "bezpecnost");
  await page.waitForTimeout(200);
  const rows = await page.locator("article[id]").count();
  check("Search is diacritics-insensitive (bezpecnost → matches)", rows > 0, `${rows} rows`);
  await shot(page, "catalogue_search");
  await page.fill("#svc-filter", "xyzzy");
  await page.waitForTimeout(200);
  const empty = await page.getByText("Pro tento výraz jsme nic nenašli.").isVisible();
  check("Empty state appears for no match", empty);
  await shot(page, "catalogue_empty");
  await page.getByRole("button", { name: "Zrušit hledání" }).first().click();
  check("Clear restores all 19 rows", (await page.locator("article[id]").count()) === 19);

  // Nav → catalogue anchor
  await page.goto(base + "/sluzby#hardening", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const hardeningTop = await page.locator("#hardening").evaluate((el) => el.getBoundingClientRect().top);
  check("Service anchor lands below the sticky header", hardeningTop > 70 && hardeningTop < 400, `top=${Math.round(hardeningTop)}`);
  await shot(page, "catalogue_target");

  // Case-study entry → story; variant switcher
  await page.goto(base + "/#pripadove-studie", { waitUntil: "networkidle" });
  await page.locator("#pripadove-studie h3 a").first().click();
  await page.waitForURL(/pripadove-studie\//);
  check("Homepage story preview → case-study template", /ukazka-zakaznicka-linka/.test(page.url()), page.url());
  const sectionsFull = await page.locator("article section[id]").count();
  await page.goto(base + "/pripadove-studie/ukazka-interni-dokumenty", { waitUntil: "networkidle" });
  const sectionsMin = await page.locator("article section[id]").count();
  check("Minimal variant collapses optional slots", sectionsFull > sectionsMin, `${sectionsFull} → ${sectionsMin} blocks`);

  check("No console/page errors on desktop flows", errors.length === 0, errors.slice(0, 3).join(" | "));
  await page.close();
}

/* ── Mobile ── */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const menuBtn = page.getByRole("button", { name: "Menu" });
  await menuBtn.click();
  const dialog = page.getByRole("dialog");
  check("Mobile drawer opens as a modal dialog", await dialog.isVisible());
  await page.waitForTimeout(400); // let the slide-in finish
  const box = await dialog.boundingBox();
  check("Drawer covers the full viewport height", !!box && box.height >= 840 && box.x === 0, box ? `${Math.round(box.width)}×${Math.round(box.height)} at x=${Math.round(box.x)}` : "no box");
  check("Focus moves to the close button", await page.evaluate(() => document.activeElement?.textContent?.includes("Zavřít") ?? false));
  const firstAi = await dialog.locator("a").first().textContent();
  check("Custom AI first in the mobile menu", /na míru/.test(firstAi ?? ""), firstAi ?? "");
  check("Body scroll is locked while open", (await page.evaluate(() => document.body.style.overflow)) === "hidden");
  await shot(page, "mobile_drawer_ai");
  await dialog.getByRole("button", { name: "Služby" }).click();
  await shot(page, "mobile_drawer_services");
  // Tab trap
  for (let i = 0; i < 30; i++) await page.keyboard.press("Tab");
  check("Focus stays inside the drawer (trap)", await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]')));
  await page.keyboard.press("Escape");
  check("Escape closes the drawer", !(await dialog.isVisible().catch(() => false)));
  check("Focus returns to the Menu button", await menuBtn.evaluate((el) => el === document.activeElement));
  // Use: navigate via drawer
  await menuBtn.click();
  await page.getByRole("dialog").getByRole("link", { name: "Případové studie" }).click();
  await page.waitForTimeout(800);
  check("Drawer link navigates and closes the drawer", page.url().includes("#pripadove-studie") && !(await page.getByRole("dialog").isVisible().catch(() => false)), page.url());
  await page.goto(base + "/sluzby", { waitUntil: "networkidle" });
  await shot(page, "mobile_catalogue");
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(out, "interactions.json"), JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
