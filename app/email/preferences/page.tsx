import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email preferences · Dars",
  robots: { index: false, follow: false },
};

// Reached when someone lands here without a token — a stripped link, a
// forwarded email, or a bookmark. We can't identify the contact from nothing,
// so the honest answer is "use the link in your email", plus a human path.
export default function EmailPreferencesFallback() {
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

        <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
          <h1 className="font-display text-[28px] leading-tight tracking-tight text-ink">
            We need to know who you are.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            Email preferences are tied to a private link, so this page can&rsquo;t tell which
            address to change on its own.
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
            Open any recent email from us and use the <span className="text-ink">Unsubscribe</span> or{" "}
            <span className="text-ink">Choose what we email you</span> link at the bottom. Or reply to
            it and we&rsquo;ll take care of it by hand.
          </p>
        </div>

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
