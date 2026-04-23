import type { Metadata } from 'next';
import { Suspense } from 'react';
import CreditUtilizationCalculator from '@/components/CreditUtilizationCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is credit utilization ratio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit utilization ratio is the percentage of your available credit that you're currently using. Formula: (Total Credit Card Balances / Total Credit Limits) × 100. Example: $3,000 balance on $10,000 limit = 30% utilization. This ratio significantly impacts your credit score."
      }
    },
    {
      "@type": "Question",
      "name": "What is the ideal credit utilization percentage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under 10% is excellent for maximizing credit score. Under 30% is generally recommended and considered good. Over 50% significantly hurts your score. Most experts suggest keeping utilization under 30% on each card and across all cards combined."
      }
    },
    {
      "@type": "Question",
      "name": "How does credit utilization affect credit score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit utilization accounts for 30% of your FICO score (second largest factor after payment history). High utilization signals financial stress and risky borrowing behavior. Lowering utilization can improve your score within 30-45 days as bureaus update. It's the fastest way to boost your score."
      }
    },
    {
      "@type": "Question",
      "name": "How can I lower my credit utilization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Methods: pay down balances before statement closes, request credit limit increases, spread balances across multiple cards, avoid closing old cards (keeps total limit high), make multiple payments per month. Paying before the statement date ensures lower balance is reported to bureaus."
      }
    },
    {
      "@type": "Question",
      "name": "Does credit utilization matter if I pay in full?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, utilization matters even if you pay in full. Credit bureaus see your balance when reported (usually at statement close), not after payment. To minimize utilization impact: pay before statement date, not just before due date. This ensures low balance is reported."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Credit Utilization Calculator - Improve Your Credit Score',
  description: 'Calculate credit utilization ratio and its impact on your credit score. Learn optimal utilization targets and strategies to improve your credit.',
  keywords: ['credit utilization calculator', 'credit utilization ratio', 'credit score', 'credit card balance', 'FICO score', 'credit limit', 'improve credit', 'credit utilization percentage'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CreditUtilizationCalculator />
    </Suspense>
  );
}