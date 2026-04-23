import type { Metadata } from 'next';
import { Suspense } from 'react';
import DiscountCalculator from '@/components/DiscountCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate a discount percentage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Discount amount = Original price × (Discount percentage / 100). Sale price = Original price - Discount amount. For a $100 item at 20% off: Discount = $100 × 0.20 = $20. Sale price = $100 - $20 = $80."
      }
    },
    {
      "@type": "Question",
      "name": "How do stacked discounts work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stacked discounts apply sequentially, not additively. A 20% discount plus an extra 10% does NOT equal 30% off. First apply 20%: $100 → $80. Then apply 10% to the result: $80 → $72. Total effective discount is 28%, not 30%."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate the final price with tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Final price = Sale price × (1 + Tax rate/100). For $80 sale price with 8% tax: $80 × 1.08 = $86.40. Always calculate tax on the discounted price, not the original price."
      }
    },
    {
      "@type": "Question",
      "name": "Is a bigger percentage discount always better?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not necessarily. Compare the final dollar savings, not percentages. 50% off $20 saves $10. 20% off $100 saves $20. The lower percentage discount saves more money when the base price is higher."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good discount for shopping?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good discounts vary by category: electronics often 10-20%, clothing 30-50% during sales, groceries rarely more than 20%. Seasonal sales like Black Friday offer 30-70% on select items. Compare to regular prices at other stores."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Discount Calculator - Sale Price & Stacked Discount Tool',
  description: 'Calculate sale prices, stacked discounts, and final costs with tax. Make smarter shopping decisions.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DiscountCalculator />
    </Suspense>
  );
}