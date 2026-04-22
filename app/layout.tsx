import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dars — The revision app for Alimiyyah students",
  description:
    "Re-read your books. Drill flashcards. Compete with your halaqah. Sit mock exams. One app, mapped to your exact syllabus.",
  metadataBase: new URL("https://dars.app"),
  openGraph: {
    title: "Dars — The revision app for Alimiyyah students",
    description:
      "Re-read your books. Drill flashcards. Compete with your halaqah. Sit mock exams. One app, mapped to your exact syllabus.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${instrumentSerif.variable}`}
      style={{ "--font-geist": "var(--font-geist-sans)" } as React.CSSProperties}
    >
      <body>{children}</body>
    </html>
  );
}
