import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessValuationMethodsGuide from '@/components/BusinessValuationMethodsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What methods value a business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Valuation methods include: Discounted Cash Flow (future cash flow discount, best for going concern), Comparable Company (market multiples, best for public comparison), Asset-based (net asset value, best for asset-heavy), and Transaction-based (deal multiples, best for M&A context)."
      }
    },
    {
      "@type": "Question",
      "name": "What inputs drive business valuation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Valuation inputs include: historical financials, projected cash flows, discount rate, market multiples, comparable data, asset values, liability amounts, growth assumptions, risk adjustments, and terminal value."
      }
    },
    {
      "@type": "Question",
      "name": "What adjustments modify valuation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Valuation adjustments include: Control premium (ownership benefit, 20-40% range), Liquidity discount (market access, 10-30% range), Synergy value (combination benefit, variable range), and Risk adjustment (uncertainty factor, variable range)."
      }
    },
    {
      "@type": "Question",
      "name": "When is business valuation needed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Applications include: M&A transactions, investment analysis, financial reporting, tax planning, estate planning, partner disputes, IPO preparation, and strategic planning. Valuation supports critical business decisions."
      }
    },
    {
      "@type": "Question",
      "name": "Why is business valuation important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business valuation enables informed decisions, supports transactions, guides negotiations, ensures fair pricing, and meets reporting requirements. Accurate valuation transforms subjective worth into objective value."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Valuation Methods Guide - Methods, Inputs & Adjustments',
  description: 'Valuation methods, required inputs, value adjustments, and common applications.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessValuationMethodsGuide />
    </Suspense>
  );
}
