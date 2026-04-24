import type { Metadata } from "next";
import Link from "next/link";
import { SEO_GUIDE_PAGES } from "@/lib/seoPages";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Retirement Guides | Retirement Planning Help (2026)",
  description: "Complete retirement guides covering 401k, IRA, Social Security, RMD, Roth conversion, and retirement planning. Free expert guidance.",
  alternates: { canonical: "/guides/retirement" },
  openGraph: {
    title: "Retirement Guides | Retirement Planning Help (2026)",
    description: "Complete retirement guides covering 401k, IRA, Social Security, RMD, Roth conversion, and retirement planning.",
    url: "/guides/retirement",
    type: "website",
  },
};

const retirementGuides = SEO_GUIDE_PAGES.filter((p) => p.category === "retirement");

const retirementSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Retirement Guides",
  "description": "Complete retirement guides covering 401k, IRA, Social Security, RMD, and retirement planning.",
  "url": `${SITE_URL}/guides/retirement`,
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": retirementGuides.length,
    "itemListElement": retirementGuides.map((guide, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": guide.title,
      "url": `${SITE_URL}/guides/${guide.slug}`
    }))
  }
};

export default function RetirementGuidesHub() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(retirementSchema) }}
      />

      <section className="space-y-3 mb-8">
        <h1 className="text-3xl font-bold">Retirement Guides</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          {retirementGuides.length} comprehensive guides covering 401k, IRA, Social Security, required minimum distributions, Roth conversion, and retirement planning. Each guide links to our Retirement Calculator.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {retirementGuides.map((guide) => (
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
        <h2 className="text-xl font-semibold">Retirement Calculator</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Calculate your retirement savings goal, project growth, and plan withdrawal strategies with our free Retirement Calculator.
        </p>
        <Link
          href="/tools/retirement-calculator"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Retirement Calculator →
        </Link>
      </section>

      <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-zinc-900 dark:hover:text-zinc-200">Guides</Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-200">Retirement</span>
      </nav>
    </main>
  );
}