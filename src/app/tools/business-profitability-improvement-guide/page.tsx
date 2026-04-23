import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessProfitabilityImprovementGuide from '@/components/BusinessProfitabilityImprovementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What levers improve business profitability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profitability levers include: Revenue growth (increase sales volume for top-line expansion), Cost reduction (decrease expenses for bottom-line improvement), Margin optimization (improve pricing for per-unit profit), and Mix optimization (shift product focus for profit quality)."
      }
    },
    {
      "@type": "Question",
      "name": "What steps implement profitability improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improvement steps include: analyze current profitability, identify improvement opportunities, prioritize improvement actions, set profitability targets, implement revenue improvements, implement cost reductions, optimize pricing strategies, adjust product mix, monitor profitability metrics, and sustain improvement gains."
      }
    },
    {
      "@type": "Question",
      "name": "What techniques analyze profitability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis techniques include: Break-even analysis (minimum sales target for risk awareness), Margin analysis (profit per unit for pricing guidance), Cost allocation (expense attribution for cost control), and Value chain analysis (activity efficiency for process insight)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure profitability success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: gross profit margin, operating profit margin, net profit margin, return on investment, profit per employee, profit per customer, profit growth rate, and profit stability index."
      }
    },
    {
      "@type": "Question",
      "name": "Why is profitability improvement important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profitability improvement ensures business success, maximizes stakeholder value, enables reinvestment, builds financial resilience, and drives sustainable growth. Improved profitability transforms survival into thriving."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Profitability Improvement Guide - Levers, Steps & Metrics',
  description: 'Improvement levers, implementation steps, analysis techniques, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessProfitabilityImprovementGuide />
    </Suspense>
  );
}
