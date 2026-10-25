import type { ReactNode } from "react";

/** Two-tone headline: the recognised Evenir device (ink sentence, teal emphasis). */
export function TwoTone({ parts }: { parts: (string | { em: string })[] }) {
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <span key={i} className="em-teal">
            {p.em}
          </span>
        ),
      )}
    </>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`label inline-flex items-center gap-2 ${tone === "dark" ? "text-mist" : "text-teal-ink"}`}>
      <span aria-hidden="true" className="relative grid size-2.5 place-items-center">
        <span className="absolute inset-0 animate-signal rounded-full bg-orange/50 motion-reduce:hidden" />
        <span className="relative size-2 rounded-full bg-orange" />
      </span>
      {children}
    </p>
  );
}
