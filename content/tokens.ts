/** Mirror of the @theme tokens in app/globals.css, for documentation only. */
export const brandColors = [
  { token: "teal", hex: "#19929B", name: "Evenir teal", role: "Brand signature: large display emphasis (two-tone headlines), icons, schematic lines, focus ring on light surfaces." },
  { token: "graphite", hex: "#5B5B5B", name: "Evenir graphite", role: "Body copy and secondary text on light surfaces." },
  { token: "mist", hex: "#D5E9EB", name: "Evenir mist", role: "Secondary surfaces, chips, active states, text on dark teal." },
  { token: "orange", hex: "#FF8243", name: "Evenir orange", role: "Primary action (with ink text) and the AI ‘signal’. Used sparingly — never as text on white." },
];

export const supportColors = [
  { token: "teal-ink", hex: "#157981", name: "Teal ink", role: "Links, small teal text, secondary buttons. Already used on evenir.cz." },
  { token: "teal-deep", hex: "#0C4A4F", name: "Teal deep", role: "Dark brand surface: featured AI card, contact band." },
  { token: "teal-night", hex: "#062E31", name: "Teal night", role: "Deep surface, gradient end of dark heroes." },
  { token: "abyss", hex: "#031D1F", name: "Abyss", role: "Hero, ‘Why Evenir’, contact and footer base, lit by teal and orange glows." },
  { token: "orange-ink", hex: "#A84A1A", name: "Orange ink", role: "Orange text/icons on orange tint (badges)." },
  { token: "ink", hex: "#1B2324", name: "Ink", role: "Headings and strong text (teal-tinted near-black)." },
  { token: "mist-50", hex: "#F3F9FA", name: "Mist 50", role: "Page tint for alternating sections." },
  { token: "mist-100", hex: "#E7F2F3", name: "Mist 100", role: "Hover tint, icon tiles." },
  { token: "line", hex: "#CFDCDD", name: "Line", role: "Hairlines and dividers (decorative)." },
  { token: "line-strong", hex: "#7F9496", name: "Line strong", role: "Input borders — 3.19:1 against white (non-text needs 3:1)." },
  { token: "orange-soft", hex: "#FF9A66", name: "Orange soft", role: "Hover state of primary buttons (raises ink contrast)." },
  { token: "orange-tint", hex: "#FFF1EA", name: "Orange tint", role: "Demo / placeholder labels, :target highlight." },
  { token: "danger", hex: "#B42318", name: "Danger", role: "Form errors only." },
  { token: "teal-glow", hex: "#5CC6CD", name: "Teal glow", role: "Two-tone emphasis on dark teal surfaces." },
];

export const contrastPairs: { fg: string; bg: string; fgName: string; bgName: string; use: string }[] = [
  { fg: "#1B2324", bg: "#FFFFFF", fgName: "Ink", bgName: "White", use: "Headings, strong text" },
  { fg: "#5B5B5B", bg: "#FFFFFF", fgName: "Graphite", bgName: "White", use: "Body text" },
  { fg: "#5B5B5B", bg: "#F3F9FA", fgName: "Graphite", bgName: "Mist 50", use: "Body text on tinted sections" },
  { fg: "#5B5B5B", bg: "#D5E9EB", fgName: "Graphite", bgName: "Mist", use: "Text on chips" },
  { fg: "#157981", bg: "#FFFFFF", fgName: "Teal ink", bgName: "White", use: "Links, small teal labels" },
  { fg: "#157981", bg: "#F3F9FA", fgName: "Teal ink", bgName: "Mist 50", use: "Links on tinted sections" },
  { fg: "#19929B", bg: "#FFFFFF", fgName: "Teal", bgName: "White", use: "Display emphasis ≥ 24px only; icons; focus ring" },
  { fg: "#1B2324", bg: "#FF8243", fgName: "Ink", bgName: "Orange", use: "Primary button label" },
  { fg: "#1B2324", bg: "#FF9A66", fgName: "Ink", bgName: "Orange soft", use: "Primary button hover" },
  { fg: "#FFFFFF", bg: "#157981", fgName: "White", bgName: "Teal ink", use: "Solid teal fills (icon hover)" },
  { fg: "#FFFFFF", bg: "#0C4A4F", fgName: "White", bgName: "Teal deep", use: "Headings on dark" },
  { fg: "#D5E9EB", bg: "#0C4A4F", fgName: "Mist", bgName: "Teal deep", use: "Body text on dark" },
  { fg: "#5CC6CD", bg: "#0C4A4F", fgName: "Teal glow", bgName: "Teal deep", use: "Two-tone emphasis on dark" },
  { fg: "#FF8243", bg: "#0C4A4F", fgName: "Orange", bgName: "Teal deep", use: "Icons, focus ring on dark" },
  { fg: "#D5E9EB", bg: "#062E31", fgName: "Mist", bgName: "Teal night", use: "Body text on deep surfaces" },
  { fg: "#FFFFFF", bg: "#031D1F", fgName: "White", bgName: "Abyss", use: "Hero headline" },
  { fg: "#D5E9EB", bg: "#031D1F", fgName: "Mist", bgName: "Abyss", use: "Hero lead, footer text" },
  { fg: "#5CC6CD", bg: "#031D1F", fgName: "Teal glow", bgName: "Abyss", use: "Two-tone emphasis in the hero" },
  { fg: "#A84A1A", bg: "#FFF1EA", fgName: "Orange ink", bgName: "Orange tint", use: "Priority badge, shield icon" },
  { fg: "#7F9496", bg: "#FFFFFF", fgName: "Line strong", bgName: "White", use: "Input border (non-text, needs 3:1)" },
  { fg: "#B42318", bg: "#FFFFFF", fgName: "Danger", bgName: "White", use: "Error messages" },
  { fg: "#FFFFFF", bg: "#FF8243", fgName: "White", bgName: "Orange", use: "NOT USED — fails; reason the button label is ink" },
  { fg: "#FF8243", bg: "#FFFFFF", fgName: "Orange", bgName: "White", use: "NOT USED as text — fails" },
];

export const typeScale = [
  { token: "text-h1", css: "clamp(2.375rem, 1.35rem + 4vw, 4.375rem)", mobile: 38, desktop: 70, lh: "1.02", weight: "640 · width 116", use: "Page title (one per page)" },
  { token: "text-h2", css: "clamp(2rem, 1.45rem + 2.1vw, 3.25rem)", mobile: 32, desktop: 52, lh: "1.06", weight: "640 · width 116", use: "Section titles" },
  { token: "text-h3", css: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)", mobile: 22, desktop: 28, lh: "1.2", weight: "620 · width 110", use: "Sub-sections, card titles (large)" },
  { token: "text-h4", css: "1.25rem", mobile: 20, desktop: 20, lh: "1.3", weight: "620 · width 110", use: "Card & row titles" },
  { token: "text-lead", css: "clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)", mobile: 18, desktop: 21, lh: "1.55", weight: "400", use: "Intros, perex" },
  { token: "text-body", css: "1.0625rem", mobile: 17, desktop: 17, lh: "1.65", weight: "400", use: "Reading text" },
  { token: "text-small", css: "0.9375rem", mobile: 15, desktop: 15, lh: "1.55", weight: "400 / 600", use: "Descriptions, labels, nav" },
  { token: "text-caption", css: "0.8125rem", mobile: 13, desktop: 13, lh: "1.45", weight: "600", use: "Meta, kind labels, counts" },
];

export const spacing = [
  { token: "1", px: 4 },
  { token: "2", px: 8 },
  { token: "3", px: 12 },
  { token: "4", px: 16 },
  { token: "5", px: 20 },
  { token: "6", px: 24 },
  { token: "8", px: 32 },
  { token: "10", px: 40 },
  { token: "12", px: 48 },
  { token: "16", px: 64 },
  { token: "20", px: 80 },
  { token: "24", px: 96 },
  { token: "32", px: 128 },
];

export const semanticSpacing = [
  { token: "gutter", value: "clamp(20px → 40px)", use: "Page side padding (390 → 1440)" },
  { token: "section", value: "clamp(72px → 136px)", use: "Vertical padding of major sections" },
  { token: "section-sm", value: "clamp(48px → 80px)", use: "Compact bands (CTA, next step)" },
  { token: "card padding", value: "24 / 32 / 40 px", use: "Card p-6, panels p-8, feature p-10+" },
  { token: "grid gap", value: "16 / 24 / 32 px", use: "Mobile / tablet / desktop columns" },
  { token: "stack", value: "8 / 16 / 24 px", use: "Label→field, paragraph, block rhythm" },
];

export const radii = [
  { token: "radius-xs", px: 6, use: "Tags" },
  { token: "radius-sm", px: 10, use: "Inputs, small tiles" },
  { token: "radius-md", px: 14, use: "Buttons, icon tiles, inner panels" },
  { token: "radius-lg", px: 20, use: "Cards" },
  { token: "radius-xl", px: 32, use: "Feature panels, hero console, form card" },
];
