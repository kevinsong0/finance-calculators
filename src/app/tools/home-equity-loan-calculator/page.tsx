import type { Metadata } from 'next';
import { Suspense } from 'react';
import HomeEquityLoanCalculator from '@/components/HomeEquityLoanCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between HELOC and home equity loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HELOC: Variable rate, flexible access during draw period (5-10 years), interest-only payments possible, reusable credit line, risk of rate increases. Home Equity Loan: Fixed rate, lump sum disbursement, fixed monthly payments, predictable costs, one-time borrowing. Choose HELOC for ongoing needs, home equity loan for one-time expenses."
      }
    },
    {
      "@type": "Question",
      "name": "How much can I borrow with a home equity loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most lenders allow combined LTV of 80-85% (mortgage + equity loan). Example: $400K home, $200K mortgage, 85% max LTV = $340K total debt allowed. Max equity loan = $340K - $200K = $140K. Credit score, income, and debt-to-income ratio affect approval and rate."
      }
    },
    {
      "@type": "Question",
      "name": "Is home equity loan interest tax deductible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if used for home improvements (buy, build, substantially improve). TCJA 2018 suspended deduction for other uses (debt consolidation, personal expenses) through 2025. Deduction limited to $750K total mortgage debt. Consult tax advisor. Keep records showing funds used for eligible improvements."
      }
    },
    {
      "@type": "Question",
      "name": "What credit score do I need for home equity loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimum 620, but 700+ preferred for best rates. 740+ gets lowest rates (0.5% discount). Below 660 may face higher rates or denial. Lenders also consider: Debt-to-income ratio (under 43%), equity percentage (15%+), employment history, property value. Shop multiple lenders for best terms."
      }
    },
    {
      "@type": "Question",
      "name": "What are the risks of home equity loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Home as collateral: Foreclosure risk if you default. HELOC variable rates: Can increase significantly. Closing costs: 2-5% of loan amount. Resets mortgage clock: If refinancing combined. Overborrowing risk: Temptation to use for non-essential spending. Avoid for: vacations, luxury purchases, speculative investments."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Home Equity Loan Calculator - HELOC vs Home Equity Loan Comparison',
  description: 'Calculate home equity loan and HELOC options. Compare payments, rates, and alternatives like personal loans. Estimate tax savings.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeEquityLoanCalculator />
    </Suspense>
  );
}