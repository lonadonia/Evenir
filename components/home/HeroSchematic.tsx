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

const INPUT_ICONS: LucideIcon[] = [Mail, Headset, FileText, Database];
const OUTPUT_ICONS: LucideIcon[] = [MessageSquareText, Inbox, BarChart3];

const TEAL = "#19929b";
const TEAL_INK = "#157981";
const DEEP = "#0c4a4f";
const LINE = "#cfdcdd";
const INK = "#1b2324";
const ORANGE = "#ff8243";

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

function Pulse({ path, dur, begin }: { path: string; dur: number; begin: number }) {
  return (
    <circle r="4.5" fill={ORANGE} opacity="0" className="pulse">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
        <mpath href={`#${path}`} />
      </animateMotion>
      <animate attributeName="opacity" dur={`${dur}s`} begin={`${begin}s`} values="0;1;1;0" keyTimes="0;0.08;0.85;1" repeatCount="indefinite" />
    </circle>
  );
}

function Chip({
  x,
  y,
  w,
  h,
  label,
  Icon,
  tone,
  fontSize = 14,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  Icon?: LucideIcon;
  tone: "in" | "out";
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
        fill={tone === "in" ? "#ffffff" : "#e7f2f3"}
        stroke={tone === "in" ? LINE : "none"}
        strokeWidth={1.25}
      />
      {Icon ? (
        <>
          <Icon x={x + 14} y={y + h / 2 - 9} width={18} height={18} color={TEAL_INK} strokeWidth={1.9} aria-hidden="true" />
          <text x={x + 42} y={y + h / 2} dominantBaseline="central" fontSize={fontSize} fontWeight={600} fill={INK}>
            {label}
          </text>
        </>
      ) : (
        <text x={x + w / 2} y={y + h / 2} textAnchor="middle" fontSize={fontSize} fontWeight={600} fill={INK}>
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

function Crosses({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M20 16v8M16 20h8" stroke="#b9d3d5" strokeWidth="1" />
      </pattern>
    </defs>
  );
}

function LockBadge({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={17} fill="#ffffff" stroke={TEAL} strokeWidth={1.5} />
      <LockKeyhole x={cx - 9} y={cy - 9} width={18} height={18} color={TEAL_INK} strokeWidth={2} aria-hidden="true" />
    </g>
  );
}

export function HeroSchematic({ labels, idPrefix = "hs" }: { labels: Labels; idPrefix?: string }) {
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

  const id = (s: string) => `${idPrefix}-${s}`;

  return (
    <figure className="relative">
      {/* Desktop & tablet */}
      <svg
        viewBox="-20 0 720 520"
        role="img"
        aria-labelledby={id("t")}
        className="hidden h-auto w-full font-sans sm:block"
      >
        <title id={id("t")}>{labels.title}</title>
        <Crosses id={id("grid")} />
        <rect x="-20" y="0" width="720" height="520" fill={`url(#${id("grid")})`} opacity="0.9" />

        {/* connectors */}
        {inPaths.map((d, i) => (
          <path key={`i${i}`} id={id(`in-${i}`)} d={d} fill="none" stroke={TEAL} strokeWidth={1.5} strokeLinecap="round" />
        ))}
        {outPaths.map((d, i) => (
          <path key={`o${i}`} id={id(`out-${i}`)} d={d} fill="none" stroke={TEAL} strokeWidth={1.5} strokeLinecap="round" />
        ))}

        {/* secured perimeter */}
        <rect x="222" y="132" width="224" height="256" rx="48" fill="#ffffff" fillOpacity="0.6" stroke={TEAL} strokeWidth={1.5} strokeDasharray="5 7" />
        {/* AI core */}
        <rect x="246" y="168" width="176" height="184" rx="32" fill={DEEP} />
        <circle cx="334" cy="222" r="22" fill="none" stroke={TEAL} strokeWidth={1.25} opacity="0.7" />
        <circle cx="334" cy="222" r="10" fill={ORANGE} />
        <circle cx="334" cy="222" r="10" fill={ORANGE} className="pulse-ring" />
        <text x="334" y="284" textAnchor="middle" fontSize={21} fontWeight={650} fill="#ffffff" style={{ fontStretch: "116%" }}>
          {labels.core}
        </text>
        <text x="334" y="310" textAnchor="middle" fontSize={12.5} fill="#d5e9eb">
          {labels.coreSub}
        </text>
        <LockBadge cx={334} cy={132} />

        {/* ports */}
        {inY.map((y, i) => (
          <circle key={`pi${i}`} cx={160} cy={y} r={3.5} fill={TEAL} />
        ))}
        {outY.map((y, i) => (
          <circle key={`po${i}`} cx={480} cy={y} r={3.5} fill={TEAL} />
        ))}

        {/* chips */}
        {labels.inputs.map((l, i) => (
          <Chip key={l} x={-12} y={inY[i] - 24} w={172} h={48} label={l} Icon={INPUT_ICONS[i]} tone="in" />
        ))}
        {labels.outputs.map((l, i) => (
          <Chip key={l} x={480} y={outY[i] - 26} w={212} h={52} label={l} Icon={OUTPUT_ICONS[i]} tone="out" fontSize={13.5} />
        ))}

        {/* signal pulses (hidden when reduced motion is requested) */}
        {inPaths.map((_, i) => (
          <Pulse key={`pp${i}`} path={id(`in-${i}`)} dur={2.8} begin={i * 0.7} />
        ))}
        {outPaths.map((_, i) => (
          <Pulse key={`pq${i}`} path={id(`out-${i}`)} dur={2.4} begin={1.4 + i * 0.8} />
        ))}
        {/* static signal dots for reduced motion */}
        <g className="pulse-static">
          <circle cx={192} cy={260} r={4.5} fill={ORANGE} />
          <circle cx={462} cy={200} r={4.5} fill={ORANGE} />
        </g>
      </svg>

      {/* Mobile — recomposed vertically, same message and order */}
      <svg viewBox="-4 -4 368 430" role="img" aria-labelledby={id("tm")} className="h-auto w-full font-sans sm:hidden">
        <title id={id("tm")}>{labels.title}</title>
        <Crosses id={id("gridm")} />
        <rect x="-4" y="-4" width="368" height="430" fill={`url(#${id("gridm")})`} opacity="0.9" />
        {mInPaths.map((d, i) => (
          <path key={`mi${i}`} id={id(`min-${i}`)} d={d} fill="none" stroke={TEAL} strokeWidth={1.5} />
        ))}
        {mOutPaths.map((d, i) => (
          <path key={`mo${i}`} id={id(`mout-${i}`)} d={d} fill="none" stroke={TEAL} strokeWidth={1.5} />
        ))}
        <rect x="66" y="112" width="228" height="196" rx="40" fill="#ffffff" fillOpacity="0.6" stroke={TEAL} strokeWidth={1.5} strokeDasharray="5 7" />
        <rect x="92" y="146" width="176" height="132" rx="28" fill={DEEP} />
        <circle cx="180" cy="186" r="9" fill={ORANGE} />
        <circle cx="180" cy="186" r="9" fill={ORANGE} className="pulse-ring" />
        <text x="180" y="230" textAnchor="middle" fontSize={19} fontWeight={650} fill="#ffffff" style={{ fontStretch: "116%" }}>
          {labels.core}
        </text>
        <text x="180" y="254" textAnchor="middle" fontSize={12} fill="#d5e9eb">
          {labels.coreSub}
        </text>
        <LockBadge cx={294} cy={124} />
        {labels.inputs.map((l, i) => (
          <Chip key={l} x={mIn[i] - 42} y={0} w={84} h={40} label={l} tone="in" fontSize={12.5} />
        ))}
        {labels.outputs.map((l, i) => (
          <Chip key={l} x={mOut[i] - 57} y={372} w={114} h={50} label={l} tone="out" fontSize={12} />
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
