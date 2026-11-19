import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Blog slug 404s — decided here, before rendering.
 *
 * Why this file exists: with Next 16 Cache Components enabled, every
 * route is partially prerendered. Next sends the static shell — and
 * with it the HTTP 200 status — before the page has finished resolving
 * data, so a `notFound()` call inside `app/blog/[slug]/page.tsx` can
 * only ever produce a *soft* 404: the right "That page doesn't exist"
 * UI, a `noindex` tag, but HTTP 200. That is a known Next 16 behaviour
 * (see the Next.js `not-found` reference: "Next.js returns a 404 for
 * non-streamed responses and a 200 for streamed ones").
 *
 * What did NOT fix it (all tried and verified with curl on a clean
 * production build):
 * - `dynamicParams = false` — removed / unavailable when
 *   `cacheComponents` is enabled.
 * - `export const dynamic = 'force-dynamic'` — likewise removed.
 * - `await connection()` in the page, conditional or unconditional,
 *   with `export const instant = false` — the route becomes fully
 *   dynamic (ƒ in the build output), but the streamed response still
 *   carries `x-nextjs-postponed: 1` and HTTP 200, with the 404 only
 *   inside the streamed RSC payload (`NEXT_HTTP_ERROR_FALLBACK;404`).
 *
 * The last place the status is still ours to set is the proxy, which
 * runs before the route renders. So: for `/blog/<slug>`, check the
 * slug against the known posts here. Unknown slug → fetch the
 * framework's `/_not-found` page and return its HTML with a real
 * HTTP 404 status. Known slug → let the request through unchanged.
 *
 * Keep KNOWN_BLOG_SLUGS in sync with the slugs in `lib/blog.ts`
 * (BLOG_POSTS). It is deliberately a hardcoded list here, not an
 * import: the proxy should stay fast and self-contained, and the
 * list is only 3 sample posts.
 */
const KNOWN_BLOG_SLUGS = new Set([
  "spreadsheet-to-power-app",
  "dataverse-small-business",
  "automate-first-step",
]);

let notFoundBody: string | null = null;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (!match) return NextResponse.next();

  const slug = decodeURIComponent(match[1]);
  if (KNOWN_BLOG_SLUGS.has(slug)) return NextResponse.next();

  // Unknown slug: answer 404 ourselves. Fetch the built-in not-found
  // page for the body, so humans still see the site's "That page
  // doesn't exist" page (with header/footer and links home).
  return (async () => {
    try {
      if (notFoundBody === null) {
        const res = await fetch(new URL("/_not-found", request.nextUrl.origin));
        notFoundBody = await res.text();
      }
      return new NextResponse(notFoundBody, {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    } catch {
      // Fail open: if the not-found page cannot be fetched, let the
      // request through to the page, which will still render the
      // not-found UI (soft 404) rather than taking the site down.
      return NextResponse.next();
    }
  })();
}

export const config = {
  matcher: "/blog/:slug",
};
