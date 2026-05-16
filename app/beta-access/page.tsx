import type { Metadata } from "next";
import BetaAccessForm from "./beta-access-form";

export const metadata: Metadata = {
  title: "Apply for Dars beta access",
  description:
    "Apply to test the very first build of Dars. Things will break — that's the point.",
  alternates: { canonical: "/beta-access" },
  robots: { index: false, follow: false },
};

export default function BetaAccessPage() {
  return (
    <main className="min-h-[100dvh] bg-cream-100 flex flex-col">
      <BetaAccessForm />
    </main>
  );
}
