import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessPerformanceReviewGuide from '@/components/BusinessPerformanceReviewGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of performance reviews exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance review types include annual review for comprehensive once yearly assessment, quarterly review for regular four times yearly feedback, monthly check-in for ongoing monthly dialogue, and project-based review for outcome evaluation at project completion."
      }
    },
    {
      "@type": "Question",
      "name": "What is the performance review process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The performance review process involves setting review objectives, preparing review materials, gathering performance data, collecting stakeholder input, completing self-assessment, conducting review meeting, discussing performance results, setting development goals, creating action plans, and following up on progress."
      }
    },
    {
      "@type": "Question",
      "name": "What methods evaluate performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance evaluation methods include rating scales for numerical evaluation providing quantifiable data, behavioral anchors for specific behaviors providing objective assessment, narrative review for written feedback providing contextual understanding, and 360-degree feedback for multi-source input providing comprehensive view."
      }
    },
    {
      "@type": "Question",
      "name": "What outcomes come from performance reviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance review outcomes include performance ratings documented, development needs identified, goals and objectives set, compensation decisions informed, career path clarified, training plans created, strengths recognized, and improvement areas addressed."
      }
    },
    {
      "@type": "Question",
      "name": "Why conduct performance reviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance reviews drive continuous improvement through setting objectives, preparing materials, gathering data, collecting input, completing self-assessment, conducting meetings, discussing results, setting goals, creating plans, and following up on progress."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Performance Review Guide - Types, Process & Methods',
  description: 'Performance review types, process, evaluation methods, and outcomes.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessPerformanceReviewGuide />
    </Suspense>
  );
}