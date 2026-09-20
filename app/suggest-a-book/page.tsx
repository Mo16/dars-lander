import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SuggestForm from "./suggest-form";

export const metadata: Metadata = {
  title: "Suggest a book",
  description:
    "Tell us which books to put in Dars next. Name as many as you like. The ones asked for most are the ones we build first.",
  alternates: { canonical: "/suggest-a-book" },
};

export default function SuggestABookPage() {
  return (
    <main className="min-h-screen bg-cream-100">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <Link href="/" className="mb-10 inline-flex items-center gap-2.5 sm:mb-14">
          <Image
            src="/assets/img/logo.png"
            alt="Dars"
            width={32}
            height={32}
            priority
            className="h-7 w-7 rounded-lg shadow-soft sm:h-8 sm:w-8"
          />
          <span className="font-display text-[18px] font-semibold tracking-tight text-ink sm:text-[19px]">
            Dars
          </span>
        </Link>

        <SuggestForm />
      </div>
    </main>
  );
}
