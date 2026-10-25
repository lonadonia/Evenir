import { BarChart3, FileText, Headset, LockKeyhole, Mail, MessageSquareText, Database, Inbox, type LucideIcon } from "lucide-react";

/**
 * SIGNATURE MOVE — the "signal schematic".
 * Drawn in the language of a network diagram (Evenir's home ground:
 * infrastructure and security): company data enters a secured perimeter
 * around the AI core and leaves as outputs for the team. Orange pulses are
 * the only orange in the composition — the same orange as the primary action.
 * Pure SVG: editable as vectors, crisp at any size, no image assets.
 */

type Labels = {
  title: string;
  inputs: string[];
  core: string;
  coreSub: string;
  outputs: string[];
};

type Tone = "light" | "dark";

const INPUT_ICONS: LucideIcon[] = [Mail, Headset, FileText, Database];
const OUTPUT_ICONS: LucideIcon[] = [MessageSquareText, Inbox, BarChart3];
const ORANGE = "#ff8243";

const PALETTE = {
  light: {
    line: "#19929b",
    icon: "#157981",
    text: "#1b2324",
    inFill: "#ffffff",
    inStroke: "#cfdcdd",
    outFill: "#e7f2f3",
    outStroke: "none",
    perimeter: "#19929b",
    perimeterFill: "rgba(255,255,255,0.6)",
    core: "#0c4a4f",
    coreStroke: "none",
    coreText: "#ffffff",
    coreSub: "#d5e9eb",
    ring: "#19929b",
    cross: "#b9d3d5",
    badgeFill: "#ffffff",
  },
  dark: {
    line: "#3fb3bb",
    icon: "#5cc6cd",
    text: "#ffffff",
    inFill: "rgba(255,255,255,0.06)",
    inStroke: "rgba(255,255,255,0.16)",
    outFill: "rgba(92,198,205,0.14)",
    outStroke: "rgba(92,198,205,0.35)",
    perimeter: "#5cc6cd",
    perimeterFill: "rgba(92,198,205,0.05)",
    core: "#0c4a4f", // replaced by the gradient defined in <Defs>
    coreStroke: "rgba(140,230,236,0.55)",
    coreText: "#ffffff",
    coreSub: "#bfe3e6",
    ring: "#5cc6cd",
    cross: "rgba(255,255,255,0.10)",
    badgeFill: "#062e31",
  },
} as const;

/** Orthogonal connector with rounded corners: horizontal → vertical → horizontal. */
function hvh(x1: number, y1: number, xTurn: number, y2: number, x2: number, r = 10) {
  if (Math.abs(y2 - y1) < 1) return `M${x1},${y1} H${x2}`;
  const dir = y2 > y1 ? 1 : -1;
  const sx = x2 > x1 ? 1 : -1;
  return `M${x1},${y1} H${xTurn - r * sx} Q${xTurn},${y1} ${xTurn},${y1 + r * dir} V${y2 - r * dir} Q${xTurn},${y2} ${xTurn + r * sx},${y2} H${x2}`;
}
/** Vertical → horizontal → vertical connector (mobile layout). */
function vhv(x1: number, y1: number, yTurn: number, x2: number, y2: number, r = 10) {
  if (Math.abs(x2 - x1) < 1) return `M${x1},${y1} V${y2}`;
  const dir = x2 > x1 ? 1 : -1;
  return `M${x1},${y1} V${yTurn - r} Q${x1},${yTurn} ${x1 + r * dir},${yTurn} H${x2 - r * dir} Q${x2},${yTurn} ${x2},${yTurn + r} V${y2}`;
}

function Pulse({ path, dur, begin, glow }: { path: string; dur: number; begin: number; glow?: string }) {
  return (
    <g opacity="0" className="pulse">
      {glow && <circle r="10" fill={ORANGE} opacity="0.35" filter={`url(#${glow})`} />}
      <circle r="4.5" fill={ORANGE} />
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
        <mpath href={`#${path}`} />
      </animateMotion>
      <animate attributeName="opacity" dur={`${dur}s`} begin={`${begin}s`} values="0;1;1;0" keyTimes="0;0.08;0.85;1" repeatCount="indefinite" />
    </g>
  );
}

function Chip({
  x,
  y,
  w,
  h,
  label,
  Icon,
  kind,
  p,
  fontSize = 14,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  Icon?: LucideIcon;
  kind: "in" | "out";
  p: (typeof PALETTE)[Tone];
  fontSize?: number;
}) {
  const lines = label.length > 13 && !Icon ? splitTwo(label) : [label];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={13}
        fill={kind === "in" ? p.inFill : p.outFill}
        stroke={kind === "in" ? p.inStroke : p.outStroke}
        strokeWidth={1.25}
      />
      {Icon ? (
        <>
          <Icon x={x + 14} y={y + h / 2 - 9} width={18} height={18} color={p.icon} strokeWidth={1.9} aria-hidden="true" />
          <text x={x + 42} y={y + h / 2} dominantBaseline="central" fontSize={fontSize} fontWeight={600} fill={p.text}>
            {label}
          </text>
        </>
      ) : (
        <text x={x + w / 2} y={y + h / 2} textAnchor="middle" fontSize={fontSize} fontWeight={600} fill={p.text}>
          {lines.map((l, i) => (
            <tspan key={i} x={x + w / 2} dy={i === 0 ? (lines.length === 1 ? "0.35em" : "-0.25em") : "1.2em"}>
              {l}
            </tspan>
          ))}
        </text>
      )}
    </g>
  );
}

function splitTwo(s: string) {
  const words = s.split(" ");
  if (words.length < 2) return [s];
  let best = [s];
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const d = Math.abs(a.length - b.length);
    if (d < bestDiff) {
      bestDiff = d;
      best = [a, b];
    }
  }
  return best;
}

function Defs({ id, p, tone }: { id: (s: string) => string; p: (typeof PALETTE)[Tone]; tone: Tone }) {
  return (
    <defs>
      <pattern id={id("grid")} width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M20 16v8M16 20h8" stroke={p.cross} strokeWidth="1" />
      </pattern>
      <linearGradient id={id("core")} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1aa3ad" />
        <stop offset="0.55" stopColor="#0f5f65" />
        <stop offset="1" stopColor="#0a3f43" />
      </linearGradient>
      <radialGradient id={id("halo")}>
        <stop offset="0" stopColor="#19929b" stopOpacity={tone === "dark" ? 0.55 : 0.18} />
        <stop offset="1" stopColor="#19929b" stopOpacity="0" />
      </radialGradient>
      <filter id={id("blur")} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>
  );
}

export function HeroSchematic({ labels, idPrefix = "hs", tone = "light" }: { labels: Labels; idPrefix?: string; tone?: Tone }) {
  const p = PALETTE[tone];
  const dark = tone === "dark";
  const id = (s: string) => `${idPrefix}-${s}`;
  const coreFill = dark ? `url(#${id("core")})` : p.core;

  /* ── Desktop / tablet geometry (680 × 520) ── */
  const inY = [110, 210, 310, 410];
  const coreIn = [222, 248, 274, 300];
  const inTurn = [208, 192, 192, 208];
  const outY = [160, 260, 360];
  const coreOut = [228, 260, 292];
  const inPaths = inY.map((y, i) => hvh(160, y, inTurn[i], coreIn[i], 246));
  const outPaths = outY.map((y, i) => hvh(422, coreOut[i], 462, y, 480));

  /* ── Mobile geometry (360 × 470) ── */
  const mIn = [42, 134, 226, 318];
  const mCoreIn = [138, 166, 194, 222];
  const mInTurn = [92, 76, 76, 92];
  const mOut = [57, 180, 303];
  const mCoreOut = [150, 180, 210];
  const mInPaths = mIn.map((x, i) => vhv(x, 40, mInTurn[i], mCoreIn[i], 146));
  const mOutPaths = mOut.map((x, i) => vhv(mCoreOut[i], 278, i === 1 ? 330 : 326, x, 372));

  const glowId = dark ? id("blur") : undefined;

  const lines = (paths: string[], prefix: string) => (
    <>
      {dark &&
        paths.map((d, i) => (
          <path key={`g${prefix}${i}`} d={d} fill="none" stroke={p.line} strokeWidth={5} opacity={0.35} filter={`url(#${id("blur")})`} />
        ))}
      {paths.map((d, i) => (
        <path key={`${prefix}${i}`} id={id(`${prefix}-${i}`)} d={d} fill="none" stroke={p.line} strokeWidth={1.5} strokeLinecap="round" />
      ))}
    </>
  );

  const lockBadge = (cx: number, cy: number) => (
    <g>
      <circle cx={cx} cy={cy} r={17} fill={p.badgeFill} stroke={p.perimeter} strokeWidth={1.5} />
      <LockKeyhole x={cx - 9} y={cy - 9} width={18} height={18} color={p.icon} strokeWidth={2} aria-hidden="true" />
    </g>
  );

  return (
    <figure className="relative">
      {/* Desktop & tablet */}
      <svg viewBox="-20 0 720 520" role="img" aria-labelledby={id("t")} className="hidden h-auto w-full font-sans sm:block">
        <title id={id("t")}>{labels.title}</title>
        <Defs id={id} p={p} tone={tone} />
        <rect x="-20" y="0" width="720" height="520" fill={`url(#${id("grid")})`} />
        <circle cx="334" cy="260" r="230" fill={`url(#${id("halo")})`} />

        {lines(inPaths, "in")}
        {lines(outPaths, "out")}

        {/* secured perimeter */}
        <rect x="222" y="132" width="224" height="256" rx="48" fill={p.perimeterFill} stroke={p.perimeter} strokeWidth={1.5} strokeDasharray="5 7" opacity={dark ? 0.85 : 1} />
        {/* AI core */}
        <rect x="246" y="168" width="176" height="184" rx="32" fill={coreFill} stroke={p.coreStroke} strokeWidth={1.25} />
        {dark && <rect x="247" y="169" width="174" height="60" rx="31" fill="white" opacity="0.06" />}
        <circle cx="334" cy="222" r="22" fill="none" stroke={p.ring} strokeWidth={1.25} opacity="0.7" />
        {dark && <circle cx="334" cy="222" r="16" fill={ORANGE} opacity="0.45" filter={`url(#${id("blur")})`} />}
        <circle cx="334" cy="222" r="10" fill={ORANGE} />
        <circle cx="334" cy="222" r="10" fill={ORANGE} className="pulse-ring" />
        <text x="334" y="284" textAnchor="middle" fontSize={21} fontWeight={650} fill={p.coreText} style={{ fontStretch: "116%" }}>
          {labels.core}
        </text>
        <text x="334" y="310" textAnchor="middle" fontSize={12.5} fill={p.coreSub}>
          {labels.coreSub}
        </text>
        {lockBadge(334, 132)}

        {inY.map((y, i) => (
          <circle key={`pi${i}`} cx={160} cy={y} r={3.5} fill={p.line} />
        ))}
        {outY.map((y, i) => (
          <circle key={`po${i}`} cx={480} cy={y} r={3.5} fill={p.line} />
        ))}

        {labels.inputs.map((l, i) => (
          <Chip key={l} x={-12} y={inY[i] - 24} w={172} h={48} label={l} Icon={INPUT_ICONS[i]} kind="in" p={p} />
        ))}
        {labels.outputs.map((l, i) => (
          <Chip key={l} x={480} y={outY[i] - 26} w={212} h={52} label={l} Icon={OUTPUT_ICONS[i]} kind="out" p={p} fontSize={13.5} />
        ))}

        {inPaths.map((_, i) => (
          <Pulse key={`pp${i}`} path={id(`in-${i}`)} dur={2.8} begin={i * 0.7} glow={glowId} />
        ))}
        {outPaths.map((_, i) => (
          <Pulse key={`pq${i}`} path={id(`out-${i}`)} dur={2.4} begin={1.4 + i * 0.8} glow={glowId} />
        ))}
        <g className="pulse-static">
          <circle cx={192} cy={260} r={4.5} fill={ORANGE} />
          <circle cx={462} cy={200} r={4.5} fill={ORANGE} />
        </g>
      </svg>

      {/* Mobile — recomposed vertically, same message and order */}
      <svg viewBox="-4 -4 368 430" role="img" aria-labelledby={id("tm")} className="h-auto w-full font-sans sm:hidden">
        <title id={id("tm")}>{labels.title}</title>
        <Defs id={(s) => id(`m-${s}`)} p={p} tone={tone} />
        <rect x="-4" y="-4" width="368" height="430" fill={`url(#${id("m-grid")})`} />
        <circle cx="180" cy="212" r="170" fill={`url(#${id("m-halo")})`} />
        {mInPaths.map((d, i) => (
          <path key={`mi${i}`} id={id(`min-${i}`)} d={d} fill="none" stroke={p.line} strokeWidth={1.5} />
        ))}
        {mOutPaths.map((d, i) => (
          <path key={`mo${i}`} id={id(`mout-${i}`)} d={d} fill="none" stroke={p.line} strokeWidth={1.5} />
        ))}
        <rect x="66" y="112" width="228" height="196" rx="40" fill={p.perimeterFill} stroke={p.perimeter} strokeWidth={1.5} strokeDasharray="5 7" />
        <rect x="92" y="146" width="176" height="132" rx="28" fill={dark ? `url(#${id("m-core")})` : p.core} stroke={p.coreStroke} strokeWidth={1.25} />
        <circle cx="180" cy="186" r="9" fill={ORANGE} />
        <circle cx="180" cy="186" r="9" fill={ORANGE} className="pulse-ring" />
        <text x="180" y="230" textAnchor="middle" fontSize={19} fontWeight={650} fill={p.coreText} style={{ fontStretch: "116%" }}>
          {labels.core}
        </text>
        <text x="180" y="254" textAnchor="middle" fontSize={12} fill={p.coreSub}>
          {labels.coreSub}
        </text>
        {lockBadge(294, 124)}
        {labels.inputs.map((l, i) => (
          <Chip key={l} x={mIn[i] - 42} y={0} w={84} h={40} label={l} kind="in" p={p} fontSize={12.5} />
        ))}
        {labels.outputs.map((l, i) => (
          <Chip key={l} x={mOut[i] - 57} y={372} w={114} h={50} label={l} kind="out" p={p} fontSize={12} />
        ))}
        {mInPaths.map((_, i) => (
          <Pulse key={`mp${i}`} path={id(`min-${i}`)} dur={2.4} begin={i * 0.6} />
        ))}
        {mOutPaths.map((_, i) => (
          <Pulse key={`mq${i}`} path={id(`mout-${i}`)} dur={2} begin={1.2 + i * 0.7} />
        ))}
        <g className="pulse-static">
          <circle cx={76} cy={92} r={4} fill={ORANGE} />
          <circle cx={180} cy={330} r={4} fill={ORANGE} />
        </g>
      </svg>
    </figure>
  );
}
