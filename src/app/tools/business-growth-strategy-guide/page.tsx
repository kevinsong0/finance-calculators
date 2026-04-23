import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessGrowthStrategyGuide from '@/components/BusinessGrowthStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What stages does business growth follow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Growth stages include Startup (product-market fit focus with validation and traction metrics), Growth (market expansion focus with revenue and customer metrics), Maturity (market dominance focus with market share and profit metrics), and Renewal (innovation pivot focus with new products and markets metrics)."
      }
    },
    {
      "@type": "Question",
      "name": "What are the Ansoff growth strategies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ansoff strategies include market penetration (existing products in existing markets for increased share), market development (existing products in new markets for geographic expansion), product development (new products in existing markets for offering expansion), and diversification (new products in new markets for new business lines)."
      }
    },
    {
      "@type": "Question",
      "name": "What drives business growth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Growth drivers include customer acquisition, customer retention, market expansion, product innovation, operational efficiency, strategic partnerships, brand building, and technology leverage."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics track business growth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Growth metrics include revenue growth rate, customer growth rate, market share, customer lifetime value, acquisition efficiency, retention rate, profit margin, and market penetration rate."
      }
    },
    {
      "@type": "Question",
      "name": "How do businesses choose a growth strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Businesses choose growth strategies based on market conditions, competitive position, available resources, risk tolerance, and growth objectives. Consider market maturity, competitive intensity, capital availability, management capability, and alignment with company vision when selecting the appropriate growth approach."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Growth Strategy Guide - Stages, Strategies & Metrics',
  description: 'Growth stages, Ansoff strategies, growth drivers, and tracking metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessGrowthStrategyGuide />
    </Suspense>
  );
}