import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessBrandStrategyGuide from '@/components/BusinessBrandStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What elements define a brand?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Brand elements include brand identity (name, logo, colors for recognition), brand positioning (market stance for differentiation), brand values (core principles for culture), brand promise (customer commitment for trust), brand voice (communication style for consistency), and brand personality (character traits for connection)."
      }
    },
    {
      "@type": "Question",
      "name": "What positioning strategies can brands use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Positioning strategies include differentiation (unique positioning to stand out), cost leadership (value positioning for affordable leadership), premium positioning (quality focus for high-end status), and niche focus (segment specialization for expert reputation)."
      }
    },
    {
      "@type": "Question",
      "name": "How do you develop a brand strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Brand development involves researching target audience, defining brand purpose, creating brand identity, developing brand voice, establishing brand guidelines, building brand assets, implementing brand consistently, monitoring brand perception, evolving brand as needed, and protecting brand equity."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure brand performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Brand metrics include brand awareness, brand recognition, brand recall, brand sentiment, brand loyalty, brand equity, market share, and customer lifetime value."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a strong brand?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Building a strong brand takes years of consistent effort. Initial brand establishment takes 6-12 months, building meaningful recognition takes 2-3 years, and achieving strong brand equity takes 5+ years of sustained investment, consistent messaging, and positive customer experiences."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Brand Strategy Guide - Elements, Positioning & Metrics',
  description: 'Brand elements, positioning strategies, development process, and performance metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessBrandStrategyGuide />
    </Suspense>
  );
}