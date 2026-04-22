"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  variant?: "light" | "dark";
};

type FormValues = {
  email: string;
  botcheck?: boolean;
};

export default function WaitlistForm({ variant = "light" }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();
  const [success, setSuccess] = useState(false);
  const [errored, setErrored] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setErrored(false);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrored(true);
      return;
    }

    // Use FormData to avoid CORS preflight (Content-Type: application/json
    // triggers preflight, which web3forms rejects in some configurations).
    const body = new FormData();
    body.append("access_key", accessKey);
    body.append("from_name", "Dars Landing");
    body.append("subject", "New Dars waitlist signup");
    body.append("email", values.email);
    if (values.botcheck) body.append("botcheck", String(values.botcheck));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (!data?.success) throw new Error(data?.message ?? "Failed");
      setSuccess(true);
      reset();
    } catch {
      setErrored(true);
    }
  };

  const isDark = variant === "dark";
  const hasEmailError = !!errors.email;

  const wrapBase =
    "relative flex gap-1.5 p-1.5 rounded-full max-w-md w-full transition-all duration-500 ease-out";
  const wrapLight = "bg-card border border-border shadow-card mx-auto";
  const wrapDark = "bg-white/10 border border-white/15 backdrop-blur-sm";
  const wrapCls = `${wrapBase} ${isDark ? wrapDark : wrapLight} ${
    success ? "ring-2 ring-sage-500/40" : ""
  } ${errored || hasEmailError ? "animate-shake" : ""}`;

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
  const btnCls = `${btnBase} ${btnTheme} ${
    isSubmitting ? "opacity-90" : ""
  }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={wrapCls}
      noValidate
      aria-live="polite"
    >
      {/* honeypot for bot protection */}
      <input
        type="checkbox"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        {...register("botcheck")}
      />

      <input
        type="text"
        inputMode="email"
        placeholder="your@email.com"
        disabled={isSubmitting || success}
        autoComplete="off"
        data-1p-ignore="true"
        data-lpignore="true"
        data-bwignore="true"
        data-form-type="other"
        aria-invalid={hasEmailError || errored ? "true" : "false"}
        className={inputCls}
        {...register("email", {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          onChange: () => {
            if (errored) setErrored(false);
          },
        })}
      />

      <button
        type="submit"
        disabled={isSubmitting || success}
        className={btnCls}
        aria-label={
          success ? "Signed up successfully" : isSubmitting ? "Submitting" : "Join waitlist"
        }
      >
        {/* Idle state */}
        <span
          className={`inline-flex items-center gap-1.5 sm:gap-2 transition-all duration-300 ${
            !isSubmitting && !success
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
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>

        {/* Loading state */}
        <span
          className={`inline-flex items-center gap-2 transition-all duration-300 ${
            isSubmitting && !success
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

        {/* Success state */}
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
