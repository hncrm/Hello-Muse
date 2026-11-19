import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { NAV } from "@/lib/nav";
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
        <footer className="border-t border-line bg-surface py-7 text-muted">
          <div className="container-x">
            <p>
              <strong className="text-navy">HHX Services</strong> — Microsoft Power Apps,
              Dataverse &amp; Power Platform for small businesses.
            </p>
            <p className="mt-2">
              {NAV.map((item, i) => (
                <span key={item.href}>
                  {i > 0 && " · "}
                  <Link href={item.href} className="text-muted underline">
                    {item.label}
                  </Link>
                </span>
              ))}
            </p>
            <p className="text-sm mt-4">© 2026 HHX Services · Demo site — client stories coming soon.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
