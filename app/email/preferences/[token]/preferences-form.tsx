"use client";

import { useState, useTransition } from "react";
import { savePreferences, unsubscribeAll, resubscribe } from "./actions";

export type Prefs = {
  marketing: boolean;
  product_updates: boolean;
  weekly_report: boolean;
  streak_nudges: boolean;
};

const ROWS: { key: keyof Prefs; title: string; body: string }[] = [
  {
    key: "streak_nudges",
    title: "Streak and revision nudges",
    body: "A quiet reminder when your streak is about to break or your cards have piled up.",
  },
  {
    key: "weekly_report",
    title: "Weekly dars report",
    body: "What you revised, how the week went, and the topic worth another look.",
  },
  {
    key: "product_updates",
    title: "Product updates",
    body: "New books, new features, and the occasional thing we are proud of.",
  },
  {
    key: "marketing",
    title: "Everything else",
    body: "Occasional news from the Dars team. Never more than once a week.",
  },
];

// A plain switch. Real checkbox underneath so it is keyboard-reachable and
// announces correctly; the visible track is the label's own child, so the
// whole row is one hit target.
function Switch({ on, disabled }: { on: boolean; disabled?: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        "relative inline-flex h-[26px] w-[44px] shrink-0 rounded-full transition-colors duration-200",
        on ? "bg-coral-500" : "bg-border-strong",
        disabled ? "opacity-40" : "",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-[3px] h-[20px] w-[20px] rounded-full bg-white transition-transform duration-200",
          "left-[3px]",
          on ? "translate-x-[18px]" : "translate-x-0",
        ].join(" ")}
      />
    </span>
  );
}

export default function PreferencesForm({
  token,
  email,
  initial,
  initiallyUnsubscribed,
}: {
  token: string;
  email: string;
  initial: Prefs;
  initiallyUnsubscribed: boolean;
}) {
  const [prefs, setPrefs] = useState<Prefs>(initial);
  const [unsubscribed, setUnsubscribed] = useState(initiallyUnsubscribed);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function toggle(key: keyof Prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    setStatus(null);
    setError(null);
  }

  function run(fn: () => Promise<{ ok: boolean; message: string }>, after?: () => void) {
    setStatus(null);
    setError(null);
    startTransition(async () => {
      const result = await fn();
      if (result.ok) {
        setStatus(result.message);
        after?.();
      } else {
        setError(result.message);
      }
    });
  }

  if (unsubscribed) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
        <h1 className="font-display text-[28px] leading-tight tracking-tight text-ink">
          You&rsquo;re unsubscribed.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
          We won&rsquo;t email <span className="text-ink">{email}</span> about Dars again. You&rsquo;ll
          still get essentials like account and security messages, because those aren&rsquo;t
          something we can opt you out of.
        </p>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-[15px] leading-relaxed text-ink-soft">Changed your mind?</p>
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              run(() => resubscribe(token), () => {
                setUnsubscribed(false);
                setPrefs({
                  marketing: true,
                  product_updates: true,
                  weekly_report: true,
                  streak_nudges: true,
                });
              })
            }
            className="mt-3 inline-flex items-center rounded-xl bg-coral-500 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-coral-600 disabled:opacity-60"
          >
            {pending ? "Just a moment…" : "Resubscribe"}
          </button>
          {error && <p className="mt-3 text-sm text-coral-700">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
      <h1 className="font-display text-[28px] leading-tight tracking-tight text-ink">
        What we send you
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        Preferences for <span className="text-ink">{email}</span>. Turn off anything you
        don&rsquo;t want. The rest keeps coming.
      </p>

      <div className="mt-8">
        {ROWS.map((row, i) => (
          <label
            key={row.key}
            className={[
              "flex cursor-pointer items-start justify-between gap-6 py-5",
              i > 0 ? "border-t border-border" : "",
            ].join(" ")}
          >
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold text-ink">{row.title}</span>
              <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-muted">
                {row.body}
              </span>
            </span>
            <input
              type="checkbox"
              className="peer sr-only"
              checked={prefs[row.key]}
              disabled={pending}
              onChange={() => toggle(row.key)}
            />
            <span className="mt-0.5 rounded-full peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-coral-500">
              <Switch on={prefs[row.key]} disabled={pending} />
            </span>
          </label>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => savePreferences(token, prefs))}
          className="inline-flex items-center rounded-xl bg-coral-500 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-coral-600 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save preferences"}
        </button>
        {/* Ink, not sage-500: #7E9467 on this cream card is about 3.3:1 and
            fails AA. A confirmation you have to squint at is not a
            confirmation. role="status" carries the meaning to screen readers;
            the colour does not have to. */}
        {status && (
          <span role="status" className="text-[14px] text-ink">
            {status}
          </span>
        )}
        {error && (
          <span role="alert" className="text-[14px] text-coral-700">
            {error}
          </span>
        )}
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <p className="text-[13.5px] leading-relaxed text-ink-muted">
          Would you rather hear nothing at all? That&rsquo;s completely fine.{" "}
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => unsubscribeAll(token), () => setUnsubscribed(true))}
            className="font-semibold text-ink underline underline-offset-2 transition-colors hover:text-coral-600 disabled:opacity-60"
          >
            Unsubscribe from everything
          </button>
          .
        </p>
      </div>
    </div>
  );
}
