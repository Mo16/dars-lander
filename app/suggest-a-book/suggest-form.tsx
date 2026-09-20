"use client";

import { useCallback, useId, useRef, useState } from "react";
import Link from "next/link";
import { Shelf, type ShelfBook } from "./shelf";
import { SUBJECTS } from "./subjects";

/**
 * Suggest a book — the whole page body.
 *
 * The heading, the shelf and the form live in one component on purpose: the
 * shelf IS the list of books being typed, so splitting them would mean lifting
 * the same state into a context to hand it straight back down. This is a
 * client component, but Next still renders it on the server, so the heading,
 * the first field and the plank are in the first HTML response — nothing on
 * this page appears only after hydration.
 *
 * The composition is deliberately not the usual eyebrow-headline-subline-two-
 * buttons stack. The heading and the books stand on ONE shelf, sharing a
 * baseline, and the form starts immediately underneath: on this page the form
 * is the hero, because filling it in is the only thing there is to do here.
 */

const MAX_BOOKS = 12;

type Entry = {
  key: string;
  title: string;
  author: string;
  subjectId: string;
  note: string;
  /** Whether the author / subject / reason fields are showing for this row. */
  open: boolean;
};

let seq = 0;
function blank(): Entry {
  seq += 1;
  return { key: `e${seq}`, title: "", author: "", subjectId: "", note: "", open: false };
}

function booksOnShelf(entries: Entry[]): ShelfBook[] {
  return entries
    .filter((e) => e.title.trim().length > 0)
    .map((e) => ({ id: e.key, title: e.title.trim(), author: e.author.trim() || undefined }));
}

function countLabel(n: number): string {
  if (n === 0) return "No books yet";
  if (n === 1) return "One book on the shelf";
  return `${n} books on the shelf`;
}

export default function SuggestForm() {
  const [entries, setEntries] = useState<Entry[]>([blank()]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<{ books: ShelfBook[]; email: string } | null>(null);

  // Keyed by entry, so a newly added row can be focused the moment it exists.
  const titleRefs = useRef(new Map<string, HTMLInputElement | null>());

  const books = booksOnShelf(entries);

  const update = useCallback((key: string, patch: Partial<Entry>) => {
    setEntries((prev) => prev.map((e) => (e.key === key ? { ...e, ...patch } : e)));
  }, []);

  // The new row is built BEFORE the updater runs, never inside it. React calls
  // an updater twice in development to catch exactly this, and a blank() there
  // would mint two rows and focus the wrong one.
  const addEntry = useCallback((after?: string) => {
    const created = blank();
    setEntries((prev) => {
      if (prev.length >= MAX_BOOKS) return prev;
      const at = after ? prev.findIndex((e) => e.key === after) : -1;
      if (at === -1) return [...prev, created];
      const next = [...prev];
      next.splice(at + 1, 0, created);
      return next;
    });
    // Focused once React has actually put the row on the page. If the list was
    // already full nothing was added, and this finds nothing to focus.
    requestAnimationFrame(() => titleRefs.current.get(created.key)?.focus());
  }, []);

  const removeEntry = useCallback((key: string) => {
    const fresh = blank();
    setEntries((prev) => (prev.length === 1 ? [fresh] : prev.filter((e) => e.key !== key)));
    titleRefs.current.delete(key);
  }, []);

  async function submit() {
    if (submitting) return;
    const payload = entries
      .map((e) => ({
        title: e.title.trim(),
        author: e.author.trim(),
        subjectId: e.subjectId,
        note: e.note.trim(),
      }))
      .filter((e) => e.title.length > 0);

    if (!payload.length) {
      setError("Add at least one book before sending.");
      titleRefs.current.get(entries[0].key)?.focus();
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email address doesn't look right.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/book-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ books: payload, name: name.trim(), email: email.trim(), botcheck }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again in a moment.");
        return;
      }
      setSent({ books, email: email.trim() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // --- Sent ----------------------------------------------------------------
  if (sent) {
    return (
      <div>
        <Plate
          heading={
            <>
              On the shelf,{" "}
              <em className="font-display font-normal italic text-coral-500">thank you.</em>
            </>
          }
          lead={
            <>
              {sent.books.length === 1
                ? "We have your book."
                : `We have all ${sent.books.length} of them.`}{" "}
              Every suggestion is read, and the ones asked for most are the ones we build
              next.{" "}
              {sent.email
                ? `We'll email ${sent.email} when one of these lands in Dars.`
                : "Come back any time. There is no limit on how often you can send us books."}
            </>
          }
          books={sent.books}
          emptyNote=""
          caption={countLabel(sent.books.length)}
        />

        <div className="mt-9 max-w-xl sm:mt-12">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={() => {
                setEntries([blank()]);
                setSent(null);
              }}
              className="rounded-full bg-coral-700 px-6 py-3 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-coral-800"
            >
              Suggest more books
            </button>
            <Link
              href="/"
              className="text-[14.5px] text-ink-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-ink"
            >
              Back to Dars
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- The form ------------------------------------------------------------
  return (
    <div>
      <Plate
        heading={
          <>
            Which books should Dars{" "}
            <em className="font-display font-normal italic text-coral-500">have next?</em>
          </>
        }
        lead="Name the books you are actually studying, or the ones you wish were on your phone. A title on its own is enough."
        books={books}
        emptyNote="Type a title and it goes up here."
        caption={countLabel(books.length)}
      />

      <div className="mt-9 overflow-hidden rounded-[28px] border border-border bg-card shadow-card sm:mt-11">
        <div className="px-5 pb-4 pt-6 sm:px-8 sm:pt-7">
          <h2 className="font-display text-[18px] font-medium tracking-tight text-ink sm:text-[20px]">
            The books
          </h2>
        </div>

        <ul className="border-t border-border">
          {entries.map((entry, i) => (
            <EntryRow
              key={entry.key}
              entry={entry}
              index={i}
              total={entries.length}
              canAdd={entries.length < MAX_BOOKS}
              onChange={(patch) => update(entry.key, patch)}
              onRemove={() => removeEntry(entry.key)}
              onEnter={() => addEntry(entry.key)}
              inputRef={(el) => {
                titleRefs.current.set(entry.key, el);
              }}
            />
          ))}
        </ul>

        <div className="border-t border-border px-5 py-4 sm:px-8">
          {entries.length < MAX_BOOKS ? (
            <button
              type="button"
              onClick={() => addEntry()}
              className="group inline-flex items-center gap-2.5 text-[14.5px] font-medium text-ink transition-colors hover:text-coral-700"
            >
              {/* The bare mark. A plus inside a little ringed circle is an
                  icon wearing a box, and the box adds nothing the plus was
                  not already saying. */}
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                aria-hidden
                className="text-ink-muted transition-colors group-hover:text-coral-700"
              >
                <path d="M7 1.5v11M1.5 7h11" />
              </svg>
              Add another book
            </button>
          ) : (
            <p className="text-[13.5px] text-ink-muted">
              That&apos;s twelve, the most one form takes. Send these and start another.
            </p>
          )}
        </div>
      </div>

      {/* Who sent them. Both optional, and the page says why you'd bother. */}
      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
        <Field label="Your name" value={name} onChange={setName} placeholder="Optional" autoComplete="name" />
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Optional"
          autoComplete="email"
        />
      </div>
      <p className="mt-3 max-w-xl text-[13px] leading-[1.6] text-ink-muted">
        An email is the only way we can tell you when one of your books goes in. We
        won&apos;t use it for anything else.
      </p>

      {error && (
        <p
          role="alert"
          className="animate-fade-up mt-6 rounded-2xl border border-coral-200 bg-coral-50 px-4 py-3 text-[14px] leading-[1.55] text-coral-700"
        >
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-700 px-7 py-3.5 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-coral-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spinner" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : books.length > 1 ? (
            `Send these ${books.length} books`
          ) : (
            "Send it over"
          )}
        </button>
        <p className="text-[13px] text-ink-muted">No account needed.</p>
      </div>

      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
      />
    </div>
  );
}

/**
 * The head of the page.
 *
 * The heading, one line of what to do, and then the shelf running the FULL
 * width underneath — the plank is the structure between the heading and the
 * form, so it holds the composition together instead of being a rail parked
 * out at the right with a gulf of nothing between it and the words.
 *
 * The heading is held to two lines at every width. A display line that wraps
 * onto three or four is a staircase, and its last word — the one set in the
 * accent — ends up stranded at the foot of the stack looking like a splash of
 * colour rather than part of the sentence.
 */
function Plate({
  heading,
  lead,
  books,
  emptyNote,
  caption,
}: {
  heading: React.ReactNode;
  lead: React.ReactNode;
  books: ShelfBook[];
  emptyNote: string;
  caption: string;
}) {
  return (
    <header>
      <h1 className="font-display text-balance text-[34px] font-medium leading-[1.05] tracking-tight text-ink sm:text-[46px] lg:text-[54px]">
        {heading}
      </h1>
      <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-ink-soft sm:text-[16px]">{lead}</p>
      <Shelf className="mt-9 sm:mt-11" books={books} emptyNote={emptyNote} caption={caption} />
    </header>
  );
}

// ---------------------------------------------------------------------------
// One book
// ---------------------------------------------------------------------------

function EntryRow({
  entry,
  index,
  total,
  canAdd,
  onChange,
  onRemove,
  onEnter,
  inputRef,
}: {
  entry: Entry;
  index: number;
  total: number;
  canAdd: boolean;
  onChange: (patch: Partial<Entry>) => void;
  onRemove: () => void;
  onEnter: () => void;
  inputRef: (el: HTMLInputElement | null) => void;
}) {
  const fieldId = useId();
  const filled = entry.title.trim().length > 0;
  const extras = [entry.author.trim(), entry.subjectId, entry.note.trim()].filter(Boolean).length;

  return (
    <li className="border-b border-border last:border-b-0">
      {/*
        One book, one line. The extra fields sit behind a control ON that line
        rather than a sentence underneath it: twelve rows each carrying "Add
        the author, subject or a reason" is the same string read twelve times
        and a list twice as tall as the thing it lists.
      */}
      <div className="flex items-center gap-2 px-5 py-2.5 transition-colors focus-within:bg-cream-50 sm:gap-3 sm:px-8">
        <span
          aria-hidden
          className={`font-display w-5 shrink-0 text-right text-[15px] font-medium tabular-nums transition-colors ${
            filled ? "text-coral-700" : "text-ink-muted"
          }`}
        >
          {index + 1}
        </span>

        <label htmlFor={fieldId} className="sr-only">
          Book {index + 1} title
        </label>
        {/*
          This field has no border to change colour on focus, so it carries a
          ring of its own. Stripping the outline and putting nothing back
          leaves a keyboard user with no way to tell which of twelve rows they
          are typing into. The negative margin keeps the text on the same left
          edge as the detail fields below while the ring still has room.
        */}
        <input
          id={fieldId}
          ref={inputRef}
          value={entry.title}
          onChange={(e) => onChange({ title: e.target.value })}
          onKeyDown={(e) => {
            // Enter moves to a fresh book rather than submitting a form the
            // person is probably still filling in.
            if (e.key === "Enter") {
              e.preventDefault();
              if (entry.title.trim() && canAdd) onEnter();
            }
          }}
          placeholder="Book title"
          autoComplete="off"
          className="-ml-1.5 min-w-0 flex-1 rounded-lg border-0 bg-transparent px-1.5 py-1.5 text-[16px] text-ink placeholder:text-ink-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-300"
        />

        <button
          type="button"
          onClick={() => onChange({ open: !entry.open })}
          aria-expanded={entry.open}
          aria-label={`Author, subject and reason for book ${index + 1}`}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] transition-colors ${
            entry.open || extras > 0
              ? "text-coral-700 hover:bg-coral-50"
              : "text-ink-muted hover:bg-cream-200 hover:text-ink"
          }`}
        >
          {extras > 0 && !entry.open ? `Details · ${extras}` : "Details"}
          <svg
            width="9"
            height="9"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={`transition-transform duration-200 ${entry.open ? "rotate-180" : ""}`}
          >
            <path d="M2 4l4 4 4-4" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onRemove}
          disabled={total === 1 && !filled && extras === 0}
          aria-label={`Remove book ${index + 1}`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-cream-200 hover:text-ink disabled:pointer-events-none disabled:opacity-0"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      </div>

      {entry.open && (
        <div className="pb-4 pl-[48px] pr-5 sm:pl-[64px] sm:pr-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Author"
              value={entry.author}
              onChange={(v) => onChange({ author: v })}
              placeholder="Optional"
            />
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                Subject
              </span>
              {/*
                A native select, because a hand-rolled dropdown is a worse
                version of a control the browser already ships working — but
                its own arrow is stripped, so it needs one drawn back on.
                Without it the field looks like a text input that refuses to
                take text, which is a control that appears to be broken.
              */}
              <span className="relative block">
                <select
                  value={entry.subjectId}
                  onChange={(e) => onChange({ subjectId: e.target.value })}
                  className="w-full appearance-none rounded-2xl border border-border bg-cream-50 py-3 pl-4 pr-10 text-[15px] text-ink transition-colors focus:border-coral-300 focus:bg-white focus:outline-none"
                >
                  <option value="">Not sure</option>
                  {SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
                >
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </span>
            </label>
            <div className="sm:col-span-2">
              <Field
                label="Why this one"
                value={entry.note}
                onChange={(v) => onChange({ note: v })}
                placeholder="Optional. We read these"
              />
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-2xl border border-border bg-cream-50 px-4 py-3 text-[15px] text-ink transition-colors placeholder:text-ink-muted focus:border-coral-300 focus:bg-white focus:outline-none"
      />
    </label>
  );
}
