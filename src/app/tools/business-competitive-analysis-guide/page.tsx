import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCompetitiveAnalysisGuide from '@/components/BusinessCompetitiveAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What aspects should competitive analysis cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis aspects include market share (competitor size revealing market position), product features (offering comparison revealing differentiation), pricing strategy (price positioning revealing value perception), distribution channels (channel coverage revealing market reach), marketing approach (promotion methods revealing brand strategy), and financial strength (resources available revealing competitive power)."
      }
    },
    {
      "@type": "Question",
      "name": "What methods gather competitive intelligence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Research methods include direct observation, industry reports, customer feedback, financial analysis, product testing, website analysis, social media monitoring, and employee interviews (where legally permissible)."
      }
    },
    {
      "@type": "Question",
      "name": "How does SWOT framework help competitive analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SWOT framework includes Strengths (internal positives to leverage), Weaknesses (internal negatives to address), Opportunities (external positives to capture), and Threats (external negatives to mitigate). This systematic approach identifies competitive position and informs strategy development."
      }
    },
    {
      "@type": "Question",
      "name": "What competitive strategies can businesses pursue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Competitive strategies include direct competition, differentiation focus, niche specialization, cost leadership, quality emphasis, service excellence, innovation leadership, and brand building. The best strategy depends on market conditions, company capabilities, and competitive positioning."
      }
    },
    {
      "@type": "Question",
      "name": "How do businesses identify competitive advantages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Competitive advantages are identified by comparing company strengths against competitor weaknesses, analyzing unique capabilities not easily replicated, assessing customer value perceptions, evaluating resource advantages, and determining positioning opportunities in the market landscape."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Competitive Analysis Guide - Aspects, Methods & Strategies',
  description: 'Competitive analysis aspects, research methods, SWOT framework, and strategies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCompetitiveAnalysisGuide />
    </Suspense>
  );
}