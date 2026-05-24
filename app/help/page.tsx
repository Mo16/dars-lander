import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Answers to common questions about Dars — subscriptions, accounts, content, study features, and how to reach the team.",
  alternates: { canonical: "/help" },
};

type Category = {
  icon: React.ReactNode;
  title: string;
  blurb: string;
  topics: { q: string; a: React.ReactNode }[];
};

export default function HelpPage() {
  const categories: Category[] = [
    {
      icon: <IconRocket />,
      title: "Getting started",
      blurb: "Set up your account, pick books, learn the daily loop.",
      topics: [
        {
          q: "What does Dars actually do?",
          a: (
            <>
              <p>
                Dars is a study companion for Alimiyyah students. You pick the
                books on your syllabus, and we generate spaced-repetition
                flashcards, AI-graded short answers, sentence-lab practice for
                Arabic, and exam papers — all mapped to the exact chapters
                your teacher is covering.
              </p>
              <p>
                The daily loop is simple: open the app, finish your due cards,
                tackle today&apos;s sentence lab or quiz. Ten minutes is
                usually enough to keep memory warm.
              </p>
            </>
          ),
        },
        {
          q: "How do I add the books I’m studying?",
          a: (
            <>
              <p>
                During onboarding you select your year, madhab, and current
                books. You can change these at any time from{" "}
                <strong>Profile → My syllabus</strong>. Adding a book
                immediately unlocks its flashcards, sentence lab, and exam
                papers.
              </p>
            </>
          ),
        },
        {
          q: "Do I need to be online to use Dars?",
          a: (
            <p>
              No. Once a book is downloaded, flashcards, notes, and revision
              work offline. The AI tutor and content marketplace need an
              internet connection.
            </p>
          ),
        },
      ],
    },
    {
      icon: <IconCard />,
      title: "Subscriptions & billing",
      blurb: "Pro plan, cancellations, refunds, restoring purchases.",
      topics: [
        {
          q: "What’s the difference between Free and Pro?",
          a: (
            <>
              <p>
                Free covers the daily revision loop on three books at a time —
                more than enough to keep a year ticking over. Pro unlocks
                unlimited books, the full AI tutor, sentence lab on every
                book, exam paper packs, and offline downloads of newer
                editions.
              </p>
              <p>
                You can try Pro on a free trial; you&apos;ll only be charged
                if you don&apos;t cancel before it ends.
              </p>
            </>
          ),
        },
        {
          q: "How do I cancel my subscription?",
          a: (
            <>
              <p>
                Subscriptions are billed by Apple or Google, so cancellation
                has to be done through them — Dars cannot cancel for you.
              </p>
              <ul>
                <li>
                  <strong>iPhone / iPad:</strong> Settings → your name (top of
                  screen) → Subscriptions → Dars → Cancel.
                </li>
                <li>
                  <strong>Android:</strong> Play Store app → your profile →
                  Payments &amp; subscriptions → Subscriptions → Dars →
                  Cancel.
                </li>
              </ul>
              <p>
                Cancellation takes effect at the end of the current billing
                period — you keep Pro features until then.
              </p>
            </>
          ),
        },
        {
          q: "How do I get a refund?",
          a: (
            <>
              <p>Refunds are also handled by Apple or Google.</p>
              <ul>
                <li>
                  <strong>Apple:</strong>{" "}
                  <a
                    href="https://reportaproblem.apple.com"
                    target="_blank"
                    rel="noopener"
                  >
                    reportaproblem.apple.com
                  </a>{" "}
                  — sign in, find the Dars charge, choose &ldquo;Request a
                  refund&rdquo;.
                </li>
                <li>
                  <strong>Google:</strong>{" "}
                  <a
                    href="https://support.google.com/googleplay/answer/2479637"
                    target="_blank"
                    rel="noopener"
                  >
                    support.google.com — refund a Google Play purchase
                  </a>
                  .
                </li>
              </ul>
              <p>
                If you think you were charged in error, email{" "}
                <a href="mailto:support@darsapp.com">support@darsapp.com</a>{" "}
                with your receipt and we&apos;ll do what we can to help.
              </p>
            </>
          ),
        },
        {
          q: "I switched phones — how do I get Pro back?",
          a: (
            <p>
              Open the app and go to{" "}
              <strong>Profile → Restore purchases</strong>. Make sure
              you&apos;re signed in to the same Apple ID or Google account
              that bought the subscription.
            </p>
          ),
        },
      ],
    },
    {
      icon: <IconUser />,
      title: "Account & data",
      blurb: "Sign-in, deleting your account, exports, safeguarding.",
      topics: [
        {
          q: "How do I delete my account?",
          a: (
            <p>
              Open the app, go to{" "}
              <strong>Profile → Delete account</strong>, and confirm. This
              permanently removes your profile, study history, notes, decks,
              AI conversations, and any marketplace listings you&apos;ve
              published — we can&apos;t undo it. If you&apos;d like a copy of
              your data first, email{" "}
              <a href="mailto:support@darsapp.com">support@darsapp.com</a> and
              we&apos;ll send an export.
            </p>
          ),
        },
        {
          q: "Can I change my email address?",
          a: (
            <p>
              Yes — open <strong>Profile → Account</strong> and tap your
              email. We&apos;ll send a confirmation link to the new address.
              If you no longer have access to your old email, email us and
              we&apos;ll verify another way.
            </p>
          ),
        },
        {
          q: "I’m a parent of a student under 16",
          a: (
            <p>
              If your child uses Dars and you&apos;d like to review their
              account or have it deleted, email{" "}
              <a href="mailto:support@darsapp.com">support@darsapp.com</a>{" "}
              from the parent email address on file (or any address you can
              verify ownership of) and we&apos;ll help. UK safeguarding and
              GDPR apply.
            </p>
          ),
        },
        {
          q: "Where is my data stored?",
          a: (
            <p>
              On encrypted servers in the EU and UK. See our{" "}
              <Link href="/privacy">privacy policy</Link> for the full
              picture.
            </p>
          ),
        },
      ],
    },
    {
      icon: <IconBook />,
      title: "Books & content",
      blurb: "Syllabus mapping, reporting issues, contributing.",
      topics: [
        {
          q: "My book or chapter isn’t in the app",
          a: (
            <>
              <p>
                We&apos;re adding books in priority of how many students need
                them. If yours is missing, email{" "}
                <a href="mailto:support@darsapp.com">support@darsapp.com</a>{" "}
                with the book name, author, edition, and your madrasah — that
                helps us prioritise.
              </p>
              <p>
                If you&apos;d like to contribute content directly, we have a{" "}
                <Link href="/contribute">contributor programme</Link> for
                students and teachers.
              </p>
            </>
          ),
        },
        {
          q: "I found content that’s wrong or breaks the rules",
          a: (
            <p>
              Email{" "}
              <a href="mailto:support@darsapp.com">support@darsapp.com</a>{" "}
              with a screenshot, the book or marketplace listing name, and a
              short note on what&apos;s wrong. For copyright concerns, please
              include a way for us to contact the rights holder. We act
              quickly.
            </p>
          ),
        },
        {
          q: "How do you handle differences between madhabs?",
          a: (
            <p>
              Each user picks their madhab in onboarding. Rulings and
              examples follow that madhab&apos;s books first; where scholars
              within the madhab differ, we present positions neutrally. We
              never give a personal fatwa — your teacher is the one for that.
            </p>
          ),
        },
      ],
    },
    {
      icon: <IconSpark />,
      title: "Revision, sentence lab & AI",
      blurb: "How features work and how to get the most from them.",
      topics: [
        {
          q: "How does the spaced repetition work?",
          a: (
            <p>
              Dars uses a variant of the SM-2 algorithm — cards you find easy
              come back less often, cards you fail come back tomorrow.
              You&apos;ll see your due count on the dashboard each morning.
              The goal is short, daily sessions, not long marathon ones.
            </p>
          ),
        },
        {
          q: "What is Sentence Lab?",
          a: (
            <p>
              An interactive way to practise reading classical Arabic
              sentences. You tap on words to see their root, grammar, and
              translation; you can drag tokens to rebuild a sentence; and we
              quiz you on the meaning afterwards. It works on every book and
              every subject in the app.
            </p>
          ),
        },
        {
          q: "Can the AI tutor replace my teacher?",
          a: (
            <p>
              No — and we&apos;d be uncomfortable if it tried. The AI tutor
              helps you understand a passage you&apos;re stuck on, generate
              practice questions, or rephrase something a different way. For
              personal rulings and serious clarification, your teacher is
              irreplaceable.
            </p>
          ),
        },
      ],
    },
    {
      icon: <IconBug />,
      title: "Bugs & troubleshooting",
      blurb: "When something doesn’t work right.",
      topics: [
        {
          q: "The app crashes or freezes",
          a: (
            <>
              <p>First, try the boring fixes — they usually work:</p>
              <ul>
                <li>Force-close the app and reopen it.</li>
                <li>Restart your phone.</li>
                <li>
                  Make sure you&apos;re on the latest version from the App
                  Store or Play Store.
                </li>
              </ul>
              <p>
                If it still crashes, email us a bug report with the details
                below.
              </p>
            </>
          ),
        },
        {
          q: "My progress didn’t sync between devices",
          a: (
            <p>
              Pull-to-refresh on the dashboard forces a sync. If progress is
              still missing, sign out and back in on the device that&apos;s
              missing data. If both devices were offline and edited the same
              card, the most recent edit wins.
            </p>
          ),
        },
        {
          q: "What should I include in a bug report?",
          a: (
            <>
              <p>The most helpful bug reports include:</p>
              <ul>
                <li>What you were doing when it happened.</li>
                <li>
                  Your device and OS version (Settings → General → About on
                  iOS; Settings → About phone on Android).
                </li>
                <li>The Dars version (Profile → bottom of the page).</li>
                <li>A screenshot or screen recording, if you can.</li>
              </ul>
              <p>
                Send it to{" "}
                <a href="mailto:support@darsapp.com">support@darsapp.com</a>.
              </p>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-cream-100">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 mb-10 sm:mb-14 group"
        >
          <Image
            src="/assets/img/logo.png"
            alt="Dars"
            width={32}
            height={32}
            priority
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-soft"
          />
          <span className="font-display text-[18px] sm:text-[19px] font-semibold tracking-tight text-ink">
            Dars
          </span>
        </Link>

        <header className="mb-10 sm:mb-14">
          <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-coral-500 mb-3">
            ◆ Help Center
          </p>
          <h1 className="font-display text-[36px] sm:text-[52px] leading-[1.04] tracking-tight font-medium text-ink mb-4 text-balance">
            How can we{" "}
            <em className="font-display italic text-coral-500 font-normal">
              help?
            </em>
          </h1>
          <p className="text-[15px] sm:text-[17px] leading-[1.65] text-ink-soft text-pretty max-w-2xl">
            Answers to the questions students ask us most. Can&apos;t find
            what you need? Email{" "}
            <a
              href="mailto:support@darsapp.com"
              className="text-coral-500 underline underline-offset-2 hover:text-coral-600"
            >
              support@darsapp.com
            </a>{" "}
            — we read every message and reply within a working day or two.
          </p>
        </header>

        {/* Quick contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 sm:mb-16">
          <a
            href="mailto:support@darsapp.com"
            className="group flex items-start gap-3.5 p-5 rounded-2xl bg-card border border-border hover:border-coral-300 hover:shadow-soft transition-all"
          >
            <div className="shrink-0 w-10 h-10 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
              <IconMail />
            </div>
            <div className="min-w-0">
              <div className="font-display text-[17px] font-semibold text-ink mb-0.5">
                Email support
              </div>
              <div className="text-[13px] text-ink-muted leading-snug">
                support@darsapp.com — usually replies within a day
              </div>
            </div>
          </a>
          <Link
            href="/contribute"
            className="group flex items-start gap-3.5 p-5 rounded-2xl bg-card border border-border hover:border-coral-300 hover:shadow-soft transition-all"
          >
            <div className="shrink-0 w-10 h-10 rounded-xl bg-sky-100 text-ink flex items-center justify-center">
              <IconPen />
            </div>
            <div className="min-w-0">
              <div className="font-display text-[17px] font-semibold text-ink mb-0.5">
                Contribute content
              </div>
              <div className="text-[13px] text-ink-muted leading-snug">
                Add a book, edit a chapter, or write questions
              </div>
            </div>
          </Link>
        </div>

        {/* Categories */}
        <div className="space-y-12 sm:space-y-16">
          {categories.map((cat) => (
            <section key={cat.title}>
              <div className="flex items-start gap-3.5 mb-6 sm:mb-7">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
                  {cat.icon}
                </div>
                <div className="min-w-0 pt-0.5">
                  <h2 className="font-display text-[22px] sm:text-[26px] font-medium tracking-tight text-ink leading-tight">
                    {cat.title}
                  </h2>
                  <p className="text-[14px] text-ink-muted mt-1">
                    {cat.blurb}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-card border border-border overflow-hidden">
                {cat.topics.map((topic, i) => (
                  <details
                    key={topic.q}
                    className={`group ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 sm:py-5 hover:bg-cream-50 transition-colors">
                      <span className="font-display text-[16px] sm:text-[17px] font-semibold text-ink leading-snug">
                        {topic.q}
                      </span>
                      <span className="shrink-0 w-7 h-7 rounded-full bg-cream-200 text-ink-muted flex items-center justify-center transition-transform group-open:rotate-45">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5 sm:pb-6 -mt-1">
                      <Prose>{topic.a}</Prose>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still need help */}
        <section className="mt-16 sm:mt-20 rounded-2xl bg-ink text-cream-100 px-6 py-8 sm:px-10 sm:py-10">
          <h2 className="font-display text-[22px] sm:text-[26px] font-medium tracking-tight mb-3">
            Still need a hand?
          </h2>
          <p className="text-[15px] leading-[1.65] text-cream-200/90 mb-6 max-w-xl">
            We&apos;re a small team and we read every email. Tell us what
            you&apos;re studying, what you&apos;re trying to do, and where
            you&apos;re stuck — we&apos;ll help.
          </p>
          <a
            href="mailto:support@darsapp.com"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-coral-500 text-white font-medium text-[15px] shadow-coral hover:bg-coral-600 transition-colors"
          >
            Email support@darsapp.com
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </section>

        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <Link href="/support" className="hover:text-ink">
              Support
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        text-[14.5px] sm:text-[15px] leading-[1.7] text-ink-soft text-pretty
        [&_p]:mb-3.5 [&_p:last-child]:mb-0
        [&_ul]:mb-3.5 [&_ul:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:mb-1.5
        [&_a]:text-coral-500 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-coral-600
        [&_strong]:text-ink [&_strong]:font-semibold
      "
    >
      {children}
    </div>
  );
}

/* ─── icons ─── */
function IconRocket() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
function IconCard() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconBug() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 2 6 4M16 2l2 2M9 21l-2-2M15 21l2-2M3 9l3 3-3 3M21 9l-3 3 3 3" />
      <rect x="7" y="6" width="10" height="14" rx="5" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}
function IconPen() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}
