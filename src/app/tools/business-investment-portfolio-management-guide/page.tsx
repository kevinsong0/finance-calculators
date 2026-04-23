import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessInvestmentPortfolioManagementGuide from '@/components/BusinessInvestmentPortfolioManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What objectives guide portfolio management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Portfolio objectives include: Capital preservation (safety first, low-risk assets), Income generation (cash flow priority, dividend assets), Growth appreciation (value increase priority, growth assets), and Balanced approach (mix objectives, diversified portfolio)."
      }
    },
    {
      "@type": "Question",
      "name": "What strategies manage investment portfolios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management strategies include: asset allocation planning, diversification strategy, risk management integration, performance monitoring, rebalancing procedures, tax optimization, cost management, liquidity planning, benchmark comparison, and portfolio review."
      }
    },
    {
      "@type": "Question",
      "name": "What components make up an investment portfolio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Portfolio components include: Equity investments (stocks, ETFs, medium to high risk), Fixed income (bonds, CDs, low to medium risk), Alternative investments (real estate, commodities, variable risk), and Cash equivalents (money market, savings, low risk)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure portfolio success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: portfolio return, risk-adjusted return, Sharpe ratio, portfolio volatility, asset allocation ratio, diversification index, beta coefficient, and correlation matrix."
      }
    },
    {
      "@type": "Question",
      "name": "Why is portfolio management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Portfolio management maximizes returns, controls risk, achieves objectives, ensures diversification, and supports financial goals. Strategic management transforms random investments into purposeful portfolios."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Investment Portfolio Management Guide - Objectives & Strategies',
  description: 'Portfolio objectives, management strategies, components, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessInvestmentPortfolioManagementGuide />
    </Suspense>
  );
}
