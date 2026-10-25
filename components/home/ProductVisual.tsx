/**
 * Mini schematics for each AI offering — same line language as the hero:
 * 1.5px teal strokes, rounded orthogonal connectors, one orange signal node.
 * They hint at each product's domain by its name only; they do not depict
 * features the client hasn't confirmed.
 */

type Tone = "light" | "dark";

const palette = (tone: Tone) =>
  tone === "dark"
    ? { line: "#5cc6cd", soft: "rgba(213,233,235,0.22)", fill: "rgba(213,233,235,0.08)", node: "#d5e9eb", accent: "#ff8243" }
    : { line: "#19929b", soft: "#cfdcdd", fill: "#ffffff", node: "#157981", accent: "#ff8243" };

export function ProductVisual({ kind, tone = "light", className = "" }: { kind: string; tone?: Tone; className?: string }) {
  const c = palette(tone);
  const common = { className: `h-auto w-full ${className}`, "aria-hidden": true as const, focusable: "false" as const };

  switch (kind) {
    case "custom-ai":
      // Many systems → one tailored core
      return (
        <svg viewBox="0 0 320 200" {...common}>
          {[
            [16, 18],
            [16, 82],
            [16, 146],
            [248, 18],
            [248, 82],
            [248, 146],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={56} height={36} rx={9} fill={c.fill} stroke={c.soft} strokeWidth={1.25} />
          ))}
          <g fill="none" stroke={c.line} strokeWidth={1.5}>
            <path d="M72 36 H96 Q106 36 106 46 V74 Q106 84 116 84 H118" />
            <path d="M72 100 H118" />
            <path d="M72 164 H96 Q106 164 106 154 V126 Q106 116 116 116 H118" />
            <path d="M248 36 H224 Q214 36 214 46 V74 Q214 84 204 84 H202" />
            <path d="M248 100 H202" />
            <path d="M248 164 H224 Q214 164 214 154 V126 Q214 116 204 116 H202" />
          </g>
          <rect x={118} y={62} width={84} height={76} rx={20} fill={tone === "dark" ? "rgba(255,255,255,0.06)" : "#0c4a4f"} stroke={c.line} strokeWidth={1.5} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={`m${i}`} x={134 + (i % 2) * 28} y={78 + Math.floor(i / 2) * 24} width={24} height={20} rx={5} fill={i === 3 ? c.accent : "none"} stroke={i === 3 ? "none" : tone === "dark" ? c.node : "#5cc6cd"} strokeWidth={1.25} />
          ))}
        </svg>
      );
    case "ai-sales":
      // Many enquiries → prioritised few → one conversation
      return (
        <svg viewBox="0 0 320 200" {...common}>
          {[28, 64, 100, 136, 172].map((y, i) => (
            <g key={i}>
              <circle cx={30} cy={y} r={6} fill={c.fill} stroke={c.soft} strokeWidth={1.25} />
              <path d={`M36 ${y} C 100 ${y}, 100 ${[78, 90, 100, 110, 122][i]}, 150 ${[78, 90, 100, 110, 122][i]}`} fill="none" stroke={i === 2 ? c.line : c.soft} strokeWidth={1.5} />
            </g>
          ))}
          <rect x={150} y={66} width={70} height={68} rx={16} fill={c.fill} stroke={c.line} strokeWidth={1.5} />
          {[84, 100, 116].map((y, i) => (
            <rect key={y} x={164} y={y - 3} width={i === 0 ? 42 : i === 1 ? 30 : 36} height={6} rx={3} fill={i === 0 ? c.line : c.soft} />
          ))}
          <path d="M220 100 H262" stroke={c.line} strokeWidth={1.5} />
          <circle cx={278} cy={100} r={16} fill="none" stroke={c.line} strokeWidth={1.5} />
          <circle cx={278} cy={100} r={7} fill={c.accent} />
        </svg>
      );
    case "call-care-ai":
      // Voice → structured text
      return (
        <svg viewBox="0 0 320 200" {...common}>
          <rect x={14} y={56} width={120} height={88} rx={18} fill={c.fill} stroke={c.soft} strokeWidth={1.25} />
          {[10, 22, 36, 26, 44, 30, 18, 34, 22, 12].map((h, i) => (
            <rect key={i} x={30 + i * 9.4} y={100 - h / 2} width={4} height={h} rx={2} fill={i === 4 ? c.accent : c.line} />
          ))}
          <path d="M134 100 H176" stroke={c.line} strokeWidth={1.5} />
          <circle cx={176} cy={100} r={3.5} fill={c.line} />
          <rect x={186} y={40} width={120} height={120} rx={18} fill={c.fill} stroke={c.line} strokeWidth={1.5} />
          {[64, 84, 104, 124, 140].map((y, i) => (
            <rect key={y} x={202} y={y - 3} width={[78, 60, 84, 52, 30][i]} height={6} rx={3} fill={i === 0 ? c.line : c.soft} />
          ))}
        </svg>
      );
    case "real-estate-ai":
      // Property outline as a floor plan, one located point
      return (
        <svg viewBox="0 0 320 200" {...common}>
          <path d="M70 92 L160 30 L250 92" fill="none" stroke={c.line} strokeWidth={1.5} strokeLinejoin="round" />
          <rect x={86} y={88} width={148} height={96} rx={10} fill={c.fill} stroke={c.line} strokeWidth={1.5} />
          <path d="M148 88 V140 M148 140 H234 M86 132 H120" fill="none" stroke={c.soft} strokeWidth={1.5} />
          <rect x={100} y={102} width={34} height={22} rx={5} fill="none" stroke={c.soft} strokeWidth={1.25} />
          <rect x={162} y={102} width={58} height={26} rx={5} fill="none" stroke={c.soft} strokeWidth={1.25} />
          <circle cx={190} cy={162} r={13} fill="none" stroke={c.line} strokeWidth={1.5} />
          <circle cx={190} cy={162} r={6} fill={c.accent} />
          <path d="M18 184 H302" stroke={c.soft} strokeWidth={1.25} strokeDasharray="3 6" />
        </svg>
      );
    default:
      return null;
  }
}
