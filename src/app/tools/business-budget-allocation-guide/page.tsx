import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessBudgetAllocationGuide from '@/components/BusinessBudgetAllocationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What methods are used for budget allocation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget allocation methods include: Percentage allocation (allocate by percentage ratios for flexibility), Incremental budgeting (adjust previous budgets for simplicity), Zero-based budgeting (start from scratch each period for efficiency), and Activity-based budgeting (fund by activities for alignment)."
      }
    },
    {
      "@type": "Question",
      "name": "What are common budget categories?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget categories include: operating expenses, capital expenditures, personnel costs, marketing spend, research investment, administrative costs, contingency reserves, and growth initiatives. Each category serves different business needs."
      }
    },
    {
      "@type": "Question",
      "name": "What principles guide budget allocation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Allocation principles include: Strategic alignment (match business goals for purpose-driven budgets), Resource optimization (maximize efficiency for value creation), Flexibility balance (fixed vs variable for adaptability), and Accountability (clear ownership for responsibility)."
      }
    },
    {
      "@type": "Question",
      "name": "What steps are involved in budget allocation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Allocation steps include: assess strategic priorities, determine total budget, identify allocation needs, evaluate allocation options, set allocation proportions, distribute budget amounts, monitor allocation usage, adjust allocations dynamically, review allocation outcomes, and optimize allocation process."
      }
    },
    {
      "@type": "Question",
      "name": "Why is budget allocation important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget allocation strategically distributes resources to maximize business value, align spending with goals, optimize efficiency, and enable accountability. Proper allocation transforms budgets into strategic tools."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Budget Allocation Guide - Methods, Categories & Principles',
  description: 'Allocation methods, budget categories, guiding principles, and implementation steps.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessBudgetAllocationGuide />
    </Suspense>
  );
}