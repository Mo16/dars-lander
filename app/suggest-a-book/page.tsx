import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SuggestForm from "./suggest-form";

const pageTitle = "Suggest a book for Dars";
const pageDescription =
  "Which books should Dars have next? Name the ones you are actually studying, or the ones you wish were on your phone. A title on its own is enough, and the books asked for most are the ones we build first.";
const pageUrl = "/suggest-a-book";
const ogImage = {
  url: "/assets/img/og/suggest-a-book.jpg",
  width: 1200,
  height: 630,
  alt: "Suggest a book: a hand holding an iPhone showing the Dars library of books",
};

export const metadata: Metadata = {
  // Absolute so the tab reads "Suggest a book for Dars", not "...for Dars | Dars".
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    "suggest a book",
    "Dars books",
    "Alimiyyah books",
    "Alimiyyah syllabus",
    "Darul Uloom books",
    "request a book",
    "kitab request",
    "madrasah books",
    "Islamic studies revision",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Dars",
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImage.url],
    creator: "@dars_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
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
