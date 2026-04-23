import type { Metadata } from 'next';
import { Suspense } from 'react';
import BudgetPlannerCalculator from '@/components/BudgetPlannerCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 50/30/20 budget rule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 50/30/20 rule divides your after-tax income into three categories: 50% for needs (essential expenses like housing and groceries), 30% for wants (non-essential spending like entertainment), and 20% for savings and debt repayment."
      }
    },
    {
      "@type": "Question",
      "name": "What counts as 'needs' in the 50/30/20 rule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Needs include essential expenses you must pay: rent/mortgage, utilities, groceries, transportation, insurance, minimum debt payments, and healthcare costs. These are expenses you cannot avoid."
      }
    },
    {
      "@type": "Question",
      "name": "What counts as 'wants' in budget planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wants are non-essential expenses that enhance your lifestyle: dining out, entertainment, hobbies, vacations, subscriptions, shopping for non-essentials, and gym memberships. You can live without these but they make life enjoyable."
      }
    },
    {
      "@type": "Question",
      "name": "Should I adjust the 50/30/20 rule for my situation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the 50/30/20 rule is a guideline, not a strict rule. If you have high debt, you may need to allocate more to savings/debt repayment. In expensive cities, needs might exceed 50%. Adjust percentages based on your circumstances."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate my monthly after-tax income?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use your actual take-home pay from paychecks, not your gross salary. Include all income sources: salary, freelance income, side gigs. Subtract taxes, health insurance premiums, and other deductions to get your net monthly income."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Budget Planner Calculator - 50/30/20 Rule Budgeting Tool',
  description: 'Plan your monthly budget using the 50/30/20 rule. Allocate income to needs, wants, and savings with visual breakdown.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BudgetPlannerCalculator />
    </Suspense>
  );
}