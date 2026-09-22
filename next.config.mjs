/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Lets a one-off verification build write somewhere other than .next, so a
  // build never wipes the directory a running `npm run dev` is serving from
  // (which shows up as ENOENT on .next/routes-manifest.json).
  //   NEXT_DIST_DIR=.next-verify npm run build
  // Unset, it behaves exactly as before.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  async rewrites() {
    return [
      // /beta is the short link worth putting on a poster or in a message.
      // A rewrite rather than a redirect, so the address bar keeps saying
      // /beta and the two URLs behave identically instead of one bouncing to
      // the other. No SEO cost: the page is already noindex and declares
      // /beta-access as its canonical.
      { source: "/beta", destination: "/beta-access" },
    ];
  },
};

export default nextConfig;
