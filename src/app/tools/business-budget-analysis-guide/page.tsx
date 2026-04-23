import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessBudgetAnalysisGuide from '@/components/BusinessBudgetAnalysisGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What budgeting methods exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budgeting methods include incremental budgeting (based on previous budget, simple and stable), zero-based budgeting (start from zero, cost justification), activity-based budgeting (based on activities, cost accuracy), value proposition budgeting (based on value created, outcome focus), flexible budgeting (based on activity levels, adaptability), and rolling budgeting (continuous update, timeliness)."
      }
    },
    {
      "@type": "Question",
      "name": "What are the budget preparation steps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget steps include setting budget objectives, defining budget period, identifying budget items, estimating revenues, estimating expenses, allocating resources, setting budget targets, reviewing and approving, implementing budget, and monitoring performance."
      }
    },
    {
      "@type": "Question",
      "name": "What analysis types apply to budgets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Analysis types include variance analysis, trend analysis, ratio analysis, performance comparison, forecasting accuracy, cost efficiency, resource utilization, and ROI measurement."
      }
    },
    {
      "@type": "Question",
      "name": "What actions respond to budget variances?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Response actions include identifying variances (triggered by budget vs actual comparison, investigating causes), adjusting forecasts (triggered by significant changes, updating budget), controlling spending (triggered by over budget areas, implementing limits), and reallocating resources (triggered by priority changes, modifying allocation)."
      }
    },
    {
      "@type": "Question",
      "name": "How should budget variances be analyzed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget variances should be analyzed by comparing actual to budget, calculating variance amounts and percentages, categorizing variances as favorable or unfavorable, identifying root causes, assessing impact on operations, determining if variances are temporary or permanent, and taking appropriate corrective actions."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Budget Analysis Guide - Methods, Steps & Analysis',
  description: 'Budgeting methods, preparation steps, analysis types, and response actions.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessBudgetAnalysisGuide />
    </Suspense>
  );
}