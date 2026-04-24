import type { Metadata } from 'next';
import { Suspense } from 'react';
import HELOCCalculator from '@/components/HELOCCalculator';
import Link from 'next/link';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a HELOC and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Home Equity Line of Credit (HELOC) is a revolving credit line using your home as collateral. During the draw period (5-10 years), you can borrow up to your limit, repay, and borrow again, paying interest only. During repayment (10-20 years), you must pay principal and interest with no further withdrawals."
      }
    },
    {
      "@type": "Question",
      "name": "How much can I borrow with a HELOC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most lenders allow 80-85% combined loan-to-value (CLTV). Example: $500,000 home with $200,000 mortgage = $300,000 equity. At 80% CLTV, max total debt = $400,000, so max HELOC = $200,000. Lenders also consider credit score, income, and debt-to-income ratio."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between HELOC and home equity loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HELOC: Revolving credit line, variable rate, interest-only option during draw, borrow as needed. Home equity loan: Fixed lump sum, fixed rate, immediate full principal+interest payments. HELOC offers flexibility; home equity loan offers predictability and rate certainty."
      }
    },
    {
      "@type": "Question",
      "name": "Are HELOC interest rates fixed or variable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HELOC rates are typically variable, tied to the prime rate plus a margin. Current rates range 8-10%. When prime increases, your rate and payments increase. Some lenders offer fixed-rate conversion options or hybrid HELOCs with fixed portions for rate protection."
      }
    },
    {
      "@type": "Question",
      "name": "What are HELOC closing costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HELOC closing costs include: appraisal ($300-500), application fee ($50-100), title search ($200-400), credit report ($25-50), and potentially attorney fees. Total costs range $200-2,000. Many lenders waive fees for credit lines under certain amounts or offer no-cost HELOCs with higher rates."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'HELOC Calculator (2026) - Home Equity Line of Credit',
  description: 'Calculate your HELOC borrowing capacity, draw period payments, repayment costs, and total interest for 2026. Compare HELOC vs cash-out refinance options.',
  keywords: ['HELOC calculator 2026', 'home equity line of credit', 'HELOC payment', 'home equity', 'second mortgage', 'draw period', 'repayment period', 'variable rate loan'],
};

const relatedTools = [
  { href: '/tools/mortgage-calculator', name: 'Mortgage Calculator', desc: 'Monthly payment calculation' },
  { href: '/tools/cash-out-refinance-calculator', name: 'Cash-Out Refinance', desc: 'Compare vs HELOC' },
  { href: '/tools/home-equity-loan-calculator', name: 'Home Equity Loan', desc: 'Fixed lump sum option' },
  { href: '/tools/mortgage-hub', name: 'Mortgage Hub', desc: 'All mortgage tools' },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
          <HELOCCalculator />
        </Suspense>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Equity Tools</h2>
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
          <Link href="/tools/mortgage-hub" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Mortgage Calculators Hub
          </Link>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Home →
          </Link>
        </section>
      </main>
    </>
  );
}