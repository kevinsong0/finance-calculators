import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessPerformanceManagementGuide from '@/components/BusinessPerformanceManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the dimensions of performance management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance management dimensions include financial performance for revenue, profit, and ROI, operational performance for efficiency, quality, and speed, customer performance for satisfaction and retention, employee performance for productivity and engagement, strategic performance for goals and initiatives, and innovation performance for pipeline and patents."
      }
    },
    {
      "@type": "Question",
      "name": "What is the performance management cycle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The performance management cycle involves setting performance goals, defining performance metrics, measuring actual performance, comparing to targets, identifying performance gaps, analyzing root causes, developing improvement plans, implementing improvements, monitoring progress, and reviewing and adjusting."
      }
    },
    {
      "@type": "Question",
      "name": "What methods support performance management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance management methods include KPI tracking for key metrics dashboard visibility, Balanced Scorecard for multi-dimensional alignment, OKR framework for objectives and key results focus, and Performance reviews for periodic assessment feedback."
      }
    },
    {
      "@type": "Question",
      "name": "What are key performance metrics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key performance metrics include revenue growth, profit margin, customer satisfaction, employee productivity, process efficiency, quality metrics, strategic goal progress, and innovation pipeline size."
      }
    },
    {
      "@type": "Question",
      "name": "Why is performance management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance management drives continuous improvement through goal setting, metric definition, measurement, comparison, gap identification, root cause analysis, improvement planning, implementation, progress monitoring, and regular review and adjustment."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Performance Management Guide - Dimensions, Cycle & Metrics',
  description: 'Performance dimensions, management cycle, methods, and key metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessPerformanceManagementGuide />
    </Suspense>
  );
}