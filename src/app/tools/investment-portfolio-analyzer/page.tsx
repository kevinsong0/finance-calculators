import type { Metadata } from 'next';
import { Suspense } from 'react';
import InvestmentPortfolioAnalyzer from '@/components/InvestmentPortfolioAnalyzer';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I analyze my investment portfolio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Portfolio analysis: calculate total value, check allocation percentages, assess risk level based on stock allocation, evaluate diversification (no single asset > 60%), compare to target allocation. Risk: >70% stocks = high, <30% = low. Diversification: spread across 4+ asset types. Review annually, rebalance when drifting 5%+ from target."
      }
    },
    {
      "@type": "Question",
      "name": "What is portfolio diversification?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diversification: spreading investments across multiple asset types to reduce risk. Asset types: stocks, bonds, real estate, cash, commodities. Benefits: reduces volatility, protects against single-asset losses, smoother returns. Good diversification: no single asset > 40%, multiple categories, geographic spread. Poor diversification: concentrated in one stock/sector."
      }
    },
    {
      "@type": "Question",
      "name": "What is the ideal portfolio allocation by age?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Age-based allocation rules: 20-40: 70-80% stocks for growth (aggressive). 40-65: 50-60% stocks, 40% bonds (moderate). 65+: 30-40% stocks, 50-60% bonds (conservative). Rule: stock allocation = 100 - age (traditional). Modern: 110-120 - age for longer life expectancy. Adjust for risk tolerance, goals, timeline."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I rebalance my portfolio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rebalance frequency: annually minimum, when allocations drift 5%+ from target, after major life events, market significant moves. Methods: sell overweight/buy underweight, use new contributions to rebalance. Consider: transaction costs, tax implications (capital gains), market timing. Many investors rebalance quarterly or annually."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate portfolio risk?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Portfolio risk: based on asset types and allocation. High risk: >70% stocks, concentrated in few holdings. Moderate: 40-70% stocks, diversified. Low: <40% stocks, mostly bonds/cash. Risk measures: standard deviation of returns, beta relative to market. Historical volatility, maximum drawdown. Higher risk = higher potential returns AND losses."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Investment Portfolio Analyzer - Allocation Analysis Tool',
  description: 'Analyze investment portfolio allocation. Calculate total value, risk level, diversification score. Get portfolio strategy recommendations by age.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InvestmentPortfolioAnalyzer />
    </Suspense>
  );
}