import type { Metadata } from 'next';
import { Suspense } from 'react';
import AnnuityCalculator from '@/components/AnnuityCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an annuity and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An annuity is a financial product that provides guaranteed income payments, typically used for retirement. You make a lump-sum payment or series of payments to an insurance company, and they return regular income payments over a set period or for life. Annuities can be immediate (start within 1 year) or deferred (start later)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between immediate and deferred annuities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Immediate annuities begin payouts within 1 year of purchase, ideal for those already retired needing income now. Deferred annuities delay payouts for years, allowing the principal to grow tax-deferred before receiving income. Deferred annuities are better for younger individuals planning ahead for retirement."
      }
    },
    {
      "@type": "Question",
      "name": "Are annuity payments taxable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Annuity taxation depends on funding source and payment type. Non-qualified annuities (after-tax money) have earnings taxed as ordinary income when withdrawn. Qualified annuities (pre-tax money like IRA) have entire payout taxed as income. Roth annuities are tax-free. Earnings grow tax-deferred in all annuity types."
      }
    },
    {
      "@type": "Question",
      "name": "What are the pros and cons of annuities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pros: Guaranteed income, tax-deferred growth, no contribution limits, lifetime payout options. Cons: High fees, limited flexibility, inflation risk (fixed payments), surrender charges, lower returns than alternatives. Annuities work best as part of diversified retirement strategy, not as sole income source."
      }
    },
    {
      "@type": "Question",
      "name": "How much income does a $100,000 annuity pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A $100,000 immediate annuity for a 65-year-old might pay approximately $500-600 monthly for life, depending on rates and gender. For a 20-year fixed period, expect roughly $600-700 monthly. Rates vary by age, annuity type, interest rates, and company. Always compare quotes from multiple insurers."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Annuity Calculator - Calculate Guaranteed Retirement Income',
  description: 'Calculate annuity payouts for immediate, deferred, and fixed period annuities. Compare payout frequencies and plan guaranteed retirement income streams.',
  keywords: ['annuity calculator', 'immediate annuity', 'deferred annuity', 'retirement income', 'guaranteed income', 'annuity payout', 'pension alternative', 'fixed annuity'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AnnuityCalculator />
    </Suspense>
  );
}