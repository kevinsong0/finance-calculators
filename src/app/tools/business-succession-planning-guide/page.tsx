import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessSuccessionPlanningGuide from '@/components/BusinessSuccessionPlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What levels require succession planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Succession planning levels include CEO succession for executive leadership with board involvement, executive succession for senior management with committee review, management succession for middle management with HR coordination, and technical succession for specialized roles with skill replacement approach."
      }
    },
    {
      "@type": "Question",
      "name": "What is the succession planning process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The succession planning process involves identifying critical positions, defining position requirements, assessing current talent pool, identifying potential successors, evaluating successor readiness, developing succession candidates, creating development plans, monitoring successor progress, updating succession plans, and executing succession events."
      }
    },
    {
      "@type": "Question",
      "name": "What criteria select successors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Successor selection criteria include performance track for results history with high importance, leadership potential for capability evaluation with critical importance, cultural fit for values alignment with high importance, and development readiness for skill gaps with medium importance."
      }
    },
    {
      "@type": "Question",
      "name": "What risks affect succession planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Succession planning risks include key person dependency, unplanned departures, talent pipeline gaps, inadequate preparation, poor transition execution, cultural disruption, knowledge loss, and stakeholder concerns."
      }
    },
    {
      "@type": "Question",
      "name": "Why implement succession planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Succession planning ensures leadership continuity through identifying positions, defining requirements, assessing talent pool, identifying successors, evaluating readiness, developing candidates, creating plans, monitoring progress, updating plans, and executing events smoothly."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Succession Planning Guide - Levels, Process & Criteria',
  description: 'Succession levels, planning process, selection criteria, and risk mitigation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessSuccessionPlanningGuide />
    </Suspense>
  );
}