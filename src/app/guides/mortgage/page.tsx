import type { Metadata } from "next";
import Link from "next/link";
import { SEO_GUIDE_PAGES } from "@/lib/seoPages";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mortgage Guides | Home Financing Help (2026)",
  description: "Complete mortgage guides covering refinancing, HELOC, jumbo loans, closing costs, mortgage points, and home financing. Free expert guidance.",
  alternates: { canonical: "/guides/mortgage" },
  openGraph: {
    title: "Mortgage Guides | Home Financing Help (2026)",
    description: "Complete mortgage guides covering refinancing, HELOC, jumbo loans, closing costs, mortgage points, and home financing.",
    url: "/guides/mortgage",
    type: "website",
  },
};

const mortgageGuides = SEO_GUIDE_PAGES.filter((p) => p.category === "mortgage");

const mortgageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Mortgage Guides",
  "description": "Complete mortgage guides covering refinancing, HELOC, jumbo loans, closing costs, and home financing.",
  "url": `${SITE_URL}/guides/mortgage`,
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": mortgageGuides.length,
    "itemListElement": mortgageGuides.map((guide, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": guide.title,
      "url": `${SITE_URL}/guides/${guide.slug}`
    }))
  }
};

export default function MortgageGuidesHub() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mortgageSchema) }}
      />

      <section className="space-y-3 mb-8">
        <h1 className="text-3xl font-bold">Mortgage Guides</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          {mortgageGuides.length} comprehensive guides covering mortgage refinancing, HELOC, jumbo loans, closing costs, mortgage points, and home financing. Each guide links to our Mortgage Calculator.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mortgageGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition"
            >
              <h2 className="font-semibold mb-2">{guide.title}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {guide.summary.slice(0, 100)}...
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-6 space-y-4 mb-8">
        <h2 className="text-xl font-semibold">Mortgage Calculator</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Calculate your monthly mortgage payment, amortization schedule, and compare refinancing options with our free Mortgage Calculator.
        </p>
        <Link
          href="/tools/mortgage-calculator"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Mortgage Calculator →
        </Link>
      </section>

      <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-zinc-900 dark:hover:text-zinc-200">Guides</Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-200">Mortgage</span>
      </nav>
    </main>
  );
}