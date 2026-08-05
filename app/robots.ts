import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Don't index API routes, the email-preview tool, or the
        // contributor application (it's referrer-only and we don't
        // want it ranking in search). /email/preferences is per-contact —
        // the URL carries the token that identifies them.
        // /email/view carries a per-send id and /open is a redirect shim —
        // neither should ever appear in search results.
        disallow: [
          "/api/",
          "/email-preview",
          "/contribute",
          "/email/preferences",
          "/email/view",
          "/open",
        ],
      },
    ],
    sitemap: "https://darsapp.com/sitemap.xml",
    host: "https://darsapp.com",
  };
}
