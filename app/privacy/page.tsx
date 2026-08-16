import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Dars collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const lastUpdated = "16 August 2026";

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

          <H3>Account and profile</H3>
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
              Your age band (under 13, 13&ndash;17, or 18+). We use this to
              apply the child-safety protections described under{" "}
              <strong>Children and young people</strong> below.
            </li>
            <li>
              Optional profile fields you choose to provide: chosen username,
              avatar style or a profile photo you upload, study pathway, year
              level, madhab, syllabus preferences, daily-minutes goal,
              preferred study time, and language.
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
              you&apos;ve read, marked, or bookmarked; flashcard review state and
              ratings; study session length and outcomes; quiz, challenge and
              mock-exam results; streaks, levels and achievements.
            </li>
            <li>Notes you write inside the app.</li>
            <li>
              Custom flashcard decks and study materials you create or import.
            </li>
            <li>
              Resources listings you publish, including the title,
              description, and content of any deck or PDF you upload.
            </li>
          </ul>

          <H3>Photos and documents you provide</H3>
          <p>
            The AI deck builder lets you photograph a page of your notes, pick
            an image from your photo library, or attach a PDF, and turns it
            into flashcards. The file is uploaded to our private storage,
            processed as described under <strong>AI features</strong> below,
            and kept against your deck until you delete it or your account. We
            only ever read the specific file you pick — we do not scan or index
            your photo library. A profile photo you upload is stored separately
            and is visible to other users on your public profile.
          </p>

          <H3>Lesson recordings and transcripts</H3>
          <p>
            The Lessons feature lets you record a live class so it can be
            transcribed and turned into revision material. This is entirely
            opt-in: nothing is recorded unless you start a recording, and the
            app shows a clear recording indicator throughout. Recording
            continues while your screen is locked or you are in another app,
            which is why Dars declares background audio use.
          </p>
          <p>When you record a lesson we collect:</p>
          <ul>
            <li>
              The audio captured from your device&apos;s microphone, uploaded
              in chunks to our private storage.
            </li>
            <li>
              The resulting transcript, plus the title, summary, key points and
              flashcards generated from it.
            </li>
            <li>
              Recording metadata: duration, timestamps, language, and which
              book or chapter you filed the lesson under.
            </li>
          </ul>
          <p>
            Audio is sent to our transcription and AI providers (listed under{" "}
            <strong>Who we share it with</strong>) purely to produce the
            transcript and summary. You are responsible for having permission
            to record your class — please ask your teacher first.
          </p>

          <H3>AI features</H3>
          <p>
            Dars uses AI in three places: the &ldquo;Abdullah&rdquo; tutor, the
            AI deck builder, and lesson transcription and summarising. In each
            case your input — your message, your uploaded photo or PDF, or your
            lesson audio and transcript — is sent to the AI provider handling
            that feature, along with a small amount of relevant curriculum
            context, and the result is stored on our servers so it persists
            across your devices.
          </p>
          <p>
            Our AI providers are contractually bound to process your content
            only to return a result to us. They do not use it to train their
            models. Our current providers, and what each one receives, are
            listed under <strong>Who we share it with</strong>.
          </p>

          <H3>Community features</H3>
          <p>
            Dars has optional social features: halaqahs (study circles),
            friends, duels, leaderboards, an activity feed, and public
            profiles. If you use them we collect and store the content and
            connections they involve — halaqah names and descriptions, your
            membership and role, messages and posts you write, challenge and
            duel results, and your friend list. What other users can see is set
            out under <strong>What other people can see</strong> below.
          </p>

          <H3>Safety reports and blocks</H3>
          <p>
            If you report a piece of content or a user, we store the report,
            the reason you gave, any note you added, what was reported, and
            your account identifier, so we can investigate and act on it. If
            you block someone, we store that block. Reports may be retained
            after the reported content is removed so we can enforce our rules
            against repeat behaviour.
          </p>

          <H3>Bug reports</H3>
          <p>
            If you send a bug report from inside the app, we store your
            description, the technical state of the app at the time, and — only
            if you choose to attach one — a screenshot of the screen you were
            on. Screenshots go to private storage and are only opened by us
            while investigating your report.
          </p>

          <H3>Subscriptions and purchases</H3>
          <p>
            If you subscribe to Dars Plus or buy an AI top-up, the actual
            payment is processed by Apple (App Store) or Google (Play Store).
            We do not receive your card details. We do receive, via our
            subscription provider RevenueCat, a record of your subscription
            status, product identifier, renewal date, and a customer identifier
            linked to your Dars account so we can grant or revoke paid
            features. We also keep a ledger of your AI credit usage.
          </p>

          <H3>Device, analytics and diagnostics</H3>
          <ul>
            <li>
              Product analytics via PostHog (hosted in the EU): which screens
              you open and which features you use. These events are linked to
              your user identifier, and to your email address if you are 13 or
              over, so we can understand real usage patterns and debug
              account-specific problems. Analytics are switched off entirely
              for accounts under 13.
            </li>
            <li>
              Crash reports and error diagnostics via Sentry. These carry your
              user identifier and the technical context of the error, so we can
              reproduce the bug. Your email address is attached only if you are
              13 or over.
            </li>
            <li>
              Push-notification tokens (if you grant permission) so we can send
              study reminders and notify you about activity in your halaqahs.
            </li>
            <li>
              Standard technical information any app or website receives:
              device model, operating system version, app version, IP address
              of the request, language, and timezone. Our over-the-air update
              service (Expo) receives this when your app checks for an update.
            </li>
          </ul>
          <p>
            Dars does <strong>not</strong> track you across other companies&apos;
            apps or websites, and does not use the advertising identifier.
          </p>

          <H2>Device permissions we ask for</H2>
          <p>
            Every permission below is requested in context, at the moment you
            first use the feature that needs it, and you can decline or later
            revoke any of them in your device settings. Declining only disables
            that one feature — the rest of Dars works normally.
          </p>
          <ul>
            <li>
              <strong>Microphone</strong> — to record a lesson when you tap
              record in the Lessons tab. Used for nothing else. Recording
              continues in the background so it survives the screen locking.
            </li>
            <li>
              <strong>Camera</strong> — to photograph a page of your notes for
              the AI deck builder, or to take a profile photo.
            </li>
            <li>
              <strong>Photo library</strong> — to let you pick an existing
              image of your notes, or a profile photo. We receive only the
              images you select.
            </li>
            <li>
              <strong>Notifications</strong> — to send study reminders and
              halaqah activity alerts. Entirely optional.
            </li>
            <li>
              <strong>Files</strong> — to let you attach a PDF you choose to
              the AI deck builder or to a Resources listing.
            </li>
          </ul>

          <H2>How we use it, and our legal basis</H2>
          <ul>
            <li>
              <strong>To run the app</strong> — sync your progress across
              devices, generate revision material, transcribe the lessons you
              record, and operate the community features you opt into.{" "}
              <em>Legal basis: performance of our contract with you.</em>
            </li>
            <li>
              <strong>To grant features matched to your subscription tier.</strong>{" "}
              <em>Legal basis: performance of our contract with you.</em>
            </li>
            <li>
              <strong>To keep Dars safe</strong> — moderate content, act on
              reports, enforce blocks, and prevent abuse.{" "}
              <em>
                Legal basis: our legitimate interest in a safe service, and our
                safeguarding obligations to younger users.
              </em>
            </li>
            <li>
              <strong>To improve the app</strong> — fix bugs (Sentry),
              understand which features people use (PostHog), and respond to
              support requests.{" "}
              <em>Legal basis: our legitimate interest in improving Dars.</em>
            </li>
            <li>
              <strong>To send study reminders and notifications</strong> you
              have opted into. <em>Legal basis: your consent.</em>
            </li>
            <li>
              <strong>To meet legal obligations</strong> — tax, accounting, and
              responding to lawful requests.{" "}
              <em>Legal basis: compliance with a legal obligation.</em>
            </li>
          </ul>
          <p>
            We do <strong>not</strong> sell your personal information, we do not
            share it for cross-context behavioural advertising, and we do not
            run third-party advertising in the app.
          </p>

          <H2>Who we share it with</H2>
          <p>
            We use a small number of vendors (&ldquo;processors&rdquo;) to run
            Dars. Each only gets the data it needs to do its job, and is
            bound by a written data-processing agreement.
          </p>
          <ul>
            <li>
              <strong>Supabase</strong> — authentication (sign-up, sign-in,
              password and OAuth handling), primary database, and file storage
              for your account, study state, notes, decks, uploads, lesson
              audio, and resources.
            </li>
            <li>
              <strong>RevenueCat</strong> — subscription management and
              receipt validation.
            </li>
            <li>
              <strong>Anthropic</strong> — generates AI tutor replies, and
              reads the photo or PDF you submit to the AI deck builder in order
              to produce flashcards.
            </li>
            <li>
              <strong>Soniox</strong> — transcribes lesson audio. Your
              recording is streamed to Soniox as you record, so the live
              transcript appears word by word, and the completed audio is sent
              for a final pass.
            </li>
            <li>
              <strong>Google (Gemini API)</strong> — turns a finished lesson
              transcript into a title, summary, key points and flashcards.
              Receives the transcript text, not your identity.
            </li>
            <li>
              <strong>OpenAI</strong> — generates the search embeddings that
              let the AI tutor find relevant passages in your syllabus, and
              acts as our fallback transcription provider if Soniox is
              unavailable.
            </li>
            <li>
              <strong>PostHog</strong> — product analytics, hosted in the EU.
            </li>
            <li>
              <strong>Sentry</strong> — crash reporting.
            </li>
            <li>
              <strong>Expo</strong> — delivers over-the-air app updates.
            </li>
            <li>
              <strong>Apple, Google, Resend</strong> — for in-app purchases,
              push notifications, and transactional email respectively.
            </li>
          </ul>
          <p>
            We may also disclose information where we are legally required to,
            or where it is necessary to protect the safety of a user — for
            example a credible safeguarding concern about a young person.
          </p>

          <H2>What other people can see</H2>
          <p>
            Most of what Dars stores is private to you. The exceptions are the
            things you deliberately publish:
          </p>
          <ul>
            <li>
              <strong>Your public profile</strong> — username, display name,
              avatar or profile photo, level, streak and achievements are
              visible to other users who find your profile, and on leaderboards
              you appear in.
            </li>
            <li>
              <strong>Halaqahs</strong> — other members see your name, avatar
              and study activity within that circle, and anything you post
              there.
            </li>
            <li>
              <strong>Resources listings</strong> — public once reviewed and
              approved by us, shown alongside your name.
            </li>
            <li>
              <strong>Lessons and decks you share</strong> — visible to whoever
              you share them with: a halaqah, a book or chapter, or the public
              Resources area if you choose that.
            </li>
          </ul>
          <p>
            Your notes, private decks, AI tutor conversations, unshared lesson
            recordings and transcripts, and your account details are never
            shown to other users. Social features are hidden by default for
            users under 16.
          </p>

          <H2>Stored on your device</H2>
          <p>
            Dars keeps a local copy of your library, flashcards and progress on
            your device so it works offline, and stores your sign-in token in
            the device&apos;s secure keystore (iOS Keychain / Android
            Keystore). Lesson audio is held on the device until it has uploaded.
            Deleting the app removes all of this local data.
          </p>

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
              AI tutor conversations, AI deck builder uploads, lesson
              recordings and their transcripts: kept while your account exists,
              or until you delete the individual item. Deleted when you delete
              your account.
            </li>
            <li>
              Bug-report screenshots: deleted once the report is resolved, and
              in any case when you delete your account.
            </li>
            <li>
              Safety reports and block records: kept for up to 2 years after
              the report is closed, so we can act on repeat behaviour.
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
              Profile → Delete account, or do it on the web at{" "}
              <a href="/delete-account">darsapp.com/delete-account</a>. This
              permanently erases your profile, study history, notes, decks, AI
              conversations, lesson recordings and transcripts, uploads, and
              any resources listings you&apos;ve published.
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
            <li>
              <strong>Withdraw consent</strong> — turn off notifications, or
              revoke the microphone, camera or photo permissions, in your
              device settings at any time.
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

          <H2>Children and young people</H2>
          <p>
            Dars is intended for Alimiyyah students aged 11 and older. Children
            under 13 should only use Dars with the involvement of a parent,
            guardian, or madrasah. For users under 16 in the UK or EU, we may
            ask for a parent or guardian email address at sign-up.
          </p>
          <p>Accounts we know to be under 13 are treated differently:</p>
          <ul>
            <li>
              Third-party product analytics are switched off completely — no
              events are sent at all.
            </li>
            <li>
              No email address is attached to crash reports; only an
              anonymous account identifier is.
            </li>
            <li>
              Social features — friends, duels, leaderboards and public
              profiles — are hidden. This applies to all users under 16.
            </li>
          </ul>
          <p>
            Until an account&apos;s age is known, we apply these protections by
            default. Parents who want to review, correct or delete their
            child&apos;s account can email{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a> and we
            will respond within 30 days.
          </p>

          <H2>Content moderation</H2>
          <p>
            Anything you publish where other users can see it passes an
            automatic filter before it is stored, and Resources listings are
            reviewed by a person before they go public. Every shared surface
            carries a report action, every profile carries report and block,
            and AI answers carry a flag. Reports are reviewed within 24 hours.
            Blocking is reversible at Profile → Blocked accounts.
          </p>

          <H2>Security</H2>
          <p>
            All traffic between the app and our servers is encrypted in
            transit (HTTPS/TLS). Your account is protected by your sign-in
            method (Apple, Google, email + 6-digit code, or email + password,
            handled by Supabase), and your session token is held in your
            device&apos;s secure keystore. Database access is
            row-level-restricted so other users cannot read your private data,
            and lesson audio, deck uploads and bug screenshots live in private
            storage that is not publicly readable. No system is perfectly
            secure — if you spot a vulnerability, please email{" "}
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
        [&_em]:italic [&_em]:text-ink-muted
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
