import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Dars collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const lastUpdated = "6 May 2026";

export default function PrivacyPage() {
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

        <header className="mb-9 sm:mb-12">
          <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-coral-500 mb-3">
            ◆ Privacy
          </p>
          <h1 className="font-display text-[36px] sm:text-[48px] leading-[1.04] tracking-tight font-medium text-ink mb-4 text-balance">
            Privacy{" "}
            <em className="font-display italic text-coral-500 font-normal">
              Policy
            </em>
          </h1>
          <p className="text-[14px] text-ink-muted">
            Last updated {lastUpdated}
          </p>
        </header>

        <Prose>
          <p>
            This policy explains what personal information Dars collects, why
            we collect it, who we share it with, and the rights you have over
            it. We&apos;ve tried to write it in plain English. If anything is
            unclear, email us at{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>.
          </p>

          <H2>Who we are</H2>
          <p>
            Dars (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the operator of the
            Dars mobile app and the website at darsapp.com. We are the data
            controller for the personal information described below. You can
            reach us at{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>.
          </p>

          <H2>What we collect</H2>
          <p>
            We collect only what we need to run the app. The categories below
            are exhaustive — we don&apos;t collect anything else.
          </p>

          <H3>Account information</H3>
          <ul>
            <li>
              Your email address and display name, supplied when you sign up.
            </li>
            <li>
              If you sign in with Apple or Google, the identifier that
              provider returns to us (we don&apos;t see your Apple/Google
              password).
            </li>
            <li>
              Optional profile fields you choose to provide: chosen username,
              avatar style, study pathway, year level, madhab, syllabus
              preferences, daily-minutes goal, preferred study time, and
              language.
            </li>
            <li>
              For students under 16, a parent or guardian email address may be
              collected at sign-up so we can comply with UK GDPR safeguarding
              requirements.
            </li>
          </ul>

          <H3>Study activity</H3>
          <ul>
            <li>
              Your progress through the curriculum: which books and chapters
              you&apos;ve read, marked, or starred; flashcard review state and
              ratings; study session length and outcomes; mock-exam results;
              streaks and achievements.
            </li>
            <li>Notes you write inside the app.</li>
            <li>
              Custom flashcard decks and study materials you create or import.
            </li>
            <li>
              Marketplace listings you publish, including the title,
              description, and content of any deck or PDF you upload.
            </li>
          </ul>

          <H3>AI tutor (&ldquo;Abdullah&rdquo;) conversations</H3>
          <p>
            When you message the in-app AI tutor, we store your messages and
            the AI&apos;s responses on our servers so the conversation
            persists across devices. To produce replies, your message and a
            small amount of relevant curriculum context are sent to our AI
            providers — currently Anthropic and OpenAI — under their
            enterprise terms. They process the text only to generate a
            response and do not use it to train their models.
          </p>

          <H3>Subscriptions and purchases</H3>
          <p>
            If you subscribe to Dars Pro or buy a top-up, the actual payment
            is processed by Apple (App Store) or Google (Play Store). We do
            not receive your card details. We do receive, via our subscription
            provider RevenueCat, a record of your subscription status,
            product identifier, renewal date, and an anonymous customer
            identifier so we can grant or revoke Pro features.
          </p>

          <H3>Device and analytics</H3>
          <ul>
            <li>
              Anonymous product analytics (which screens you open, which
              features you use) via PostHog. We don&apos;t use this to
              identify individuals.
            </li>
            <li>
              Crash reports and error diagnostics via Sentry. These include
              your user identifier so we can reproduce the bug, plus the
              technical context of the error.
            </li>
            <li>
              Push-notification tokens (if you grant permission) so we can
              send study reminders.
            </li>
            <li>
              Standard technical information any app or website receives:
              device model, operating system version, app version, IP address
              of the request, language, and timezone.
            </li>
          </ul>

          <H2>How we use it</H2>
          <ul>
            <li>To run the app and sync your progress across devices.</li>
            <li>To grant features matched to your subscription tier.</li>
            <li>
              To improve the app: fix bugs (Sentry), understand which
              features people use (PostHog), and respond to support requests.
            </li>
            <li>
              To send study reminders and notifications you&apos;ve opted into.
            </li>
            <li>
              To meet legal obligations (tax, accounting, responding to
              lawful requests).
            </li>
          </ul>
          <p>
            We do <strong>not</strong> sell your personal information. We do
            not run third-party advertising in the app.
          </p>

          <H2>Who we share it with</H2>
          <p>
            We use a small number of vendors (&ldquo;processors&rdquo;) to run
            Dars. Each only gets the data it needs to do its job, and is
            bound by a written data-processing agreement.
          </p>
          <ul>
            <li>
              <strong>Clerk</strong> — authentication (sign-up, sign-in,
              password and OAuth handling).
            </li>
            <li>
              <strong>Supabase</strong> — primary database and file storage
              for your account, study state, notes, decks, and marketplace
              uploads.
            </li>
            <li>
              <strong>RevenueCat</strong> — subscription management and
              receipt validation.
            </li>
            <li>
              <strong>Anthropic and OpenAI</strong> — generation of AI tutor
              replies. They process inputs only to produce outputs and do not
              train on your data.
            </li>
            <li>
              <strong>PostHog</strong> — product analytics, hosted in the
              EU.
            </li>
            <li>
              <strong>Sentry</strong> — crash reporting.
            </li>
            <li>
              <strong>Apple, Google, Resend</strong> — for in-app purchases,
              push notifications, and transactional email respectively.
            </li>
          </ul>

          <H2>International transfers</H2>
          <p>
            Some of the providers above are based in the United States. Where
            personal information is transferred outside the UK or EU, we rely
            on the UK International Data Transfer Agreement, the EU Standard
            Contractual Clauses, or an adequacy decision, depending on the
            recipient.
          </p>

          <H2>How long we keep it</H2>
          <ul>
            <li>
              Account, study activity, notes, and decks: kept while your
              account exists. Deleted when you delete your account.
            </li>
            <li>
              AI tutor conversations: kept while your account exists. Deleted
              when you delete your account.
            </li>
            <li>
              Crash reports: 90 days, then automatically purged by Sentry.
            </li>
            <li>
              Analytics events: 12 months, then anonymised or purged by
              PostHog.
            </li>
            <li>
              Subscription and payment records: kept for 7 years where
              required for tax and accounting law.
            </li>
          </ul>

          <H2>Your rights</H2>
          <p>
            Under the UK GDPR you have the right to access, correct, port,
            and erase your personal information, to object to or restrict its
            processing, and to withdraw consent where we rely on it. You can
            exercise most of these from inside the app:
          </p>
          <ul>
            <li>
              <strong>Delete your account</strong> — in the app, go to
              Profile → Delete account. This permanently erases your profile,
              study history, notes, decks, AI conversations, and any
              marketplace listings you&apos;ve published.
            </li>
            <li>
              <strong>Get a copy of your data</strong> — email us at{" "}
              <a href="mailto:support@darsapp.com">support@darsapp.com</a> and
              we&apos;ll send an export within 30 days.
            </li>
            <li>
              <strong>Correct or restrict</strong> — most profile fields can
              be edited inside the app. For anything you can&apos;t edit
              there, email us.
            </li>
          </ul>
          <p>
            If you believe we&apos;ve handled your data unlawfully, you can
            complain to the UK Information Commissioner&apos;s Office at{" "}
            <a
              href="https://ico.org.uk/make-a-complaint/"
              target="_blank"
              rel="noopener"
            >
              ico.org.uk/make-a-complaint
            </a>
            . We&apos;d appreciate the chance to put it right first — email{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>.
          </p>

          <H2>Children</H2>
          <p>
            Dars is intended for Alimiyyah students aged 11 and older.
            Children under 13 should only use Dars with the involvement of a
            parent, guardian, or madrasah. For users under 16 in the UK or
            EU, we may ask for a parent or guardian email address at sign-up.
            Parents who want to review or delete their child&apos;s account
            can email{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>.
          </p>

          <H2>Security</H2>
          <p>
            All traffic between the app and our servers is encrypted in
            transit (HTTPS/TLS). Your account is protected by your sign-in
            method (Apple, Google, or email + password handled by Clerk).
            Database access is row-level-restricted so other users cannot
            read your private data. No system is perfectly secure — if you
            spot a vulnerability, please email{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>.
          </p>

          <H2>Changes to this policy</H2>
          <p>
            If we make material changes we&apos;ll update the &ldquo;Last
            updated&rdquo; date at the top of this page and, where the change
            is significant, notify you in-app or by email before the change
            takes effect.
          </p>

          <H2>Contact</H2>
          <p>
            Questions, requests, or complaints:{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>.
          </p>
        </Prose>

        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/support" className="hover:text-ink">
              Support
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
