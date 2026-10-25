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
    <p
      className={`label inline-flex items-center gap-2 rounded-full border py-1.5 ps-2.5 pe-3.5 ${
        tone === "dark" ? "border-white/12 bg-white/5 text-mist" : "border-teal/20 bg-white text-teal-ink shadow-[0_1px_2px_rgb(6_46_49/0.06)]"
      }`}
    >
      <span aria-hidden="true" className="relative grid size-2.5 place-items-center">
        <span className="absolute inset-0 animate-signal rounded-full bg-orange/50 motion-reduce:hidden" />
        <span className="relative size-2 rounded-full bg-orange" />
      </span>
      {children}
    </p>
  );
}

/** Section opening: eyebrow pill, display title, lead aligned to the title's baseline on desktop. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "split",
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "split" | "center";
}) {
  if (align === "center") {
    return (
      <header className="reveal mx-auto max-w-[48rem] text-center">
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2 id={id} className={`display mt-5 text-h2 ${tone === "dark" ? "text-white" : ""}`}>
          {title}
        </h2>
        {lead && <p className={`mx-auto mt-5 max-w-[56ch] text-lead ${tone === "dark" ? "text-mist/85" : ""}`}>{lead}</p>}
      </header>
    );
  }
  return (
    <header className="reveal grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
      <div className="lg:col-span-7">
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2 id={id} className={`display mt-5 text-h2 ${tone === "dark" ? "text-white" : ""}`}>
          {title}
        </h2>
      </div>
      {lead && (
        <p className={`max-w-[46ch] text-lead lg:col-span-5 lg:justify-self-end ${tone === "dark" ? "text-mist/85" : ""}`} data-draft>
          {lead}
        </p>
      )}
    </header>
  );
}
