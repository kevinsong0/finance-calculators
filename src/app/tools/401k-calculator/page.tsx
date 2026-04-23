import type { Metadata } from 'next';
import { Suspense } from 'react';
import FourOneKCalculator from '@/components/417kCalculator';
import Link from 'next/link';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 2026 401(k) contribution limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 2026 401(k) contribution limit is $23,000 for employees under age 50. Employees 50 and older can make an additional catch-up contribution of $7,500, bringing the total limit to $30,500. These limits apply to both traditional and Roth 401(k) contributions combined."
      }
    },
    {
      "@type": "Question",
      "name": "How does employer matching work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employer matching is free money added to your 401(k). Common match formulas include 50% match up to 6% (employer adds 3% when you contribute 6%) or 100% match up to 4%. Always contribute enough to get the full employer match - it's an immediate 100% return on that portion."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between traditional and Roth 401(k)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional 401(k) contributions reduce current taxable income and grow tax-deferred, but withdrawals are taxed as ordinary income. Roth 401(k) contributions are made with after-tax dollars but grow tax-free and withdrawals are tax-free in retirement."
      }
    },
    {
      "@type": "Question",
      "name": "When can I withdraw from my 401(k)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can withdraw from 401(k) without penalty after age 59.5. Early withdrawals before 59.5 incur a 10% penalty plus regular income tax. Exceptions exist for hardship, disability, or using 401(k) for first home purchase (up to $10,000). Required minimum distributions begin at age 73."
      }
    },
    {
      "@type": "Question",
      "name": "Should I contribute to 401(k) beyond employer match?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, after getting full employer match, continue contributing up to the annual limit if possible. Tax-deferred growth compounds significantly over time. Consider 401(k) after match, then IRA, then remaining 401(k) capacity for optimal tax diversification."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: '401(k) Calculator (2026) - Contribution Limits & Employer Match',
  description: 'Calculate 401(k) retirement savings growth with 2026 contribution limits ($23,000 + $7,500 catch-up). Includes employer matching and growth projection.',
};

const relatedTools = [
  { href: '/tools/ira-calculator', name: 'IRA Calculator', desc: 'Traditional vs Roth IRA' },
  { href: '/tools/hsa-contribution-calculator', name: 'HSA Calculator', desc: 'Health savings limits' },
  { href: '/tools/roth-conversion-calculator', name: 'Roth Conversion', desc: 'Conversion tax analysis' },
  { href: '/tools/required-minimum-distribution-calculator', name: 'RMD Calculator', desc: 'Withdrawal requirements' },
  { href: '/tools/early-retirement-penalty-calculator', name: 'Early Withdrawal Penalty', desc: '401k penalty costs' },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
          <FourOneKCalculator />
        </Suspense>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Retirement Tools</h2>
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
