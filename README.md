# Dars — Landing & Waitlist

Next.js 15 · Tailwind v3.4 · Geist Sans + Instrument Serif.
Designed to mirror the actual Dars app — coral/cream palette, serif display numerics, authentic phone mockups.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
dars-landing/
├── app/
│   ├── layout.tsx              fonts + metadata
│   ├── page.tsx                landing page (server component)
│   ├── waitlist-form.tsx       client form, posts /api/waitlist
│   ├── phone-screens.tsx       real app screen mockups (Home, Revise, Social, Flashcard)
│   ├── globals.css             minimal — just Tailwind directives
│   └── api/waitlist/route.ts   POST handler stub
├── tailwind.config.ts          Dars brand palette
├── postcss.config.mjs
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## Brand tokens (in `tailwind.config.ts`)

| Token | Hex | Use |
| --- | --- | --- |
| `coral-500` | `#EC6144` | Primary — hero card, CTAs, active tab |
| `coral-50` | `#FFF3EE` | Feature surface, alerts |
| `cream-100` | `#FFF7EC` | Page background |
| `cream-200` | `#FBEFDC` | Section bands, stat cards |
| `amber-500` | `#D4A943` | Achievements, badges |
| `sky-100` | `#E2F0F8` | Book icons, secondary info |
| `sage-500` | `#7E9467` | Success (Good rating, confirmations) |
| `ink` | `#1A1814` | Primary text, CTA block |
| `card` | `#FFFDF8` | Card surfaces |

## Fonts

- `font-sans` → Geist Sans (body/UI, via `geist` package)
- `font-display` → Instrument Serif (headlines, numerics, italic accents)

**Arabic note:** Neither Geist nor Instrument Serif ships Arabic glyphs. Arabic falls back to the system serif — fine on macOS/iOS, inconsistent on Android/Windows. To fix cleanly:

```ts
// app/layout.tsx
import { Noto_Naskh_Arabic } from "next/font/google";
const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});
// add arabic.variable to the html className
```

Then in the components, replace the inline `style={{ fontFamily: "serif" }}` on Arabic blocks with `className="font-arabic"` (Tailwind picks it up from the config).

## Wire the waitlist

The API route currently logs and returns 200. Pick one:

### Resend

```bash
npm i resend
```

```ts
// app/api/waitlist/route.ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.contacts.create({
  email,
  audienceId: process.env.RESEND_AUDIENCE_ID!,
});
```

### Supabase

```ts
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
await supabase.from("waitlist").insert({ email, source: "landing" });
```

Rate limit before launch:

```bash
npm i @upstash/ratelimit @upstash/redis
```

## Deploy

```bash
vercel
```

Geist is Vercel's own font — zero-latency on Vercel infra.

## Before ship checklist

- [ ] Wire `/api/waitlist` to Resend or Supabase
- [ ] Add rate limiting (Upstash)
- [ ] Replace `2,400+ students` placeholder with real count (or swap for evergreen copy)
- [ ] Replace placeholder testimonials
- [ ] Add Arabic font (see note above)
- [ ] Add `robots.ts` and `sitemap.ts`
- [ ] Generate OG image via `ImageResponse`
- [ ] Plausible or PostHog analytics
- [ ] Privacy policy page

## Design notes

The page is structured as **six vertical beats**:

1. **Hero** — `H1` + subhead + email form + Home-dashboard phone with floating Arabic subject orbs
2. **Four-pillar features** — Read · Revise · Compete · Test, each card colored distinctly, each with its own miniature visual
3. **How it works** — Four-step checklist on the left, real Revise screen on the right
4. **Spaced repetition close-up** — Flashcard phone + three stat boxes (15m · 90% · 30+)
5. **Testimonials** — Two cards in a cream-band block
6. **Final CTA** — Dark ink block with Social/Halaqah phone mockup + waitlist form

Tone locked: clarity-first hero ("The revision app for Alimiyyah students"), rhythmic four-verb subhead, scholarly serif display throughout.
# dars-lander
