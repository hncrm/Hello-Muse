import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // No public site URL is confirmed yet; add `sitemap:` once the live
    // domain is known.
  };
}
