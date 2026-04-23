import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCostControlGuide from '@/components/BusinessCostControlGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What categories of business costs exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cost categories include direct costs (production-related controlling materials and labor), indirect costs (overhead controlling facilities and support), fixed costs (time-independent controlling rent and salaries), variable costs (volume-dependent controlling materials and utilities), semi-variable costs (partially fixed controlling utilities and labor), and opportunity costs (alternative foregone controlling decision analysis)."
      }
    },
    {
      "@type": "Question",
      "name": "What methods control business costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cost methods include cost accounting, activity-based costing, standard costing, variance analysis, cost allocation, break-even analysis, target costing, and life-cycle costing."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies reduce business costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Control strategies include eliminating waste (direct savings through lean principles), optimizing processes (efficiency gains through automation), negotiating terms (cost reduction through vendor management), and consolidating operations (scale savings through centralization)."
      }
    },
    {
      "@type": "Question",
      "name": "How should costs be monitored?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitoring activities include tracking cost trends, comparing to budget, analyzing variances, identifying outliers, reviewing cost drivers, benchmarking against peers, assessing cost efficiency, and reporting findings."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between fixed and variable costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fixed costs remain constant regardless of production volume (rent, salaries, insurance). Variable costs change directly with production volume (raw materials, direct labor, shipping). Understanding this distinction helps in break-even analysis, pricing decisions, and capacity planning."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Cost Control Guide - Categories, Methods & Strategies',
  description: 'Cost categories, control methods, strategies, and monitoring activities.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCostControlGuide />
    </Suspense>
  );
}