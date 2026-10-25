/**
 * Requirement traceability (brief → design). Statuses use the agreed vocabulary:
 * IMPLEMENTED_NOT_TESTED · VERIFIED_PASS · BLOCKED_EXTERNAL · NOT_APPLICABLE.
 * "Where" points at the place in the prototype that satisfies the requirement.
 */
export type Req = { id: string; level: "MUST" | "SHOULD"; text: string; where: string; status: string };

export const requirements: Req[] = [
  { id: "REQ-001", level: "MUST", text: "Existing logo unchanged, proportions preserved", where: "Header & footer use the original SVG assets (viewBox trimmed only)", status: "VERIFIED_PASS" },
  { id: "REQ-002", level: "MUST", text: "Preserve #19929B · #5B5B5B · #D5E9EB · #FF8243", where: "Tokens in globals.css; /styleguide#colours", status: "VERIFIED_PASS" },
  { id: "REQ-003", level: "MUST", text: "Preserve the brand voice", where: "Formal “Vy/Vám”, the brand line “čas, starosti i peníze”, About text verbatim", status: "IMPLEMENTED_NOT_TESTED" },
  { id: "REQ-004", level: "MUST", text: "AI-focused hero: headline, visual, direct action to AI offerings", where: "Homepage hero → “Prozkoumat AI řešení” scrolls to #ai-reseni", status: "VERIFIED_PASS" },
  { id: "REQ-005", level: "MUST", text: "Custom AI Solutions for Businesses first in the portfolio on desktop and mobile", where: "Featured card precedes products in DOM and on every breakpoint; also first in nav & catalogue", status: "VERIFIED_PASS" },
  { id: "REQ-006", level: "MUST", text: "Stronger, visual AI portfolio with consistent pattern and routes", where: "Featured card + 3 product cards (title, description, visual, link)", status: "VERIFIED_PASS" },
  { id: "REQ-007", level: "MUST", text: "Clearly signposted case-study entry block", where: "Homepage “AI v praxi” with 3 story previews → template", status: "VERIFIED_PASS" },
  { id: "REQ-008", level: "MUST", text: "Shared header, navigation, footer, buttons, existing form", where: "SiteNav, Footer, Button, ContactForm", status: "VERIFIED_PASS" },
  { id: "REQ-009", level: "MUST", text: "Services page: clean, scannable, ready for a larger catalogue", where: "/sluzby — grouped rows, area index, counts", status: "VERIFIED_PASS" },
  { id: "REQ-010", level: "MUST", text: "Search/filters only as proposed functionality needing agreement", where: "Catalogue search flagged in design notes", status: "VERIFIED_PASS" },
  { id: "REQ-011", level: "MUST", text: "Reusable case-study template; coherent without optional slots", where: "/pripadove-studie/* — full, partial and minimal variants", status: "VERIFIED_PASS" },
  { id: "REQ-012", level: "MUST", text: "Consistent typography, spacing, buttons, icons, form controls", where: "/styleguide", status: "VERIFIED_PASS" },
  { id: "REQ-013", level: "MUST", text: "Dedicated desktop and mobile layouts for every agreed page", where: "/board frames; QA screenshots 1440–360", status: "VERIFIED_PASS" },
  { id: "REQ-014", level: "MUST", text: "Style guide: colours, fonts, button states, spacing tokens", where: "/styleguide#colours, #typography, #buttons, #spacing", status: "VERIFIED_PASS" },
  { id: "REQ-015", level: "MUST", text: "Desktop & mobile flows incl. mobile navigation", where: "/board#flows", status: "VERIFIED_PASS" },
  { id: "REQ-016", level: "MUST", text: "No fabricated clients, figures, quotes or outcomes; placeholders labelled", where: "Case studies marked “Ukázkový obsah”; metric/quote slots empty", status: "VERIFIED_PASS" },
  { id: "REQ-017", level: "MUST", text: "Keep non-AI services and access to existing content", where: "Foundations section, catalogue, footer; detail links to live evenir.cz", status: "VERIFIED_PASS" },
  { id: "REQ-018", level: "SHOULD", text: "Readable contrast, visible focus, labelled fields, touch targets, no hover-only info", where: "Computed contrast table; QA report", status: "VERIFIED_PASS" },
  { id: "REQ-019", level: "MUST", text: "Editable Figma files (desktop + mobile)", where: "Not produced natively in this run — coded prototype is import-ready (see handoff)", status: "BLOCKED_EXTERNAL" },
  { id: "REQ-020", level: "SHOULD", text: "Document reflow, long content, new entries", where: "/styleguide#responsive, #components", status: "VERIFIED_PASS" },
  { id: "REQ-021", level: "MUST", text: "Record open decisions", where: "/board#decisions; handoff docs", status: "VERIFIED_PASS" },
  { id: "REQ-022", level: "MUST", text: "Fonts support the content languages", where: "Archivo latin + latin-ext (CS, EN, DE)", status: "VERIFIED_PASS" },
];
