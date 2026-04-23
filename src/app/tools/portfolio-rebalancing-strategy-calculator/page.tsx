import PortfolioRebalancingStrategyCalculator from '@/components/PortfolioRebalancingStrategyCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is portfolio rebalancing and why is it important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rebalancing restores your portfolio to its target asset allocation by selling overweight assets and buying underweight ones. Over time, high-performing assets grow larger, increasing risk. Regular rebalancing maintains your desired risk level, enforces disciplined buy/sell decisions, and potentially improves returns through contrarian trades."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I rebalance my portfolio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common strategies include: time-based (quarterly, annually), threshold-based (when drift exceeds 5%), band-based (tolerance bands around targets), or hybrid approaches. Annual rebalancing with a 5% threshold is common. More frequent rebalancing increases transaction costs and taxes but maintains tighter risk control."
      }
    },
    {
      "@type": "Question",
      "name": "What are the tax implications of rebalancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In taxable accounts, selling appreciated assets triggers capital gains taxes. Tax-aware strategies: use new contributions to buy underweight assets, rebalance in tax-advantaged accounts first, tax-loss harvest to offset gains, or use threshold-based rebalancing to minimize trades. In 401k/IRA accounts, rebalancing has no immediate tax cost."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use new contributions to rebalance instead of selling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, this is a tax-efficient rebalancing strategy. Direct new contributions (401k contributions, IRA deposits) toward underweight assets. This gradually restores target allocation without triggering capital gains. This works well if you have regular contributions and moderate drift."
      }
    },
    {
      "@type": "Question",
      "name": "What is optimal rebalancing threshold?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Studies suggest 5% absolute deviation from target (e.g., 60% stocks target, rebalance when stocks exceed 65% or fall below 55%) balances risk control with transaction costs. Tighter thresholds (1-2%) increase trades significantly. Wider thresholds (10%) may allow excessive drift. Adjust based on asset volatility and tax situation."
      }
    }
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PortfolioRebalancingStrategyCalculator />
    </>
  )
}