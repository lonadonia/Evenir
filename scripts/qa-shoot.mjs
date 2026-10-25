#!/usr/bin/env node
/**
 * Visual QA: full-page screenshots at 1440/1024/768/390/360, a reduced-motion
 * pass and an automated report (overflow, console errors, failed requests,
 * alt text, heading order, unnamed controls, tap targets, tiny text, lang,
 * title/description).
 *
 * Usage: node scripts/qa-shoot.mjs <baseUrl> --out <dir> [--paths /,/en,...] [--widths 1440,390]
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

// Playwright may be installed globally (preinstalled browser) rather than in this project.
const { chromium } = createRequire(import.meta.url)("playwright");

const args = process.argv.slice(2);
const base = args[0] ?? "http://localhost:3000";
const opt = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : d;
};
const out = opt("--out", "qa");
const paths = opt("--paths", "/").split(",");
const widths = opt("--widths", "1440,1024,768,390,360").split(",").map(Number);
const reduced = !args.includes("--no-reduced");
fs.mkdirSync(out, { recursive: true });

const slug = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/[/#?=&]+/g, "_"));

const browser = await chromium.launch();
const report = [];

async function audit(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const issues = {};
    // Horizontal overflow
    const overflow = [];
    if (document.documentElement.scrollWidth > vw + 1) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > vw + 1 || r.left < -1)) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed") continue;
          let p = el.parentElement, clipped = false;
          while (p) { const s = getComputedStyle(p); if (["hidden", "clip", "auto", "scroll"].includes(s.overflowX)) { const pr = p.getBoundingClientRect(); if (pr.right <= vw + 1) { clipped = true; break; } } p = p.parentElement; }
          if (!clipped) overflow.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} → ${Math.round(r.right)}px`);
        }
        if (overflow.length > 8) break;
      }
      issues.overflow = { scrollWidth: document.documentElement.scrollWidth, vw, offenders: overflow };
    }
    // Images
    issues.missingAlt = [...document.querySelectorAll("img:not([alt])")].map((i) => i.src.slice(-60));
    // Headings
    const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter((h) => h.offsetParent !== null || getComputedStyle(h).position === "fixed");
    const levels = hs.map((h) => +h.tagName[1]);
    const skips = [];
    levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) skips.push(`${hs[i - 1].tagName}→${hs[i].tagName} "${hs[i].textContent.trim().slice(0, 40)}"`); });
    issues.h1Count = document.querySelectorAll("h1").length;
    issues.headingSkips = skips;
    // Unnamed controls
    const unnamed = [];
    for (const el of document.querySelectorAll("a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=switch]")) {
      if (el.closest("[hidden]") || el.offsetParent === null) continue;
      const name = (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.textContent || el.getAttribute("title") || el.querySelector("img[alt]")?.getAttribute("alt") || (el.id && document.querySelector(`label[for="${el.id}"]`)?.textContent) || "").trim();
      if (!name) unnamed.push(el.outerHTML.slice(0, 100));
    }
    issues.unnamed = unnamed;
    // Tap targets (< 24px, visible, interactive) — excluding inline text links
    const small = [];
    for (const el of document.querySelectorAll("a[href],button,input,select,textarea")) {
      if (el.offsetParent === null || el.closest("[hidden]")) continue;
      const r = el.getBoundingClientRect();
      const inline = getComputedStyle(el).display === "inline" && el.closest("p,li,address,dd,td");
      if (!inline && r.width > 0 && (r.width < 24 || r.height < 24)) small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(r.width)}×${Math.round(r.height)}`);
    }
    issues.smallTargets = small.slice(0, 15);
    // Tiny text
    const tiny = new Set();
    for (const el of document.querySelectorAll("body *")) {
      if (!el.childNodes.length || el.offsetParent === null) continue;
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!hasText) continue;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 12) tiny.add(`${el.tagName.toLowerCase()} ${fs}px "${el.textContent.trim().slice(0, 30)}"`);
    }
    issues.tinyText = [...tiny].slice(0, 10);
    issues.lang = document.documentElement.lang;
    issues.title = document.title;
    issues.description = document.querySelector('meta[name="description"]')?.content ?? null;
    return issues;
  });
}

for (const p of paths) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const consoleErrors = [];
    const failed = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => consoleErrors.push(String(e).slice(0, 200)));
    page.on("requestfailed", (r) => { if (!r.url().startsWith("https://evenir.cz")) failed.push(r.url()); });
    page.on("response", (r) => { if (r.status() >= 400 && r.url().startsWith(base)) failed.push(`${r.status()} ${r.url()}`); });
    await page.goto(base + p, { waitUntil: "networkidle" });
    // Prime lazy content / reveals
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(600);
    if (args.includes("--hide-notes")) await page.addStyleTag({ content: ".fixed.bottom-4.left-4{display:none!important}" });
    const file = path.join(out, `${slug(p)}_${w}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const issues = await audit(page);
    report.push({ path: p, width: w, file, consoleErrors, failed, ...issues });
    await ctx.close();
  }
  if (reduced) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(base + p, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(out, `${slug(p)}_1440_reduced.png`) });
    await ctx.close();
  }
}

// 320px thumbnail of the first path (squint test)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + paths[0], { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(out, "thumb_full.png") });
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));

let problems = 0;
for (const r of report) {
  const flags = [];
  if (r.overflow) flags.push(`OVERFLOW ${r.overflow.scrollWidth}>${r.overflow.vw}: ${r.overflow.offenders.join(" | ")}`);
  if (r.consoleErrors.length) flags.push(`CONSOLE ${r.consoleErrors.join(" | ")}`);
  if (r.failed.length) flags.push(`FAILED ${r.failed.join(" | ")}`);
  if (r.missingAlt.length) flags.push(`ALT ${r.missingAlt.join(", ")}`);
  if (r.h1Count !== 1) flags.push(`H1 count ${r.h1Count}`);
  if (r.headingSkips.length) flags.push(`HEADINGS ${r.headingSkips.join(" | ")}`);
  if (r.unnamed.length) flags.push(`UNNAMED ${r.unnamed.join(" | ")}`);
  if (r.smallTargets.length) flags.push(`TARGETS ${r.smallTargets.join(" | ")}`);
  if (r.tinyText.length) flags.push(`TINY ${r.tinyText.join(" | ")}`);
  if (!r.lang) flags.push("NO LANG");
  if (!r.description) flags.push("NO DESCRIPTION");
  problems += flags.length;
  console.log(`${r.path} @${r.width}: ${flags.length ? "\n  - " + flags.join("\n  - ") : "OK"}`);
}
console.log(`\n${report.length} captures, ${problems} flagged items → ${out}/report.json`);
