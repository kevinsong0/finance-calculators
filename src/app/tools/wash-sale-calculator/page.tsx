'use client'

import WashSaleCalculator from '@/components/WashSaleCalculator'

export default function WashSaleCalculatorPage() {
  const faqs = [
    {
      question: "What is the wash sale rule?",
      answer: "The wash sale rule disallows loss deductions if you sell stock at a loss and buy the same or substantially identical stock within 30 days before or after the sale. The 30-day window applies both before AND after the loss sale - total 61-day window."
    },
    {
      question: "How long must I wait to repurchase after selling for a loss?",
      answer: "Wait at least 31 days AFTER the loss sale to repurchase the same stock. OR, if you already purchased, wait 31 days AFTER that purchase before selling for a loss. The rule applies to purchases made 30 days BEFORE and 30 days AFTER the sale."
    },
    {
      question: "What happens to disallowed wash sale losses?",
      answer: "Disallowed losses are NOT lost. They're added to the cost basis of the repurchased shares. This increases your basis, which reduces your taxable gain (or increases your loss) when you eventually sell the repurchased stock."
    },
    {
      question: "Does wash sale apply to IRA accounts?",
      answer: "Yes, and it's even worse. If you sell at a loss in taxable account and buy same stock in IRA within 30 days, the loss is permanently disallowed - you cannot adjust IRA cost basis. This permanently eliminates the tax benefit of the loss."
    },
    {
      question: "What counts as 'substantially identical' stock?",
      answer: "Same stock/CUSIP number = identical. Options on same stock = identical. ETFs tracking same index (VOO and IVV) = substantially identical. Different indices (S&P 500 vs Total Market) = NOT identical. ETF vs mutual fund of same index = gray area, risky."
    },
    {
      question: "How can I avoid wash sale while tax-loss harvesting?",
      answer: "Strategies: wait 31+ days before repurchasing, buy different ETF tracking different index (sell S&P 500, buy Total Market), buy in different sector/industry, use sector ETFs temporarily, or buy stock in same sector but different company."
    },
    {
      question: "Do brokers report wash sales on 1099-B?",
      answer: "Brokers may report wash sale adjustments on 1099-B, but not always complete. IRS expects you to self-report wash sales across ALL accounts. Brokers only see their own account transactions. You must track wash sales across all your accounts yourself."
    },
    {
      question: "Can dividend reinvestment trigger wash sales?",
      answer: "Yes. If dividend reinvestment buys shares within 30 days of a loss sale on same stock, that portion of the loss is disallowed. The reinvestment amount creates a wash sale. This commonly catches investors unaware during tax-loss harvesting."
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
      <WashSaleCalculator />
    </>
  )
}