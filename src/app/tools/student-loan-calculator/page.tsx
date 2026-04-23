import type { Metadata } from 'next';
import { Suspense } from 'react';
import StudentLoanCalculator from '@/components/StudentLoanCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the types of student loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Student loan types: Federal Direct Subsidized (government pays interest in school, need-based, rate ~5.50%). Federal Direct Unsubsidized (interest accrues immediately, not need-based, rate 5.50-7.05%). Federal PLUS (parent/graduate, credit check, rate ~8.05%). Private loans (banks, credit-based, rates 4-15%). Federal loans offer protections - income-driven plans, forgiveness, deferment. Private loans less flexible but may have lower rates for good credit."
      }
    },
    {
      "@type": "Question",
      "name": "What are income-driven repayment plans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Income-driven repayment: IBR (Income-Based Repayment) - 10-15% of discretionary income, forgiveness after 20-25 years. PAYE (Pay As You Earn) - 10% of discretionary income, capped at standard payment, forgiveness after 20 years. REPAYE (Revised PAYE) - 10% of discretionary income, no cap, forgiveness 20-25 years. ICR (Income-Contingent Repayment) - 20% or fixed 12-year. Benefits: affordable payments, forgiveness path. Downside: longer term = more interest, tax on forgiven amount."
      }
    },
    {
      "@type": "Question",
      "name": "Should I refinance my student loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Refinance decision: Good if - credit improved, stable income, private loans only, can get significantly lower rate. Consider if - federal loans with high rate, don&apos;t need income-driven plans, won&apos;t qualify for forgiveness. Avoid if - need income-driven plans, pursuing PSLF, federal protections important, credit poor. Refinancing federal loans PERMANENTLY loses federal benefits. Compare rates from multiple lenders. Even 1% lower rate saves thousands over term."
      }
    },
    {
      "@type": "Question",
      "name": "How do I pay off student loans faster?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Payoff faster: pay extra each month (reduces principal, saves interest), target highest-rate loans first (avalanche method), use windfalls (bonus, tax refund) for lump sum payments, set up auto-pay (often 0.25% discount), avoid extending term (lower payment = more interest), consider refinancing for lower rate, live below means to free cash for payments, employer student loan assistance programs. Extra payments go to principal (specify to servicer). Track progress for motivation."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I default on student loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Default consequences (after 270+ days missed): credit score damage (7 years), wage garnishment (up to 15% disposable income), tax refund seizure, Social Security benefit offset, loss of eligibility for deferment/forbearance/new federal aid, collection fees added (up to 25%), no bankruptcy discharge (student loans protected). Solution: contact servicer immediately before default. Options: rehabilitation (9 on-time payments), consolidation, income-driven plan. Default severe - act early, communicate with servicer."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Student Loan Guide - Loan Types, Repayment Plans & Strategies',
  description: 'Federal and private loan types, repayment options, payoff strategies, and tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StudentLoanCalculator />
    </Suspense>
  );
}