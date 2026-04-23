import type { Metadata } from 'next';
import { Suspense } from 'react';
import InvestmentHorizonCalculator from '@/components/InvestmentHorizonCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an investment horizon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An investment horizon is the time period you expect to hold investments before needing the money. It determines appropriate risk level and asset allocation. Longer horizons allow higher risk for better returns, while shorter horizons require conservative strategies."
      }
    },
    {
      "@type": "Question",
      "name": "How does investment horizon affect asset allocation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Horizons of 30+ years allow 80-90% stock allocation. 20-30 years suggest 70-80% stocks. 10-20 years call for balanced 60% stocks, 30% bonds. 5-10 years need conservative 40-50% stocks. Under 5 years requires preservation focus with 20-30% stocks."
      }
    },
    {
      "@type": "Question",
      "name": "What is the glide path concept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A glide path describes how asset allocation gradually shifts from aggressive to conservative as you approach your goal. Target-date funds use glide paths to automatically reduce stock allocation and increase bonds as the target date approaches."
      }
    },
    {
      "@type": "Question",
      "name": "How do different goals affect investment horizon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retirement typically has the longest horizon (30+ years). Education savings may have 15-20 year horizons. House purchases often have 5-10 year horizons. Emergency funds need immediate access, suggesting very short horizons and cash investments."
      }
    },
    {
      "@type": "Question",
      "name": "Why is time important in investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Time allows compound growth to accumulate, smooths out market volatility, enables recovery from downturns, and reduces the risk of loss. Long-term investors can ride out market cycles that hurt short-term investors who must sell during downturns."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Investment Horizon Calculator - Calculate Your Investment Timeline',
  description: 'Calculate your investment horizon and get appropriate risk level and strategy recommendations.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <InvestmentHorizonCalculator />
    </Suspense>
  );
}
