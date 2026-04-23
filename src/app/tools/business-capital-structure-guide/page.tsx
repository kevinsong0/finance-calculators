import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCapitalStructureGuide from '@/components/BusinessCapitalStructureGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What components make up capital structure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capital components include: Equity capital (owner investment, permanent characteristic), Debt capital (borrowed funds, temporary characteristic), Retained earnings (profit accumulation, internal characteristic), and Hybrid securities (mixed instruments, flexible characteristic)."
      }
    },
    {
      "@type": "Question",
      "name": "What decisions shape capital structure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Structure decisions include: determine optimal debt ratio, evaluate equity needs, assess financing alternatives, consider tax implications, analyze cost of capital, evaluate risk tolerance, plan capital raising, structure financing mix, monitor capital ratios, and adjust capital structure."
      }
    },
    {
      "@type": "Question",
      "name": "What factors influence capital structure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Decision factors include: Cost of capital (financing cost, trade-off analysis), Risk level (financial stability, risk tolerance), Tax benefits (interest deductibility, tax efficiency), and Control considerations (ownership dilution, control preservation)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure capital structure success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: debt-to-equity ratio, debt-to-assets ratio, interest coverage ratio, cost of capital, weighted average cost of capital, return on equity, financial leverage, and capital efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "Why is capital structure important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capital structure determines financial foundation, affects cost of capital, influences risk level, impacts profitability, and shapes financing flexibility. Optimal structure balances cost, risk, and flexibility."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Capital Structure Guide - Components, Decisions & Factors',
  description: 'Capital components, structure decisions, influencing factors, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCapitalStructureGuide />
    </Suspense>
  );
}
