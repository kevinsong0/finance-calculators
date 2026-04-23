import type { Metadata } from 'next';
import { Suspense } from 'react';
import StockInvestingGuide from '@/components/StockInvestingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I start investing in stocks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start stock investing: 1. Set goals (retirement, wealth building). 2. Determine risk tolerance (how much can you lose). 3. Set budget (invest what you can afford). 4. Choose account type (IRA, brokerage). 5. Open brokerage account (Fidelity, Vanguard, Schwab). 6. Start simple - index funds/ETFs first. 7. Invest regularly (automatic deposits). 8. Diversify (don&apos;t put all in one stock). 9. Keep long-term view (years, not days). 10. Learn as you go. Best approach: Start with broad market index (S&P 500), add individual stocks later if desired. Consistency + patience = wealth."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between stocks and bonds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stocks vs Bonds: Stocks = ownership share in company. Potential: higher returns, dividends, voting rights. Risk: higher volatility, can lose value, no guaranteed return. Bonds = loan to company/government. Potential: fixed interest payments, principal returned at maturity. Risk: lower returns than stocks, interest rate risk, default risk. Choose: Stocks for growth, long-term wealth. Bonds for income, stability, lower risk. Mix both for balanced portfolio. Typical allocation: more stocks young, more bonds older. Stocks = equity. Bonds = debt. Different risk/reward profiles."
      }
    },
    {
      "@type": "Question",
      "name": "What is dollar-cost averaging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dollar-cost averaging (DCA): investing fixed amount regularly regardless of price. How it works: Invest same amount each period (weekly, monthly), buy more shares when price low, fewer when high, average purchase price over time. Benefits: Removes timing decisions, reduces volatility impact, builds investing habit, lowers average cost in volatile markets. Example: $500/month into S&P 500 fund. Markets fluctuate - DCA smooths ride. Not about timing market, about consistent investing. Works best with regular income. DCA = discipline + simplicity. Start now, continue regularly."
      }
    },
    {
      "@type": "Question",
      "name": "How do I evaluate a stock?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stock evaluation: Fundamental analysis: P/E ratio (price relative to earnings), compare to industry/history. Revenue growth (is company growing). Profit margins (efficiency). Debt levels (financial health). Dividend history (consistent payments). Management quality. Competitive position. Technical analysis: Price trends, volume patterns (optional, for timing). Steps: 1. Understand business model. 2. Check financial statements. 3. Compare metrics to peers. 4. Assess growth potential. 5. Consider valuation. Don&apos;t invest in what you don&apos;t understand. Research company, not just stock price. Long-term fundamentals matter."
      }
    },
    {
      "@type": "Question",
      "name": "What is portfolio diversification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Portfolio diversification: spread investments across different assets to reduce risk. How: Different stocks (not just one), different sectors (tech, healthcare, finance), different asset classes (stocks, bonds, real estate), different geographies (US, international). Benefits: Reduces impact of single failure, smoother returns, lower overall risk. Rule: Don&apos;t put all eggs in one basket. Minimum: 10-20 stocks or index fund. Ideal: Mix of assets based on risk tolerance. Rebalancing: Adjust when allocation drifts (sell winners, buy losers). Diversification = risk management. Accept lower peak returns for lower risk. Index funds = instant diversification."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Stock Investing Guide - Basics, Strategies & Best Practices',
  description: 'Stock investing basics, strategies, risks, and evaluation methods.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StockInvestingGuide />
    </Suspense>
  );
}