"use client";

import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";

const KEY = "evenir-notes";

/** Floating switch for the review annotation layer (Figma-comment equivalent). */
export function NotesToggle({ label, on, off, draft }: { label: string; on: string; off: string; draft: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let initial = false;
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("notes");
      initial = fromUrl ? fromUrl === "1" : window.localStorage.getItem(KEY) === "on";
    } catch {
      /* storage unavailable — notes stay off */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from browser-only storage after hydration
    setEnabled(initial);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.notes = enabled ? "on" : "off";
    try {
      window.localStorage.setItem(KEY, enabled ? "on" : "off");
    } catch {
      /* ignore */
    }
  }, [enabled]);

  return (
    <div className="fixed bottom-4 left-4 z-40 print:hidden">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled((v) => !v)}
        className="group flex items-center gap-2.5 rounded-full border border-line bg-white/95 py-1.5 ps-2 pe-3.5 text-caption font-semibold text-ink shadow-card backdrop-blur hover:border-line-strong"
      >
        <span
          aria-hidden="true"
          className={`grid size-7 place-items-center rounded-full transition-colors ${enabled ? "bg-orange text-ink" : "bg-mist-100 text-teal-ink"}`}
        >
          <MessageSquareText className="size-4" strokeWidth={2} />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span>
            {label} <span className="font-normal text-graphite">· {enabled ? on : off}</span>
          </span>
          <span className="hidden font-normal text-graphite sm:inline">{draft}</span>
        </span>
      </button>
    </div>
  );
}
