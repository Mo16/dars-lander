/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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
