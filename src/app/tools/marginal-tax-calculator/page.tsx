import type { Metadata } from 'next';
import { Suspense } from 'react';
import MarginalTaxCalculator from '@/components/MarginalTaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is marginal tax rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Marginal tax rate is the rate applied to your next dollar of income, based on your highest tax bracket. It determines how much tax you pay on additional income like raises, bonuses, or investment returns. Understanding marginal rate helps evaluate financial decisions."
      }
    },
    {
      "@type": "Question",
      "name": "How does crossing tax brackets affect additional income?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Crossing into a higher bracket means your additional income is taxed at the higher rate, not your entire income. Only the portion above the bracket threshold pays the higher rate. This is why the myth of 'making less by earning more' is false."
      }
    },
    {
      "@type": "Question",
      "name": "Why is marginal rate important for financial decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Marginal rate helps evaluate decisions: should you work extra hours, take a bonus now or later, contribute to traditional vs Roth accounts, or realize capital gains. Higher marginal rate favors tax-deferred accounts and timing income strategically."
      }
    },
    {
      "@type": "Question",
      "name": "How can I reduce my marginal tax rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduce taxable income through retirement contributions (401k, IRA), HSA contributions, charitable donations, tax-loss harvesting, and business expense deductions. Timing income across years can also optimize bracket positioning. Married filing jointly often provides lower brackets."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if a bonus pushes me into a higher bracket?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only the bonus amount above the bracket threshold is taxed at the higher rate. Your previous income still pays the lower rates. You still keep most of the bonus - for example, moving from 22% to 24% bracket means the extra income pays just 2% more tax."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Marginal Tax Calculator - Calculate Tax on Additional Income',
  description: 'Calculate the tax impact of raises, bonuses, and additional income at your marginal tax rate.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarginalTaxCalculator />
    </Suspense>
  );
}
