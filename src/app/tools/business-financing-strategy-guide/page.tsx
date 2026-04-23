import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFinancingStrategyGuide from '@/components/BusinessFinancingStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What sources provide business financing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financing sources include: Internal financing (retained earnings, no external cost), Bank financing (loans and credit, flexible access), Equity financing (share issuance, permanent capital), and Bond financing (debt securities, market access)."
      }
    },
    {
      "@type": "Question",
      "name": "What elements form financing strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategy elements include: match financing to needs, optimize cost of capital, balance risk and return, maintain financing flexibility, plan financing timing, diversify funding sources, monitor market conditions, prepare financing contingencies, evaluate financing alternatives, and execute financing decisions."
      }
    },
    {
      "@type": "Question",
      "name": "What considerations guide financing decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key considerations include: Cost (interest/dividend expense, cost analysis), Risk (financial obligations, risk assessment), Control (ownership dilution, control preservation), and Flexibility (future financing access, capacity planning)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure financing success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: cost of capital, financing mix ratio, interest expense ratio, debt service coverage, financing availability, refinancing success, capital raise efficiency, and financing timeline."
      }
    },
    {
      "@type": "Question",
      "name": "Why is financing strategy important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financing strategy ensures capital access, optimizes costs, manages risk, maintains flexibility, and supports growth. Strategic financing transforms capital needs into sustainable solutions."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Financing Strategy Guide - Sources, Strategies & Considerations',
  description: 'Financing sources, strategy elements, key considerations, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFinancingStrategyGuide />
    </Suspense>
  );
}
