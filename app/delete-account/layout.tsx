import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#EC6144",
          colorBackground: "#FFFDF8",
          colorText: "#1A1814",
          colorTextSecondary: "#6E6A5F",
          colorInputBackground: "#FFFBF4",
          colorInputText: "#1A1814",
          borderRadius: "0.875rem",
          fontFamily: "var(--font-figtree), system-ui, sans-serif",
        },
      }}
    >
      <main className="min-h-[100dvh] bg-cream-100 flex flex-col">
        {children}
      </main>
    </ClerkProvider>
  );
}
