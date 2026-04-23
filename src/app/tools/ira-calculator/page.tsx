import type { Metadata } from 'next';
import { Suspense } from 'react';
import IRACalculator from '@/components/IRACalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 2024 IRA contribution limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 2024 IRA contribution limit is $7,000 for individuals under age 50. Those 50 and older can make an additional $1,000 catch-up contribution, totaling $8,000. This limit applies to combined Traditional and Roth IRA contributions."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Traditional and Roth IRA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional IRA offers tax deduction on contributions and tax-deferred growth, but withdrawals are taxed as ordinary income. Roth IRA has no upfront tax deduction, but contributions grow tax-free and withdrawals are tax-free in retirement. Choose based on current vs future tax rates."
      }
    },
    {
      "@type": "Question",
      "name": "Who can contribute to a Roth IRA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Roth IRA has income eligibility limits. For 2024, single filers with modified AGI under $146,000 can contribute full amount. Those earning $146,000-$161,000 can contribute reduced amounts. Married filing jointly limits are $230,000-$240,000. Traditional IRA has no income limits for contributions."
      }
    },
    {
      "@type": "Question",
      "name": "When can I withdraw from IRA without penalty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional IRA withdrawals before age 59.5 incur 10% penalty plus income tax. Roth IRA contributions (not earnings) can be withdrawn anytime without penalty. Earnings withdrawal penalty-free after 59.5 and account open 5+ years. Exceptions exist for first home purchase, education, and disability."
      }
    },
    {
      "@type": "Question",
      "name": "Should I prioritize 401(k) or IRA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best order: First, contribute to 401(k) enough to get full employer match (free money). Then max out IRA ($7,000) for broader investment options and tax flexibility. Finally, contribute remaining 401(k) capacity. This sequence optimizes employer match, flexibility, and tax diversification."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'IRA Calculator - Calculate Traditional & Roth IRA Growth',
  description: 'Calculate IRA retirement savings and compare Traditional vs Roth tax benefits.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <IRACalculator />
    </Suspense>
  );
}
