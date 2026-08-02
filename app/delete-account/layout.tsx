import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete your Dars account",
  description:
    "Sign in to permanently delete your Dars account and all associated data.",
  alternates: { canonical: "/delete-account" },
  robots: { index: false, follow: false },
};

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100dvh] bg-cream-100 flex flex-col">
      {children}
    </main>
  );
}
