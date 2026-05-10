import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Don't index API routes, the email-preview tool, or the
        // contributor application (it's referrer-only and we don't
        // want it ranking in search).
        disallow: ["/api/", "/email-preview", "/contribute"],
      },
    ],
    sitemap: "https://darsapp.com/sitemap.xml",
    host: "https://darsapp.com",
  };
}
