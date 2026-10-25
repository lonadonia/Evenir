"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Numbered annotation pin. Hidden unless the notes layer is on
 * (html[data-notes="on"]). Click or keyboard opens the note.
 */
export function Note({
  n,
  text,
  className = "",
  align = "start",
}: {
  n: number | string;
  text: string;
  className?: string;
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className={`note-pin absolute z-30 ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-8 place-items-center rounded-full bg-orange text-[0.8125rem] font-bold text-ink shadow-pop ring-2 ring-white"
      >
        <span aria-hidden="true" className="absolute inset-0 animate-signal rounded-full bg-orange/60 motion-reduce:hidden" />
        <span className="relative">{n}</span>
        <span className="sr-only">Design note</span>
      </button>
      <div
        id={id}
        role="note"
        hidden={!open}
        className={`absolute top-10 w-[min(22rem,calc(100vw-2.5rem))] rounded-md border border-line bg-white p-4 text-small text-ink shadow-pop ${align === "end" ? "end-0" : "start-0"}`}
      >
        {text}
      </div>
    </div>
  );
}
