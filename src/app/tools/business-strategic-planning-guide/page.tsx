import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessStrategicPlanningGuide from '@/components/BusinessStrategicPlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the levels of strategic planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategic planning levels include corporate strategy for overall direction and mission/vision, business strategy for competitive market position, functional strategy for department execution, and operational strategy for day-to-day implementation tactics."
      }
    },
    {
      "@type": "Question",
      "name": "What is the strategic planning process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The strategic planning process involves defining mission and vision, conducting strategic analysis, setting strategic objectives, developing strategic initiatives, creating implementation plans, allocating resources, executing actions, monitoring progress, evaluating outcomes, and adjusting strategy as needed."
      }
    },
    {
      "@type": "Question",
      "name": "What frameworks support strategic planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key strategic planning frameworks include SWOT analysis for strengths and weaknesses assessment, PESTEL analysis for external environment scanning, Porter Five Forces for industry competition analysis, and Balanced Scorecard for performance tracking and metrics alignment."
      }
    },
    {
      "@type": "Question",
      "name": "What elements are in a strategic plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategic plan elements include mission statement, vision statement, core values, strategic goals, key initiatives, resource allocation, implementation timeline, and performance metrics for tracking progress."
      }
    },
    {
      "@type": "Question",
      "name": "Why is strategic planning important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategic planning provides future direction by establishing mission and vision, conducting analysis, setting objectives, developing initiatives, creating plans, allocating resources, executing actions, monitoring progress, evaluating outcomes, and enabling strategic adjustments."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Strategic Planning Guide - Levels, Process & Frameworks',
  description: 'Strategic planning levels, process, frameworks, and plan elements.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessStrategicPlanningGuide />
    </Suspense>
  );
}