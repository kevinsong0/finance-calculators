import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessInnovationManagementGuide from '@/components/BusinessInnovationManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the types of business innovation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business innovation types include product innovation for market differentiation, process innovation for efficiency gains, business model innovation for new value creation, service innovation for customer excellence, technology innovation for capability advancement, and organizational innovation for agility."
      }
    },
    {
      "@type": "Question",
      "name": "What is the innovation management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The innovation process involves: identifying opportunities, generating ideas, evaluating potential, prioritizing projects, prototyping innovations, testing concepts, implementing innovations, scaling successful innovations, measuring impact, and capturing learning systematically."
      }
    },
    {
      "@type": "Question",
      "name": "What innovation methods are commonly used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common innovation methods include design thinking for user-centered customer relevance, agile innovation for iterative development speed, open innovation for diverse ideas through external collaboration, and lean startup for risk reduction through experiment-driven approaches."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure innovation success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Innovation metrics include innovation pipeline size, innovation success rate, time to market, innovation ROI, patent filings, new product revenue, innovation culture index, and innovation investment levels."
      }
    },
    {
      "@type": "Question",
      "name": "Why is innovation management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Innovation management ensures competitive future positioning by systematically identifying opportunities, generating ideas, evaluating potential, prioritizing projects, building prototypes, testing concepts, implementing solutions, scaling successes, measuring impact, and capturing learning."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Innovation Management Guide - Types, Process & Metrics',
  description: 'Innovation types, process, methods, and metrics for competitive advantage.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessInnovationManagementGuide />
    </Suspense>
  );
}