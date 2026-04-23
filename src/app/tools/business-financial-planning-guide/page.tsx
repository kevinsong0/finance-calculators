import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFinancialPlanningGuide from '@/components/BusinessFinancialPlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the components of financial planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial planning components include: Revenue planning (sales forecasts, pricing for income projection), Expense planning (cost budgets, allocations for spending control), Capital planning (investments, funding for growth resources), and Cash planning (liquidity, reserves for financial stability)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the financial planning process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The planning process involves 10 steps: set financial goals, analyze current position, project future performance, develop financial strategies, create financial budgets, allocate financial resources, implement financial plans, monitor financial progress, adjust financial plans, and review financial outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "What tools are used in financial planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Planning tools include: Budget models (spending planning for cost control), Forecast models (revenue projection for planning accuracy), Scenario analysis (alternative outcomes for risk awareness), and Variance analysis (actual vs planned for performance insight)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure financial planning success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: revenue growth rate, expense ratio, profit margin, cash position, return on investment, financial leverage, working capital, and financial efficiency. These metrics track planning effectiveness."
      }
    },
    {
      "@type": "Question",
      "name": "Why is financial planning important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial planning provides direction, controls spending, allocates resources, guides growth, and measures performance. Effective planning transforms financial management from reactive to proactive strategic capability."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Financial Planning Guide - Components, Process & Tools',
  description: 'Planning components, process steps, planning tools, and success metrics for financial management.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFinancialPlanningGuide />
    </Suspense>
  );
}