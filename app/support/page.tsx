import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get in touch with the Dars team — we read every email.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-cream-100">
      <div className="mx-auto max-w-2xl px-5 py-10 sm:py-16">
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

        <header className="mb-9 sm:mb-12">
          <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-coral-500 mb-3">
            ◆ Support
          </p>
          <h1 className="font-display text-[36px] sm:text-[48px] leading-[1.04] tracking-tight font-medium text-ink mb-4 text-balance">
            We&apos;re{" "}
            <em className="font-display italic text-coral-500 font-normal">
              here.
            </em>
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-ink-soft text-pretty max-w-xl">
            Bug? Question? Feature you&apos;d like to see? Email us at{" "}
            <a
              href="mailto:support@darsapp.com"
              className="text-coral-500 underline underline-offset-2 hover:text-coral-600"
            >
              support@darsapp.com
            </a>{" "}
            — we read every message and reply within a working day or two.
          </p>
        </header>

        <section className="mb-10">
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

        <Prose>
          <H2>Common questions</H2>

          <H3>How do I cancel my subscription?</H3>
          <p>
            Subscriptions are billed by Apple or Google, so cancellation has
            to be done through them — Dars cannot cancel for you.
          </p>
          <ul>
            <li>
              <strong>iPhone / iPad:</strong> Settings → your name (top of
              screen) → Subscriptions → Dars → Cancel.
            </li>
            <li>
              <strong>Android:</strong> Play Store app → your profile →
              Payments &amp; subscriptions → Subscriptions → Dars → Cancel.
            </li>
          </ul>
          <p>
            Cancellation takes effect at the end of the current billing
            period. You keep Pro features until then.
          </p>

          <H3>How do I get a refund?</H3>
          <p>
            Refunds are also handled by Apple or Google.
          </p>
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
            If you think you were charged in error, email us at{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>{" "}
            with your order receipt and we&apos;ll do what we can to help.
          </p>

          <H3>How do I delete my account?</H3>
          <p>
            Open the app, go to <strong>Profile → Delete account</strong>,
            and confirm. This permanently removes your profile, study
            history, notes, decks, AI conversations, and any marketplace
            listings you&apos;ve published. We can&apos;t undo it. If
            you&apos;d also like a copy of your data before you delete,
            email us first and we&apos;ll send an export.
          </p>

          <H3>I found content that&apos;s wrong or breaks the rules</H3>
          <p>
            Email{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>{" "}
            with a screenshot, the book or marketplace listing name, and a
            short note on what&apos;s wrong. For copyright concerns, please
            include a way for us to contact the rights holder. We act
            quickly.
          </p>

          <H3>I&apos;m a parent of a student under 16</H3>
          <p>
            If your child uses Dars and you&apos;d like to review their
            account or have it deleted, email{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>{" "}
            from the parent email address on file (or any address you can
            verify ownership of) and we&apos;ll help.
          </p>

          <H3>Bug reports</H3>
          <p>
            The most helpful bug reports include:
          </p>
          <ul>
            <li>What you were doing when it happened.</li>
            <li>
              Your device and OS version (Settings → General → About on
              iOS; Settings → About phone on Android).
            </li>
            <li>The Dars version (Profile → bottom of the page).</li>
            <li>A screenshot or screen recording, if you can.</li>
          </ul>
        </Prose>

        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink-muted">
            <Link href="/" className="hover:text-ink">
              Home
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
        text-[15px] sm:text-[16px] leading-[1.7] text-ink-soft text-pretty
        [&_p]:mb-5
        [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:mb-2
        [&_a]:text-coral-500 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-coral-600
        [&_strong]:text-ink [&_strong]:font-semibold
      "
    >
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[22px] sm:text-[26px] font-medium tracking-tight text-ink mt-10 mb-4">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-[17px] sm:text-[18px] font-semibold tracking-tight text-ink mt-7 mb-3">
      {children}
    </h3>
  );
}
