'use client'

import StockCostBasisCalculator from '@/components/StockCostBasisCalculator'

export default function StockCostBasisCalculatorPage() {
  const faqs = [
    {
      question: "What is cost basis for stocks?",
      answer: "Cost basis is the original purchase price of a stock plus commissions and fees. It determines your capital gain or loss when you sell. Higher cost basis = lower taxable gain. Cost basis includes purchase price per share plus any transaction costs."
    },
    {
      question: "What are the different cost basis methods?",
      answer: "Three main methods: Average Cost (total cost / total shares - only for mutual funds), FIFO (first shares bought are first sold - default for stocks), LIFO (last shares bought are first sold). Specific Identification lets you choose exactly which shares to sell for optimal tax treatment."
    },
    {
      question: "When should I use FIFO vs LIFO?",
      answer: "FIFO (default) often results in long-term gains taxed at lower 15-20% rates. LIFO may show short-term gains taxed at higher 22-37% rates. Use FIFO when selling older shares for long-term treatment. Use LIFO strategically for tax-loss harvesting or when newer shares have losses."
    },
    {
      question: "Is average cost allowed for individual stocks?",
      answer: "No. Average cost method is ONLY allowed for mutual fund shares, not individual stocks. For stocks, you must use FIFO, LIFO, or specific identification. Once average cost is used for a mutual fund, you must continue using it for that fund."
    },
    {
      question: "How do commissions affect cost basis?",
      answer: "Purchase commissions increase your cost basis (you paid more total). Sale commissions reduce your sale proceeds (you received less net). This affects your net gain/loss calculation. Always include commissions in both cost basis and sale proceeds."
    },
    {
      question: "What is specific identification method?",
      answer: "Specific identification allows you to select exactly which purchase lot to sell at time of sale. Most flexible for tax optimization. Must identify shares to broker before or at time of sale. Requires keeping detailed records of each purchase lot separately."
    },
    {
      question: "How does cost basis affect capital gains tax?",
      answer: "Capital gain = sale proceeds - cost basis. Lower cost basis = higher gain = more tax. Higher cost basis = lower gain = less tax. Long-term gains (held 12+ months) taxed at 0-20%. Short-term gains taxed at ordinary income rates 10-37%."
    },
    {
      question: "What if my broker's cost basis differs from my records?",
      answer: "Verify broker's calculation method matches your records. Brokers report to IRS on 1099-B. If discrepancy, you may need to file Form 8949 adjustment. Keep your own records of all purchases, including dates, shares, prices, and commissions."
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
      <StockCostBasisCalculator />
    </>
  )
}