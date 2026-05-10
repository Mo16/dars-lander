import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Figtree, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const siteUrl = "https://darsapp.com";
const siteName = "Dars";
const title = "Dars — The revision app for Alimiyyah students";
const description =
  "Re-read your books. Drill flashcards. Compete with your halaqah. Sit mock exams. One app, mapped to your exact syllabus.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Dars",
  },
  description,
  applicationName: siteName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Dars",
    "Alimiyyah",
    "Alimiyyah revision",
    "Alimiyyah app",
    "Islamic studies",
    "madrasah",
    "halaqah",
    "flashcards",
    "mock exams",
    "Islamic education",
    "Darul Uloom",
    "revision app",
  ],
  authors: [{ name: "Dars" }, { name: "Aurelo Web Studio", url: "https://aurelo.uk" }],
  creator: "Dars",
  publisher: "Dars",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName,
    title,
    description,
    images: [
      {
        url: "/assets/img/logo.png",
        width: 500,
        height: 500,
        alt: "Dars logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/assets/img/logo.png"],
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
      "max-video-preview": -1,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffcf6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${instrumentSerif.variable} ${figtree.variable}`}
      style={{ "--font-geist": "var(--font-geist-sans)" } as React.CSSProperties}
    >
      <body>
        {children}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
