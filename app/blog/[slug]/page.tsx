import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { BLOG_POSTS, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

// Cache Components requires this for a route that calls connection():
// without it, Next errors "blocking-prerender-dynamic". instant=false
// allows this route to block on the request-time slug check instead of
// serving a prerendered shell.
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Unconditional request-time rendering. A conditional connection()
  // (only when the post is missing) does NOT fix the bug: Next still
  // produces a partial-prerender shell for the route, sends it with
  // HTTP 200, and only then streams in the not-found content — so the
  // status can never become 404. Calling connection() up front, before
  // any rendering decision, makes the whole route dynamic (ƒ in the
  // build output, like /contact), so notFound() sets the status before
  // any headers are sent. Trade-off: the 3 known posts are also
  // rendered per request instead of statically — acceptable here, the
  // lookup is an in-memory array and the site is small.
  // (Next 16 with cacheComponents: `dynamicParams` / `force-dynamic`
  // are removed, so connection() is the supported way to do this.)
  await connection();
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="section-pale section-sm">
      <div className="container-x max-w-[820px]">
      <p className="text-sm font-bold" style={{ color: "var(--color-brand-mid)" }}>
        {post.date}
        {post.sample && " · Sample post — replace with a real HHX article"}
      </p>
      <h1 className="hero-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{post.title}</h1>
      {post.body.map((para, i) => (
        <p key={i} className="text-lg leading-relaxed">{para}</p>
      ))}
      <p className="mt-10">
        <Link href="/blog" className="read-more">
          Back to all posts
        </Link>
      </p>
      </div>
    </article>
  );
}
