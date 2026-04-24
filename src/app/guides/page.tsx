import type { Metadata } from "next";
import Link from "next/link";
import { SEO_GUIDE_PAGES } from "@/lib/seoPages";

export const metadata: Metadata = {
  title: "Finance Guides Hub | 333+ Tax, Mortgage, Crypto, Retirement Guides",
  description:
    "Browse 333+ financial planning guides covering crypto tax, mortgage refinancing, tax deductions, retirement planning, and insurance strategies. Free expert guides with calculator integration.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Finance Guides Hub | 333+ Expert Financial Guides",
    description:
      "Browse 333+ financial planning guides covering crypto tax, mortgage refinancing, tax deductions, retirement planning, and insurance strategies.",
    url: "/guides",
    type: "website",
  },
  keywords: ['crypto tax guide', 'mortgage guide', 'tax deduction guide', 'retirement planning guide', 'insurance guide', 'financial literacy', 'tax planning', 'investment guide'],
};

const groupedGuides = {
  "Crypto Tax & DeFi": SEO_GUIDE_PAGES.filter((p) => p.category === "crypto"),
  "Mortgage & Home": SEO_GUIDE_PAGES.filter((p) => p.category === "mortgage"),
  "Tax Planning": SEO_GUIDE_PAGES.filter((p) => p.category === "tax"),
  "Retirement Planning": SEO_GUIDE_PAGES.filter((p) => p.category === "retirement"),
  "Insurance": SEO_GUIDE_PAGES.filter((p) => p.category === "insurance"),
} as const;

export default function GuidesHubPage() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <section className="space-y-3 mb-8">
        <h1 className="text-3xl font-bold">Finance Guides Hub</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Strategic guides for mortgage, tax, investment, and retirement planning. Each guide links to a calculator for immediate action.
        </p>
      </section>

      {Object.entries(groupedGuides).map(([groupName, guides]) => (
        guides.length > 0 && (
          <section key={groupName} className="space-y-4 mb-8">
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-2xl font-bold">{groupName}</h2>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {guides.length} guides
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition"
                >
                  <h3 className="font-semibold mb-2">{guide.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {guide.summary.slice(0, 120)}...
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )
      ))}

      <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">Home</Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-200">Guides</span>
      </nav>
    </main>
  );
}