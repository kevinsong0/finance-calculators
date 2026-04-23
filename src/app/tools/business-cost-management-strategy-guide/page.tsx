import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCostManagementStrategyGuide from '@/components/BusinessCostManagementStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What approaches manage business costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cost management approaches include: Cost reduction (eliminate unnecessary costs for immediate savings), Cost control (monitor and limit spending for sustainable efficiency), Cost avoidance (prevent future costs for proactive savings), and Value engineering (optimize cost-value ratio for smart spending)."
      }
    },
    {
      "@type": "Question",
      "name": "What techniques optimize costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cost techniques include: activity-based costing, lean cost management, target costing, Kaizen costing, standard costing, life-cycle costing, benchmarking analysis, process improvement, supplier negotiations, and automation investment."
      }
    },
    {
      "@type": "Question",
      "name": "What cost areas should be focused on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cost focus areas include: Direct costs (production expenses, high impact potential), Indirect costs (support expenses, medium impact potential), Fixed costs (ongoing commitments, long-term focus potential), and Variable costs (volume-dependent, quick wins potential)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure cost management success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: cost per unit, cost efficiency ratio, cost reduction percentage, budget variance, cost avoidance achieved, ROI on cost initiatives, operating expense ratio, and cost per transaction. These metrics track improvement effectiveness."
      }
    },
    {
      "@type": "Question",
      "name": "Why is cost management strategy important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cost management creates competitive advantage through efficiency, protects margins during downturns, enables price competitiveness, frees resources for growth, and improves financial sustainability. Strategic cost management transforms expenses into value."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Cost Management Strategy Guide - Approaches & Techniques',
  description: 'Cost approaches, optimization techniques, focus areas, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCostManagementStrategyGuide />
    </Suspense>
  );
}