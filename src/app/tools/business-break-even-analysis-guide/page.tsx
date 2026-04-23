import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessBreakEvenAnalysisGuide from '@/components/BusinessBreakEvenAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of break-even analysis exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Break-even types include: Unit break-even (fixed costs/contribution margin for volume target), Revenue break-even (fixed costs/margin ratio for sales target), Time break-even (fixed costs/monthly contribution for months target), and Cash break-even (cash fixed costs/margin for cash flow target)."
      }
    },
    {
      "@type": "Question",
      "name": "What components are used in break-even analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key components include: fixed costs, variable costs, selling price, contribution margin, contribution ratio, operating costs, revenue level, and profit margin. These components determine the break-even point."
      }
    },
    {
      "@type": "Question",
      "name": "What analyses accompany break-even calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analyses include: Cost structure (fixed vs variable for cost flexibility), Margin analysis (price minus cost for unit profitability), Volume sensitivity (price changes for break-even shifts), and Safety margin (actual vs break-even for risk buffer)."
      }
    },
    {
      "@type": "Question",
      "name": "When should break-even analysis be used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Applications include: new product launch, business startup, pricing decisions, cost reduction, sales planning, profit forecasting, investment evaluation, and risk assessment. Use break-even to determine profit thresholds."
      }
    },
    {
      "@type": "Question",
      "name": "Why is break-even analysis important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Break-even analysis determines profit thresholds, guides pricing decisions, assesses risk, enables planning, and supports startup viability. Knowing break-even transforms uncertainty into actionable targets."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Break-Even Analysis Guide - Types, Components & Applications',
  description: 'Break-even types, key components, analysis methods, and common applications.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessBreakEvenAnalysisGuide />
    </Suspense>
  );
}
