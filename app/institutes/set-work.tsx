"use client";

import { useState } from "react";

/* =========================================================================
   WHAT YOU SET — the three things a teacher puts out, and what comes back.

   Revision, an exam, the daily mamulat. Each panel is the same shape: what
   you build on the left, what the class gives back on the right. So this is
   deliberately ONE panel with three jobs, not three feature cards.

   Every control here does what it says: the tabs switch, and the exam-mode
   switch genuinely changes how the paper behaves.
   ========================================================================= */

type Job = "revision" | "exams" | "mamulat";

const JOBS: { id: Job; label: string; sub: string }[] = [
  { id: "revision", label: "Revision", sub: "Who is revising what" },
  { id: "exams", label: "Exams", sub: "Built from your own notes" },
  { id: "mamulat", label: "Mamulat", sub: "The daily list" },
];

export default function SetWork() {
  const [job, setJob] = useState<Job>("revision");

  return (
    <div>
      {/* --- Tabs: the Google pill bar --- */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Choose what to set"
          className="inline-flex gap-1 rounded-full border border-[#DADCE0] bg-white p-1.5"
        >
          {JOBS.map((j) => {
            const active = job === j.id;
            return (
              <button
                key={j.id}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls="set-panel"
                onClick={() => setJob(j.id)}
                // rounded-FULL, to match the pill it sits inside. A rounded-lg
                // tab in a rounded-full bar leaves the active tab's square-ish
                // corners cutting across the container's round end.
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:px-6 sm:py-2.5 sm:text-[15px] ${
                  active
                    ? "border border-[var(--accent)] bg-white text-[var(--accent-text)]"
                    : "border border-transparent text-[#5B584F] hover:text-[#1C1B19]"
                }`}
              >
                {j.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-[14px] text-[#6F6B61]">
        {JOBS.find((j) => j.id === job)?.sub}
      </p>

      {/* --- Panel --- */}
      <div
        id="set-panel"
        role="tabpanel"
        className="animate-panel-settle mt-6 rounded-2xl border border-[#E8EAED] bg-white p-4 shadow-[0_1px_2px_rgba(60,64,67,0.10),0_4px_12px_-4px_rgba(60,64,67,0.14)] sm:mt-7 sm:rounded-3xl sm:p-7"
        key={job}
      >
        {job === "revision" && <RevisionView />}
        {job === "exams" && <ExamsView />}
        {job === "mamulat" && <MamulatView />}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- revision */

const SETS = [
  {
    name: "Taharah, week 3",
    book: "Mukhtasar al-Quduri",
    cards: 24,
    due: "Due Thursday",
    done: 18,
    of: 24,
  },
  {
    name: "Kitab al-Iman",
    book: "Mishkat al-Masabih",
    cards: 16,
    due: "No deadline",
    done: 11,
    of: 24,
  },
  {
    name: "Mubtada and khabar",
    book: "Al-Ajrumiyyah",
    cards: 30,
    due: "Quiz · average 64%",
    done: 22,
    of: 24,
  },
];

/**
 * Tracking: what each student is on, and whether they are keeping pace.
 *
 * "Behind" means the deadline is closer than the share of the set they have
 * turned over, which is a fact about the set, not a judgement about them.
 */
const STATE = {
  ontrack: { label: "On track", tone: "#146C2E" },
  behind: { label: "Behind", tone: "#9A5400" },
  none: { label: "Not started", tone: "#C5221F" },
} as const;

const TRACK: { who: string; on: string; state: keyof typeof STATE }[] = [
  { who: "Yusuf Ahmed", on: "Taharah, week 3 · 24 of 24", state: "ontrack" },
  { who: "Musa Vawda", on: "Kitab al-Iman · 16 of 16", state: "ontrack" },
  { who: "Bilal Patel", on: "Taharah, week 3 · 19 of 24", state: "ontrack" },
  { who: "Hamza Desai", on: "Mubtada and khabar · 11 of 30", state: "behind" },
  { who: "Zakariya Hussain", on: "Taharah, week 3 · 8 of 24", state: "behind" },
  { who: "Suhayb Rahman", on: "Nothing since Thursday", state: "none" },
];

function RevisionView() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-7">
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
          Sets you have given Year 3B
        </div>
        <div className="mt-3">
          {SETS.map((s) => (
            <div
              key={s.name}
              className="border-b border-[#F1F3F4] py-3.5 last:border-b-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[14.5px] font-semibold text-[#1C1B19] sm:text-[15.5px]">
                    {s.name}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-[#6F6B61] sm:truncate">
                    {s.book} · {s.cards} cards · {s.due}
                  </div>
                </div>
                <div className="shrink-0 text-[14px] font-semibold tabular-nums text-[#1C1B19]">
                  {s.done}/{s.of}
                </div>
              </div>
              <div className="mt-2.5 h-[7px] overflow-hidden rounded-full bg-[#F1F3F4]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.round((s.done / s.of) * 100)}%`,
                    background: s.done / s.of >= 0.7 ? "#1E8E3E" : "#F9AB00",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[12.5px] leading-relaxed text-[#6F6B61]">
          A set is cards from the syllabus, cards you wrote, or both. Give it a
          deadline and it becomes homework. Turn on quiz mode and it is marked
          for you.
        </p>
      </div>

      {/* who is actually revising, and who has drifted */}
      <div className="min-w-0 rounded-2xl bg-[#F8F9FA] p-4 sm:p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
          Who is revising what
        </div>

        <div className="mt-3">
          {TRACK.map((t) => (
            <div
              key={t.who}
              className="border-b border-[#E8EAED] py-2.5 last:border-b-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 truncate text-[13.5px] text-[#1C1B19]">
                  {t.who}
                </span>
                <span
                  className="shrink-0 text-[12.5px] font-medium"
                  style={{ color: STATE[t.state].tone }}
                >
                  {STATE[t.state].label}
                </span>
              </div>
              <div className="mt-0.5 text-[12px] text-[#6F6B61] sm:truncate">
                {t.on}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[12.5px] leading-relaxed text-[#6F6B61]">
          Every card a student turns over is counted against the set it came
          from, so you can see who is keeping pace, who has stalled halfway,
          and who has not started. 14 of 24 are still missing the same nahw
          card.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ exams */

const PAPER = [
  { section: "Taharah", from: "Mukhtasar al-Quduri", qs: 12, marks: 24 },
  { section: "Salah", from: "Mukhtasar al-Quduri", qs: 10, marks: 20 },
  { section: "Mubtada and khabar", from: "Al-Ajrumiyyah", qs: 8, marks: 16 },
];

const PAPER_TOTALS = {
  qs: PAPER.reduce((a, s) => a + s.qs, 0),
  marks: PAPER.reduce((a, s) => a + s.marks, 0),
};

/**
 * What comes back: pupils and marks.
 *
 * Marks are out of the paper's OWN total, and the percentages and the class
 * average are computed from them, so nothing here can drift from the paper
 * printed above it. Ranked, because the bottom of the list is the part a
 * teacher actually acts on.
 *
 * Same eight names as the register, because it is the same class.
 */
const RESULTS = [
  { name: "Musa Vawda", mark: 56 },
  { name: "Ibrahim Mota", mark: 54 },
  { name: "Yusuf Ahmed", mark: 51 },
  { name: "Bilal Patel", mark: 48 },
  { name: "Hamza Desai", mark: 41 },
  { name: "Anas Kola", mark: 38 },
  { name: "Zakariya Hussain", mark: 31 },
  { name: "Suhayb Rahman", mark: 22 },
];

const RESULT_AVG = Math.round(
  (RESULTS.reduce((a, r) => a + r.mark, 0) /
    (RESULTS.length * PAPER_TOTALS.marks)) *
    100,
);

function ExamsView() {
  // A real switch: it changes how the paper behaves, and the note says so.
  const [examMode, setExamMode] = useState(true);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-7">
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
          Built from your own notes
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#E8EAED] bg-[#F8F9FA] px-4 py-3">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-[#6F6B61]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
          </svg>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-semibold text-[#1C1B19]">
              Taharah, my class notes.pdf
            </div>
            <div className="mt-0.5 text-[12.5px] text-[#6F6B61]">
              14 pages · uploaded Monday
            </div>
          </div>
          <span className="shrink-0 text-[12.5px] font-medium text-[#146C2E]">
            Read
          </span>
        </div>

        <p className="mt-3 text-[12.5px] leading-relaxed text-[#6F6B61]">
          Upload the notes you actually taught from and Dars drafts the paper
          below: sections, questions and marks, each one traceable to a line
          you wrote. Nothing is set from a syllabus you do not teach.
        </p>

        <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
          The draft it wrote · Year 3B
        </div>

        <div className="mt-3">
          {PAPER.map((s) => (
            <div
              key={s.section}
              className="flex items-baseline justify-between gap-3 border-b border-[#F1F3F4] py-3 last:border-b-0"
            >
              <div className="min-w-0">
                <div className="truncate text-[14.5px] font-semibold text-[#1C1B19] sm:text-[15.5px]">
                  {s.section}
                </div>
                <div className="mt-0.5 text-[12.5px] text-[#6F6B61] sm:truncate">
                  {s.from} · {s.qs} questions
                </div>
              </div>
              <div className="shrink-0 text-[14px] font-semibold tabular-nums text-[#1C1B19]">
                {s.marks}
                <span className="ml-1 text-[12.5px] font-normal text-[#6F6B61]">
                  marks
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-[#E8EAED] pt-4">
          {[
            { n: `${PAPER_TOTALS.qs}`, l: "questions" },
            { n: `${PAPER_TOTALS.marks}`, l: "marks" },
            { n: "45m", l: "on the clock" },
            { n: "Thu", l: "after Zuhr" },
          ].map((t) => (
            <div key={t.l} className="flex items-baseline gap-1.5">
              <span className="font-sans font-bold text-[18px] leading-none tabular-nums text-[#1C1B19]">
                {t.n}
              </span>
              <span className="text-[13px] text-[#6F6B61]">{t.l}</span>
            </div>
          ))}
        </div>

        {/* Exam mode — a genuine switch */}
        <div className="mt-5 rounded-xl border border-[#E8EAED] p-3.5 sm:p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[14px] font-semibold text-[#1C1B19]">
              Exam mode
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={examMode}
              aria-label="Exam mode"
              onClick={() => setExamMode((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                examMode ? "bg-[var(--accent)]" : "bg-[#DADCE0]"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left] duration-150 ${
                  examMode ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#6F6B61]">
            {examMode
              ? "Nothing is marked right or wrong while they work. They answer, they submit, and the marks come back."
              : "Students see each answer as they go. Good for a practice run, not for a mock."}
          </p>
        </div>
      </div>

      {/* what comes back */}
      <div className="min-w-0 rounded-2xl bg-[#F8F9FA] p-4 sm:p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
          When it comes back
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-sans font-bold text-[30px] leading-none tabular-nums tracking-tight text-[#1C1B19]">
            {RESULT_AVG}%
          </span>
          <span className="text-[13px] text-[#6F6B61]">
            average mark &middot; 8 of 24 shown
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-3 border-b border-[#E8EAED] pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6F6B61]">
            <span className="min-w-0 flex-1">Pupil</span>
            <span className="w-[58px] shrink-0 text-right">Mark</span>
            <span className="w-[42px] shrink-0 text-right">%</span>
          </div>

          {RESULTS.map((r) => {
            const pct = Math.round((r.mark / PAPER_TOTALS.marks) * 100);
            return (
              <div
                key={r.name}
                className="flex items-center gap-3 border-b border-[#F1F3F4] py-2 last:border-b-0"
              >
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-[#1C1B19]">
                  {r.name}
                </span>
                <span className="w-[58px] shrink-0 text-right text-[13px] tabular-nums text-[#6F6B61]">
                  {r.mark}/{PAPER_TOTALS.marks}
                </span>
                <span
                  className={`w-[42px] shrink-0 text-right text-[13px] font-semibold tabular-nums ${
                    pct < 50 ? "text-[#C5221F]" : "text-[#1C1B19]"
                  }`}
                >
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-[12.5px] leading-relaxed text-[#6F6B61]">
          The bottom of the list is the point. Build next week&apos;s set from
          the questions those names lost, without leaving the page.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- mamulat */

const MAMULAT = [
  { name: "Adhkar after every salah", note: "Morning and evening too" },
  { name: "One page of Quran", note: "Anywhere in the day" },
  { name: "Durood, 100 a day", note: "Counted in the app" },
  { name: "Surah al-Mulk before sleeping", note: "Nightly" },
];

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const WEEK = [
  { who: "Suhayb", kept: [true, true, true, true, false, true, true] },
  { who: "Talha", kept: [true, true, false, false, false, false, false] },
  { who: "Ammar", kept: [true, true, true, true, true, true, true] },
];

function MamulatView() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-7">
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
          The daily list · Year 3B
        </div>

        <div className="mt-3">
          {MAMULAT.map((m) => (
            <div
              key={m.name}
              className="border-b border-[#F1F3F4] py-3 last:border-b-0"
            >
              <div className="text-[14.5px] font-semibold text-[#1C1B19] sm:text-[15.5px]">
                {m.name}
              </div>
              <div className="mt-0.5 text-[12.5px] text-[#6F6B61]">
                {m.note}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[12.5px] leading-relaxed text-[#6F6B61]">
          Mamulat are the acts a student keeps to every day outside class. Set
          the list once for the year and it sits in every student&apos;s day. A
          student can add their own on top; you only ever see the ones you set.
        </p>
      </div>

      {/* what comes back */}
      <div className="min-w-0 rounded-2xl bg-[#F8F9FA] p-4 sm:p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
          This week
        </div>

        <div className="mt-3.5" aria-hidden="true">
          <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] items-center gap-x-1.5 gap-y-2 sm:gap-x-2">
            <span />
            {DAYS.map((d, i) => (
              <span
                key={i}
                className="text-center text-[11px] font-medium text-[#6F6B61]"
              >
                {d}
              </span>
            ))}

            {WEEK.map((r) => (
              <Row key={r.who} who={r.who} kept={r.kept} />
            ))}
          </div>
        </div>

        <p className="mt-4 text-[12.5px] leading-relaxed text-[#6F6B61]">
          Talha kept the list for two days and stopped. You see that on the
          Wednesday, not at the end of term.
        </p>
      </div>
    </div>
  );
}

function Row({ who, kept }: { who: string; kept: boolean[] }) {
  return (
    <>
      <span className="pr-1.5 text-[12.5px] text-[#1C1B19]">{who}</span>
      {kept.map((k, i) => (
        <span
          key={i}
          className="mx-auto h-5 w-5 rounded-[6px] sm:h-[22px] sm:w-[22px]"
          style={{ background: k ? "#1E8E3E" : "#E8EAED" }}
        />
      ))}
    </>
  );
}
