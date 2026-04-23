import type { Metadata } from 'next';
import { Suspense } from 'react';
import OptionsProfitCalculator from '@/components/OptionsProfitCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do call options make money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Call options profit when the stock price rises above the strike price plus the premium paid. For example, buying a $100 strike call for $5 premium, you profit when the stock exceeds $105 at expiration. The break-even point is strike price + premium. Profits can be theoretically unlimited."
      }
    },
    {
      "@type": "Question",
      "name": "How do put options make money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Put options profit when the stock price falls below the strike price minus the premium paid. For example, buying a $100 strike put for $5 premium, you profit when the stock drops below $95 at expiration. Maximum profit occurs if the stock goes to zero."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if an option expires worthless?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If an option expires worthless (stock price doesn't exceed break-even), you lose 100% of the premium paid. For a call, this happens when stock stays below strike. For a put, this happens when stock stays above strike. This is why options are considered high-risk investments."
      }
    },
    {
      "@type": "Question",
      "name": "What is intrinsic value vs time value in options?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Intrinsic value is the immediate profit if exercised: for calls, stock price minus strike; for puts, strike minus stock price. Time value is the premium above intrinsic value, reflecting probability of future profit. As expiration approaches, time value decreases (time decay). Out-of-the-money options have only time value."
      }
    },
    {
      "@type": "Question",
      "name": "How many shares does one option contract represent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One standard option contract represents 100 shares of the underlying stock. For example, buying 2 call contracts at $5 premium per share costs $1,000 total (2 contracts × 100 shares × $5). This standard makes options accessible while providing significant leverage."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Options Profit Calculator - Calculate Call & Put Option Returns',
  description: 'Calculate potential profit or loss for call and put options at different price targets. Understand intrinsic value, break-even points, and risk.',
  keywords: ['options calculator', 'call option profit', 'put option profit', 'options trading', 'option break-even', 'intrinsic value', 'options profit', 'stock options'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OptionsProfitCalculator />
    </Suspense>
  );
}