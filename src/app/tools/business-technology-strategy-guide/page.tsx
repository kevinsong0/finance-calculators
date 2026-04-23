import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessTechnologyStrategyGuide from '@/components/BusinessTechnologyStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What components define technology strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategy components include: Technology vision (long-term direction), Architecture blueprint (system design), Investment plan (resource allocation), Capability roadmap (skill development), and Governance framework (decision structure). Each component guides technology decisions."
      }
    },
    {
      "@type": "Question",
      "name": "What processes drive technology strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategy processes include: current state assessment, future state planning, gap analysis, strategy formulation, roadmap development, implementation planning, execution governance, and performance monitoring. Each process ensures strategic alignment."
      }
    },
    {
      "@type": "Question",
      "name": "What considerations shape technology strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key considerations include: Business alignment (strategy match), Technology trends (market evolution), Risk management (security and reliability), Cost efficiency (investment returns), and Vendor relationships (partnership value). Considerations balance opportunity and constraint."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure technology strategy success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: strategy execution rate, technology ROI, system reliability, innovation adoption, capability maturity, security posture, vendor performance, and stakeholder satisfaction. These metrics track technology effectiveness."
      }
    },
    {
      "@type": "Question",
      "name": "Why is technology strategy important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technology strategy creates competitive advantage through innovation, aligns technology investments with business goals, manages technology risk and complexity, enables scalable and efficient operations, and builds future-ready capabilities. Strategic technology drives business success."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Technology Strategy Guide - Components, Processes & Metrics',
  description: 'Strategy components, implementation processes, considerations, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessTechnologyStrategyGuide />
    </Suspense>
  );
}
