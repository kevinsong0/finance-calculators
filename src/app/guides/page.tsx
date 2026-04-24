import type { Metadata } from "next";
import Link from "next/link";
import { SEO_GUIDE_PAGES } from "@/lib/seoPages";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Finance Guides Hub | 348+ Tax, Mortgage, Crypto, Retirement Guides",
  description:
    "Browse 348+ financial planning guides covering crypto tax, mortgage refinancing, tax deductions, retirement planning, and insurance strategies. Free expert guides with calculator integration.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Finance Guides Hub | 348+ Expert Financial Guides",
    description:
      "Browse 348+ financial planning guides covering crypto tax, mortgage refinancing, tax deductions, retirement planning, and insurance strategies.",
    url: "/guides",
    type: "website",
  },
  keywords: ['crypto tax guide', 'mortgage guide', 'tax deduction guide', 'retirement planning guide', 'insurance guide', 'financial literacy', 'tax planning', 'investment guide', 'NFT tax', 'DeFi tax', '401k guide', 'Social Security guide'],
};

const categoryHubs = [
  { name: "Crypto Tax & DeFi", slug: "crypto", count: SEO_GUIDE_PAGES.filter((p) => p.category === "crypto").length },
  { name: "Mortgage & Home", slug: "mortgage", count: SEO_GUIDE_PAGES.filter((p) => p.category === "mortgage").length },
  { name: "Tax Planning", slug: "tax", count: SEO_GUIDE_PAGES.filter((p) => p.category === "tax").length },
  { name: "Retirement Planning", slug: "retirement", count: SEO_GUIDE_PAGES.filter((p) => p.category === "retirement").length },
  { name: "Insurance", slug: "insurance", count: SEO_GUIDE_PAGES.filter((p) => p.category === "insurance").length },
];

const guidesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Finance Guides Hub",
  "description": "348+ financial planning guides covering crypto tax, mortgage, tax planning, retirement, and insurance.",
  "url": `${SITE_URL}/guides`,
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": SEO_GUIDE_PAGES.length,
    "itemListElement": categoryHubs.map((cat, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": cat.name,
      "url": `${SITE_URL}/guides/${cat.slug}`
    }))
  }
};

export default function GuidesHubPage() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesSchema) }}
      />

      <section className="space-y-3 mb-8">
        <h1 className="text-3xl font-bold">Finance Guides Hub</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          {SEO_GUIDE_PAGES.length} strategic guides for mortgage, tax, crypto, retirement, and insurance planning. Each guide links to a calculator for immediate action.
        </p>
      </section>

      {/* Category Hub Links */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {categoryHubs.map((cat) => (
          <Link
            key={cat.slug}
            href={`/guides/${cat.slug}`}
            className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition border border-zinc-200 dark:border-zinc-800"
          >
            <h2 className="font-semibold mb-1">{cat.name}</h2>
            <p className="text-sm text-zinc-500">{cat.count} guides</p>
          </Link>
        ))}
      </section>

      {/* Quick Links to Popular Guides */}
      <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SEO_GUIDE_PAGES.slice(0, 10).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              {guide.title.replace("Guide for", "").replace("(2026)", "").trim()}
            </Link>
          ))}
        </div>
      </section>

      <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">Home</Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-200">Guides</span>
      </nav>
    </main>
  );
}