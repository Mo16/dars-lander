"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  ALL as ALL_COUNTRIES,
  DEFAULT_COUNTRY,
  type Country,
} from "../contribute/countries";

// useLayoutEffect runs synchronously after DOM mutations, which is what we
// want for measuring elements and animating immediately. Guarded for SSR
// even though this is a "use client" file — Next still imports the module
// during server rendering.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Data = {
  name: string;
  email: string;
  phone: string;
  device: string;
  year: string;
  yearOther: string;
  frequency: string;
  message: string;
  agreed: boolean;
  botcheck: boolean;
};

type Errors = Partial<Record<keyof Data, string>>;

const DEVICE_OPTIONS = [
  { value: "ios", label: "iOS", desc: "iPhone or iPad.", emoji: "" },
  { value: "android", label: "Android", desc: "Pixel, Samsung, anything green.", emoji: "" },
  { value: "both", label: "Both", desc: "I’ve got both lying around.", emoji: "" },
];

const YEARS = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "5th year",
  "6th year (final)",
  "Graduated",
  "Studied elsewhere",
  "Other",
];

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily", desc: "I’ll be in the app every day." },
  { value: "few_week", label: "A few times a week", desc: "Most days, not all." },
  { value: "occasionally", label: "Occasionally", desc: "When I get a window." },
];

const STEPS = [
  { key: "about", title: "About you" },
  { key: "details", title: "Your details" },
] as const;

const initialData: Data = {
  name: "",
  email: "",
  phone: "",
  device: "",
  year: "",
  yearOther: "",
  frequency: "",
  message: "",
  agreed: false,
  botcheck: false,
};

export default function BetaAccessForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errored, setErrored] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  // GSAP refs
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepBoxRef = useRef<HTMLDivElement>(null);

  // Mount animation — slide the whole experience in.
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline();
    tl.from(headerRef.current, {
      opacity: 0,
      y: 18,
      duration: 0.7,
      ease: "power3.out",
    }).from(
      cardRef.current,
      {
        opacity: 0,
        y: 24,
        scale: 0.985,
        duration: 0.75,
        ease: "power3.out",
      },
      "-=0.45",
    );
  }, []);

  // Animate every step transition (forward/back).
  useIsoLayoutEffect(() => {
    if (!stepBoxRef.current) return;
    if (prefersReducedMotion()) {
      gsap.set(stepBoxRef.current, { opacity: 1, x: 0, filter: "blur(0px)" });
      return;
    }
    gsap.fromTo(
      stepBoxRef.current,
      {
        opacity: 0,
        x: direction === "forward" ? 36 : -36,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.55,
        ease: "power3.out",
      },
    );
  }, [step]);

  // Shake the card briefly when validation fails — much punchier than CSS.
  useIsoLayoutEffect(() => {
    if (!errored || !cardRef.current || prefersReducedMotion()) return;
    gsap.fromTo(
      cardRef.current,
      { x: -8 },
      {
        x: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.35)",
      },
    );
  }, [errored]);

  const update = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateStep = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (!data.name.trim()) e.name = "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        e.email = "That doesn't look like a valid email.";
      }
      if (data.phone.replace(/\D/g, "").length < 8) {
        e.phone = "Pick your country and enter your phone number.";
      }
      if (!data.agreed) {
        e.agreed = "Please tick the box to continue.";
      }
    }
    if (s === 1) {
      if (!data.device) e.device = "Pick the device you'd test on.";
      if (!data.year) e.year = "Pick the option that fits best.";
      if (data.year === "Other" && !data.yearOther.trim()) {
        e.yearOther = "Tell us roughly what you've studied.";
      }
      if (!data.frequency) e.frequency = "Pick how often you'd use it.";
    }
    return e;
  };

  const goNext = () => {
    const e = validateStep(step);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setErrored(true);
      setTimeout(() => setErrored(false), 600);
      return;
    }
    setErrors({});
    if (step >= STEPS.length - 1) {
      void onSubmit();
      return;
    }
    setDirection("forward");
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    setDirection("back");
    setStep((s) => s - 1);
  };

  const onSubmit = async () => {
    if (submitting || success) return;
    setErrored(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/beta-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error ?? "Failed");
      setSuccess(true);
    } catch {
      setErrored(true);
      setTimeout(() => setErrored(false), 500);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = success ? 100 : ((step + 1) / STEPS.length) * 100;

  if (success) {
    return (
      <CelebrationCard
        firstName={data.name.trim().split(/\s+/)[0] || ""}
        device={data.device}
      />
    );
  }

  return (
    <>
      {/* Sticky app bar — slim native-style chrome with back, step, brand, progress strip */}
      <header
        ref={headerRef}
        className="sticky top-0 z-30 bg-cream-100/85 backdrop-blur-xl border-b border-border/40"
      >
        <div className="mx-auto w-full max-w-2xl px-3 sm:px-5 h-14 flex items-center gap-2.5">
          {step === 0 ? (
            <Link
              href="/"
              aria-label="Back to home"
              className="flex-none w-10 h-10 rounded-full hover:bg-cream-200 active:bg-cream-300 transition-colors flex items-center justify-center text-ink-soft"
            >
              <BackArrow />
            </Link>
          ) : (
            <button
              type="button"
              onClick={goBack}
              disabled={submitting}
              aria-label="Previous step"
              className="flex-none w-10 h-10 rounded-full hover:bg-cream-200 active:bg-cream-300 transition-colors flex items-center justify-center text-ink-soft disabled:opacity-40"
            >
              <BackArrow />
            </button>
          )}

          <div className="flex-1 min-w-0 text-center">
            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-ink-muted truncate">
              <span className="text-coral-500 tabular-nums">{step + 1}</span>
              <span className="text-ink-subtle"> / {STEPS.length}</span>
              <span className="mx-2 text-ink-subtle">·</span>
              <span className="text-ink-muted">{STEPS[step].title}</span>
            </p>
          </div>

          <Link
            href="/"
            aria-label="Dars home"
            className="flex-none flex items-center gap-1.5 px-2 h-10 rounded-full hover:bg-cream-200 transition-colors"
          >
            <Image
              src="/assets/img/logo.png"
              alt=""
              width={20}
              height={20}
              priority
              className="w-5 h-5 rounded-md"
            />
            <span className="text-[13px] font-semibold tracking-tight text-ink">
              Dars
            </span>
          </Link>
        </div>

        <div className="relative h-[3px] bg-cream-200/70">
          <div
            className="absolute inset-y-0 left-0 bg-coral-500 rounded-r-full"
            style={{
              width: `${progress}%`,
              transition: "width 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>
      </header>

      {/* Page body — flat on cream, no card chrome */}
      <div
        ref={cardRef}
        className="flex-1 mx-auto w-full max-w-2xl px-5 sm:px-7 pt-7 sm:pt-10 pb-32"
      >
        <div className="mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-coral-100/80 border border-coral-200/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-coral-500 animate-pulse-dot" />
              <span className="relative h-2 w-2 rounded-full bg-coral-500" />
            </span>
            <span className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-coral-600">
              Alpha applications open
            </span>
          </div>
          <h1 className="font-display text-[34px] sm:text-[44px] leading-[1.05] tracking-tight font-medium text-ink mb-3 text-balance">
            Apply for{" "}
            <em className="font-display italic text-coral-500 font-normal">
              alpha access.
            </em>
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[1.6] text-ink-soft text-pretty max-w-xl">
            Two quick steps. Spots are limited so we can actually read
            everyone&apos;s feedback properly &mdash; first serious replies get
            in.
          </p>
        </div>

        <div ref={stepBoxRef}>
          {step === 0 && <StepAbout data={data} update={update} errors={errors} />}
          {step === 1 && <StepDetails data={data} update={update} errors={errors} />}
        </div>

        <p className="text-[12px] leading-[1.55] text-ink-subtle mt-10">
          By applying you agree we can email and message you about Dars alpha.
        </p>
      </div>

      {/* Sticky bottom CTA — primary action always thumb-reachable */}
      <div className="sticky bottom-0 z-30">
        <div
          aria-hidden
          className="pointer-events-none h-6 bg-gradient-to-b from-cream-100/0 to-cream-100"
        />
        <div className="bg-cream-100">
          <div className="mx-auto w-full max-w-2xl px-5 sm:px-7 pt-2 pb-[max(18px,env(safe-area-inset-bottom))]">
            <MagneticButton
              onClick={goNext}
              disabled={submitting}
              className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-coral-500 hover:bg-coral-600 active:bg-coral-700 text-white text-[15.5px] sm:text-[16px] font-semibold shadow-coral disabled:opacity-80 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="animate-spinner"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending&hellip;
                </span>
              ) : step === STEPS.length - 1 ? (
                <ButtonContent label="Apply for alpha" />
              ) : (
                <ButtonContent label="Continue" />
              )}
            </MagneticButton>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        checked={data.botcheck}
        onChange={(e) => update("botcheck", e.target.checked)}
      />
    </>
  );
}

function BackArrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5M11 19l-7-7 7-7" />
    </svg>
  );
}

function ButtonContent({ label }: { label: string }) {
  return (
    <>
      <span className="relative">{label}</span>
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
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Magnetic button — translates a small fraction toward the cursor on hover.  */
/* Built with gsap.quickTo for cheap, smooth pointer tracking.                */
/* -------------------------------------------------------------------------- */
function MagneticButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((e.clientX - cx) * 0.18);
      yTo((e.clientY - cy) * 0.18);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Step content                                                               */
/* -------------------------------------------------------------------------- */

type StepProps = {
  data: Data;
  update: <K extends keyof Data>(key: K, value: Data[K]) => void;
  errors: Errors;
};

function ErrorMsg({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[12.5px] leading-[1.4] text-coral-600 mt-1.5 px-1 animate-fade-up">
      {message}
    </p>
  );
}

function StepAbout({ data, update, errors }: StepProps) {
  return (
    <div className="space-y-4 pt-2">
      <div className="mb-1">
        <p className="font-display text-[22px] sm:text-[26px] leading-tight tracking-tight font-medium text-ink mb-1.5">
          First, who are you?
        </p>
        <p className="text-[14.5px] leading-[1.6] text-ink-soft">
          Just the basics &mdash; name, email, and a phone number we can reach
          you on.
        </p>
      </div>

      {/* Bento tile — your details */}
      <div className="rounded-3xl bg-cream-200/45 border border-border/40 p-4 sm:p-5">
        <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-ink-muted mb-3.5 px-1">
          ◆ Your details
        </p>
        <div className="space-y-3">
          <FloatField
            label="Your name"
            value={data.name}
            onChange={(v) => update("name", v)}
            autoComplete="name"
            error={errors.name}
          />
          <FloatField
            label="Email"
            type="email"
            value={data.email}
            onChange={(v) => update("email", v)}
            autoComplete="email"
            error={errors.email}
          />
          <div>
            <PhoneField
              value={data.phone}
              onChange={(v) => update("phone", v)}
              error={errors.phone}
            />
            {errors.phone ? (
              <ErrorMsg message={errors.phone} />
            ) : (
              <p className="text-[12.5px] leading-[1.55] text-ink-muted mt-2 px-1">
                Pick your country, then enter your number.{" "}
                <span className="text-ink font-semibold">WhatsApp required</span>{" "}
                &mdash; it&apos;s how we&apos;ll reach out if you&apos;re in.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bento tile — heads up (lavender) */}
      <div className="relative rounded-3xl bg-gradient-to-br from-violet-200 to-violet-300/70 border border-violet-300/70 px-4 py-4 sm:px-5 sm:py-5 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-violet-300/50 blur-2xl"
        />
        <p className="relative text-[10.5px] tracking-[0.14em] uppercase font-semibold text-violet-700 mb-3">
          ◆ Heads up
        </p>
        <div className="relative space-y-3 text-[13.5px] leading-[1.6] text-ink-soft">
          <p>
            <span className="font-semibold text-ink">This is alpha, not beta.</span>{" "}
            Things will break. Buttons will do nothing. The AI tutor might
            confidently misattribute a hadith. That&apos;s the point &mdash; we
            want you to find it before everyone else does.
          </p>
          <p>
            <span className="font-semibold text-ink">Spots are limited.</span>{" "}
            We want to actually read everyone&apos;s feedback properly rather
            than drowning in 500 bug reports on day one. First serious replies
            get in.
          </p>
        </div>
      </div>

      {/* Bento tile — agreement; the whole tile is the click target */}
      <div>
        <button
          type="button"
          onClick={() => update("agreed", !data.agreed)}
          className="w-full text-left rounded-2xl bg-coral-50/70 hover:bg-coral-50 active:bg-coral-100/80 border border-coral-100/70 px-4 py-3.5 transition-colors flex items-start gap-3 group"
        >
          <span
            className={`flex-none mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
              data.agreed
                ? "bg-coral-500 border-coral-500 scale-105"
                : "bg-white border-border-strong group-hover:border-coral-300"
            }`}
          >
            {data.agreed && (
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
                aria-hidden="true"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" className="animate-check" />
              </svg>
            )}
          </span>
          <span
            className={`text-[14px] leading-[1.55] transition-colors ${
              data.agreed ? "text-ink" : "text-ink-soft group-hover:text-ink"
            }`}
          >
            I get that it&apos;s alpha, I&apos;m patient with the bugs, and
            I&apos;ll actually report them.
          </span>
        </button>
        <ErrorMsg message={errors.agreed} />
      </div>
    </div>
  );
}

function StepDetails({ data, update, errors }: StepProps) {
  return (
    <div className="space-y-4 pt-2">
      <div className="mb-1">
        <p className="font-display text-[22px] sm:text-[26px] leading-tight tracking-tight font-medium text-ink mb-1.5">
          A few quick details.
        </p>
        <p className="text-[14.5px] leading-[1.6] text-ink-soft">
          Three questions: what you&apos;d test on, where you&apos;re up to, and
          how much you&apos;d actually use it.
        </p>
      </div>

      {/* Bento tile — device */}
      <div className="rounded-3xl bg-cream-200/45 border border-border/40 p-4 sm:p-5">
        <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-ink-muted mb-3 px-1">
          ◆ Device you&rsquo;d test on
        </p>
        <div className="space-y-2">
          {DEVICE_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              active={data.device === o.value}
              onClick={() => update("device", o.value)}
              title={o.label}
              desc={o.desc}
            />
          ))}
        </div>
        <ErrorMsg message={errors.device} />
      </div>

      {/* Bento tile — year (lavender) */}
      <div className="rounded-3xl bg-violet-200/40 border border-violet-300/40 p-4 sm:p-5">
        <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-violet-700 mb-3 px-1">
          ◆ Year of study (or what you&rsquo;ve previously studied)
        </p>
        <ChipGroup
          value={data.year}
          onChange={(v) => update("year", v)}
          options={YEARS.map((y) => ({ value: y, label: y }))}
        />
        {data.year === "Other" && (
          <input
            type="text"
            value={data.yearOther}
            onChange={(e) => update("yearOther", e.target.value)}
            placeholder="Tell us a bit more…"
            className="mt-3 w-full px-4 py-3 rounded-2xl border border-violet-300/60 bg-white text-[14.5px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-violet-400 transition-colors"
          />
        )}
        <ErrorMsg message={errors.year || errors.yearOther} />
      </div>

      {/* Bento tile — frequency */}
      <div className="rounded-3xl bg-cream-200/45 border border-border/40 p-4 sm:p-5">
        <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-ink-muted mb-3 px-1">
          ◆ How often would you use it?
        </p>
        <div className="space-y-2">
          {FREQUENCY_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              active={data.frequency === o.value}
              onClick={() => update("frequency", o.value)}
              title={o.label}
              desc={o.desc}
            />
          ))}
        </div>
        <ErrorMsg message={errors.frequency} />
      </div>

      {/* Bento tile — message (warm coral, optional) */}
      <div className="rounded-3xl bg-coral-50/60 border border-coral-100/60 p-4 sm:p-5">
        <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-coral-600 mb-3 px-1">
          ◆ Anything else? (optional)
        </p>
        <textarea
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Books you&rsquo;re studying, what you&rsquo;d most want to test, anything we should know."
          rows={4}
          className="w-full px-4 py-3 rounded-2xl border border-coral-100 bg-white text-[14.5px] leading-[1.6] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-coral-300 transition-colors resize-none"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Floating-label input                                                       */
/* -------------------------------------------------------------------------- */

function FloatField({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <label className="block">
      <div
        className={`relative rounded-2xl border bg-cream-50 transition-all duration-200 ${
          error
            ? "border-coral-400"
            : focused
              ? "border-coral-400 bg-white shadow-soft"
              : "border-border hover:border-border-strong"
        }`}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          placeholder=" "
          className="peer w-full bg-transparent px-4 pt-6 pb-2.5 text-[15px] text-ink placeholder:text-transparent focus:outline-none rounded-2xl"
        />
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-ink-muted transition-all duration-200 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:font-semibold peer-focus:text-coral-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10.5px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.12em] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-coral-600">
          {label}
        </span>
      </div>
      <ErrorMsg message={error} />
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Phone field — same logic as before, restyled                               */
/* -------------------------------------------------------------------------- */

function PhoneField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [local, setLocal] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const digits = local.replace(/\D/g, "");
    onChange(digits ? `+${country.dialCode}${digits}` : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, local]);

  useEffect(() => {
    if (!value) setLocal("");
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => searchRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <label className="block">
      <div
        ref={wrapRef}
        className={`relative flex items-stretch w-full rounded-2xl border transition-all duration-200 ${
          error
            ? "border-coral-400 bg-cream-50"
            : focused
              ? "border-coral-400 bg-white shadow-soft"
              : "border-border bg-cream-50 hover:border-border-strong"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex-none flex items-center gap-1.5 px-3.5 sm:px-4 border-r border-border bg-cream-100 hover:bg-cream-200 transition-colors rounded-l-2xl select-none"
        >
          <span className="text-[18px] leading-none" aria-hidden="true">
            {country.flag}
          </span>
          <span className="text-[14.5px] font-medium text-ink">
            +{country.dialCode}
          </span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-ink-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div className="relative flex-1 min-w-0">
          <input
            type="tel"
            inputMode="tel"
            value={local}
            onChange={(e) => setLocal(e.target.value.replace(/[^\d\s\-()]/g, ""))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="tel-national"
            placeholder=" "
            className="peer w-full bg-transparent px-4 pt-6 pb-2.5 text-[15px] text-ink placeholder:text-transparent focus:outline-none rounded-r-2xl"
          />
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-ink-muted transition-all duration-200 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:font-semibold peer-focus:text-coral-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10.5px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.12em] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-coral-600">
            Phone (WhatsApp)
          </span>
        </div>

        {open && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl bg-white border border-border shadow-lift overflow-hidden animate-step-in-forward"
          >
            <div className="p-2 border-b border-border bg-cream-50">
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code"
                className="w-full px-3 py-2 rounded-xl bg-white border border-border text-[14px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-coral-300"
              />
            </div>
            <ul className="max-h-[260px] overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-[13px] text-ink-muted">
                  No matches
                </li>
              )}
              {filtered.map((c) => {
                const active = c.code === country.code;
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      onClick={() => {
                        setCountry(c);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors ${
                        active
                          ? "bg-coral-50 text-ink"
                          : "text-ink-soft hover:bg-cream-100 hover:text-ink"
                      }`}
                    >
                      <span className="text-[18px] leading-none" aria-hidden="true">
                        {c.flag}
                      </span>
                      <span className="flex-1 text-[14px] font-medium truncate">
                        {c.name}
                      </span>
                      <span className="text-[13px] text-ink-muted tabular-nums">
                        +{c.dialCode}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* ChipGroup with sliding indicator                                           */
/* The active chip's bounds are tracked and a coral pill is gsap'd into place.*/
/* -------------------------------------------------------------------------- */

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const moveIndicator = useCallback(() => {
    const ind = indicatorRef.current;
    const el = value ? itemRefs.current[value] : null;
    if (!ind) return;
    if (!el) {
      gsap.to(ind, { opacity: 0, duration: 0.2 });
      return;
    }
    const tween = {
      x: el.offsetLeft,
      y: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      opacity: 1,
      duration: prefersReducedMotion() ? 0 : 0.45,
      ease: "back.out(1.5)",
    };
    gsap.to(ind, tween);
  }, [value]);

  useIsoLayoutEffect(() => {
    moveIndicator();
  }, [moveIndicator]);

  // Re-position on resize so the pill keeps tracking the right chip when
  // the chip wraps to a different line.
  useEffect(() => {
    const onResize = () => moveIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [moveIndicator]);

  return (
    <div ref={containerRef} className="relative flex flex-wrap gap-2">
      <span
        ref={indicatorRef}
        aria-hidden
        className="absolute top-0 left-0 rounded-full bg-coral-500 shadow-coral pointer-events-none"
        style={{ opacity: 0 }}
      />
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            ref={(el) => {
              itemRefs.current[o.value] = el;
            }}
            type="button"
            onClick={() => onChange(o.value)}
            className={`relative z-10 px-3.5 py-2 rounded-full text-[13.5px] font-medium border transition-colors duration-200 ${
              active
                ? "text-white border-transparent"
                : "text-ink-soft border-border bg-cream-50 hover:border-coral-300 hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Radio cards                                                                */
/* -------------------------------------------------------------------------- */

function RadioCard({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  // Tap-down spring — squeeze on press so it feels responsive.
  const onMouseDown = () => {
    if (!ref.current || prefersReducedMotion()) return;
    gsap.to(ref.current, { scale: 0.985, duration: 0.12, ease: "power2.out" });
  };
  const onMouseUp = () => {
    if (!ref.current || prefersReducedMotion()) return;
    gsap.to(ref.current, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className={`relative w-full text-left px-4 py-3.5 rounded-2xl border transition-all duration-200 overflow-hidden ${
        active
          ? "bg-gradient-to-br from-coral-50 to-coral-100/60 border-coral-300 shadow-soft"
          : "bg-cream-50 border-border hover:border-coral-200 hover:bg-white"
      }`}
    >
      {active && (
        <div
          aria-hidden
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-coral-200/40 blur-2xl pointer-events-none"
        />
      )}
      <div className="relative flex items-start gap-3">
        <div
          className={`flex-none mt-0.5 w-[20px] h-[20px] rounded-full border-2 transition-all flex items-center justify-center ${
            active ? "border-coral-500 bg-coral-500" : "border-border-strong bg-white"
          }`}
        >
          {active && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" className="animate-check" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p className="text-[14.5px] font-semibold leading-tight text-ink">
            {title}
          </p>
          {desc && (
            <p className="text-[13px] leading-[1.55] text-ink-soft mt-0.5">
              {desc}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Celebration / success screen — confetti + medallion, then numbered next steps. */
/* -------------------------------------------------------------------------- */

function CelebrationCard({
  firstName,
  device,
}: {
  firstName: string;
  device: string;
}) {
  const confettiHostRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (!prefersReducedMotion() && confettiHostRef.current) {
      spawnConfettiBurst(confettiHostRef.current);
    }
  }, []);

  const deviceLabel =
    device === "ios"
      ? "iOS"
      : device === "android"
        ? "Android"
        : device === "both"
          ? "iOS & Android"
          : "your device";

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-10 sm:py-16 overflow-hidden">
      <div
        ref={confettiHostRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 30%, rgba(236,97,68,0.14), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md text-center">
        {/* Medallion */}
        <div className="relative inline-flex items-center justify-center w-28 h-28 mb-7 animate-success-pop">
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center shadow-coral animate-medallion-glow">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" className="animate-check" />
            </svg>
          </div>
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 -ml-2 -mt-2 w-4 h-4 rounded-full bg-amber-500 shadow-soft animate-badge-orbit"
          />
        </div>

        <p
          className="animate-fade-up text-[11px] tracking-[0.18em] uppercase font-semibold text-coral-600 mb-3"
          style={{ animationDelay: "0.1s" }}
        >
          ◆ Achievement unlocked
        </p>
        <h2
          className="animate-fade-up font-display text-[34px] sm:text-[42px] leading-[1.05] tracking-tight font-medium text-ink mb-3 text-balance"
          style={{ animationDelay: "0.2s" }}
        >
          You&apos;re{" "}
          <em className="font-display italic text-coral-500 font-normal">
            on the list.
          </em>
        </h2>
        <p
          className="animate-fade-up text-[15px] leading-[1.65] text-ink-soft max-w-md mx-auto mb-7"
          style={{ animationDelay: "0.3s" }}
        >
          {firstName ? `JazakAllahu khayran, ${firstName}` : "JazakAllahu khayran"}.
          Application logged for {deviceLabel}. We&apos;ll go through every entry
          personally and reach out by email and WhatsApp if you&apos;re in.
        </p>

        {/* What happens next — numbered steps */}
        <div
          className="animate-fade-up text-left rounded-2xl bg-cream-50/80 border border-border/70 px-5 py-6"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-ink-muted mb-5">
            What happens next
          </p>
          <ul className="space-y-5">
            <li className="flex items-start gap-3.5">
              <span className="flex-none w-7 h-7 rounded-full bg-coral-50 border border-coral-100 flex items-center justify-center text-[11px] font-mono font-semibold text-coral-600 tabular-nums">
                01
              </span>
              <div className="flex-1">
                <p className="text-[14.5px] font-semibold text-ink leading-snug mb-1">
                  We read every reply, personally.
                </p>
                <p className="text-[13.5px] leading-[1.55] text-ink-soft">
                  No bots, no auto-filter. Every entry gets eyes on it &mdash;
                  first serious applicants get in.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3.5">
              <span className="flex-none w-7 h-7 rounded-full bg-coral-50 border border-coral-100 flex items-center justify-center text-[11px] font-mono font-semibold text-coral-600 tabular-nums">
                02
              </span>
              <div className="flex-1">
                <p className="text-[14.5px] font-semibold text-ink leading-snug mb-1">
                  If you&apos;re in, we&apos;ll reach out.
                </p>
                <p className="text-[13.5px] leading-[1.55] text-ink-soft">
                  Email and WhatsApp, with the build link, install steps, and a
                  quick walkthrough of what to poke at first on{" "}
                  {deviceLabel ?? "your device"}.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* While you wait — share prompt */}
        <div
          className="animate-fade-up text-left rounded-2xl bg-coral-50/50 border border-coral-100/70 px-5 py-5 mt-3"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-coral-600 mb-2">
            While you wait
          </p>
          <p className="text-[13.5px] leading-[1.6] text-ink-soft">
            If you know someone who&apos;d actually use this &mdash; a forward,
            a screenshot in a group chat, a quick repost &mdash; that genuinely
            helps as much as anything else. Free, takes ten seconds, makes a
            real difference.
          </p>
        </div>

        <Link
          href="/"
          className="animate-fade-up inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full text-[13.5px] font-medium text-ink-soft hover:text-ink hover:bg-cream-200 transition-colors"
          style={{ animationDelay: "0.7s" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 19l-7-7 7-7" />
          </svg>
          Back to Dars
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Confetti spawner — drops short-lived DOM nodes into a host and cleans up.  */
/* Each piece gets a random outward vector via the --bx/--by CSS variables    */
/* the confetti-burst keyframe consumes.                                      */
/* -------------------------------------------------------------------------- */

function spawnConfettiBurst(host: HTMLElement) {
  const colors = ["#EC6144", "#D4A943", "#FFC5AE", "#7E9467", "#F47E5C"];
  const count = 70;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const dist = 220 + Math.random() * 220;
    const bx = Math.cos(angle) * dist;
    const by = Math.sin(angle) * dist - Math.random() * 40;
    const rotate = (Math.random() - 0.5) * 720;
    const size = 6 + Math.random() * 8;
    const isCircle = Math.random() < 0.35;

    piece.style.position = "absolute";
    piece.style.top = "44%";
    piece.style.left = "50%";
    piece.style.width = `${size}px`;
    piece.style.height = `${size * (isCircle ? 1 : 0.45)}px`;
    piece.style.background = colors[i % colors.length];
    piece.style.borderRadius = isCircle ? "9999px" : "2px";
    piece.style.pointerEvents = "none";
    piece.style.willChange = "transform, opacity";
    piece.style.setProperty("--bx", `${bx}px`);
    piece.style.setProperty("--by", `${by}px`);
    piece.style.setProperty("--br", `${rotate}deg`);
    piece.style.animation = `confetti-burst ${1.4 + Math.random() * 1.2}s cubic-bezier(0.2, 0.6, 0.4, 1) ${Math.random() * 0.15}s forwards`;
    host.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
}
