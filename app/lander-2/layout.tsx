import type { Metadata } from "next";
import { Archivo, Gabarito } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gabarito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dars — Your syllabus, drilled until you know it",
  description:
    "Re-read your books, drill flashcards, compete with your halaqah and sit mock exams. One app, mapped to your exact Alimiyyah syllabus.",
  alternates: { canonical: "/lander-2" },
};

export default function LanderTwoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${archivo.variable} ${gabarito.variable} min-h-screen bg-white`}>
      {children}
    </div>
  );
}
