import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessSupplierPerformanceManagementGuide from '@/components/BusinessSupplierPerformanceManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What criteria are used to evaluate supplier performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supplier performance is evaluated using six criteria: Quality (defect rate, high weight), Delivery (on-time rate, high weight), Cost (price competitiveness, medium weight), Service (response quality, medium weight), Flexibility (adaptability, low weight), and Innovation (new solutions, low weight)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the supplier performance management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The supplier performance management process involves 10 steps: set performance standards, define measurement metrics, collect performance data, calculate performance scores, analyze performance trends, identify performance issues, develop improvement plans, communicate performance results, implement improvement actions, and review performance changes."
      }
    },
    {
      "@type": "Question",
      "name": "What methods are used to assess supplier performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Assessment methods include: Scorecards (multi-criteria rating for comprehensive view), KPI tracking (key metrics monitoring for focus clarity), Audits (on-site evaluation for deep insight), and Surveys (stakeholder feedback for perspective breadth)."
      }
    },
    {
      "@type": "Question",
      "name": "What actions can be taken based on supplier performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Response actions range from positive to corrective: recognition programs, development support, performance bonuses, capacity changes for strong performers; and warning notices, remediation plans, contract adjustments, vendor replacement for underperforming suppliers."
      }
    },
    {
      "@type": "Question",
      "name": "Why is supplier performance management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supplier performance management ensures supply quality, reduces risks, improves product quality, controls costs, and builds stronger supplier partnerships. It provides systematic oversight of supplier contributions to business success."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Supplier Performance Management Guide - Criteria & Process',
  description: 'Performance criteria, management process, assessment methods, and response actions for supplier performance.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessSupplierPerformanceManagementGuide />
    </Suspense>
  );
}