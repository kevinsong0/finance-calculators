import type { Metadata } from 'next';
import { Suspense } from 'react';
import BudgetAllocator from '@/components/BudgetAllocator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 50/30/20 budgeting rule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 50/30/20 rule divides after-tax income: 50% for needs (housing, food, utilities, transportation), 30% for wants (entertainment, dining, hobbies), 20% for savings (emergency fund, retirement, debt payoff). Simple framework for balanced budget allocation."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I budget for housing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Housing should stay under 30% of gross income. High-cost areas may require 35-40%. Calculate rent/mortgage, utilities, insurance, maintenance combined. Exceeding 30% strains other categories. Consider housing alternatives if costs too high relative to income."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create a realistic budget?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Track spending for 1-2 months first. Categorize all expenses. Compare actual spending to income. Adjust allocations based on reality. Build buffer for unexpected costs. Automate savings category. Review monthly and adjust based on actual patterns."
      }
    },
    {
      "@type": "Question",
      "name": "What if my expenses exceed my budget?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Identify overspending categories. Cut discretionary spending first. Negotiate recurring bills. Consider lifestyle changes to reduce fixed costs. Increase income through side work. Prioritize essential expenses. Build budget gradually - don't over-restrict initially."
      }
    },
    {
      "@type": "Question",
      "name": "Should I budget differently if I have debt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, allocate extra to debt payoff temporarily. Reduce wants category to 15-20%, increase savings/debt to 30%. Minimum debt payments are needs. Extra payments come from savings category. After debt payoff, redirect payment amounts to savings."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Budget Allocator - Visual Category Breakdown',
  description: 'Allocate monthly budget across categories with visual percentage breakdown.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BudgetAllocator />
    </Suspense>
  );
}
