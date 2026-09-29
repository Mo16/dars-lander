import Link from "next/link";

/**
 * The frame both consent pages sit in. Shared so the unsubscribe confirmation
 * and the preference centre cannot drift apart: they are two steps of one
 * errand, reached from the same footer, and a reader who moves between them
 * should not feel they have changed site.
 *
 * Same mark and same 560px measure as the email the link came from, so the
 * page reads as a continuation of it.
 */
export default function EmailShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-cream-100 px-4 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[560px]">
        <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/logo.png"
            alt=""
            width={30}
            height={30}
            className="h-[30px] w-[30px] rounded-lg"
          />
          <span className="text-[18px] font-semibold tracking-tight text-ink">Dars</span>
        </Link>
        {children}
        <p className="mt-8 text-[13px] leading-relaxed text-ink-muted">
          Need a hand?{" "}
          <Link href="/support" className="text-ink underline underline-offset-2 hover:text-coral-600">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

/**
 * Shown when a token does not resolve. Both pages need the identical wording,
 * because both are reached by the same expired link.
 */
export function ExpiredLink() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
      <h1 className="font-display text-[28px] leading-tight tracking-tight text-ink">
        This link has expired.
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        We couldn&rsquo;t find the preferences this link points to. It may have been
        replaced by a newer email, or the address may already have been removed.
      </p>
      <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
        Open the unsubscribe link in the most recent email we sent you, or reply to
        any Dars email and we&rsquo;ll sort it out by hand.
      </p>
    </div>
  );
}
