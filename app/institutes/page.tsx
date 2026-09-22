import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { darsOpenGraphImages, darsTwitterImages } from "@/lib/og-image";
import Register from "./register";
import SetWork from "./set-work";
import InstituteWaitlistForm from "./waitlist-form";

/* =========================================================================
   /institutes - Google Classroom house style, by request.

   This page deliberately uses the Google for Education design language: a
   white surface system with light grey section bands, a plain sticky nav, a
   centred hero stack, filled pill buttons, pill tabs and a feature row.

   The waitlist form sits in the HERO rather than in a section at the bottom —
   the page has exactly one ask, so it is the first thing you can act on, and
   there is only ever one of it on the page. #waitlist points at it.

   Google's blue is replaced by the Dars accent so the page still belongs to
   darsapp.com. The accent is defined once on <main> as a CSS custom
   property, so switching to Google blue (#1A73E8) is a one-line change.
   ========================================================================= */

const pageTitle = "Dars for institutes";
const pageDescription =
  "Bring a whole madrasah into Dars. One register for every class, teacher and student: who revised, who did not, and who needs a word before the exam. Join the institute waitlist.";
const pageUrl = "/institutes";

export const metadata: Metadata = {
  title: {
    absolute: "Dars for institutes: one register for the whole madrasah",
  },
  description: pageDescription,
  keywords: [
    "madrasah management",
    "Darul Uloom software",
    "Alimiyyah institute",
    "Islamic school platform",
    "class management",
    "madrasah register",
    "student progress tracking",
    "Dars for institutes",
  ],
  alternates: { canonical: pageUrl },
  // The site-wide card is this page's own artwork, so /institutes gets the
  // full-bleed treatment rather than a thumbnail.
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Dars",
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    images: darsOpenGraphImages,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: darsTwitterImages,
    creator: "@dars_app",
    site: "@dars_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

/* Two rows of three: what a teacher SETS across the top, what comes back
   underneath. Keep the count at six so neither row leaves an orphan. */
const FEATURES = [
  {
    title: "Set revision in minutes",
    body: "Build a set from the syllabus, write your own cards, or both. Give it a deadline and it lands in every student's app that evening.",
  },
  {
    title: "Set and mark exams",
    body: "Build a paper from the cards the class has been revising, or write your own questions. Nothing is marked right or wrong until it is submitted, and the results land in the same register.",
  },
  {
    title: "Set the daily mamulat",
    body: "Mamulat are the acts a student is meant to keep to every day outside class: adhkar after salah, a portion of Quran, durood. Set the list once and every student carries it.",
  },
  {
    title: "See who is keeping up",
    body: "A live register for every class: who revised, who did part of it, and who has not opened the app since Monday.",
  },
  {
    title: "See if it is sticking",
    body: "Students tick theirs off as they go. You get the same weekly view as the revision register: who has kept the whole list, and who quietly stopped on Tuesday.",
  },
  {
    title: "Works without wifi",
    body: "Sets download when a student opens the class. Revision, exams and quiz attempts queue on the device and sync when there is signal.",
  },
];

export default function InstitutesPage() {
  return (
    <main
      className="min-h-screen overflow-x-clip bg-white font-sans text-[#1C1B19]"
      style={
        {
          // Swap this one value for #1A73E8 to run Google blue instead.
          "--accent": "#D0451F",
          "--accent-hover": "#B63A16",
          // Accent text sits on white AND on the grey bands, so it is a
          // shade darker than the fill to clear AA on both.
          "--accent-text": "#BF3D19",
        } as React.CSSProperties
      }
    >
      <SiteNav />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="px-5 pb-10 pt-28 sm:px-6 sm:pt-32 lg:pb-12 lg:pt-36">
        <div className="mx-auto max-w-[1100px] text-center">
          {/* Product lockup, the way Google heads a product page */}
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/assets/img/logo.png"
              alt=""
              width={40}
              height={40}
              priority
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="text-[22px] font-medium tracking-tight text-[#5B584F] sm:text-[26px]">
              Dars <span className="text-[#1C1B19]">for Institutes</span>
            </span>
          </div>

          <h1 className="mx-auto mt-8 max-w-[14ch] text-[40px] font-bold leading-[1.08] tracking-[-0.02em] text-[#1C1B19] sm:max-w-[900px] sm:text-[58px] lg:text-[72px]">
            Where the whole madrasah comes together
          </h1>

          <p className="mx-auto mt-6 max-w-[62ch] text-[17px] leading-[1.6] text-[#5B584F] sm:text-[18px]">
            Dars helps madrasahs set revision, run their classes and see who is
            keeping up. Built for Alimiyyah institutes.
          </p>

          {/* The waitlist form lives IN the hero. The page has one ask, so the
              thing it asks for is the first thing you can act on, rather than a
              button that scrolls you to a form at the bottom. Every existing
              #waitlist link (the nav, anything off-page) still lands here. */}
          <div
            id="waitlist"
            className="mx-auto mt-10 max-w-[620px] scroll-mt-24 text-left"
          >
            <InstituteWaitlistForm />
          </div>
        </div>

        {/* Product shot */}
        <div className="mx-auto mt-14 max-w-[1000px] lg:mt-16">
          <Register />
          <p className="mx-auto mt-4 max-w-[70ch] text-center text-[13.5px] leading-relaxed text-[#6F6B61]">
            Each column is one student&apos;s share of that day&apos;s cards.
            Sunday is blank because nothing was set. Hover or tap a mark to read
            it.
          </p>
        </div>
      </section>

      {/* ================================================================
          FEATURES
          ================================================================ */}
      <section
        id="features"
        className="scroll-mt-24 px-5 sm:px-6 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-[28px] bg-[#F6F5F2] px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
            <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#5B584F]">
              Every madrasah
            </p>
            <h2 className="mt-4 max-w-[22ch] text-[30px] font-bold leading-[1.15] tracking-[-0.015em] text-[#1C1B19] sm:text-[40px]">
              Tools built for how a madrasah actually runs
            </h2>

            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
              {FEATURES.map((f) => (
                <div key={f.title}>
                  <h3 className="text-[19px] font-bold leading-snug tracking-tight text-[#1C1B19] sm:text-[20px]">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[#5B584F]">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          WHAT YOU SET
          ================================================================ */}
      <section id="set" className="scroll-mt-24 px-5 sm:px-6 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-[62ch] text-center">
            <h2 className="text-[30px] font-bold leading-[1.15] tracking-[-0.015em] text-[#1C1B19] sm:text-[40px]">
              What you set, and what comes back
            </h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-[#5B584F]">
              Revision, a paper, or the daily mamulat. Build it from the
              syllabus or write it yourself, and it is in every student&apos;s
              app that evening. What they do with it lands back in the same
              register.
            </p>
          </div>

          <div className="mt-10 lg:mt-12">
            <SetWork />
          </div>
        </div>
      </section>

      {/* ================================================================
          CLASSROOMS - the teacher with no institute behind them
          ================================================================ */}
      <section
        id="classrooms"
        className="scroll-mt-24 px-5 sm:px-6 pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#5B584F]">
            No institute needed
          </p>
          <h2 className="mt-4 max-w-[18ch] text-[30px] font-bold leading-[1.15] tracking-[-0.015em] text-[#1C1B19] sm:text-[40px]">
            Teaching a class of your own?
          </h2>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-[#5B584F]">
            You do not need a madrasah behind you to use any of this. A halaqah
            at the masjid, a few students at home, one class on a Sunday: make a
            classroom, share the code, and set the work.
          </p>

          {/* Two stages, each holding the real thing rather than a diagram of
              it. The card is clipped by the stage on purpose: it says the
              screen carries on past the frame. Nothing that has to be read is
              inside the crop. */}
          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8 lg:mt-14 lg:gap-12">
            {SHOWCASE.map((item) => (
              <div key={item.title}>
                <div className="flex items-start justify-center overflow-hidden rounded-3xl bg-[#F1F3F4] px-5 py-9 sm:h-[400px] sm:px-8 sm:pb-0 sm:pt-10">
                  <div className="w-full max-w-[360px]">{item.visual}</div>
                </div>
                <h3 className="mt-6 text-[20px] font-bold tracking-tight text-[#1C1B19]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.6] text-[#5B584F]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

/* ------------------------------------------------------------ classrooms */

/** The classroom itself: what a teacher shares, and who is in it. */
function ClassroomCard() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(60,64,67,0.10),0_4px_12px_-4px_rgba(60,64,67,0.14)]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
        Your classroom
      </div>
      <div className="mt-1.5 text-[19px] font-bold tracking-tight text-[#1C1B19]">
        Nur al-Idah &middot; Tuesdays
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#F8F9FA] px-4 py-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
            Join code
          </div>
          <div className="mt-0.5 text-[19px] font-semibold tracking-[0.12em] tabular-nums text-[#1C1B19]">
            7K4 2QD
          </div>
        </div>
        <div className="text-right">
          <div className="text-[19px] font-semibold tabular-nums text-[#1C1B19]">
            9
          </div>
          <div className="text-[12px] text-[#6F6B61]">students</div>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {["Yusuf Ahmed", "Bilal Patel", "Zakariyya Hussain", "Ibrahim Mota"].map(
          (n) => (
          <div
            key={n}
            className="flex items-center justify-between gap-3 border-b border-[#F1F3F4] pb-2.5 last:border-b-0"
          >
            <span className="truncate text-[13.5px] text-[#1C1B19]">{n}</span>
            <span className="shrink-0 text-[12px] text-[#6F6B61]">joined</span>
          </div>
          ),
        )}
      </div>
    </div>
  );
}

/** The work, and who has actually done it. */
function SetCard() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(60,64,67,0.10),0_4px_12px_-4px_rgba(60,64,67,0.14)]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
        The set
      </div>
      <div className="mt-1.5 text-[19px] font-bold tracking-tight text-[#1C1B19]">
        Taharah, week 3
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#F8F9FA] px-4 py-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6F6B61]">
            Due
          </div>
          <div className="mt-0.5 text-[19px] font-semibold tracking-tight text-[#1C1B19]">
            Thursday
          </div>
        </div>
        <div className="text-right">
          <div className="text-[19px] font-semibold tabular-nums text-[#1C1B19]">
            6
          </div>
          <div className="text-[12px] text-[#6F6B61]">of 9 done</div>
        </div>
      </div>

      <div className="mt-4 space-y-3.5">
        {[
          { who: "Yusuf Ahmed", pct: 100 },
          { who: "Bilal Patel", pct: 62 },
          { who: "Zakariyya Hussain", pct: 0 },
        ].map((r) => (
          <div key={r.who} className="flex items-center gap-3">
            <span className="w-[132px] shrink-0 truncate text-[13.5px] text-[#1C1B19]">
              {r.who}
            </span>
            <span className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#F1F3F4]">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${r.pct}%`,
                  background: r.pct >= 70 ? "#1E8E3E" : "#F9AB00",
                }}
              />
            </span>
            <span className="w-9 shrink-0 text-right text-[12.5px] tabular-nums text-[#6F6B61]">
              {r.pct}%
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 border-t border-[#F1F3F4] pt-3 text-[12.5px] leading-relaxed text-[#6F6B61]">
        Zakariyya has not opened it. You know that on the Wednesday, not after
        the exam.
      </p>
    </div>
  );
}

const SHOWCASE = [
  {
    title: "Your classroom",
    body: "One code, shared once. Students join themselves and you approve each one, so nobody is in your class by accident.",
    visual: <ClassroomCard />,
  },
  {
    title: "The work you set",
    body: "Revision, a paper or the daily mamulat, with a deadline. See who did it, who half did it, and who has not opened it.",
    visual: <SetCard />,
  },
];

/* ======================================================================== */

function SiteNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#E8EAED] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between gap-4 px-6">
        <Link href="/" className="flex min-h-[44px] shrink-0 items-center gap-2.5">
          <Image
            src="/assets/img/logo.png"
            alt="Dars"
            width={32}
            height={32}
            priority
            className="h-7 w-7 rounded-md object-cover"
          />
          <span className="text-[17px] font-medium tracking-tight text-[#1C1B19]">
            Dars{" "}
            <span className="font-normal text-[#5B584F]">for Institutes</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-[14px] text-[#5B584F] md:flex">
          <a href="#features" className="inline-flex min-h-[40px] items-center px-2 transition-colors hover:text-[#1C1B19]">
            Features
          </a>
          <a href="#set" className="inline-flex min-h-[40px] items-center px-2 transition-colors hover:text-[#1C1B19]">
            How it works
          </a>
          <Link href="/" className="inline-flex min-h-[40px] items-center px-2 transition-colors hover:text-[#1C1B19]">
            For students
          </Link>
        </div>

        <a
          href="#waitlist"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Join the waitlist
        </a>
      </div>
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#E8EAED] bg-white px-6 py-12">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 text-center">
        <Link href="/" className="flex min-h-[44px] items-center gap-2.5">
          <Image
            src="/assets/img/logo.png"
            alt="Dars"
            width={32}
            height={32}
            className="h-7 w-7 rounded-md object-cover"
          />
          <span className="text-[17px] font-medium tracking-tight text-[#1C1B19]">
            Dars
          </span>
        </Link>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[14px] text-[#5B584F]">
          <Link href="/" className="inline-flex min-h-[40px] items-center px-2 transition-colors hover:text-[#1C1B19]">
            For students
          </Link>
          <Link
            href="/suggest-a-book"
            className="inline-flex min-h-[40px] items-center px-2 transition-colors hover:text-[#1C1B19]"
          >
            Suggest a book
          </Link>
          <Link href="/support" className="inline-flex min-h-[40px] items-center px-2 transition-colors hover:text-[#1C1B19]">
            Support
          </Link>
          <Link href="/privacy" className="inline-flex min-h-[40px] items-center px-2 transition-colors hover:text-[#1C1B19]">
            Privacy
          </Link>
          <Link href="/terms" className="inline-flex min-h-[40px] items-center px-2 transition-colors hover:text-[#1C1B19]">
            Terms
          </Link>
        </div>

        <p className="text-[13px] text-[#6F6B61]">
          &copy; {new Date().getFullYear()} Dars. Built for Alimiyyah students
          and the madrasahs that teach them.
        </p>
      </div>
    </footer>
  );
}
