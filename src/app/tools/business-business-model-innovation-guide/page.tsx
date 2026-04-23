import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessBusinessModelInnovationGuide from '@/components/BusinessBusinessModelInnovationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of business model innovation exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Innovation types include: Product innovation (new offerings for market differentiation), Process innovation (improved methods for operational efficiency), Business model innovation (new structures for value creation), and Market innovation (new segments for growth opportunities)."
      }
    },
    {
      "@type": "Question",
      "name": "What phases drive innovation implementation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Innovation phases include: idea generation, concept validation, prototype development, market testing, pilot launch, full rollout, performance monitoring, and continuous improvement. Each phase builds toward successful implementation."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies support innovation success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Innovation strategies include: disruptive innovation (market transformation), incremental innovation (continuous improvement), open innovation (external collaboration), platform innovation (ecosystem building), and sustainability innovation (long-term value)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure innovation performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: innovation rate, time to market, innovation ROI, patent portfolio, innovation pipeline, market adoption, customer satisfaction, and competitive position. These metrics track innovation effectiveness."
      }
    },
    {
      "@type": "Question",
      "name": "Why is business model innovation important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business model innovation creates competitive advantage through differentiation, enables market disruption and growth, improves value delivery and capture, builds sustainable business models, and drives long-term success. Strategic innovation transforms business potential."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Model Innovation Guide - Types, Phases & Strategies',
  description: 'Innovation types, implementation phases, strategies, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessBusinessModelInnovationGuide />
    </Suspense>
  );
}
