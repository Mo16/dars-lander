import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import PreferencesForm, { type Prefs } from "./preferences-form";

export const dynamic = "force-dynamic";

// A preference page must never be indexed: the URL contains the token that
// identifies the contact.
export const metadata: Metadata = {
  title: "Email preferences · Dars",
  robots: { index: false, follow: false },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Row = {
  email: string;
  marketing: boolean;
  product_updates: boolean;
  weekly_report: boolean;
  streak_nudges: boolean;
  unsubscribed_all: boolean;
};

async function loadPrefs(token: string): Promise<Row | null> {
  if (!UUID.test(token)) return null;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase.rpc("email_prefs_read", { p_token: token });
  if (error) {
    console.error("email_prefs_read failed", error);
    return null;
  }
  const row = Array.isArray(data) ? data[0] : data;
  return (row as Row) ?? null;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-cream-100 px-4 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[560px]">
        {/* Same mark, same width as the email this link came from, so the page
            reads as a continuation of it rather than a different site. */}
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

export default async function EmailPreferencesPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const row = await loadPrefs(token);

  if (!row) {
    return (
      <Shell>
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
      </Shell>
    );
  }

  const initial: Prefs = {
    marketing: row.marketing,
    product_updates: row.product_updates,
    weekly_report: row.weekly_report,
    streak_nudges: row.streak_nudges,
  };

  return (
    <Shell>
      <PreferencesForm
        token={token}
        email={row.email}
        initial={initial}
        initiallyUnsubscribed={row.unsubscribed_all}
      />
    </Shell>
  );
}
