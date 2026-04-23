import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessProfitAnalysisGuide from '@/components/BusinessProfitAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What metrics measure business profitability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profit metrics include gross profit margin (revenue minus COGS divided by revenue showing production efficiency), operating profit margin (operating income divided by revenue showing operational efficiency), net profit margin (net income divided by revenue showing overall profitability), EBITDA margin (EBITDA divided by revenue showing cash profitability), return on assets (net income divided by assets showing asset utilization), and return on equity (net income divided by equity showing investor return)."
      }
    },
    {
      "@type": "Question",
      "name": "What drives business profit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profit drivers include revenue growth (profit increase through sales expansion), cost reduction (margin improvement through efficiency focus), price optimization (revenue per unit through value pricing), volume increase (scale benefits through market growth), product mix (profitability mix through high-margin focus), and operating efficiency (cost per unit through process improvement)."
      }
    },
    {
      "@type": "Question",
      "name": "How should profits be analyzed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis methods include comparing to benchmarks, tracking trends over time, analyzing variance causes, segmenting by product, evaluating by channel, assessing by customer, reviewing by region, and identifying improvement opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "How can business profits be improved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improvement strategies include revenue area (market expansion through new markets and products), pricing area (value-based pricing through price optimization), costs area (process efficiency through automation and lean methods), and operations area (productivity gains through training and tools)."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good profit margin for business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good profit margins vary by industry. Generally, net profit margins above 10% are healthy, 20% or higher indicate strong performance. Retail businesses often target 5-10%, service businesses 15-25%, and technology businesses 20-40%. Compare margins to industry benchmarks for meaningful assessment."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Profit Analysis Guide - Metrics, Drivers & Improvements',
  description: 'Profit metrics, drivers, analysis methods, and improvement strategies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessProfitAnalysisGuide />
    </Suspense>
  );
}