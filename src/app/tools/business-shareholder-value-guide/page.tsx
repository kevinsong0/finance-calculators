import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessShareholderValueGuide from '@/components/BusinessShareholderValueGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What sources create shareholder value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Value sources include: Revenue growth (top-line expansion, profit increase mechanism), Margin improvement (efficiency gains, cost reduction mechanism), Asset optimization (capital efficiency, return increase mechanism), and Risk reduction (uncertainty decrease, value stability mechanism)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure shareholder value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Value metrics include: shareholder return, total shareholder return, dividend yield, capital appreciation, market value added, economic value added, return on equity, and price-to-book ratio."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies maximize shareholder value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Value strategies include: Profit maximization (revenue and cost focus, direct value impact), Capital efficiency (asset utilization, return increase impact), Risk management (uncertainty control, value stability impact), and Strategic investments (growth opportunities, future value impact)."
      }
    },
    {
      "@type": "Question",
      "name": "What activities create shareholder value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Value activities include: set shareholder objectives, analyze value drivers, develop value strategies, implement value initiatives, monitor value metrics, report value creation, evaluate value performance, adjust value approach, communicate to shareholders, and align management incentives."
      }
    },
    {
      "@type": "Question",
      "name": "Why is shareholder value important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shareholder value measures business success, guides strategic decisions, aligns management focus, attracts investment, and ensures sustainability. Value creation transforms business purpose into measurable outcomes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Shareholder Value Guide - Sources, Metrics & Strategies',
  description: 'Value sources, measurement metrics, creation strategies, and management activities.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessShareholderValueGuide />
    </Suspense>
  );
}
