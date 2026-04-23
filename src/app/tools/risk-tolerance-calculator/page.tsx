import type { Metadata } from 'next';
import { Suspense } from 'react';
import RiskToleranceCalculator from '@/components/RiskToleranceCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is risk tolerance assessed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk tolerance is assessed through questionnaires evaluating your reaction to market volatility, investment timeline, income stability, investment experience, and capital preservation vs growth preferences. The combined score determines your risk profile."
      }
    },
    {
      "@type": "Question",
      "name": "What are the different risk profile categories?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conservative investors prioritize capital preservation with low stock allocation. Moderate investors balance growth and safety. Moderately aggressive investors accept more volatility for growth. Aggressive investors maximize stock allocation for long-term growth."
      }
    },
    {
      "@type": "Question",
      "name": "How does age affect risk tolerance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Younger investors typically have higher risk tolerance due to longer investment horizons and ability to recover from market downturns. Older investors approaching retirement need lower risk to preserve capital and avoid volatility during withdrawal years."
      }
    },
    {
      "@type": "Question",
      "name": "Can risk tolerance change over time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, risk tolerance changes with life events like marriage, children, career changes, health issues, and approaching retirement. Major market events may also affect risk perception. Review your risk tolerance annually and adjust your portfolio accordingly."
      }
    },
    {
      "@type": "Question",
      "name": "Why is matching investments to risk tolerance important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Matching investments to your risk tolerance prevents panic selling during downturns and helps you stay invested through volatility. Misaligned portfolios lead to emotional decisions that hurt long-term returns. Your risk profile guides appropriate asset allocation."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Risk Tolerance Calculator - Assess Your Investment Risk Profile',
  description: 'Calculate your investment risk tolerance based on timeline, experience, and market reaction preferences.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RiskToleranceCalculator />
    </Suspense>
  );
}
