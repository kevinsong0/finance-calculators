import type { Metadata } from 'next';
import { Suspense } from 'react';
import DividendCalculator from '@/components/DividendCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is dividend yield calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dividend yield is calculated as annual dividend per share divided by stock price per share, expressed as a percentage. For example, a $4 annual dividend on a $100 stock gives a 4% yield."
      }
    },
    {
      "@type": "Question",
      "name": "What are dividend aristocrats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dividend aristocrats are S&P 500 companies that have increased their dividend payouts for 25 consecutive years or more. They represent reliable dividend stocks with strong financial health and commitment to shareholder returns."
      }
    },
    {
      "@type": "Question",
      "name": "How does dividend reinvestment (DRIP) work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dividend Reinvestment Plans (DRIPs) automatically use dividend payments to purchase additional shares, often without commission fees. This compounds returns over time, as more shares generate more dividends, creating exponential growth."
      }
    },
    {
      "@type": "Question",
      "name": "How are dividends taxed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Qualified dividends are taxed at preferential long-term capital gains rates (0%, 15%, or 20%) based on income. Non-qualified dividends are taxed as ordinary income. Most US company dividends are qualified if held for 60+ days."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good dividend yield?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A good dividend yield typically ranges from 2-6%. Very high yields (over 6%) may indicate financial stress. The ideal yield balances income generation with dividend sustainability and company growth potential."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Dividend Calculator - Calculate Dividend Income & Growth',
  description: 'Calculate dividend income, yield projections, and reinvestment returns for dividend stocks.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DividendCalculator />
    </Suspense>
  );
}
