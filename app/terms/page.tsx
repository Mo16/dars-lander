import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Dars app and website.",
  alternates: { canonical: "/terms" },
};

const lastUpdated = "6 May 2026";

export default function TermsPage() {
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
            ◆ Terms
          </p>
          <h1 className="font-display text-[36px] sm:text-[48px] leading-[1.04] tracking-tight font-medium text-ink mb-4 text-balance">
            Terms of{" "}
            <em className="font-display italic text-coral-500 font-normal">
              Service
            </em>
          </h1>
          <p className="text-[14px] text-ink-muted">
            Last updated {lastUpdated}
          </p>
        </header>

        <Prose>
          <p>
            These terms set out the agreement between you and Dars when you
            use the Dars mobile app or the website at darsapp.com
            (together, the &ldquo;Service&rdquo;). By creating an account or
            using the Service, you agree to these terms. If you don&apos;t
            agree, please don&apos;t use the Service.
          </p>

          <H2>1. The Service</H2>
          <p>
            Dars is a revision app for Alimiyyah students. It includes
            spaced-repetition flashcards, structured curriculum content,
            mock exams, an AI tutor (&ldquo;Abdullah&rdquo;), notes, study
            groups (Halaqahs), and a marketplace for student-created study
            materials. We add and remove features over time. We may also
            change, suspend, or stop parts of the Service if we have to.
          </p>

          <H2>2. Eligibility and accounts</H2>
          <ul>
            <li>
              You must be at least 11 years old to create a Dars account.
              If you are under 16 in the UK or EU, you confirm that a parent
              or guardian has agreed for you to use the Service.
            </li>
            <li>
              You&apos;re responsible for keeping your sign-in details
              secure and for everything done from your account. Tell us
              straight away if you think it&apos;s been compromised.
            </li>
            <li>
              You agree to give accurate information when you sign up and
              to keep it up to date.
            </li>
            <li>
              One account per person. Don&apos;t share your account with
              someone else, sell it, or transfer it.
            </li>
          </ul>

          <H2>3. Subscriptions, trials, and billing</H2>
          <p>
            Dars offers a free tier and a paid tier (&ldquo;Dars
            Pro&rdquo;), available as a monthly or annual subscription, plus
            optional credit top-ups for the AI tutor.
          </p>
          <ul>
            <li>
              <strong>Trial:</strong> if a free trial is offered, you
              won&apos;t be charged during the trial period. Your
              subscription auto-renews at the end of the trial unless you
              cancel before then.
            </li>
            <li>
              <strong>Auto-renewal:</strong> subscriptions renew
              automatically at the end of each billing period at the
              then-current price unless you cancel.
            </li>
            <li>
              <strong>Cancellation:</strong> you can cancel any time from
              your Apple ID or Google Play subscription settings — Dars
              cannot cancel an Apple or Google subscription on your behalf.
              Cancellation takes effect at the end of the current billing
              period.
            </li>
            <li>
              <strong>Refunds:</strong> all payments are processed by
              Apple or Google. Refund requests must be made through them
              under their refund policies. Dars does not issue refunds
              directly. Where required by consumer law (for example, the
              UK 14-day right to cancel a digital subscription before the
              service has been used), the statutory right applies.
            </li>
            <li>
              <strong>Price changes:</strong> we may change subscription
              prices. We&apos;ll give you reasonable notice and you can
              cancel before the new price takes effect.
            </li>
          </ul>

          <H2>4. The AI tutor</H2>
          <p>
            The AI tutor (&ldquo;Abdullah&rdquo;) helps you understand and
            revise the curriculum. It is a study aid, not a mufti and not a
            replacement for your teacher.
          </p>
          <ul>
            <li>
              The tutor can be wrong. Verify anything important against
              your books and confirm rulings with a qualified scholar.
            </li>
            <li>
              We do not present AI output as a fatwā, and you agree not
              to act on it as one.
            </li>
            <li>
              Conversations are sent to AI providers (currently Anthropic
              and OpenAI) under their enterprise terms. They process the
              text only to generate a response and don&apos;t use it to
              train their models. See our{" "}
              <Link href="/privacy">Privacy Policy</Link> for details.
            </li>
          </ul>

          <H2>5. Content in the app</H2>
          <p>
            Dars includes classical Islamic texts (most of which are in the
            public domain) and modern editions, translations, and study
            aids that we license or create. You get a personal,
            non-transferable, revocable licence to access this content
            through the Service. You may not copy, redistribute, sell, or
            create derivative works from it, except as the law expressly
            allows.
          </p>

          <H2>6. Your content</H2>
          <p>
            You may create notes, custom flashcard decks, and other
            material inside Dars. You may also publish material to the
            community marketplace.
          </p>
          <ul>
            <li>
              <strong>Ownership.</strong> You keep ownership of what you
              create.
            </li>
            <li>
              <strong>Licence to us.</strong> So we can run the Service,
              you grant Dars a worldwide, non-exclusive, royalty-free
              licence to host, store, and display your content to you and
              (if you publish to the marketplace) to the audience you
              choose. The licence ends when you delete the content,
              except where we need to keep a copy to comply with law or
              defend legal claims.
            </li>
            <li>
              <strong>Marketplace.</strong> When you publish to the
              marketplace, you also grant other Dars users a licence to
              download and use your content within the Service for their
              own study. They may not redistribute it outside Dars.
            </li>
            <li>
              <strong>Your warranties.</strong> You confirm you have the
              right to share what you upload, that it doesn&apos;t
              infringe anyone else&apos;s rights, and that it follows
              the rules in the next section.
            </li>
            <li>
              <strong>Moderation.</strong> Marketplace submissions are
              reviewed before they go live. We may reject, hide, or
              remove content that breaks these terms.
            </li>
          </ul>

          <H2>7. Acceptable use</H2>
          <p>
            Don&apos;t use Dars to:
          </p>
          <ul>
            <li>
              Upload or share content that is unlawful, hateful, abusive,
              sexual, deceptive, or that infringes intellectual property
              or privacy rights.
            </li>
            <li>
              Misrepresent classical Islamic texts, fabricate hadith
              chains, or claim positions as scholarly consensus when they
              aren&apos;t.
            </li>
            <li>
              Harass, bully, or threaten other users, including in
              Halaqahs, duels, or marketplace comments.
            </li>
            <li>
              Reverse-engineer, scrape, or attempt to bypass usage limits
              or access controls.
            </li>
            <li>
              Use automated systems (bots, scripts) to interact with the
              Service except for accessibility tools you yourself rely on.
            </li>
            <li>
              Use the AI tutor to generate content that is unlawful or
              that you intend to misrepresent as a scholar&apos;s ruling.
            </li>
          </ul>
          <p>
            We may suspend or terminate your account if you break these
            rules.
          </p>

          <H2>8. Intellectual property</H2>
          <p>
            Dars, the Dars name and logo, the design of the app, the
            curriculum mapping, and our original copy are owned by us and
            our licensors. Nothing in these terms transfers ownership of
            any of that to you. If you think your copyright has been
            infringed by content on Dars, email{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>{" "}
            with details and we&apos;ll act promptly.
          </p>

          <H2>9. Suspension and termination</H2>
          <p>
            You can stop using the Service and delete your account from
            inside the app at any time (Profile → Delete account).
            Deleting your account ends this agreement; the sections that
            should reasonably survive (intellectual property, disclaimers,
            limitation of liability, governing law) remain in force.
          </p>
          <p>
            We may suspend or terminate your access if you break these
            terms, if your account is being used to harm other users, or
            if we&apos;re required to by law. We&apos;ll tell you why
            unless we&apos;re legally prevented from doing so.
          </p>

          <H2>10. Disclaimers</H2>
          <p>
            The Service is provided &ldquo;as is&rdquo;. We work hard to
            keep it accurate and available, but we don&apos;t guarantee
            that it will be error-free, uninterrupted, or that any
            specific result will be achieved (for example, that you will
            pass an exam). The AI tutor is a study aid, not legal,
            medical, or scholarly advice.
          </p>
          <p>
            Nothing in these terms limits any rights you have under
            consumer law that cannot lawfully be limited.
          </p>

          <H2>11. Limitation of liability</H2>
          <p>
            To the maximum extent permitted by law, Dars is not liable for
            indirect or consequential losses, lost profits, lost data
            (beyond restoring your account from our backups), or losses
            we couldn&apos;t reasonably have foreseen. Our total liability
            for any claim arising out of the Service is limited to the
            greater of (a) the amount you paid Dars in the 12 months
            before the event giving rise to the claim, or (b) £100. None
            of this excludes liability for fraud, death or personal injury
            caused by our negligence, or any other liability that
            cannot be excluded by law.
          </p>

          <H2>12. Changes to these terms</H2>
          <p>
            We may update these terms from time to time. If we make
            material changes, we&apos;ll update the &ldquo;Last
            updated&rdquo; date and, where the change is significant,
            notify you in-app or by email before it takes effect.
            Continuing to use the Service after a change means you accept
            the new terms.
          </p>

          <H2>13. Governing law</H2>
          <p>
            These terms are governed by the laws of England and Wales.
            The courts of England and Wales have exclusive jurisdiction
            over any dispute, except that consumers resident elsewhere in
            the UK or EU may bring proceedings in their local courts as
            permitted by law.
          </p>

          <H2>14. Contact</H2>
          <p>
            Questions about these terms:{" "}
            <a href="mailto:support@darsapp.com">support@darsapp.com</a>.
          </p>
        </Prose>

        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
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
