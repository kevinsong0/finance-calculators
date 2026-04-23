import type { Metadata } from 'next';
import { Suspense } from 'react';
import PercentageCalculator from '@/components/PercentageCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate percentage of a number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Percentage of a number = Number × (Percentage / 100). For 25% of 80: 80 × 0.25 = 20. Convert percentage to decimal by dividing by 100, then multiply."
      }
    },
    {
      "@type": "Question",
      "name": "How do I find what percent one number is of another?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Percentage = (Part / Total) × 100. For example, 20 is what percent of 80: (20 / 80) × 100 = 25%. Divide the part by the total, then multiply by 100."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate percent change?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Percent change = ((New - Original) / Original) × 100. Positive result is increase, negative is decrease. From 80 to 100: (100 - 80) / 80 × 100 = 25% increase."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate percentage increase?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "New value = Original × (1 + Percentage/100). For $50 with 20% increase: $50 × 1.20 = $60. Add 1 to the decimal form of percentage and multiply."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between percent change and percent difference?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Percent change uses the original as base: (New-Old)/Old. Percent difference uses average as base: |A-B|/(A+B)/2. Use change when tracking growth over time, difference when comparing two unrelated values."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Percentage Calculator - Percent Change, Increase, Decrease',
  description: 'Calculate percentages, percent change, increases, decreases, and percentage of numbers. Multiple calculation modes.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PercentageCalculator />
    </Suspense>
  );
}