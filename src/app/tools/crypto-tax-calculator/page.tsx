import type { Metadata } from 'next';
import { Suspense } from 'react';
import CryptoTaxCalculator from '@/components/CryptoTaxCalculator';
import Link from 'next/link';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is cryptocurrency taxed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crypto is taxed as property, not currency. Every sale triggers capital gains tax. Short-term gains (held under 1 year) taxed at ordinary income rates up to 37%. Long-term gains (held over 1 year) taxed at preferential rates: 0%, 15%, or 20% based on income bracket."
      }
    },
    {
      "@type": "Question",
      "name": "What crypto transactions are taxable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Taxable events include: selling crypto for fiat, trading one crypto for another, using crypto to buy goods/services, earning mining/staking rewards, receiving crypto as income. Buying and holding is not taxable. Transferring between your own wallets is not taxable."
      }
    },
    {
      "@type": "Question",
      "name": "How do I report cryptocurrency on taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Report crypto gains on Form 8949 (Sales and Dispositions) and Schedule D. Each transaction needs: acquisition date, sale date, proceeds, cost basis, and gain/loss. Software like CoinTracker can automate this. Starting 2025, exchanges must report transactions over $10,000."
      }
    },
    {
      "@type": "Question",
      "name": "Can I deduct crypto losses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, crypto losses offset gains and up to $3,000 of ordinary income annually. Excess losses carry forward. Losses must be realized (actually sold). Wash sale rules for crypto are unclear - avoid repurchasing same coin within 30 days of loss sale."
      }
    },
    {
      "@type": "Question",
      "name": "How does cost basis work for crypto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Track purchase price for each coin. Common methods: FIFO (first coins bought are first sold), LIFO (last bought first sold), or specific identification (choose which coins). Specific ID can minimize taxes by selling coins with highest basis first. Document your method consistently."
      }
    }
  ]
};

// SoftwareApplication schema for AI crawlers (GEO)
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Crypto Tax Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Calculate cryptocurrency capital gains tax for 2026 based on holding period, tax bracket, and cost basis method.",
  "featureList": ["Short-term vs long-term tax rates", "Cost basis methods (FIFO, LIFO, Specific ID)", "Form 8949 reporting", "Crypto loss harvesting"]
};

// BreadcrumbList schema for navigation
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
    { "@type": "ListItem", "position": 2, "name": "Tax Hub", "item": "https://finance.128345827.xyz/tools/tax-hub" },
    { "@type": "ListItem", "position": 3, "name": "Crypto Tax Calculator", "item": "https://finance.128345827.xyz/tools/crypto-tax-calculator" }
  ]
};

export const metadata: Metadata = {
  title: 'Crypto Tax Calculator (2026) - Cryptocurrency Capital Gains & Reporting',
  description: 'Calculate cryptocurrency capital gains tax for 2026 based on holding period, tax bracket, and cost basis method. Short-term vs long-term crypto tax rates. Form 8949 reporting.',
  keywords: ['crypto tax calculator 2026', 'cryptocurrency tax', 'bitcoin tax', 'crypto capital gains', 'crypto reporting', 'digital asset tax', 'crypto cost basis', 'crypto gains', 'form 8949'],
};

const relatedTools = [
  { href: '/tools/crypto-tax-reporting-calculator', name: 'Crypto Tax Reporting', desc: 'Form 8949 guidance' },
  { href: '/tools/wash-sale-calculator', name: 'Wash Sale Calculator', desc: 'Disallowed losses' },
  { href: '/tools/tax-loss-harvesting-calculator', name: 'Tax Loss Harvesting', desc: 'Offset gains with losses' },
  { href: '/tools/capital-gain-calculator', name: 'Capital Gains Tax', desc: 'Stock & crypto gains' },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
          <CryptoTaxCalculator />
        </Suspense>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Crypto Tax Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedTools.map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition"
              >
                <h3 className="font-medium group-hover:underline">{tool.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex gap-4">
          <Link href="/tools/tax-hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Tax Calculators Hub
          </Link>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Home →
          </Link>
        </section>
      </main>
    </>
  );
}