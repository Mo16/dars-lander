import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContributeForm from "./contribute-form";

export const metadata: Metadata = {
  title: "Contribute to Dars",
  description:
    "Apply to help build Dars — the revision app for Alimiyyah students.",
  alternates: { canonical: "/contribute" },
  robots: { index: false, follow: false },
};

export default function ContributePage() {
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
            ◆ Contributor application
          </p>
          <h1 className="font-display text-[36px] sm:text-[48px] leading-[1.04] tracking-tight font-medium text-ink mb-4 text-balance">
            Build Dars{" "}
            <em className="font-display italic text-coral-500 font-normal">
              with us.
            </em>
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-ink-soft text-pretty max-w-xl">
            A few quick questions. We&apos;ll review every application and
            write back personally — usually within a week.
          </p>
        </header>

        <ContributeForm />

        <p className="text-[12px] leading-[1.55] text-ink-subtle mt-10 text-center">
          By applying you agree we can email you about Dars.
        </p>
      </div>
    </main>
  );
}
