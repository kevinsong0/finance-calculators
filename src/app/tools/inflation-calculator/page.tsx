import type { Metadata } from 'next';
import { Suspense } from 'react';
import InflationCalculator from '@/components/InflationCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is inflation and how does it affect my money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inflation is the rate at which prices increase over time, reducing the purchasing power of your money. A 3% inflation rate means $100 today will only buy what $97 could last year. Over 10 years, $100 becomes worth only about $74 in real terms."
      }
    },
    {
      "@type": "Question",
      "name": "What is the current US inflation rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "US inflation rates vary by year. Recent averages: 2023-2024 around 3-4%, peak of 2022 at 9%, and historical average of 2-3% over decades. Check current CPI data from the Bureau of Labor Statistics for latest rates."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate future purchasing power?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Future purchasing power = Current amount ÷ (1 + inflation rate)^years. For example, $10,000 at 3% inflation for 10 years: $10,000 ÷ 1.03^10 = $7,441. Your $10,000 will only buy what $7,441 buys today."
      }
    },
    {
      "@type": "Question",
      "name": "How much money do I need in the future to match today's value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Future value needed = Current amount × (1 + inflation rate)^years. $10,000 at 3% for 10 years: $10,000 × 1.03^10 = $13,439. You need $13,439 in 10 years to have the same purchasing power as $10,000 today."
      }
    },
    {
      "@type": "Question",
      "name": "What investments beat inflation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investments that typically beat inflation include: stocks (historical 7-10% returns), real estate (property appreciation), Treasury I Bonds (inflation-adjusted), and high-yield savings accounts (currently 4-5%). Cash loses value due to inflation."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Inflation Calculator - Purchasing Power Over Time',
  description: 'Calculate how inflation erodes your money\'s purchasing power. See what your savings will be worth in the future.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InflationCalculator />
    </Suspense>
  );
}