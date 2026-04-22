"use client";

import { useState } from "react";
import { buildConfirmationEmail } from "./waitlist-email";

type Props = {
  variant?: "light" | "dark";
};

// Per web3forms docs: JS fetch MUST use Content-Type: application/json and
// MUST NOT include a `redirect` field (the 301 response breaks CORS).
// https://docs.web3forms.com/how-to-guides/cors-error
export default function WaitlistForm({ variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errored, setErrored] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || success) return;

    setErrored(false);

    if (process.env.NEXT_PUBLIC_WAITLIST_MOCK === "1") {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitting(false);
      setSuccess(true);
      setEmail("");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrored(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "Dars Landing",
          subject: "New Dars waitlist signup",
          email,
          botcheck,
          autoresponse: {
            from_name: "Dars",
            subject: "You're on the Dars waitlist",
            message: buildConfirmationEmail(),
          },
        }),
      });
      const data = await res.json();
      if (!data?.success) throw new Error(data?.message ?? "Failed");
      setSuccess(true);
      setEmail("");
    } catch {
      setErrored(true);
    } finally {
      setSubmitting(false);
    }
  };

  const isDark = variant === "dark";

  const wrapBase =
    "relative flex gap-1.5 p-1.5 rounded-full max-w-md w-full transition-all duration-500 ease-out";
  const wrapLight = "bg-card border border-border shadow-card mx-auto";
  const wrapDark = "bg-white/10 border border-white/15 backdrop-blur-sm";
  const wrapCls = `${wrapBase} ${isDark ? wrapDark : wrapLight} ${
    success ? "ring-2 ring-sage-500/40" : ""
  } ${errored ? "animate-shake" : ""}`;

  const inputBase =
    "flex-1 min-w-0 bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] focus:outline-none transition-all duration-500 ease-out";
  const inputTheme = isDark
    ? "text-white placeholder:text-white/50"
    : "text-ink placeholder:text-ink-subtle";
  const inputSuccess = success
    ? "opacity-0 -translate-x-2 pointer-events-none select-none"
    : "opacity-100 translate-x-0";
  const inputCls = `${inputBase} ${inputTheme} ${inputSuccess}`;

  const btnBase =
    "relative overflow-hidden px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-sm font-medium whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-500 ease-out disabled:cursor-not-allowed";
  const btnTheme = success
    ? "bg-sage-500 text-white"
    : isDark
      ? "bg-coral-500 hover:bg-coral-400 text-white"
      : "bg-coral-500 hover:bg-coral-600 text-white";
  const btnCls = `${btnBase} ${btnTheme} ${submitting ? "opacity-90" : ""}`;

  return (
    <form onSubmit={onSubmit} className={wrapCls} noValidate aria-live="polite">
      {/* honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
      />

      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        disabled={submitting || success}
        autoComplete="off"
        data-1p-ignore="true"
        data-lpignore="true"
        data-bwignore="true"
        data-form-type="other"
        aria-invalid={errored ? "true" : "false"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errored) setErrored(false);
        }}
        className={inputCls}
      />

      <button
        type="submit"
        disabled={submitting || success}
        className={btnCls}
        aria-label={
          success
            ? "Signed up successfully"
            : submitting
              ? "Submitting"
              : "Join waitlist"
        }
      >
        {/* Idle */}
        <span
          className={`inline-flex items-center gap-1.5 sm:gap-2 transition-all duration-300 ${
            !submitting && !success
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3 absolute pointer-events-none"
          }`}
        >
          Join waitlist
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>

        {/* Loading */}
        <span
          className={`inline-flex items-center gap-2 transition-all duration-300 ${
            submitting && !success
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75 absolute pointer-events-none"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-spinner"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="3"
            />
            <path
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span className="tracking-wide">Joining…</span>
        </span>

        {/* Success */}
        <span
          className={`inline-flex items-center gap-1.5 sm:gap-2 ${
            success
              ? "opacity-100 animate-success-pop"
              : "opacity-0 scale-75 absolute pointer-events-none"
          }`}
        >
          <span className="relative inline-flex items-center justify-center">
            {success && (
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-white/40 animate-success-ring"
              />
            )}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                className={success ? "animate-check" : ""}
              />
            </svg>
          </span>
          <span>You&apos;re in</span>
        </span>
      </button>
    </form>
  );
}

