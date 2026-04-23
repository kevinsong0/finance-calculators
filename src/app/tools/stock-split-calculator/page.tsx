import type { Metadata } from 'next';
import { Suspense } from 'react';
import StockSplitCalculator from '@/components/StockSplitCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What happens to my shares in a stock split?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In a stock split, you receive more shares at a lower price. For a 2:1 split, each share becomes 2 shares at half the price. Your total investment value remains exactly the same."
      }
    },
    {
      "@type": "Question",
      "name": "Does a stock split change my investment value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, stock splits do not change your total investment value. You own more shares at a lower price per share, but the total dollar value of your holdings remains identical before and after the split."
      }
    },
    {
      "@type": "Question",
      "name": "What is a reverse stock split?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A reverse stock split reduces the number of shares and increases the price. For a 1:2 reverse split, 2 shares become 1 share at double the price. Companies often do this to meet exchange listing requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Are there tax consequences from stock splits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stock splits themselves have no immediate tax consequences. Your cost basis per share adjusts proportionally, and total basis remains the same. Taxes are only owed when you sell shares at a gain."
      }
    },
    {
      "@type": "Question",
      "name": "Why do companies split their stock?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Companies split stock to make shares more affordable for investors, increase liquidity, and potentially attract more retail investors. Splits often signal company confidence and success, as they typically happen when stock prices are high."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Stock Split Calculator - Calculate Share Changes After Split',
  description: 'Calculate new share count and price after stock splits. Supports 2:1, 3:1, 4:1 splits and reverse splits.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <StockSplitCalculator />
    </Suspense>
  );
}
