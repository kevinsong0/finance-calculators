import type { Metadata } from 'next';
import { Suspense } from 'react';
import OpportunityCostCalculator from '@/components/OpportunityCostCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is opportunity cost in personal finance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Opportunity cost is the value of the best alternative forgone when making a decision. Every dollar spent is a dollar not invested. $1,000 spent today at 7% return loses $1,967 over 10 years in potential growth. Hidden cost compounds over time - factor into major purchases and daily decisions."
      }
    },
    {
      "@type": "Question",
      "name": "How do you calculate opportunity cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Opportunity cost = Future value of alternative investment - Future value of chosen option. Example: Spending $10,000 vs investing at 7% for 5 years. Investment FV = $10,000 x 1.07^5 = $14,026. Spending FV = $0. Opportunity cost = $14,026. Consider time horizon, expected returns, and inflation."
      }
    },
    {
      "@type": "Question",
      "name": "What are common examples of opportunity cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Car purchase: $30K spent vs invested = $60K lost over 10 years. Daily coffee: $5/day = $18K over 20 years at 7%. Extended warranty: Often poor value vs self-insuring. Cable TV: $100/month = $28K over 20 years. New phone annually: $800/year = $16K over 10 years. Small daily decisions compound."
      }
    },
    {
      "@type": "Question",
      "name": "Should I consider opportunity cost before spending?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, ask: What else could I do with this money? Calculate lost returns if invested instead. Consider time horizon - longer = larger opportunity cost. Weigh immediate benefit vs long-term cost. Essential spending (needs) vs discretionary (wants). Apply framework to career moves, education, major purchases."
      }
    },
    {
      "@type": "Question",
      "name": "How does opportunity cost affect financial decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Opportunity cost reveals hidden costs of decisions. Spending $5 daily costs $18K over 20 years in lost investment returns. Helps prioritize needs vs wants. Encourages long-term thinking over instant gratification. Applies to career choices, education, time allocation, investments. Every choice has alternatives - calculate their value."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Opportunity Cost Calculator - Hidden Cost of Spending vs Investing',
  description: 'Calculate opportunity cost of spending decisions. Compare spending vs investing alternatives and see long-term impact on wealth.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OpportunityCostCalculator />
    </Suspense>
  );
}