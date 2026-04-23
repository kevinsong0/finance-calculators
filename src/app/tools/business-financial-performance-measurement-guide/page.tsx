import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFinancialPerformanceMeasurementGuide from '@/components/BusinessFinancialPerformanceMeasurementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What dimensions are measured in financial performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance dimensions include: Profitability (margin, return ratios, primary importance), Efficiency (turnover, utilization, high importance), Liquidity (cash, working capital, high importance), and Solvency (debt, leverage ratios, medium importance)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics track financial performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key metrics include: revenue growth rate, gross profit margin, operating profit margin, net profit margin, return on assets, return on equity, asset turnover, inventory turnover, current ratio, and debt-to-equity ratio."
      }
    },
    {
      "@type": "Question",
      "name": "What methods analyze financial performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis methods include: Ratio analysis (compare metrics to benchmarks for relative performance), Trend analysis (track performance over time for progress tracking), Peer comparison (compare to competitors for market position), and Target analysis (measure against goals for goal achievement)."
      }
    },
    {
      "@type": "Question",
      "name": "What actions implement performance measurement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Measurement actions include: set performance targets, collect financial data, calculate performance metrics, analyze performance results, identify performance gaps, develop improvement plans, implement performance changes, monitor performance trends, report performance outcomes, and optimize measurement process."
      }
    },
    {
      "@type": "Question",
      "name": "Why is financial performance measurement important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance measurement reveals business health, guides improvement, enables benchmarking, supports decisions, and drives accountability. Measured performance transforms vague goals into specific achievements."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Financial Performance Measurement Guide - Dimensions & Metrics',
  description: 'Measurement dimensions, key metrics, analysis methods, and implementation actions.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFinancialPerformanceMeasurementGuide />
    </Suspense>
  );
}