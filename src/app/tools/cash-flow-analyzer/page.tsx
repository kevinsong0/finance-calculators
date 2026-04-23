import type { Metadata } from 'next';
import { Suspense } from 'react';
import CashFlowAnalyzer from '@/components/CashFlowAnalyzer';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is cash flow analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow analysis compares income inflows to expense outflows. Net cash flow = Income - Expenses. Positive cash flow (surplus) enables saving and investing. Negative cash flow (deficit) requires borrowing or asset liquidation. Regular analysis identifies spending patterns and optimization opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good savings rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimum 10% savings rate for basic financial health. Ideal 15-20% for comfortable retirement. High savings rate 25-50% for early retirement (FIRE). Calculate savings rate: (Amount saved / Gross income) × 100. Higher income enables higher savings rates."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve negative cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Identify largest expense categories for reduction opportunities. Cut discretionary spending first. Negotiate recurring bills. Increase income through overtime, side work, or career advancement. Build emergency fund to avoid debt during deficits. Review monthly subscriptions. Automate savings before discretionary spending."
      }
    },
    {
      "@type": "Question",
      "name": "What expense ratio is healthy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Expense ratio (excluding savings) should stay under 80% of income. 50-70% leaves room for comfortable savings. Under 50% enables aggressive wealth building. Track actual expenses vs budget. Rising expense ratio signals lifestyle inflation or income stagnation requiring attention."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I analyze cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monthly analysis catches issues early and tracks progress. Weekly check for spending awareness. Quarterly for passive monitoring. Use budgeting apps or spreadsheet. Compare actual to budgeted amounts. Adjust spending based on analysis findings. Consistent tracking enables proactive financial management."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Cash Flow Analyzer - Income vs Expense Analysis',
  description: 'Analyze monthly cash flow to optimize savings rate and spending patterns.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CashFlowAnalyzer />
    </Suspense>
  );
}
