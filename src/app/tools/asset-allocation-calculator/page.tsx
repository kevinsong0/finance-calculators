import type { Metadata } from 'next';
import { Suspense } from 'react';
import AssetAllocationCalculator from '@/components/AssetAllocationCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the rule of 100 for asset allocation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The rule of 100 suggests subtracting your age from 100 to determine your stock allocation percentage. For example, at age 30, allocate 70% to stocks and 30% to bonds. This rule adjusts for risk tolerance and investment timeline."
      }
    },
    {
      "@type": "Question",
      "name": "How does age affect asset allocation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Younger investors typically have higher stock allocations for growth potential and time to recover from market downturns. Older investors shift toward bonds and cash for stability and income, reducing volatility risk as retirement approaches."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between conservative and aggressive allocation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conservative allocation emphasizes bonds and cash (lower risk, lower returns) for stability. Aggressive allocation focuses on stocks (higher risk, higher potential returns) for growth. Moderate allocation balances both for medium risk/reward."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I rebalance my portfolio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most experts recommend rebalancing annually or when allocations drift more than 5% from targets. More frequent rebalancing increases transaction costs and tax impacts. Some investors rebalance only when adding new money."
      }
    },
    {
      "@type": "Question",
      "name": "What are target-date funds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Target-date funds automatically adjust asset allocation over time, starting aggressive and gradually becoming conservative as the target retirement date approaches. They provide automatic rebalancing and age-appropriate allocation."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Asset Allocation Calculator - Portfolio Allocation by Age',
  description: 'Calculate optimal asset allocation based on age, risk tolerance, and investment timeline.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AssetAllocationCalculator />
    </Suspense>
  );
}
