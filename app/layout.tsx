import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { NAV } from "@/lib/nav";
import { BLOG_POSTS } from "@/lib/blog";
import { CONTACT_EMAIL_PLACEHOLDER } from "@/lib/enquiries";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HHX Services — Microsoft Power Apps, Dataverse & Power Platform for Small Businesses",
    template: "%s — HHX Services",
  },
  description:
    "HHX Services helps small businesses build practical apps with Microsoft Power Apps, Dataverse and Power Platform.",
  openGraph: {
    type: "website",
    siteName: "HHX Services",
    title: "HHX Services — Microsoft Power Apps, Dataverse & Power Platform for Small Businesses",
    description:
      "HHX Services helps small businesses build practical apps with Microsoft Power Apps, Dataverse and Power Platform.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-navy focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <footer className="site-footer pt-16 pb-8">
          <div className="container-x">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="font-extrabold text-xl text-white mt-0">
                  HHX <span className="text-[#4fd2f5]">Services</span>
                </p>
                <p className="text-sm leading-relaxed">
                  Microsoft Power Apps, Dataverse &amp; Power Platform for small businesses —
                  practical apps, built for how your business actually works.
                </p>
              </div>
              <div>
                <h3 className="text-base font-bold mt-0 mb-4">Contact</h3>
                <p className="text-sm leading-relaxed">
                  Email us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL_PLACEHOLDER}`}>
                    {CONTACT_EMAIL_PLACEHOLDER}
                  </a>
                </p>
                <p className="text-sm leading-relaxed">
                  <Link href="/contact">Book a free 15-minute chat →</Link>
                </p>
              </div>
              <div>
                <h3 className="text-base font-bold mt-0 mb-4">Quick links</h3>
                <ul className="list-none p-0 m-0 space-y-2 text-sm">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base font-bold mt-0 mb-4">Recent posts</h3>
                <ul className="list-none p-0 m-0 space-y-3 text-sm">
                  {BLOG_POSTS.slice(0, 3).map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      <span className="block text-xs text-[#8a94a3] mt-1">{post.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr className="border-white/10 my-8" />
            <p className="text-sm text-center m-0">
              © 2026 HHX Services · Demo site — client stories coming soon.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
