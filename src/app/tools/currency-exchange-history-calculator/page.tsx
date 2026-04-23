import type { Metadata } from 'next';
import { Suspense } from 'react';
import CurrencyExchangeHistoryCalculator from '@/components/CurrencyExchangeHistoryCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How have USD to EUR exchange rates changed over 5 years?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "USD to EUR rates have fluctuated between 0.85-0.93 over the past 5 years. Peak strength around 2022-2023 (0.93), recent weakening to ~0.89. Historical average around 0.90. Exchange timing matters for large transfers."
      }
    },
    {
      "@type": "Question",
      "name": "What affects currency exchange rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exchange rates are influenced by: interest rate differences between countries, inflation rates, economic growth, political stability, trade balances, and central bank policies. Strong economies with higher interest rates attract investment and strengthen currency."
      }
    },
    {
      "@type": "Question",
      "name": "When is the best time to exchange currency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exchange when your base currency is strong relative to the target currency. Use rate alerts, avoid fees by timing exchanges, and consider hedging for large future transfers. Monitor economic news and central bank announcements for rate movements."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate historical currency conversion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Historical conversion = Amount × Historical exchange rate. For $1000 USD in 2020 at rate 0.85 EUR: $1000 × 0.85 = €850. Compare to current rate to see gain/loss from timing."
      }
    },
    {
      "@type": "Question",
      "name": "Why do exchange rates fluctuate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rates fluctuate due to market supply and demand for currencies. Factors include trade flows, investment flows, speculation, economic data releases, and geopolitical events. Some currencies peg to others, others float freely based on market forces."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Currency Exchange History Calculator - Historical Rates Trends',
  description: 'See how exchange rates have changed over time. Calculate historical currency conversions and analyze trends.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CurrencyExchangeHistoryCalculator />
    </Suspense>
  );
}