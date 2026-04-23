import type { Metadata } from 'next';
import { Suspense } from 'react';
import InvestmentBasicsGuide from '@/components/InvestmentBasicsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I start investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investment starting steps: Before investing: Emergency fund (3-6 months), high-interest debt paid off, basic budget established. Account choice: Employer 401k if available (especially with match), IRA for tax advantages, brokerage account for flexibility. First investments: Broad market index fund (S&P 500 or total market), low fees (under 0.5%), automatic investment set up. Amount to start: Whatever you can afford regularly, even $50-100/month, increase over time. Timeline: Long-term (5+ years ideal), don&apos;t invest money you&apos;ll need soon. Next steps: Increase contributions regularly, diversify over time, learn more as you invest. Start = momentum. Waiting = lost time. Emergency fund first, then index funds, automate, increase over time. Simple start beats complex delay."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between stocks and bonds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stocks vs bonds: Stocks (equity): You own part of company, price fluctuates with company performance and market, higher risk but higher potential return, no guaranteed income, dividends possible but not guaranteed. Bonds (debt): You loan money to entity (government or company), fixed interest payments (coupon), principal returned at maturity, lower risk than stocks, predictable income. Risk comparison: Stocks - volatile, could lose significant value, long-term growth potential. Bonds - stable income, smaller price swings, inflation risk, lower long-term returns. Role in portfolio: Stocks - growth, long-term goals, higher risk tolerance. Bonds - stability, income, shorter timeline, risk reduction. Typical allocation: Young investors - more stocks (70-90%), older investors - more bonds (30-50%), risk tolerance varies allocation. Stocks = growth, bonds = stability. Mix based on timeline and risk tolerance. Young = more stocks, older = more bonds."
      }
    },
    {
      "@type": "Question",
      "name": "Why are index funds recommended for beginners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Index funds for beginners: Why recommended: Instant diversification - own hundreds of stocks in one fund, low fees - typically 0.03-0.2% vs 0.5-2% for active funds, market-average returns - hard to consistently beat market, simple - no need to pick individual stocks, automatic rebalancing - fund manages composition. Benefits: Reduces single-stock risk, removes need to research picks, lower costs compound over time, proven long-term performance, easy to understand. Performance: Index funds match market (S&P 500 ~10% annual average historically), active funds often underperform after fees, consistent reliable growth. Varieties: Total market index (all US stocks), S&P 500 (500 largest), International index (non-US), Bond index funds. Beginner approach: Start with broad market index fund, add international later, add bonds as timeline shortens. Index funds = simple diversification. Individual stocks = research required. Beginner = start broad, simple, low-cost."
      }
    },
    {
      "@type": "Question",
      "name": "What is risk tolerance in investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk tolerance explained: Definition: How much investment volatility you can handle emotionally and financially, willingness to accept potential losses for potential gains, varies by person and life stage. Factors affecting tolerance: Timeline - longer = more tolerance (time to recover), age - younger = more tolerance typically, income stability - stable = more tolerance, personality - some tolerate uncertainty better, financial cushion - emergency fund enables risk. Risk levels: Conservative - prioritize safety, accept lower returns, mostly bonds/cash. Moderate - balanced approach, mix of stocks and bonds. Aggressive - seek maximum growth, mostly stocks, accept volatility. Assessing yourself: How would you feel if investments dropped 20%? What&apos;s your investment timeline? Do you need this money soon? Can you sleep through market drops? Matching investments: Conservative - 20-30% stocks, 70-80% bonds. Moderate - 50-60% stocks, 40-50% bonds. Aggressive - 80-90% stocks, 10-20% bonds. Risk tolerance = investment comfort. Overestimate = panic selling. Match investments to your true tolerance."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I invest each month?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monthly investment amount: General guidelines: 10-15% of income minimum for retirement, 15-20% ideal for wealth building, start with what&apos;s possible, increase over time. Retirement targets: By age 30 - 1x annual salary saved, by age 40 - 3x annual salary, by age 50 - 6x annual salary, by age 60 - 8-10x annual salary. Examples: $50K income - $500-750/month (10-15%), $75K income - $750-1,125/month (10-15%), $100K income - $1,000-1,500/month (10-15%). Starting smaller: If tight budget - $50-100/month, build habit, increase with raises, consistent beats amount at first. Account priorities: 401k to match amount first, then IRA max ($6,500-7,000/year), then remaining to brokerage. Increase strategies: Invest all raises/bonuses, add $100/month each year, review and increase annually. Amount = sustainable habit. Impossible target = failure. Start possible, increase regularly. 10-15% target, build toward it."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Investment Basics Guide - Concepts, Types & Beginner Steps',
  description: 'Investment concepts, types comparison, risk tolerance, and beginner steps.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InvestmentBasicsGuide />
    </Suspense>
  );
}