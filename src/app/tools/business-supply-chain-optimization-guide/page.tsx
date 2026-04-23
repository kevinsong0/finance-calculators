import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessSupplyChainOptimizationGuide from '@/components/BusinessSupplyChainOptimizationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What areas can be optimized in supply chain management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain optimization covers six key areas: Inventory optimization (stock levels for cost reduction), Logistics optimization (transport efficiency for speed), Supplier optimization (source selection for quality), Process optimization (workflow efficiency for productivity), Cost optimization (expense reduction for margin), and Risk optimization (disruption prevention for reliability)."
      }
    },
    {
      "@type": "Question",
      "name": "What methods are used for supply chain optimization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The optimization methodology follows 10 steps: analyze current supply chain, identify optimization opportunities, evaluate optimization options, design optimization solutions, implement optimization changes, monitor optimization results, measure optimization impact, adjust optimization approach, scale optimization success, and sustain optimization gains."
      }
    },
    {
      "@type": "Question",
      "name": "What techniques improve supply chain performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key optimization techniques include: Lean principles (waste elimination for efficiency), Technology integration (system automation for speed), Network redesign (structure changes for cost reduction), and Collaboration enhancement (partner coordination for alignment)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure supply chain optimization success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: supply chain cost, order fulfillment rate, inventory turnover, lead time reduction, supplier performance, logistics efficiency, supply chain flexibility, and customer satisfaction. These metrics track optimization effectiveness across the entire supply chain."
      }
    },
    {
      "@type": "Question",
      "name": "Why is supply chain optimization important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain optimization creates competitive advantage through cost reduction, improved efficiency, better quality, faster delivery, and enhanced reliability. It transforms supply chain operations from a cost center to a strategic value driver."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Supply Chain Optimization Guide - Areas, Methods & Techniques',
  description: 'Optimization areas, methods, techniques, and success metrics for supply chain improvement.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessSupplyChainOptimizationGuide />
    </Suspense>
  );
}