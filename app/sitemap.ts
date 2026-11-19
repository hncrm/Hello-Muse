import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

// Placeholder base URL — replace with the real domain once hosting is
// decided (the Next.js site cannot run on the current GitHub Pages static
// hosting; see README.md).
const BASE_URL = "https://www.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/about", "/process", "/case-studies", "/blog", "/contact"];
  const entries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date("2026-11-19"),
  }));
  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    });
  }
  return entries;
}
