import type { Metadata } from 'next';
import { Suspense } from 'react';
import CapitalGainCalculator from '@/components/CapitalGainCalculator';
import Link from 'next/link';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is capital gain tax calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capital gain tax is calculated based on the profit from selling an asset. Short-term gains (held less than 12 months) are taxed at ordinary income rates up to 35%. Long-term gains (held 12+ months) are taxed at preferential rates of 0%, 15%, or 20% depending on your income level."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between short-term and long-term capital gains?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Short-term capital gains apply to assets held for less than 12 months and are taxed at your regular income tax bracket (up to 35%). Long-term capital gains apply to assets held for 12 months or more and benefit from lower tax rates of 0%, 15%, or 20% based on your taxable income."
      }
    },
    {
      "@type": "Question",
      "name": "Are cryptocurrency gains taxed as capital gains?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, cryptocurrency is treated as property by the IRS and subject to capital gains tax rules. When you sell crypto for more than you purchased it, the profit is taxable. The holding period determines whether it's short-term or long-term capital gain."
      }
    },
    {
      "@type": "Question",
      "name": "What capital gains tax rate applies to real estate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Real estate capital gains follow the same short-term/long-term rules. However, primary residences may qualify for exclusion: up to $250,000 for single filers or $500,000 for married couples filing jointly, if you lived in the home for 2 of the last 5 years."
      }
    },
    {
      "@type": "Question",
      "name": "How can I reduce my capital gains tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategies to reduce capital gains tax include: holding assets longer for lower long-term rates, using tax-loss harvesting to offset gains, maximizing retirement account contributions, donating appreciated assets to charity, and utilizing the primary residence exclusion for real estate."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Capital Gain Tax Calculator (2026) - Stock, Real Estate & Crypto Gains',
  description: 'Calculate capital gains tax for stocks, ETFs, real estate, and cryptocurrency. Compare short-term vs long-term rates. 2026 tax brackets.',
};

const relatedTools = [
  { href: '/tools/crypto-tax-calculator', name: 'Crypto Tax Calculator', desc: 'Cryptocurrency capital gains' },
  { href: '/tools/tax-loss-harvesting-calculator', name: 'Tax Loss Harvesting', desc: 'Offset gains with losses' },
  { href: '/tools/dividend-calculator', name: 'Dividend Calculator', desc: 'Dividend income tax' },
  { href: '/tools/niit-calculator', name: 'NIIT Calculator', desc: '3.8% investment income tax' },
  { href: '/tools/capital-gains-tax-calculator', name: 'Capital Gains Tax Calculator', desc: 'Investment gains' },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
          <CapitalGainCalculator />
        </Suspense>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Tax Tools</h2>
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
