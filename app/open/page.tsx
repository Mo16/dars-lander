import type { Metadata } from "next";
import Link from "next/link";
import OpenInApp from "./open-in-app";

export const metadata: Metadata = {
  title: "Open Dars",
  robots: { index: false, follow: false },
};

const IOS_URL = "https://apps.apple.com/app/dars";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.darsapp.app";

// Where an email CTA is allowed to send someone inside the app. Fixed list:
// the value goes straight into a `dars://` URL, and accepting anything would
// mean a link in an email could be pointed at an arbitrary in-app route.
const DESTINATIONS: Record<string, { path: string; title: string; blurb: string }> = {
  revise: {
    path: "revise",
    title: "Your cards are ready",
    blurb: "Opening Dars on your revision queue.",
  },
  dashboard: {
    path: "dashboard",
    title: "Opening Dars",
    blurb: "Taking you to your dashboard.",
  },
  exams: {
    path: "exams",
    title: "Mock exams",
    blurb: "Opening Dars on the exams tab.",
  },
  resources: {
    path: "resources",
    title: "Resources",
    blurb: "Opening Dars on the resources marketplace.",
  },
  profile: {
    path: "profile",
    title: "Your profile",
    blurb: "Opening Dars on your profile.",
  },
  halaqah: {
    path: "halaqah",
    title: "Your halaqah",
    blurb: "Opening Dars on your halaqah.",
  },
  "ai-tutor": {
    path: "ai-tutor",
    title: "Ask your tutor",
    blurb: "Opening the Dars AI tutor.",
  },
};

const DEFAULT = { path: "", title: "Opening Dars", blurb: "Taking you into the app." };

export default async function OpenPage({
  searchParams,
}: {
  searchParams: Promise<{ to?: string }>;
}) {
  const { to } = await searchParams;
  const destination = (to && DESTINATIONS[to]) || DEFAULT;
  const deepLink = destination.path ? `dars://${destination.path}` : "dars://";

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-100 px-4 py-16">
      <div className="w-full max-w-[420px]">
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

        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="font-display text-[26px] leading-tight tracking-tight text-ink">
            {destination.title}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{destination.blurb}</p>

          <OpenInApp deepLink={deepLink} iosUrl={IOS_URL} androidUrl={ANDROID_URL} />

          <p className="mt-6 text-[13px] leading-relaxed text-ink-muted">
            Nothing happened? You probably don&rsquo;t have Dars installed on this device yet.
          </p>
        </div>

        <p className="mt-6 text-[13px] leading-relaxed text-ink-muted">
          Trouble getting in?{" "}
          <Link href="/support" className="text-ink underline underline-offset-2 hover:text-coral-600">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
