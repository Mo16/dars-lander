"use client";

// Delete-account flow. Three stages:
//   1. Sign in with Clerk (email-code or password) — same Clerk
//      instance as the Expo app, so any account that exists in the
//      app can sign in here.
//   2. Confirm — user must type DELETE to enable the destroy button.
//   3. Result — success or error.
//
// The actual destruction happens server-side in the Supabase edge
// function `account-delete`, which cascades the wipe across Supabase
// + Clerk Backend API. We proxy the call through /api/delete-account
// so the browser never needs CORS access to *.functions.supabase.co.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, useUser, useClerk } from "@clerk/nextjs";
// Clerk v7 ships a new signals-based API by default; the legacy
// resource API we want (signIn.create → resource with status /
// createdSessionId) lives under /legacy.
import { useSignIn } from "@clerk/nextjs/legacy";

type Stage = "signin" | "confirm" | "done";
type Mode = "code" | "password";
type SignInStep = "identifier" | "code";

// Extracts the user-friendly error from a Clerk error blob, falling
// back to the raw message so the user always sees *something*.
function clerkError(err: unknown): string {
  const e = err as { errors?: { longMessage?: string; message?: string }[]; message?: string };
  return (
    e?.errors?.[0]?.longMessage ||
    e?.errors?.[0]?.message ||
    e?.message ||
    "Something went wrong. Please try again."
  );
}

export default function DeleteAccountFlow() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();

  // The "done" screen has to outlive the sign-out that runs right
  // after a successful deletion — otherwise `isSignedIn` flips to
  // false and the user gets bounced back to the sign-in form. Holding
  // the flag (and the deleted user's email) at the top of the tree
  // means the success copy stays put until the user navigates away.
  const [done, setDone] = useState<{ email: string } | null>(null);

  if (done) return <Frame><DonePanel email={done.email} /></Frame>;

  // Wait for Clerk to hydrate before deciding which stage to mount —
  // otherwise the sign-in form flashes for already-signed-in users.
  if (!authLoaded) return <Frame><CenteredSpinner /></Frame>;

  if (!isSignedIn) {
    return (
      <Frame>
        <SignInPanel />
      </Frame>
    );
  }

  return (
    <Frame>
      <ConfirmPanel onDone={(email) => setDone({ email })} />
    </Frame>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout chrome                                                              */
/* -------------------------------------------------------------------------- */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-30 bg-cream-100/85 backdrop-blur-xl border-b border-border/40">
        <div className="mx-auto w-full max-w-xl px-3 sm:px-5 h-14 flex items-center gap-2.5">
          <Link
            href="/"
            aria-label="Back to home"
            className="flex-none w-10 h-10 rounded-full hover:bg-cream-200 active:bg-cream-300 transition-colors flex items-center justify-center text-ink-soft"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M11 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0 text-center">
            <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-ink-muted truncate">
              Account deletion
            </p>
          </div>
          <Link
            href="/"
            aria-label="Dars home"
            className="flex-none flex items-center gap-1.5 px-2 h-10 rounded-full hover:bg-cream-200 transition-colors"
          >
            <Image
              src="/assets/img/logo.png"
              alt=""
              width={20}
              height={20}
              priority
              className="w-5 h-5 rounded-md"
            />
            <span className="text-[13px] font-semibold tracking-tight text-ink">
              Dars
            </span>
          </Link>
        </div>
      </header>

      <div className="flex-1 mx-auto w-full max-w-xl px-5 sm:px-7 pt-7 sm:pt-10 pb-16">
        {children}
      </div>
    </>
  );
}

function CenteredSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <Spinner />
    </div>
  );
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={`animate-[spin_0.8s_linear_infinite] ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ErrorMsg({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <p className="text-[12.5px] leading-[1.4] text-coral-600 mt-1.5 px-1">
      {message}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Stage 1 — sign in                                                          */
/* -------------------------------------------------------------------------- */

function SignInPanel() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [step, setStep] = useState<SignInStep>("identifier");
  const [mode, setMode] = useState<Mode>("code");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailReady = email.trim().length > 3 && email.includes("@");
  const passwordReady = password.length >= 8;

  const submitIdentifier = async () => {
    if (!isLoaded || !signIn || busy) return;
    if (!emailReady) return;
    if (mode === "password" && !passwordReady) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (mode === "code") {
        const si = await signIn.create({ identifier: email.trim() });
        const factor = si.supportedFirstFactors?.find(
          (f) => f.strategy === "email_code",
        ) as { strategy: "email_code"; emailAddressId: string } | undefined;
        if (!factor) {
          throw new Error(
            "Email-code sign-in is not enabled for this account. Try the password option.",
          );
        }
        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId: factor.emailAddressId,
        });
        setStep("code");
      } else {
        const res = await signIn.create({
          identifier: email.trim(),
          password,
        });
        if (res.status === "complete" && res.createdSessionId) {
          await setActive({ session: res.createdSessionId });
          return;
        }
        throw new Error("Sign-in incomplete. Try again.");
      }
    } catch (err) {
      setError(clerkError(err));
    } finally {
      setBusy(false);
    }
  };

  const submitCode = async () => {
    if (!isLoaded || !signIn || busy) return;
    if (code.trim().length < 4) return;
    setBusy(true);
    setError(null);
    try {
      const res = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: code.trim(),
      });
      if (res.status === "complete" && res.createdSessionId) {
        await setActive({ session: res.createdSessionId });
        return;
      }
      throw new Error("Verification incomplete. Try again.");
    } catch (err) {
      setError(clerkError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-coral-100/80 border border-coral-200/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-coral-500 animate-pulse-dot" />
            <span className="relative h-2 w-2 rounded-full bg-coral-500" />
          </span>
          <span className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-coral-600">
            Step 1 of 2 &middot; Sign in
          </span>
        </div>
        <h1 className="font-display text-[34px] sm:text-[42px] leading-[1.05] tracking-tight font-medium text-ink mb-3 text-balance">
          Delete your{" "}
          <em className="font-display italic text-coral-500 font-normal">
            Dars account.
          </em>
        </h1>
        <p className="text-[15px] sm:text-[16px] leading-[1.6] text-ink-soft max-w-lg">
          Sign in with the same email you use in the app. We&apos;ll then ask
          you to confirm before anything is removed.
        </p>
      </div>

      {step === "identifier" ? (
        <div className="rounded-3xl bg-cream-200/45 border border-border/40 p-5 sm:p-6 space-y-4">
          <ModeSwitch mode={mode} onChange={setMode} />

          <FieldLabel>Email</FieldLabel>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && mode === "code") submitIdentifier();
            }}
            placeholder="you@example.com"
            autoComplete="email"
            autoFocus
            className="w-full rounded-2xl border border-border bg-cream-50 px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-coral-400 focus:bg-white transition-colors"
          />

          {mode === "password" && (
            <>
              <FieldLabel>Password</FieldLabel>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitIdentifier();
                }}
                placeholder="At least 8 characters"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-border bg-cream-50 px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-coral-400 focus:bg-white transition-colors"
              />
            </>
          )}

          <ErrorMsg message={error} />

          <button
            type="button"
            onClick={submitIdentifier}
            disabled={!emailReady || (mode === "password" && !passwordReady) || busy}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-coral-500 hover:bg-coral-600 active:bg-coral-700 text-white text-[15.5px] font-semibold shadow-coral disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {busy ? (
              <>
                <Spinner className="text-white" />
                Just a sec&hellip;
              </>
            ) : (
              <>
                Continue
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="rounded-3xl bg-cream-200/45 border border-border/40 p-5 sm:p-6 space-y-4">
          <div>
            <p className="text-[13.5px] leading-[1.6] text-ink-soft">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-ink">{email.trim()}</span>.
              Enter it below.
            </p>
          </div>
          <FieldLabel>Verification code</FieldLabel>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitCode();
            }}
            placeholder="123456"
            autoFocus
            className="w-full rounded-2xl border border-border bg-cream-50 px-4 py-3.5 text-[18px] tabular-nums tracking-[0.4em] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-coral-400 focus:bg-white transition-colors"
          />

          <ErrorMsg message={error} />

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                setStep("identifier");
                setCode("");
                setError(null);
              }}
              className="px-5 py-3 rounded-full text-[14.5px] font-medium text-ink-soft hover:text-ink hover:bg-cream-200 transition-colors"
            >
              Use a different email
            </button>
            <button
              type="button"
              onClick={submitCode}
              disabled={code.trim().length < 4 || busy}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-coral-500 hover:bg-coral-600 active:bg-coral-700 text-white text-[15.5px] font-semibold shadow-coral disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {busy ? (
                <>
                  <Spinner className="text-white" />
                  Verifying&hellip;
                </>
              ) : (
                "Verify and continue"
              )}
            </button>
          </div>
        </div>
      )}

      <FootnoteCard />
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-ink-muted px-1">
      {children}
    </p>
  );
}

function ModeSwitch({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 p-1 bg-cream-50 border border-border rounded-2xl">
      {(["code", "password"] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          className={`px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-colors ${
            mode === m
              ? "bg-ink text-cream-50 shadow-soft"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {m === "code" ? "Email code" : "Password"}
        </button>
      ))}
    </div>
  );
}

function FootnoteCard() {
  return (
    <div className="rounded-2xl bg-cream-50/80 border border-border/70 px-5 py-4">
      <p className="text-[12.5px] leading-[1.55] text-ink-muted">
        Trouble signing in? You can also delete your account from inside the
        Dars app: Profile &rarr; Settings &rarr; Delete account.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stage 2 — confirm                                                          */
/* -------------------------------------------------------------------------- */

function ConfirmPanel({ onDone }: { onDone: (email: string) => void }) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { signOut } = useClerk();

  const [phrase, setPhrase] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = phrase.trim().toUpperCase() === "DELETE";

  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "";
  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    email.split("@")[0] ||
    "";

  const submit = async () => {
    if (!ready || busy) return;
    setBusy(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error("Please sign in again.");
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ confirm: "DELETE" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `Could not delete account (${res.status}).`);
      }
      // Hand the success state up to the parent BEFORE signing out —
      // otherwise the auth-state flip would unmount this tree before
      // the parent rerenders into the done view.
      onDone(email);
      try { await signOut(); } catch { /* ignore */ }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete account.");
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-coral-100/80 border border-coral-200/70">
          <span className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-coral-600">
            Step 2 of 2 &middot; Confirm
          </span>
        </div>
        <h1 className="font-display text-[34px] sm:text-[42px] leading-[1.05] tracking-tight font-medium text-ink mb-3 text-balance">
          This is{" "}
          <em className="font-display italic text-coral-500 font-normal">
            permanent.
          </em>
        </h1>
        <p className="text-[15px] sm:text-[16px] leading-[1.6] text-ink-soft max-w-lg">
          Once you delete your account we can&apos;t bring it back. Please read
          what gets removed before you continue.
        </p>
      </div>

      {/* Signed-in identity card */}
      <div className="rounded-3xl bg-cream-200/45 border border-border/40 p-5 flex items-center gap-4">
        <div className="flex-none w-12 h-12 rounded-full bg-coral-500 text-cream-50 flex items-center justify-center text-[17px] font-semibold">
          {(displayName[0] || "?").toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-ink-muted mb-0.5">
            Signed in as
          </p>
          <p className="text-[15px] font-semibold text-ink leading-snug truncate">
            {displayName || "Dars user"}
          </p>
          {email && (
            <p className="text-[13px] text-ink-soft truncate">{email}</p>
          )}
        </div>
      </div>

      {/* What gets removed */}
      <div className="rounded-3xl bg-coral-50/60 border border-coral-100/70 p-5 sm:p-6">
        <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-coral-600 mb-3">
          What gets removed
        </p>
        <ul className="space-y-2.5 text-[14px] leading-[1.55] text-ink-soft">
          <Bullet>Your profile, name, and email.</Bullet>
          <Bullet>All your flashcards, decks, and revision history.</Bullet>
          <Bullet>Your exam scores, streaks, and XP.</Bullet>
          <Bullet>Any notes or files you uploaded to the marketplace.</Bullet>
          <Bullet>Your sign-in identity in Clerk &mdash; you&apos;ll be signed out everywhere.</Bullet>
        </ul>
      </div>

      {/* Type-to-confirm */}
      <div className="rounded-3xl bg-cream-200/45 border border-border/40 p-5 sm:p-6 space-y-4">
        <div>
          <FieldLabel>Type DELETE to confirm</FieldLabel>
          <input
            type="text"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && ready) submit();
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="DELETE"
            className={`mt-2 w-full rounded-2xl border bg-cream-50 px-4 py-3.5 text-[15px] tracking-[0.18em] font-semibold uppercase text-ink placeholder:text-ink-subtle placeholder:font-normal placeholder:tracking-normal focus:outline-none transition-colors ${
              ready
                ? "border-coral-400 bg-white"
                : "border-border focus:border-coral-300"
            }`}
          />
        </div>

        <ErrorMsg message={error} />

        <button
          type="button"
          onClick={submit}
          disabled={!ready || busy}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-coral-600 hover:bg-coral-700 active:bg-coral-800 text-white text-[15.5px] font-semibold shadow-coral disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {busy ? (
            <>
              <Spinner className="text-white" />
              Deleting your account&hellip;
            </>
          ) : (
            "Delete my account permanently"
          )}
        </button>

        <CancelLink />
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden
        className="mt-2 flex-none w-1.5 h-1.5 rounded-full bg-coral-500"
      />
      <span>{children}</span>
    </li>
  );
}

function CancelLink() {
  const { signOut } = useClerk();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (busy) return;
        setBusy(true);
        try { await signOut({ redirectUrl: "/" }); } catch { /* ignore */ }
        setBusy(false);
      }}
      className="block w-full text-center text-[13.5px] font-medium text-ink-muted hover:text-ink transition-colors py-2"
    >
      Cancel and sign out
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Stage 3 — done                                                             */
/* -------------------------------------------------------------------------- */

function DonePanel({ email }: { email: string }) {
  // Confetti would feel wrong here. We aim for "calm and final."
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div ref={cardRef} className="space-y-6 text-center pt-2">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-100 text-sage-500 mx-auto">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h1 className="font-display text-[32px] sm:text-[40px] leading-[1.05] tracking-tight font-medium text-ink text-balance">
        Your account has been{" "}
        <em className="font-display italic text-coral-500 font-normal">
          deleted.
        </em>
      </h1>
      <p className="text-[15px] leading-[1.65] text-ink-soft max-w-md mx-auto">
        {email ? (
          <>
            We&apos;ve removed everything associated with{" "}
            <span className="font-semibold text-ink">{email}</span> from our
            servers.
          </>
        ) : (
          <>We&apos;ve removed everything associated with your account from our servers.</>
        )}{" "}
        You&apos;ve been signed out. Take care.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium text-ink-soft hover:text-ink hover:bg-cream-200 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 19l-7-7 7-7" />
          </svg>
          Back to Dars
        </Link>
      </div>
    </div>
  );
}
