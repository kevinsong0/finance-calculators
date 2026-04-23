import type { Metadata } from 'next';
import { Suspense } from 'react';
import RebalancingCalculator from '@/components/RebalancingCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is portfolio rebalancing important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rebalancing maintains your intended risk level by correcting allocation drift from market movements. Without rebalancing, a growing stock allocation could exceed your risk tolerance, while a declining allocation could miss recovery opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "What are the tax implications of rebalancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Selling appreciated assets triggers capital gains taxes. Rebalance using new contributions to avoid selling. In tax-advantaged accounts (401k, IRA), rebalancing has no tax impact. Consider tax-loss harvesting to offset gains from rebalancing."
      }
    },
    {
      "@type": "Question",
      "name": "What is threshold-based rebalancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Threshold-based rebalancing only triggers trades when allocations drift beyond a set percentage (typically 5%). This reduces trading frequency and costs compared to fixed calendar rebalancing, while still maintaining appropriate risk levels."
      }
    },
    {
      "@type": "Question",
      "name": "Can I rebalance without selling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, redirect new contributions to underweighted asset classes to gradually rebalance. This avoids capital gains taxes and transaction costs. Dividends can also be directed to underweighted positions instead of reinvesting in overweight ones."
      }
    },
    {
      "@type": "Question",
      "name": "How do target-date funds handle rebalancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Target-date funds automatically rebalance both within asset classes and across the glide path (age-based allocation). Fund managers handle all rebalancing without investor intervention, providing hands-off portfolio management."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Portfolio Rebalancing Calculator - Calculate Required Trades',
  description: 'Calculate the trades needed to rebalance your portfolio back to target allocation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RebalancingCalculator />
    </Suspense>
  );
}
