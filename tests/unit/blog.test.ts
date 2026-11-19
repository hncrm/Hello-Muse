import { describe, expect, it } from "vitest";
import { BLOG_POSTS, getPost } from "@/lib/blog";

describe("blog posts", () => {
  it("returns a known post by slug", () => {
    const post = getPost("spreadsheet-to-power-app");
    expect(post?.title).toContain("spreadsheet to Power App");
    expect(post?.sample).toBe(true);
  });

  it("returns undefined for an unknown slug (the 404 case)", () => {
    expect(getPost("does-not-exist")).toBeUndefined();
    expect(getPost("")).toBeUndefined();
  });

  it("has unique slugs, all labelled as samples", () => {
    const slugs = BLOG_POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(BLOG_POSTS.length).toBeGreaterThan(0);
    for (const post of BLOG_POSTS) {
      expect(post.sample).toBe(true);
      expect(post.body.length).toBeGreaterThan(0);
    }
  });
});
