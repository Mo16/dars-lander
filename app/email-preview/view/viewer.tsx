"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PreviewType = { value: string; label: string };
type CopyState = "idle" | "copied" | "failed";

const WIDTHS = [
  { value: 680, label: "Desktop" },
  { value: 390, label: "Phone" },
] as const;

export default function PreviewViewer({
  active,
  types,
}: {
  active: string;
  types: PreviewType[];
}) {
  const [type, setType] = useState(active);
  const [width, setWidth] = useState<number>(WIDTHS[0].value);
  const [copy, setCopy] = useState<CopyState>("idle");
  const [bytes, setBytes] = useState<number | null>(null);
  const fallbackRef = useRef<HTMLTextAreaElement>(null);

  const src = `/email-preview/${type}`;

  // Reset the button whenever the email changes, so "Copied" never lingers
  // next to a different email than the one that was copied.
  useEffect(() => {
    setCopy("idle");
    setBytes(null);
  }, [type]);

  useEffect(() => {
    if (copy === "idle") return;
    const t = setTimeout(() => setCopy("idle"), 2400);
    return () => clearTimeout(t);
  }, [copy]);

  const copyHtml = useCallback(async () => {
    try {
      // Fetch the raw route rather than reading the iframe, so what lands on
      // the clipboard is exactly what the builder emits: no browser-normalised
      // markup, no injected dev scripts.
      const res = await fetch(src, { cache: "no-store" });
      if (!res.ok) throw new Error(`${res.status}`);
      const html = await res.text();

      try {
        await navigator.clipboard.writeText(html);
      } catch {
        // Clipboard API needs a secure context. Fall back to a real textarea.
        const el = fallbackRef.current;
        if (!el) throw new Error("no fallback");
        el.value = html;
        el.select();
        const ok = document.execCommand("copy");
        el.value = "";
        if (!ok) throw new Error("execCommand refused");
      }

      setBytes(new Blob([html]).size);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  }, [src]);

  return (
    <main className="min-h-[100dvh] bg-cream-200 flex flex-col">
      <header className="sticky top-0 z-10 bg-cream-100 border-b border-border">
        <div className="mx-auto max-w-[1100px] px-5 py-3.5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="font-display text-[15px] font-medium text-ink tracking-tight">
            Email preview
          </span>

          <label className="flex items-center gap-2">
            <span className="sr-only">Email</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-2 text-[14px] text-ink focus:outline-none focus:border-border-strong"
            >
              {types.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
            {WIDTHS.map((w) => (
              <button
                key={w.value}
                type="button"
                onClick={() => setWidth(w.value)}
                className={`rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
                  width === w.value
                    ? "bg-ink text-cream-50 font-medium"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            {copy === "copied" && bytes !== null && (
              <span className="text-[13px] text-ink-muted tabular-nums">
                {(bytes / 1024).toFixed(1)} KB copied
              </span>
            )}
            {copy === "failed" && (
              <span className="text-[13px] text-coral-700">
                Copy failed. Open raw and copy manually.
              </span>
            )}

            <button
              type="button"
              onClick={copyHtml}
              aria-live="polite"
              className={`rounded-xl px-4 py-2 text-[14px] font-medium transition-colors ${
                copy === "copied"
                  ? "bg-ink text-cream-50"
                  : "bg-coral-500 text-white hover:bg-coral-600"
              }`}
            >
              {copy === "copied" ? "Copied" : "Copy HTML"}
            </button>

            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="text-[14px] text-ink-muted hover:text-ink transition-colors"
            >
              Open raw
            </a>
          </div>
        </div>
      </header>

      <div className="flex-1 flex justify-center px-5 py-8">
        <iframe
          key={type}
          src={src}
          title="Email preview"
          style={{ width, maxWidth: "100%" }}
          className="h-[calc(100dvh-9rem)] rounded-2xl border border-border bg-white"
        />
      </div>

      <textarea
        ref={fallbackRef}
        aria-hidden
        tabIndex={-1}
        readOnly
        className="fixed -left-[9999px] top-0 h-px w-px opacity-0"
      />
    </main>
  );
}
