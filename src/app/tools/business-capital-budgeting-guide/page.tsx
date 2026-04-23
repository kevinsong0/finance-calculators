import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCapitalBudgetingGuide from '@/components/BusinessCapitalBudgetingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What methods are used in capital budgeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capital budgeting methods include: NPV analysis (net present value calculation for value measurement), IRR analysis (internal rate of return for return rate), Payback analysis (investment recovery time for time horizon), and Profitability index (benefit-cost ratio for relative value)."
      }
    },
    {
      "@type": "Question",
      "name": "What steps are involved in capital budgeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capital budgeting steps include: identify investment opportunities, estimate cash flows, determine discount rate, calculate NPV, calculate IRR, assess payback period, evaluate risk factors, compare alternatives, rank investment options, and make investment decision."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect capital budgeting decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow factors include: Initial investment (outflow, immediate), Operating cash flows (inflow, periodic), Terminal value (inflow, end period), and Discount rate (rate, applied throughout). These factors determine project viability."
      }
    },
    {
      "@type": "Question",
      "name": "What risks affect capital investments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investment risks include: cash flow uncertainty, discount rate estimation, project duration risk, technology obsolescence, market condition changes, regulatory changes, competition impact, and execution capability."
      }
    },
    {
      "@type": "Question",
      "name": "Why is capital budgeting important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capital budgeting ensures wise investments, optimizes capital allocation, evaluates project viability, manages investment risks, and maximizes shareholder value. Proper budgeting transforms capital decisions from guesses into strategic choices."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Capital Budgeting Guide - Methods, Process & Factors',
  description: 'Budgeting methods, process steps, cash flow factors, and investment risks.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCapitalBudgetingGuide />
    </Suspense>
  );
}