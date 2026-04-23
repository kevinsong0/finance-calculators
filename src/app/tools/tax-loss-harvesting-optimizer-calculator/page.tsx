'use client'

import TaxLossHarvestingOptimizerCalculator from '@/components/TaxLossHarvestingOptimizerCalculator'

export default function TaxLossHarvestingOptimizerCalculatorPage() {
  const faqs = [
    {
      question: "What is tax-loss harvesting?",
      answer: "Tax-loss harvesting is selling investments at a loss to offset capital gains taxes. You realize losses strategically to reduce your tax bill. The losses can offset gains of the same type first, then cross-type, and up to $3,000 of ordinary income annually."
    },
    {
      question: "How do losses offset gains?",
      answer: "Short-term losses first offset short-term gains (saving at your higher ordinary rate). Then they offset long-term gains. Long-term losses first offset long-term gains, then short-term gains. Net losses beyond gains can deduct $3,000 from ordinary income yearly."
    },
    {
      question: "What is the wash sale rule?",
      answer: "The wash sale rule disallows loss deductions if you repurchase the same or substantially identical security within 30 days before or after the sale. Workarounds: buy a similar but different ETF (e.g., S&P 500 → Total Market), or wait 31+ days before repurchasing."
    },
    {
      question: "How much can I deduct from ordinary income?",
      answer: "If total losses exceed total gains, you can deduct up to $3,000 per year ($1,500 if married filing separately) from ordinary income like wages. Remaining losses carry forward indefinitely to offset future gains or deduct in future years."
    },
    {
      question: "Should I harvest all losses or just some?",
      answer: "Harvest losses strategically to maximize tax savings. Short-term losses are most valuable as they offset high-rate short-term gains. Consider: current gain type, your marginal rates, carryover benefits, and wash sale rule implications."
    },
    {
      question: "What happens to unused losses?",
      answer: "Unused losses carry forward indefinitely with no expiration. Each year, you can offset gains and deduct up to $3,000 from ordinary income. Carryover losses from previous years are applied first before current-year losses."
    },
    {
      question: "When should I do tax-loss harvesting?",
      answer: "Best timing: near year-end to lock in deductions, after significant market drops, when you have realized gains to offset, or when rebalancing your portfolio. Avoid triggering wash sales. Consider transaction costs and whether holding might recover."
    },
    {
      question: "Why prioritize offsetting short-term gains?",
      answer: "Short-term gains are taxed at your ordinary income rate (10-37%), while long-term gains get preferential rates (0-20%). Using losses to offset short-term gains saves more tax dollars than offsetting long-term gains at the same dollar amount."
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
      <TaxLossHarvestingOptimizerCalculator />
    </>
  )
}