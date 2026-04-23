'use client'

import CapitalGainsDistributionCalculator from '@/components/CapitalGainsDistributionCalculator'

export default function CapitalGainsDistributionCalculatorPage() {
  const faqs = [
    {
      question: "What are capital gains distributions from mutual funds?",
      answer: "Mutual funds and ETFs distribute capital gains when they sell securities at a profit. Distributions occur annually (usually December). Types: short-term (held <1 year, taxed at ordinary rates) and long-term (held >1 year, taxed at 0%/15%/20%). You receive distribution even if you bought fund recently. NAV drops by distribution amount on payment date. You pay tax on distributions whether reinvested or taken in cash."
    },
    {
      question: "When do mutual funds distribute capital gains?",
      answer: "Most funds distribute capital gains in December (record date typically mid-December). Funds announce distribution amounts weeks before. Distribution types: short-term gains, long-term gains, return of capital. Buy funds AFTER distribution to avoid immediate tax on gains you didn't benefit from. Check fund's distribution history and schedule before investing. Some funds distribute quarterly or at other times."
    },
    {
      question: "How are capital gains distributions taxed?",
      answer: "Short-term distributions: taxed at ordinary income rates (10%-37% based on bracket). Long-term distributions: taxed at capital gains rates (0%, 15%, or 20% based on income). Income thresholds for 0% LTCG: <$47K single, <$94K married. 15% LTCG: $47K-$518K. 20% LTCG: >$518K. State tax also applies. Distributions reported on Form 1099-DIV. You pay tax whether reinvested or not."
    },
    {
      question: "What is return of capital (ROC) distribution?",
      answer: "Return of capital: distribution that exceeds fund's income/gains. ROC is tax-free in year received. ROC reduces your cost basis in the fund. When basis reaches $0, ROC becomes capital gain. ROC distributions common in funds with high payouts relative to earnings. Check fund's distribution breakdown for ROC percentage. ROC provides tax deferral, not tax elimination."
    },
    {
      question: "Do reinvested distributions affect cost basis?",
      answer: "Yes. Reinvested distributions increase your cost basis. Each reinvestment adds new shares at NAV price. Track each reinvestment date and price for accurate basis. Use average cost method (default for mutual funds) or specific identification. Reinvested dividends/distributions reduce capital gains when you sell. Keep records of all reinvestments. Broker may track basis if shares purchased after 2012."
    },
    {
      question: "How does NAV change after distribution?",
      answer: "NAV drops by distribution amount on payment date. Example: NAV $50, $2 distribution, NAV becomes $48. Drop reflects distribution leaving fund. Your total value unchanged: $50 value before = $48 NAV + $2 distribution. If reinvested, you receive more shares at lower NAV. Drop is automatic - fund processes distribution and adjusts NAV simultaneously."
    },
    {
      question: "How to avoid capital gains distributions?",
      answer: "Buy after distribution (December typically). Choose ETFs (lower distributions than mutual funds). Select index funds (lower distributions than active funds). Use tax-managed funds (minimize gains through strategies). Avoid funds with high turnover rates. Consider tax-loss harvesting to offset gains. Hold funds in tax-advantaged accounts (IRA, 401(k)). Check fund's historical distribution amounts before investing."
    },
    {
      question: "What is Form 1099-DIV for distributions?",
      answer: "Form 1099-DIV reports dividends and capital gains distributions. Box 1a: total ordinary dividends. Box 1b: qualified dividends (15% rate). Box 2a: total capital gain distributions. Box 2b: unrecaptured Section 1250 gains (25% rate). Box 2c: Section 1202 gains (QSBS exclusion). Box 3: non-dividend distributions (ROC). Box 4: federal tax withheld. Report on Schedule B and Form 1040."
    },
    {
      question: "ETF vs mutual fund distributions?",
      answer: "ETFs typically have lower capital gains distributions. ETF structure allows in-kind transfers to avoid selling securities. Mutual funds must sell securities to meet redemptions, triggering gains. ETF distributions mostly from dividends, not capital gains. Index ETFs have lowest distributions. Active ETFs may have more. Both ETFs and mutual funds distribute dividends. Choose ETFs for taxable accounts, mutual funds for tax-advantaged accounts."
    },
    {
      question: "How to plan for December distributions?",
      answer: "Check fund websites for estimated distribution dates and amounts. Avoid buying funds just before distribution (buy after record date). If you must buy, factor distribution tax into purchase decision. Consider tax-loss harvesting to offset December gains. Review all fund distributions by December 31. Estimated tax payment due January 15 for distributions. Plan ahead - distributions announced weeks before payment."
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
      <CapitalGainsDistributionCalculator />
    </>
  )
}