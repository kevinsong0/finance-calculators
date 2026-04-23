import type { Metadata } from 'next';
import { Suspense } from 'react';
import SavingsGoalTracker from '@/components/SavingsGoalTracker';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I set realistic savings goals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set SMART goals: Specific (exact amount), Measurable (track progress), Achievable (based on income), Relevant (matches priorities), Time-bound (deadline). Break large goals into milestones. Start with emergency fund (3-6 months expenses) before other savings goals."
      }
    },
    {
      "@type": "Question",
      "name": "What percentage of income should I save?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ideally save 15-20% of income: 10% for retirement, 5-10% for short-term goals. Minimum 10% if budget is tight. Higher income allows higher savings rate. The 50/30/20 rule allocates 20% to savings. FIRE movement targets 50%+ savings rate."
      }
    },
    {
      "@type": "Question",
      "name": "How do milestone checkpoints help savings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Milestones provide motivation and progress tracking. Celebrate 25%, 50%, 75% achievements. They break intimidating goals into achievable steps. Research shows milestone-based saving increases completion rates by 40%. Set milestone rewards to boost motivation."
      }
    },
    {
      "@type": "Question",
      "name": "How long should it take to reach savings goals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Emergency fund: 6-12 months to reach 3-6 months expenses. House down payment: 2-5 years for 20% down. Vacation: 3-6 months. Retirement savings: continuous throughout working years. Set realistic timelines based on monthly savings capacity and goal size."
      }
    },
    {
      "@type": "Question",
      "name": "What if I fall behind on savings goals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Review budget to find additional savings opportunities. Increase income through side work or negotiations. Adjust timeline if goal unrealistic. Automate savings to ensure consistency. Consider lower initial goal then scale up. Don't abandon goal entirely - adjust and continue."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Savings Goal Tracker - Track Progress with Milestones',
  description: 'Track savings progress toward your financial goals with milestone checkpoints.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SavingsGoalTracker />
    </Suspense>
  );
}
