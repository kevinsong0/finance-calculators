import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessWorkforcePlanningGuide from '@/components/BusinessWorkforcePlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What components make workforce planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workforce planning components include demand forecasting for future needs through workload analysis, supply analysis for current workforce through skills inventory, gap analysis for differences through comparison modeling, and solution development for actions through strategy planning."
      }
    },
    {
      "@type": "Question",
      "name": "What is the workforce planning process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The workforce planning process involves analyzing business strategy, forecasting workforce demand, assessing current workforce, identifying workforce gaps, developing workforce plans, creating staffing strategies, planning talent development, implementing workforce actions, monitoring workforce metrics, and adjusting workforce plans."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect workforce planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workforce planning factors include business growth affecting headcount needs with expansion pace consideration, technology changes affecting skill evolution with automation consideration, turnover rates affecting replacement needs with retention consideration, and regulatory changes affecting compliance needs with legal consideration."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure workforce planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workforce planning metrics include headcount ratios, skill coverage, succession readiness, turnover rates, hiring effectiveness, development progress, workforce costs, and productivity metrics."
      }
    },
    {
      "@type": "Question",
      "name": "Why implement workforce planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workforce planning builds strategic capability through analyzing strategy, forecasting demand, assessing workforce, identifying gaps, developing plans, creating strategies, planning development, implementing actions, monitoring metrics, and adjusting plans."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Workforce Planning Guide - Components, Steps & Metrics',
  description: 'Workforce planning components, process steps, factors, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessWorkforcePlanningGuide />
    </Suspense>
  );
}