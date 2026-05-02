"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ALL as ALL_COUNTRIES, DEFAULT_COUNTRY, type Country } from "./countries";

type Data = {
  name: string;
  email: string;
  phone: string;
  location: string;
  year: string;
  institution: string;
  books: string[];
  booksOther: string;
  aiAccount: string;
  techComfort: string;
  hoursPerWeek: string;
  commitment: string;
  startWhen: string;
  heardAbout: string;
  heardAboutOther: string;
  message: string;
  agreed: boolean;
  botcheck: boolean;
};

type Errors = Partial<Record<keyof Data, string>>;

const COMMON_BOOKS = [
  // Fiqh
  "Quduri",
  "Nur al-Idah",
  "Sharh al-Wiqayah",
  "Kanz al-Daqaiq",
  "Hidayah",
  "Bahishti Zewar",
  "Fatawa Hindiyyah",
  "Radd al-Muhtar",
  // Usul al-Fiqh
  "Usul al-Shashi",
  "Nur al-Anwar",
  "Husami",
  "Tawdih wa Talwih",
  // Nahw
  "Ajrumiyyah",
  "Sharh Mi'at Amil",
  "Hidayat un-Nahw",
  "Sharh ibn Aqil",
  "Kafiyah",
  "Alfiyyah ibn Malik",
  "Nahw Mir",
  // Sarf
  "Mizan al-Sarf",
  "Ilm us-Sigha",
  "Panj Ganj",
  // Hadith
  "Mishkat al-Masabih",
  "Riyadh us-Saliheen",
  "Bukhari",
  "Muslim",
  "Abu Dawud",
  "Tirmidhi",
  "Nasa'i",
  "Ibn Majah",
  "Muwatta Malik",
  "Muwatta Muhammad",
  "Sharh Ma'ani al-Athar",
  // Tafsir
  "Tafsir Jalalayn",
  "Tafsir Ibn Kathir",
  "Tafsir Baydawi",
  "Tafsir Mazhari",
  "Ma'arif al-Quran",
  "Tafsir Usmani",
  // Aqeedah
  "Aqida Tahawiyyah",
  "Sharh al-Aqaid (Nasafi)",
  // Mantiq
  "Tahdhib al-Mantiq",
  "Sullam al-Ulum",
  "Mirkat",
  "Qutbi",
  // Balagha
  "Talkhis al-Miftah",
  "Mukhtasar al-Ma'ani",
  "Durus al-Balagha",
  // Adab
  "Nafhat al-Yaman",
  "Maqamat al-Hariri",
  "Diwan al-Mutanabbi",
  // Tasawwuf / Akhlaq
  "Ta'lim al-Muta'allim",
  "Bidayat al-Hidayah",
  "Ihya Ulum al-Din",
  // Sirah
  "Nur al-Yaqin",
];

const YEARS = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "5th year",
  "6th year (final)",
  "Graduated",
  "Other",
];

const AI_OPTIONS = [
  { value: "chatgpt_plus", label: "ChatGPT Plus" },
  { value: "claude_pro", label: "Claude Pro" },
  { value: "both", label: "Both" },
  { value: "other", label: "Another paid AI tool" },
  { value: "none", label: "None yet — happy to subscribe" },
];

const TECH_OPTIONS = [
  {
    value: "very",
    label: "Very comfortable",
    desc: "I build things. AI tools, dashboards, formatting — easy.",
  },
  {
    value: "comfortable",
    label: "Comfortable",
    desc: "I'm fine around AI tools and admin panels.",
  },
  {
    value: "decent",
    label: "Decent",
    desc: "Give me clear instructions and I'll figure it out.",
  },
];

const HOURS_OPTIONS = [
  { value: "lt2", label: "Less than 2 hours / week", desc: "Light, when I have a window." },
  { value: "2_5", label: "2–5 hours / week", desc: "An evening or two." },
  { value: "5_10", label: "5–10 hours / week", desc: "Most evenings or a weekend block." },
  { value: "10_plus", label: "10+ hours / week", desc: "I want to go properly deep." },
];

const COMMITMENT_OPTIONS = [
  { value: "few_weeks", label: "A few weeks", desc: "I want to help with one or two books." },
  { value: "few_months", label: "A few months", desc: "I'll stick around for a chunk of the syllabus." },
  { value: "ongoing", label: "As long as it takes", desc: "I'm in until the app is launched and beyond." },
];

const START_OPTIONS = [
  { value: "now", label: "Right away" },
  { value: "2w", label: "Within 2 weeks" },
  { value: "1m", label: "Within a month" },
  { value: "later", label: "Not sure yet" },
];

const HEARD_OPTIONS = [
  { value: "email", label: "Dars email" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "X / Twitter" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "friend", label: "Friend / classmate" },
  { value: "ustad", label: "Ustad / madrasah" },
  { value: "search", label: "Google / search" },
  { value: "other", label: "Other" },
];

const STEPS = [
  { key: "about", title: "About you" },
  { key: "background", title: "Your background" },
  { key: "tools", title: "Your tools" },
  { key: "commitment", title: "Your time" },
  { key: "final", title: "Last thing" },
] as const;

const initialData: Data = {
  name: "",
  email: "",
  phone: "",
  location: "",
  year: "",
  institution: "",
  books: [],
  booksOther: "",
  aiAccount: "",
  techComfort: "",
  hoursPerWeek: "",
  commitment: "",
  startWhen: "",
  heardAbout: "",
  heardAboutOther: "",
  message: "",
  agreed: false,
  botcheck: false,
};

export default function ContributeForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errored, setErrored] = useState(false);
  const [stepKey, setStepKey] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const stepRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleBook = (book: string) =>
    setData((d) => ({
      ...d,
      books: d.books.includes(book)
        ? d.books.filter((b) => b !== book)
        : [...d.books, book],
    }));

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
      if (!data.year) e.year = "Pick the year that fits best.";
      if (!data.location.trim()) e.location = "Where are you based?";
    }
    if (s === 2) {
      if (!data.aiAccount) e.aiAccount = "Pick the AI account you have.";
      if (!data.techComfort) e.techComfort = "Pick a comfort level.";
    }
    if (s === 3) {
      if (!data.hoursPerWeek) e.hoursPerWeek = "Roughly how many hours?";
      if (!data.commitment) e.commitment = "How long can you commit?";
      if (!data.startWhen) e.startWhen = "When can you start?";
    }
    return e;
  };

  const goNext = () => {
    const e = validateStep(step);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setErrored(true);
      setTimeout(() => setErrored(false), 450);
      return;
    }
    setErrors({});
    if (step >= STEPS.length - 1) {
      void onSubmit();
      return;
    }
    setDirection("forward");
    setStep((s) => s + 1);
    setStepKey((k) => k + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    setDirection("back");
    setStep((s) => s - 1);
    setStepKey((k) => k + 1);
  };

  useEffect(() => {
    stepRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step]);

  const onSubmit = async () => {
    if (submitting || success) return;
    setErrored(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contribute", {
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
      <div className="rounded-[28px] bg-card border border-border shadow-card px-6 py-14 sm:px-10 sm:py-20 text-center animate-fade-up">
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-coral-100 mb-7">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-coral-200/60 animate-success-ring"
          />
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-coral-500 animate-success-pop"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" className="animate-check" />
          </svg>
        </div>
        <h2 className="font-display text-[28px] sm:text-[34px] leading-tight tracking-tight font-medium text-ink mb-3">
          You&apos;re{" "}
          <em className="font-display italic text-coral-500 font-normal">
            in the queue.
          </em>
        </h2>
        <p className="text-[15px] leading-[1.65] text-ink-soft max-w-md mx-auto">
          Thanks{data.name ? `, ${data.name.split(" ")[0]}` : ""}. We&apos;ll
          go through every application personally and email you back —
          usually within a week.
        </p>
      </div>
    );
  }

  return (
    <div ref={stepRef} className="rounded-[28px] bg-card border border-border shadow-card overflow-hidden">
      <div className="relative h-[3px] w-full bg-cream-200 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-coral-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="px-6 sm:px-10 pt-7 pb-3 flex items-center justify-between">
        <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-ink-muted">
          Step {step + 1} of {STEPS.length}
        </p>
        <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-coral-500">
          {STEPS[step].title}
        </p>
      </div>

      <div className="relative px-6 sm:px-10 pb-7 sm:pb-9 min-h-[340px]">
        <div
          key={stepKey}
          className={`${
            direction === "forward"
              ? "animate-step-in-forward"
              : "animate-step-in-back"
          } ${errored ? "animate-shake" : ""}`}
        >
          {step === 0 && <StepAbout data={data} update={update} errors={errors} />}
          {step === 1 && <StepBackground data={data} update={update} errors={errors} toggleBook={toggleBook} />}
          {step === 2 && <StepTools data={data} update={update} errors={errors} />}
          {step === 3 && <StepCommitment data={data} update={update} errors={errors} />}
          {step === 4 && <StepFinal data={data} update={update} errors={errors} />}
        </div>
      </div>

      <div className="px-6 sm:px-10 pb-7 sm:pb-9 pt-1 flex items-center gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0 || submitting}
          className="flex-none px-5 py-3 rounded-full text-[14px] font-medium text-ink-soft hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={goNext}
          disabled={submitting}
          className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-coral-500 hover:bg-coral-600 text-white text-[14px] sm:text-[15px] font-medium shadow-coral disabled:opacity-80 disabled:cursor-not-allowed transition-all duration-300"
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
              Sending…
            </span>
          ) : step === STEPS.length - 1 ? (
            <>
              Submit application
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          ) : (
            <>
              Continue
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
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
    </div>
  );
}

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
    <div className="space-y-5">
      <div>
        <p className="font-display text-[22px] sm:text-[26px] leading-tight tracking-tight font-medium text-ink mb-1.5">
          First, who are you?
        </p>
        <p className="text-[14.5px] leading-[1.6] text-ink-soft">
          Just the basics — name, email, and a phone number we can reach you
          on.
        </p>
      </div>

      <div className="space-y-3.5">
        <Field
          label="Your name"
          value={data.name}
          onChange={(v) => update("name", v)}
          placeholder="Mohammed Choudhury"
          autoComplete="name"
          error={errors.name}
        />
        <Field
          label="Email"
          type="email"
          value={data.email}
          onChange={(v) => update("email", v)}
          placeholder="you@example.com"
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
              <span className="text-ink font-semibold">
                WhatsApp required
              </span>{" "}
              — it&apos;s how we&apos;ll reach out if you&apos;re accepted.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-coral-50 border border-coral-100 px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-coral-600 mb-3">
          ◆ Before you continue
        </p>
        <div className="space-y-3 text-[13.5px] leading-[1.6] text-ink-soft">
          <p>
            <span className="font-semibold text-ink">This is a volunteer position for now.</span>{" "}
            Dars isn&apos;t making money yet, so we can&apos;t pay
            contributors at this stage.
          </p>
          <p>
            <span className="font-semibold text-ink">In return: lifetime Pro access.</span>{" "}
            The AI tutor usage will be capped (each query costs us money) —
            we&apos;ll lift the cap as Dars starts earning.
          </p>
          <p>
            <span className="font-semibold text-ink">First in line when we hire.</span>{" "}
            As Dars makes money, contributors are the first people we&apos;ll
            consider for paid roles, project work, and early looks at anything
            new we&apos;re building.
          </p>
        </div>
      </div>

      <div>
        <Checkbox
          checked={data.agreed}
          onChange={(v) => update("agreed", v)}
          label="I understand and I'm happy to contribute on this basis."
        />
        <ErrorMsg message={errors.agreed} />
      </div>
    </div>
  );
}

function StepBackground({
  data,
  update,
  errors,
  toggleBook,
}: StepProps & { toggleBook: (b: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-display text-[22px] sm:text-[26px] leading-tight tracking-tight font-medium text-ink mb-1.5">
          Where are you up to?
        </p>
        <p className="text-[14.5px] leading-[1.6] text-ink-soft">
          Your year, where you&apos;re based, and the books you know best.
        </p>
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-2.5">
          Year level
        </p>
        <div className="flex flex-wrap gap-2">
          {YEARS.map((y) => (
            <Chip
              key={y}
              active={data.year === y}
              onClick={() => update("year", y)}
            >
              {y}
            </Chip>
          ))}
        </div>
        <ErrorMsg message={errors.year} />
      </div>

      <Field
        label="Where are you based?"
        value={data.location}
        onChange={(v) => update("location", v)}
        placeholder="London, UK · Karachi, Pakistan · Toronto, Canada"
        autoComplete="address-level2"
        error={errors.location}
      />

      <Field
        label="Madrasah / institution (optional)"
        value={data.institution}
        onChange={(v) => update("institution", v)}
        placeholder="Darul Uloom, JKN, Cambridge Muslim College, etc."
      />

      <div>
        <p className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-2.5">
          Books you know best
        </p>
        <div className="flex flex-wrap gap-2">
          {COMMON_BOOKS.map((b) => (
            <Chip
              key={b}
              active={data.books.includes(b)}
              onClick={() => toggleBook(b)}
            >
              {b}
            </Chip>
          ))}
        </div>
        <textarea
          value={data.booksOther}
          onChange={(e) => update("booksOther", e.target.value)}
          placeholder="Any other books? Tafsir, Sharh, Urdu staples — anything we missed."
          rows={2}
          className="mt-3 w-full px-4 py-3 rounded-2xl border border-border bg-cream-50 text-[14.5px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-coral-300 focus:bg-white transition-colors resize-none"
        />
      </div>
    </div>
  );
}

function StepTools({ data, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-display text-[22px] sm:text-[26px] leading-tight tracking-tight font-medium text-ink mb-1.5">
          What you&apos;re working with.
        </p>
        <p className="text-[14.5px] leading-[1.6] text-ink-soft">
          The tools you have, and how comfortable you are with the workflow.
        </p>
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-2.5">
          AI account
        </p>
        <div className="space-y-2">
          {AI_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              active={data.aiAccount === o.value}
              onClick={() => update("aiAccount", o.value)}
              title={o.label}
            />
          ))}
        </div>
        <ErrorMsg message={errors.aiAccount} />
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-2.5">
          Tech comfort
        </p>
        <div className="space-y-2">
          {TECH_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              active={data.techComfort === o.value}
              onClick={() => update("techComfort", o.value)}
              title={o.label}
              desc={o.desc}
            />
          ))}
        </div>
        <ErrorMsg message={errors.techComfort} />
      </div>
    </div>
  );
}

function StepCommitment({ data, update, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-display text-[22px] sm:text-[26px] leading-tight tracking-tight font-medium text-ink mb-1.5">
          How much time can you give?
        </p>
        <p className="text-[14.5px] leading-[1.6] text-ink-soft">
          Be honest — we&apos;d rather know up front than chase replies later.
        </p>
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-2.5">
          Hours per week
        </p>
        <div className="space-y-2">
          {HOURS_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              active={data.hoursPerWeek === o.value}
              onClick={() => update("hoursPerWeek", o.value)}
              title={o.label}
              desc={o.desc}
            />
          ))}
        </div>
        <ErrorMsg message={errors.hoursPerWeek} />
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-2.5">
          How long are you up for committing?
        </p>
        <div className="space-y-2">
          {COMMITMENT_OPTIONS.map((o) => (
            <RadioCard
              key={o.value}
              active={data.commitment === o.value}
              onClick={() => update("commitment", o.value)}
              title={o.label}
              desc={o.desc}
            />
          ))}
        </div>
        <ErrorMsg message={errors.commitment} />
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-2.5">
          When can you start?
        </p>
        <div className="flex flex-wrap gap-2">
          {START_OPTIONS.map((o) => (
            <Chip
              key={o.value}
              active={data.startWhen === o.value}
              onClick={() => update("startWhen", o.value)}
            >
              {o.label}
            </Chip>
          ))}
        </div>
        <ErrorMsg message={errors.startWhen} />
      </div>
    </div>
  );
}

function StepFinal({ data, update }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-display text-[22px] sm:text-[26px] leading-tight tracking-tight font-medium text-ink mb-1.5">
          Almost done.
        </p>
        <p className="text-[14.5px] leading-[1.6] text-ink-soft">
          Two quick optional ones — how you found us, and anything else
          you&apos;d like us to know.
        </p>
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-2.5">
          How did you hear about us?
        </p>
        <div className="flex flex-wrap gap-2">
          {HEARD_OPTIONS.map((o) => (
            <Chip
              key={o.value}
              active={data.heardAbout === o.value}
              onClick={() => update("heardAbout", o.value)}
            >
              {o.label}
            </Chip>
          ))}
        </div>
        {data.heardAbout === "other" && (
          <input
            type="text"
            value={data.heardAboutOther}
            onChange={(e) => update("heardAboutOther", e.target.value)}
            placeholder="Tell us where…"
            className="mt-3 w-full px-4 py-3 rounded-2xl border border-border bg-cream-50 text-[14.5px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-coral-300 focus:bg-white transition-colors"
          />
        )}
      </div>

      <div>
        <p className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-2.5">
          Anything else? (optional)
        </p>
        <textarea
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="I want to help because…"
          rows={5}
          className="w-full px-4 py-3 rounded-2xl border border-border bg-cream-50 text-[14.5px] leading-[1.6] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-coral-300 focus:bg-white transition-colors resize-none"
        />
      </div>

      <div className="rounded-2xl bg-coral-50 border border-coral-100 px-4 py-3.5">
        <p className="text-[13px] leading-[1.55] text-ink-soft">
          <span className="font-semibold text-ink">Heads up:</span> we read
          every reply. Don&apos;t feel like you have to write an essay — a
          sentence is fine.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-1.5 block">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={`w-full px-4 py-3 rounded-2xl border bg-cream-50 text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none focus:bg-white transition-colors ${
          error
            ? "border-coral-400 focus:border-coral-500"
            : "border-border focus:border-coral-300"
        }`}
      />
      <ErrorMsg message={error} />
    </label>
  );
}

function PhoneField({
  value,
  onChange,
  error,
}: {
  // value is the combined string we expose upward, e.g. "+447700900000".
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [local, setLocal] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Push combined value up whenever country or local part changes.
  useEffect(() => {
    const digits = local.replace(/\D/g, "");
    onChange(digits ? `+${country.dialCode}${digits}` : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, local]);

  // Reset local input if parent clears value.
  useEffect(() => {
    if (!value) setLocal("");
  }, [value]);

  // Close dropdown on outside click.
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

  // Focus search when dropdown opens.
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
      <span className="text-[12px] uppercase tracking-[0.12em] font-semibold text-ink-muted mb-1.5 block">
        Phone (WhatsApp)
      </span>
      <div
        ref={wrapRef}
        className={`relative flex items-stretch w-full rounded-2xl border bg-cream-50 focus-within:bg-white transition-colors ${
          error
            ? "border-coral-400 focus-within:border-coral-500"
            : "border-border focus-within:border-coral-300"
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
        <input
          type="tel"
          inputMode="tel"
          value={local}
          onChange={(e) => setLocal(e.target.value.replace(/[^\d\s\-()]/g, ""))}
          placeholder="7700 900000"
          autoComplete="tel-national"
          className="flex-1 min-w-0 px-4 py-3 bg-transparent text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none rounded-r-2xl"
        />

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

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-full text-[13.5px] font-medium border transition-all duration-200 ${
        active
          ? "bg-coral-500 text-white border-coral-500 shadow-soft scale-[1.02]"
          : "bg-cream-50 text-ink-soft border-border hover:border-coral-300 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full text-left flex items-start gap-3 px-1 py-1 group"
    >
      <span
        className={`flex-none mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
          checked
            ? "bg-coral-500 border-coral-500 scale-105"
            : "bg-white border-border-strong group-hover:border-coral-300"
        }`}
      >
        {checked && (
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
          checked ? "text-ink" : "text-ink-soft group-hover:text-ink"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

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
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all duration-200 ${
        active
          ? "bg-coral-50 border-coral-300 shadow-soft"
          : "bg-cream-50 border-border hover:border-coral-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-none mt-0.5 w-[18px] h-[18px] rounded-full border-2 transition-all ${
            active ? "border-coral-500 bg-coral-500" : "border-border-strong bg-white"
          }`}
        >
          {active && (
            <span className="block w-1.5 h-1.5 rounded-full bg-white mx-auto mt-[5px]" />
          )}
        </div>
        <div className="flex-1">
          <p
            className={`text-[14.5px] font-semibold leading-tight ${
              active ? "text-ink" : "text-ink"
            }`}
          >
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
