import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import SmartLink from "./smart-link";

// Halaqah-accent palette mirror of the in-app halaqahAccents map. The
// preview RPC returns the stored hex (the saturated `color` field) so we
// match on that, then fall back to coral if the colour is missing or
// unrecognised. Keeps the marketing surface visually in sync with the
// chip the inviter picked when creating the halaqah.
const ACCENT_PALETTE: Record<
  string,
  { color: string; deep: string; soft: string; onSoft: string; label: string }
> = {
  "#A6BB69": { color: "#A6BB69", deep: "#2F4A2B", soft: "#F0F6DC", onSoft: "#4F6A2E", label: "sage" },
  "#F0513F": { color: "#F0513F", deep: "#5C1F17", soft: "#FDE5E0", onSoft: "#8E2B1E", label: "coral" },
  "#6BA6BA": { color: "#6BA6BA", deep: "#2B4D5E", soft: "#E8F2F5", onSoft: "#3E6B7B", label: "sky" },
  "#C9A84C": { color: "#C9A84C", deep: "#4A3912", soft: "#FBF4DF", onSoft: "#8A6E21", label: "gold" },
  "#1C1D1D": { color: "#1C1D1D", deep: "#000000", soft: "#EDE7D9", onSoft: "#2C2D2D", label: "charcoal" },
};
const DEFAULT_ACCENT = ACCENT_PALETTE["#F0513F"];

type Preview = {
  id: string;
  name: string;
  description: string;
  accent_color: string | null;
  pinned_subject: string | null;
  member_cap: number;
  member_count: number;
  owner_name: string | null;
  is_full: boolean;
};

// Normalise: upper-case, drop dashes and the legacy `DARS-` prefix.
// Accept any length the RPC will recognise (it normalises again).
function normaliseCode(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/^DARS-/, "")
    .replace(/-/g, "");
}

async function fetchPreview(code: string): Promise<Preview | null> {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Anon key is fine here — peek_halaqah_by_code is granted to anon and
  // only returns public-safe preview fields.
  const key =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });
  const { data, error } = await supabase.rpc("peek_halaqah_by_code", { p_code: code });
  if (error || !data) return null;
  const row = Array.isArray(data) ? data[0] : data;
  return row ?? null;
}

// Generate Open Graph + Twitter metadata so the link unfurls nicely in
// iMessage, WhatsApp, etc. Falls back to a generic preview if the code
// doesn't resolve (we don't want to 404 the unfurl bot).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code: rawCode } = await params;
  const code = normaliseCode(rawCode);
  const preview = await fetchPreview(code);
  const title = preview
    ? `Join "${preview.name}" on Dars`
    : "Join a halaqah on Dars";
  const description = preview?.description
    ? preview.description
    : "Open the link in Dars to preview this study circle and join.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function HalaqahJoinPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: rawCode } = await params;
  const code = normaliseCode(rawCode);

  // Allow legacy 4-char and new 6-char codes (and anything in between
  // up to 8 alnum) — the server is the source of truth, this is just a
  // cheap upfront sanity check.
  if (!/^[A-Z0-9]{4,8}$/.test(code)) notFound();

  const preview = await fetchPreview(code);
  const accent = preview?.accent_color
    ? ACCENT_PALETTE[preview.accent_color.toUpperCase()] ?? DEFAULT_ACCENT
    : DEFAULT_ACCENT;

  // App-scheme deep link — the Dars iOS / Android app registers `dars://`
  // as its scheme (see app.config.ts), so this URL pops the join screen
  // with the code pre-filled. The SmartLink component on the page tries
  // to open this automatically on mobile and falls back to App Store /
  // Play Store badges if the app isn't installed.
  const deepLink = `dars://halaqah/join?code=${encodeURIComponent(code)}`;

  return (
    <main className="min-h-screen bg-cream-100 text-ink">
      <SmartLink deepLink={deepLink} />

      {/* Top bar — minimal logo / brand row. Keeps the page feeling
          like part of the marketing site, not a one-off landing. */}
      <header className="mx-auto flex w-full max-w-xl items-center justify-between px-6 pt-8">
        <Link href="/" className="flex items-center gap-2 text-ink font-semibold">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white"
            style={{ background: DEFAULT_ACCENT.color }}
          >
            D
          </span>
          <span className="text-base">Dars</span>
        </Link>
        <Link
          href="/"
          className="text-sm text-ink-muted hover:text-ink transition-colors"
        >
          About
        </Link>
      </header>

      <section className="mx-auto w-full max-w-xl px-6 pb-16 pt-10">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: accent.onSoft }}
        >
          You've been invited
        </p>

        {/* Accent hero — saturated tile with name, description, and
            stat pills, echoing the in-app preview card. */}
        <div
          className="relative overflow-hidden rounded-3xl p-7 text-white"
          style={{ background: accent.color }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold tracking-[0.16em]">
            HALAQAH
          </div>
          <h1
            className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-instrument), Georgia, serif" }}
          >
            {preview?.name ?? "Dars halaqah invite"}
          </h1>
          {preview?.description ? (
            <p className="mt-3 text-white/85 text-[15px] leading-relaxed">
              {preview.description}
            </p>
          ) : !preview ? (
            <p className="mt-3 text-white/85 text-[15px] leading-relaxed">
              We couldn't find a halaqah with this code, but you can still
              open Dars to enter the invite code by hand.
            </p>
          ) : null}

          {preview ? (
            <div className="mt-6 flex flex-wrap gap-2">
              <StatPill
                label={`${preview.member_count} / ${preview.member_cap} members`}
              />
              {preview.owner_name ? (
                <StatPill label={`Led by ${preview.owner_name}`} />
              ) : null}
              <StatPill label={`Code · ${code}`} />
            </div>
          ) : null}
        </div>

        {/* Primary CTA — kicks the deep link by hand, in case the
            automatic redirect in SmartLink was blocked by the browser
            (some in-app browsers swallow `window.location` assignments
            to custom schemes). */}
        <a
          href={deepLink}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white transition-transform active:scale-[0.99]"
          style={{ background: accent.color }}
        >
          Open in Dars
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m13 5 7 7-7 7" />
          </svg>
        </a>

        {/* Manual fallback — the invite code, big and copyable, in case
            the user is on a desktop or the deep link doesn't fire. */}
        <div className="mt-3 rounded-2xl bg-card p-5 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            Invite code
          </p>
          <p
            className="mt-1 select-all font-semibold tracking-[0.35em] text-ink"
            style={{ fontSize: 28 }}
          >
            {code}
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            Open Dars and tap "Join halaqah", then enter this code.
          </p>
        </div>

        {/* Don't have the app yet? Store badges. */}
        <div className="mt-8 rounded-2xl border border-border bg-white/60 p-5">
          <p className="text-sm font-semibold text-ink">Don't have Dars yet?</p>
          <p className="mt-1 text-sm text-ink-muted">
            Dars is the revision app for Alimiyyah students — re-read, drill
            flashcards, and study with your halaqah. Once you install it, this
            link will take you straight to the join screen.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com/app/dars"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.darsapp.app"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Google Play
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/22 px-3 py-1 text-[12px] font-medium text-white">
      {label}
    </span>
  );
}
