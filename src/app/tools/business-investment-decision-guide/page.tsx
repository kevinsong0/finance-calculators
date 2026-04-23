import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessInvestmentDecisionGuide from '@/components/BusinessInvestmentDecisionGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What criteria guide investment decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Decision criteria include: Financial return (NPV, IRR, ROI, primary importance), Strategic fit (alignment with goals, high importance), Risk level (uncertainty assessment, high importance), and Resource availability (capital, talent, time, medium importance)."
      }
    },
    {
      "@type": "Question",
      "name": "What frameworks are used for investment decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Decision frameworks include: NPV decision rule, IRR threshold rule, payback period rule, profitability index rule, strategic alignment matrix, risk-adjusted return, multi-criteria scoring, decision tree analysis, real options analysis, and scenario-based decision."
      }
    },
    {
      "@type": "Question",
      "name": "What considerations affect investment decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key considerations include: Time horizon (long vs short term, fit with strategy), Cash requirements (capital intensity, affordability), Risk tolerance (uncertainty acceptance, risk capacity), and Opportunity cost (alternative foregone, relative value)."
      }
    },
    {
      "@type": "Question",
      "name": "What outcomes can investment decisions produce?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Decision outcomes include: accept investment, reject investment, delay investment, modify investment, seek alternatives, reduce scale, stage investment, and exit investment. Each outcome reflects different risk-return trade-offs."
      }
    },
    {
      "@type": "Question",
      "name": "Why is investment decision framework important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investment decision frameworks provide systematic evaluation, ensure consistent criteria, reduce emotional bias, optimize capital allocation, and improve investment outcomes. Structured decisions outperform gut decisions."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Investment Decision Guide - Criteria, Frameworks & Outcomes',
  description: 'Decision criteria, frameworks, key considerations, and possible outcomes for investments.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessInvestmentDecisionGuide />
    </Suspense>
  );
}