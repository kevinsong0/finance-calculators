import type { Metadata } from 'next';
import { Suspense } from 'react';
import FSACalculator from '@/components/FSACalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Health FSA contribution limit for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Health FSA contribution limit for 2026 is approximately $3,300 per employee. This limit is indexed annually for inflation. Employer contributions do not count toward this employee limit."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Dependent Care FSA limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Dependent Care FSA limit is $5,000 for single filers, married filing jointly, and head of household. Married filing separately can contribute $2,500 each. This limit is NOT indexed for inflation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the FSA use-it-or-lose-it rule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FSA funds must be spent by year-end or forfeited. However, employers may offer: carry-over up to $660 (2026) to next year, OR a grace period of 2.5 months (until March 15). Check your employer's plan features."
      }
    },
    {
      "@type": "Question",
      "name": "How much can I carry over in my Health FSA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For 2026, the IRS maximum carry-over is $660. Employers can choose to offer this feature (up to $660) or a grace period instead. Some employers may offer neither - funds would be forfeited if unspent."
      }
    },
    {
      "@type": "Question",
      "name": "What expenses qualify for Health FSA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Qualified expenses include: doctor visits, copays, deductibles, prescription medications, dental care (non-cosmetic), vision care, glasses, contacts, medical equipment, and over-the-counter medications (no prescription needed since 2020)."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'FSA Calculator - Flexible Spending Account Contribution & Tax Savings',
  description: 'Calculate FSA contribution limits, tax savings, and use-it-or-lose-it risk. Health FSA and Dependent Care FSA analysis for employees.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FSACalculator />
    </Suspense>
  );
}