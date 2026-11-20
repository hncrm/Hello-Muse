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
    <>
      <section className="section-pale section-sm">
        <div className="container-x">
          <p className="eyebrow">Blog / Insights</p>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}>
            Practical notes on Power Platform.
          </h1>
          <p className="lead text-muted max-w-[760px]">
            Short, plain-English posts about Power Apps, Dataverse and automation for small
            businesses. Posts below are labelled samples until real HHX articles are written.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="card-light flex flex-col">
              <p className="text-sm mt-0 font-bold" style={{ color: "var(--color-brand-mid)" }}>
                {post.date}
                {post.sample && <span className="text-muted font-normal"> · Sample post</span>}
              </p>
              <h2 className="text-navy text-xl font-bold mt-0">
                <Link href={`/blog/${post.slug}`} className="text-navy no-underline hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="flex-1">{post.summary}</p>
              <p className="mb-0">
                <Link href={`/blog/${post.slug}`} className="read-more">
                  Read more
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
