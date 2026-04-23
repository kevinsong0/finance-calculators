import type { Metadata } from 'next';
import { Suspense } from 'react';
import DividendStockComparisonCalculator from '@/components/DividendStockComparisonCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Should I choose high yield or high growth dividend stocks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depends on goals. High yield (4-6%): more current income, slower growth, better for income needs now. High growth (8-12% growth, 1-2% yield): less current income, better appreciation, better for long-term wealth. Ideal balance: 3-4% yield + 5-7% growth = 8-11% total return potential."
      }
    },
    {
      "@type": "Question",
      "name": "What are dividend aristocrats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dividend aristocrats are S&P 500 companies that have increased dividends for 25+ consecutive years. Examples: Johnson & Johnson, Coca-Cola, Procter & Gamble. They demonstrate financial stability and shareholder commitment. Combine aristocrats with growth stocks for balanced portfolio."
      }
    },
    {
      "@type": "Question",
      "name": "How are dividends taxed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Qualified dividends: 0-20% tax rates (same as long-term capital gains) if held 60+ days. Ordinary dividends: taxed at regular income rates (up to 37%). REIT dividends: mostly ordinary income. Municipal bond interest: tax-free. Consider tax-advantaged accounts for dividend efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "What is dividend yield on cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yield on cost measures dividend yield relative to your original purchase price, not current price. Example: Bought at $50, now $100, dividend $4. Current yield: 4%, but yield on cost: 8%. This metric shows true income from your investment over time as dividends grow."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build a dividend portfolio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diversify across sectors: utilities (high yield), consumer staples (stable), financials (growth potential), healthcare (reliable). Include dividend aristocrats for stability. Balance high-yield and growth stocks. Target 30-50 stocks for diversification. Reinvest dividends (DRIP) for compound growth. Review quarterly."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Dividend Stock Comparison Calculator - Compare Total Returns',
  description: 'Compare dividend stocks by yield, growth, and total return. Analyze dividend income, price appreciation, and tax-optimized investment strategies.',
  keywords: ['dividend comparison', 'dividend stock calculator', 'dividend yield', 'dividend growth', 'dividend portfolio', 'stock comparison', 'dividend income', 'total return'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DividendStockComparisonCalculator />
    </Suspense>
  );
}