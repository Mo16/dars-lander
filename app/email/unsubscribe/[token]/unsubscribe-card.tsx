"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { unsubscribeAll, resubscribe } from "../../preferences/[token]/actions";

export default function UnsubscribeCard({
  token,
  email,
  alreadyUnsubscribed,
}: {
  token: string;
  email: string;
  alreadyUnsubscribed: boolean;
}) {
  const [done, setDone] = useState(alreadyUnsubscribed);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function run(fn: () => Promise<{ ok: boolean; message: string }>, after: () => void) {
    setError(null);
    startTransition(async () => {
      const result = await fn();
      if (result.ok) after();
      else setError(result.message);
    });
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
        <h1 className="font-display text-[28px] leading-tight tracking-tight text-ink">
          You&rsquo;re unsubscribed.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
          We won&rsquo;t email <span className="text-ink">{email}</span> about Dars again.
          You&rsquo;ll still get essentials like account and security messages, because those
          aren&rsquo;t something we can opt you out of.
        </p>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-[15px] leading-relaxed text-ink-soft">Changed your mind?</p>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => resubscribe(token), () => setDone(false))}
            className="mt-3 inline-flex items-center rounded-xl bg-coral-700 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-coral-800 disabled:opacity-60"
          >
            {pending ? "Just a moment…" : "Resubscribe"}
          </button>
          {error && (
            <p role="alert" className="mt-3 text-[14px] text-coral-700">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
      <h1 className="font-display text-[28px] leading-tight tracking-tight text-ink">
        Unsubscribe from Dars emails?
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        This stops everything we send <span className="text-ink">{email}</span>: nudges, the
        weekly report, product updates and news. Account and security messages carry on,
        because those aren&rsquo;t something we can opt you out of.
      </p>

      {/* coral-700, not the brand coral-500: white on coral-500 is 3.30:1 and
          fails AA, and this is the one button on the site that must never be
          hard to read. Same value /suggest-a-book already uses. */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => unsubscribeAll(token), () => setDone(true))}
          className="inline-flex items-center rounded-xl bg-coral-700 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-coral-800 disabled:opacity-60"
        >
          {pending ? "Unsubscribing…" : "Unsubscribe me"}
        </button>
        {error && (
          <span role="alert" className="text-[14px] text-coral-700">
            {error}
          </span>
        )}
      </div>

      {/* The way out for someone who wanted less mail, not none of it. Quiet,
          under the action, never competing with it. */}
      <div className="mt-10 border-t border-border pt-6">
        <p className="text-[13.5px] leading-relaxed text-ink-muted">
          Only some of it bothering you?{" "}
          <Link
            href={`/email/preferences/${token}`}
            className="font-semibold text-ink underline underline-offset-2 transition-colors hover:text-coral-600"
          >
            Choose what we email you
          </Link>{" "}
          instead.
        </p>
      </div>
    </div>
  );
}
