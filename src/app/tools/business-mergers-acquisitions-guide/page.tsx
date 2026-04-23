import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessMergersAcquisitionsGuide from '@/components/BusinessMergersAcquisitionsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of mergers and acquisitions exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "M&A types include: Horizontal merger (same industry competitors for market share), Vertical merger (supply chain integration for control efficiency), Conglomerate merger (different industries for diversification), and Acquisition (one company buys another for growth acceleration)."
      }
    },
    {
      "@type": "Question",
      "name": "What phases does the M&A process include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "M&A phases include: strategy development, target identification, due diligence, valuation analysis, negotiation process, deal structuring, financing arrangement, legal documentation, integration planning, and post-merger integration."
      }
    },
    {
      "@type": "Question",
      "name": "What considerations guide M&A decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key considerations include: Strategic fit (business alignment, critical importance), Financial impact (value creation, critical importance), Cultural compatibility (organization fit, high importance), and Regulatory compliance (legal requirements, high importance)."
      }
    },
    {
      "@type": "Question",
      "name": "What risks affect M&A transactions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common risks include: overpayment risk, integration failure, cultural clash, synergy shortfall, regulatory rejection, financing difficulty, key talent loss, and customer attrition. Risk management is essential for successful M&A."
      }
    },
    {
      "@type": "Question",
      "name": "Why is M&A strategy important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "M&A enables strategic growth, market expansion, capability acquisition, and competitive advantage. Strategic M&A transforms business development from organic growth to accelerated expansion."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Mergers and Acquisitions Guide - Types, Phases & Risks',
  description: 'M&A types, process phases, key considerations, and common risks.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessMergersAcquisitionsGuide />
    </Suspense>
  );
}
