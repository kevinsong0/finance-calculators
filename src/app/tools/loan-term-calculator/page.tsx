import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoanTermCalculator from '@/components/LoanTermCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate how long it takes to pay off a loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a loan term calculator with principal amount, interest rate, and monthly payment. The formula: n = -log(1 - (P × r) / A) / log(1 + r), where P is principal, r is monthly rate, and A is payment. This calculator shows exact payoff timeline."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum monthly payment to pay off a loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimum payment must exceed the monthly interest (principal × monthly rate). If payment only covers interest, the loan never pays off. For $10,000 at 5% annual, minimum is about $42/month ($10,000 × 0.05/12). Add extra to actually reduce principal."
      }
    },
    {
      "@type": "Question",
      "name": "How much extra payment reduces loan term?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Extra payments go directly to principal, reducing balance faster. $100 extra monthly on a $10,000 5% loan with $200 payment can cut 3+ years off the term. The calculator shows payoff comparison for different payment amounts."
      }
    },
    {
      "@type": "Question",
      "name": "Should I pay off my loan early?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Early payoff saves interest but consider: loan type (mortgage, student, credit card), interest rate vs investment returns, prepayment penalties, tax deductions. Generally prioritize high-rate debt first, especially credit cards."
      }
    },
    {
      "@type": "Question",
      "name": "How is total interest calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Total interest = (monthly payment × number of payments) - principal. For $10,000 loan with $200/month over 56 months: total paid = $11,200, interest = $1,200. The calculator shows interest breakdown and amortization schedule."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Loan Term Calculator - Calculate Payoff Timeline by Monthly Payment',
  description: 'Free loan term calculator. Find out how long it takes to pay off your loan based on monthly payment, compare payoff by different amounts, and see interest savings.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LoanTermCalculator />
    </Suspense>
  );
}