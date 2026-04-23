import type { Metadata } from 'next';
import { Suspense } from 'react';
import TaxBracketCalculator from '@/components/TaxBracketCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the 2024 federal tax brackets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2024 single filer brackets: 10% ($0-$11,600), 12% ($11,600-$47,150), 22% ($47,150-$100,525), 24% ($100,525-$191,950), 32% ($191,950-$243,725), 35% ($243,725-$609,350), 37% (over $609,350). Married filing jointly brackets are doubled."
      }
    },
    {
      "@type": "Question",
      "name": "How does progressive taxation work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Progressive taxation applies different rates to different income levels. Each bracket only taxes income within that range. For example, at $50,000 income, you pay 10% on the first $11,600, then 12% on income between $11,600 and $47,150, then 22% on the remaining amount."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between marginal and effective tax rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Marginal rate is your highest tax bracket rate, applied to additional income. Effective rate is your average tax rate across all brackets, calculated as total tax divided by total income. Effective rate is always lower than marginal rate due to progressive taxation."
      }
    },
    {
      "@type": "Question",
      "name": "Do tax brackets adjust for inflation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, IRS adjusts tax brackets annually for inflation. This prevents bracket creep where inflation pushes taxpayers into higher brackets without real income increase. Bracket adjustments are announced each fall for the following tax year."
      }
    },
    {
      "@type": "Question",
      "name": "How does filing status affect tax brackets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Married filing jointly brackets are approximately double single brackets, providing lower rates for married couples. Head of household has intermediate brackets. Filing status choice significantly impacts total tax owed, especially at higher income levels."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Tax Bracket Calculator - Calculate Federal Income Tax by Bracket',
  description: 'Calculate federal income tax based on progressive tax brackets and filing status.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TaxBracketCalculator />
    </Suspense>
  );
}
