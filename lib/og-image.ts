/* =========================================================================
   The site-wide Open Graph card.

   One definition, imported by every route that sets its own `openGraph`.
   Next.js replaces the whole `openGraph` object when a child route declares
   one, so a page that writes its own block loses the root's image unless it
   spreads these back in, hence `darsOpenGraphImages` / `darsTwitterImages`
   rather than each page re-typing the path and the dimensions.

   The artwork is derived from `public/assets/img/institutes-cover.png`
   (1448x1086) recomposed to 1200x630: at 4:3 a platform crop would shave the
   top off the wordmark and cut the lockup off the bottom.
   ========================================================================= */

export const darsOgImage = {
  // Relative: `metadataBase` in app/layout.tsx resolves it to an absolute
  // https URL, which is what the unfurl bots require.
  url: "/assets/img/og/dars-cover.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt:
    "Dars for Institutes: an iPhone showing a Nahw flashcard asking \"What is ضَمِير?\", " +
    "under the word INSTITUTES. Built for Alimiyyah classrooms: classes, assignments, exams, progress.",
} as const;

/** Spread into `openGraph.images`. */
export const darsOpenGraphImages = [darsOgImage];

/** Spread into `twitter.images`. The card takes the URL, not the object. */
export const darsTwitterImages = [darsOgImage.url];
