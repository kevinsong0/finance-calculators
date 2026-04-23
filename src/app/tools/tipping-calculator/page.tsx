import type { Metadata } from 'next';
import { Suspense } from 'react';
import TippingCalculator from '@/components/TippingCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the standard tipping percentage in restaurants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard tipping percentages in US restaurants range from 15-25%. 15% is considered acceptable for basic service, 18-20% for good service, and 22-25% for excellent service. Many people use 20% as a simple baseline."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate tip on a split bill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To calculate tip on a split bill, first add the tip percentage to the total bill amount, then divide by the number of people. For example, a $100 bill with 20% tip = $120. Split between 4 people = $30 each."
      }
    },
    {
      "@type": "Question",
      "name": "Should I round up when splitting a bill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rounding up each person's share is common practice and ensures the full bill is covered. It also adds a small extra tip for the server. This calculator has a round-up option for convenience."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I tip for delivery services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For food delivery, 15-20% of the order total or $3-5 minimum is standard. Consider distance, weather conditions, and order size. For large orders or difficult conditions, consider tipping more."
      }
    },
    {
      "@type": "Question",
      "name": "What's the easiest way to calculate 20% tip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To quickly calculate 20% tip, take the bill amount and move the decimal one place left, then multiply by 2. For a $50 bill: $5 × 2 = $10 tip. Or simply divide by 5."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Tipping Calculator - Restaurant Tip & Bill Split Calculator',
  description: 'Calculate tips for restaurants, delivery, and services. Split bills between friends with easy rounding options.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TippingCalculator />
    </Suspense>
  );
}