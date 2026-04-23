import type { Metadata } from 'next';
import { Suspense } from 'react';
import CompoundInterestComparison from '@/components/CompoundInterestComparison';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I compare compound interest rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compare compound interest: use comparison calculator. Input same principal, different rates, same time period. Calculate final values. Difference shows rate impact. Example: $10k at 5% for 30 years = $43k, at 7% = $76k ($33k more). Rate differences compound exponentially. Longer periods = bigger differences."
      }
    },
    {
      "@type": "Question",
      "name": "What is the impact of 1% higher interest rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1% higher rate impact: $10k principal, 30 years. 5% = $43,219. 6% = $57,435 (+$14k). 7% = $76,123 (+$33k from 5%). Each 1% increase compounds exponentially. Early years: small difference. Later years: huge difference. Over 30 years, 2% difference can double returns. Rate matters significantly for long-term investments."
      }
    },
    {
      "@type": "Question",
      "name": "How do contributions affect compound interest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contributions compound: annual $1k contribution at 7% for 30 years adds $101k to final value. Contributions compound same as principal. Starting early with contributions maximizes effect. Regular contributions more powerful than larger initial principal. Example: $0 principal + $1k/year for 30 years at 7% = $101k. Consistent saving beats one-time investing."
      }
    },
    {
      "@type": "Question",
      "name": "Should I invest at higher risk for higher returns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Higher risk/reward: compare expected returns. Calculate compound difference. Consider: risk tolerance, time horizon, goals. Higher rate potential but volatility. Lower rate = safer, guaranteed. Comparison shows potential gain. Example: 5% safe vs 7% risky - $33k more over 30 years. Balance: safety vs growth potential."
      }
    },
    {
      "@type": "Question",
      "name": "How does time affect compound interest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Time impact: compound interest exponential. Year 1-10: moderate growth. Year 10-20: acceleration. Year 20-30: explosive growth. Example: $10k at 7%. 10 years: $19k. 20 years: $38k. 30 years: $76k. Later years double earlier years. Start early for maximum effect. Time most important factor in compounding."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Compound Interest Comparison - Compare Two Investment Scenarios',
  description: 'Compare compound interest scenarios side by side. Different rates, principals, contributions. See year-by-year difference.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CompoundInterestComparison />
    </Suspense>
  );
}