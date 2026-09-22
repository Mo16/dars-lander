"use client";

import { useId, useRef, useState } from "react";

/**
 * The institute waitlist form.
 *
 * Posts to /api/institute-waitlist, which writes public.institute_waitlist -
 * its own table, not the student beta waitlist.
 *
 * Material 3 outlined text fields, to match the rest of the page. Three
 * details that make the difference between "a form" and Google's form:
 *
 *  · The label genuinely rides onto the border when the field is focused or
 *    filled, and carries a white chip so it notches the stroke rather than
 *    crossing it.
 *  · Focus thickens the stroke with a ring rather than a wider border, so
 *    nothing on the row shifts by a pixel when you tab through.
 *  · Inputs are 16px. Anything smaller and iOS Safari zooms the page on
 *    focus, which on a phone reads as the site breaking.
 */

type Status = "idle" | "saving" | "done" | "error";
type Errors = Partial<Record<"institute" | "email", string>>;
type Variant = "institute" | "teacher";

/**
 * A standalone teacher applies through the same door as a madrasah: same
 * form, same fields, same table. Only the words change, because what they
 * are naming is their class rather than their institute.
 */
const COPY: Record<
  Variant,
  { nameLabel: string; namePlaceholder: string; missing: string; cta: string }
> = {
  institute: {
    nameLabel: "Madrasah name",
    namePlaceholder: "Darul Uloom Bury",
    missing: "Tell us the name of your madrasah.",
    cta: "Join the institute waitlist",
  },
  teacher: {
    nameLabel: "Your class or halaqah",
    namePlaceholder: "Sunday Quduri halaqah",
    missing: "Tell us what you teach.",
    cta: "Join the teacher waitlist",
  },
};

const SIZES = [
  "Under 50 students",
  "50 to 150 students",
  "150 to 400 students",
  "More than 400 students",
];

export default function InstituteWaitlistForm({
  variant = "institute",
}: {
  variant?: Variant;
} = {}) {
  const copy = COPY[variant];
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const field = (n: string) => `${uid}-${n}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "saving") return;

    const data = new FormData(e.currentTarget);
    const institute = String(data.get("institute") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const next: Errors = {};
    if (!institute) next.institute = copy.missing;
    if (!email) next.email = "We need an address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That does not look like an email address.";

    setErrors(next);
    setFormError("");

    if (Object.keys(next).length) {
      // Put the caret in the first field that needs attention.
      const first = next.institute ? "institute" : "email";
      formRef.current
        ?.querySelector<HTMLInputElement>(`#${CSS.escape(field(first))}`)
        ?.focus();
      return;
    }

    setStatus("saving");

    try {
      const res = await fetch("/api/institute-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: variant,
          institute,
          email,
          name: data.get("name"),
          town: data.get("town"),
          students: data.get("students"),
          botcheck: Boolean(data.get("botcheck")),
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setFormError(
          json?.error ?? "Could not save that. Try again in a moment.",
        );
        return;
      }

      setSaved(institute);
      setStatus("done");
    } catch {
      setStatus("error");
      setFormError("No connection. Try again in a moment.");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-[#DADCE0] bg-white p-8 text-center shadow-[0_1px_2px_rgba(60,64,67,0.10),0_4px_12px_-4px_rgba(60,64,67,0.14)] sm:p-12">
        <svg
          viewBox="0 0 24 24"
          className="mx-auto h-11 w-11"
          fill="none"
          stroke="#1E8E3E"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            d="M7.5 12.4l3.1 3.1 6-6.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-5 text-[20px] font-bold tracking-tight text-[#1C1B19] sm:text-[24px]">
          {saved} is on the list
        </p>
        <p className="mx-auto mt-3 max-w-[48ch] text-[15px] leading-relaxed text-[#5B584F]">
          We read every one by hand, so it is a person who replies rather than
          an autoresponder. Expect to hear from us within a week.
        </p>
      </div>
    );
  }

  const busy = status === "saving";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-busy={busy}
      className="rounded-2xl border border-[#DADCE0] bg-white p-6 text-left shadow-[0_1px_2px_rgba(60,64,67,0.10),0_4px_12px_-4px_rgba(60,64,67,0.14)] sm:p-8"
    >
      <fieldset disabled={busy} className="contents">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField
              id={field("institute")}
              name="institute"
              label={copy.nameLabel}
              placeholder={copy.namePlaceholder}
              autoComplete="organization"
              error={errors.institute}
              onInput={() =>
                errors.institute &&
                setErrors((p) => ({ ...p, institute: undefined }))
              }
            />
          </div>

          <TextField
            id={field("town")}
            name="town"
            label="Town or city"
            autoComplete="address-level2"
            optional
          />

          <SelectField
            id={field("students")}
            name="students"
            label="Roughly how many students"
            options={SIZES}
          />

          <TextField
            id={field("name")}
            name="name"
            label="Your name"
            autoComplete="name"
            optional
          />

          <TextField
            id={field("email")}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email}
            onInput={() =>
              errors.email && setErrors((p) => ({ ...p, email: undefined }))
            }
          />
        </div>

        {/* The field no person fills. */}
        <input
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        />

        <div className="mt-7">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full sm:w-auto sm:min-w-[224px] bg-[var(--accent)] px-7 text-[15px] font-medium text-white transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-80"
          >
            {busy && (
              <span
                aria-hidden="true"
                className="animate-spinner h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
              />
            )}
            {busy
            ? variant === "teacher"
              ? "Adding your class"
              : "Adding your madrasah"
            : copy.cta}
          </button>
        </div>
      </fieldset>

      <p
        role="alert"
        className={`mt-4 text-[13.5px] text-[#C5221F] ${formError ? "" : "hidden"}`}
      >
        {formError}
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------------ */

const shell = (error?: string) =>
  `peer h-14 w-full rounded-lg border bg-white px-4 text-[16px] text-[#1C1B19] outline-none transition-[border-color,box-shadow] placeholder:text-transparent focus:placeholder:text-[#6F6B61] ${
    error
      ? "border-[#D93025] focus:border-[#D93025] focus:ring-1 focus:ring-[#D93025]"
      : "border-[#DADCE0] hover:border-[#9AA0A6] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
  }`;

/** Label at rest sits in the field; focused or filled it rides onto the
 *  border, carrying a white chip so it notches the stroke. */
const floatLabel = (error?: string) =>
  `pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1.5 text-[16px] leading-none transition-all duration-150 ${
    error ? "text-[#C5221F]" : "text-[#6F6B61]"
  } peer-focus:top-0 peer-focus:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[12px] ${
    error ? "" : "peer-focus:text-[var(--accent-text)]"
  }`;

function TextField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  optional,
  error,
  onInput,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  optional?: boolean;
  error?: string;
  onInput?: () => void;
}) {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder ?? " "}
          onInput={onInput}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className={shell(error)}
        />
        <label htmlFor={id} className={floatLabel(error)}>
          {label}
          {optional && (
            <span className="text-[#6F6B61]"> &middot; optional</span>
          )}
        </label>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 px-1 text-[12.5px] text-[#C5221F]">
          {error}
        </p>
      )}
    </div>
  );
}

/** A select always has a value, so its label stays floated. */
function SelectField({
  id,
  name,
  label,
  options,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue=""
        className={`${shell()} cursor-pointer appearance-none pr-10`}
      >
        <option value="">Not sure yet</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1.5 text-[12px] leading-none text-[#5B584F] peer-focus:text-[var(--accent-text)]"
      >
        {label}
        <span className="text-[#6F6B61]"> &middot; optional</span>
      </label>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F6B61]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
