import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights from HHX Services on Power Apps, Dataverse and Power Platform for small businesses.",
};

export default function BlogPage() {
  return (
    <div className="container-x py-10">
      <p className="eyebrow">Blog / Insights</p>
      <h1 className="text-4xl text-navy">Practical notes on Power Platform.</h1>
      <p className="text-lg text-muted">
        Short, plain-English posts about Power Apps, Dataverse and automation for small
        businesses. Posts below are labelled samples until real HHX articles are written.
      </p>

      <div className="grid gap-4 mt-8">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="border border-line rounded-xl p-5 bg-white">
            <p className="text-sm text-muted mt-0">
              {post.date}
              {post.sample && " · Sample post"}
            </p>
            <h2 className="text-navy text-xl mt-0">
              <Link href={`/blog/${post.slug}`} className="text-navy no-underline hover:underline">
                {post.title}
              </Link>
            </h2>
            <p>{post.summary}</p>
            <p>
              <Link href={`/blog/${post.slug}`} className="text-brand underline">
                Read more →
              </Link>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
