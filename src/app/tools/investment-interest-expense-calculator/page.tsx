'use client'

import InvestmentInterestExpenseCalculator from '@/components/InvestmentInterestExpenseCalculator'

export default function InvestmentInterestExpenseCalculatorPage() {
  const faqs = [
    {
      question: "What is investment interest expense?",
      answer: "Investment interest expense is interest paid on debt used to purchase or carry investment property. Includes margin account interest, loans to buy securities, interest on investment property loans. Deductible as itemized deduction on Schedule A. Limited to net investment income. Excess carries forward indefinitely to future years."
    },
    {
      question: "What is the investment interest expense deduction limit?",
      answer: "Deduction limited to net investment income. Net investment income = gross investment income (interest, dividends, capital gains, royalties) minus investment expenses. Cannot deduct more interest than investment income generates. Excess disallowed amount carries forward indefinitely. Each year you can deduct up to that year's investment income."
    },
    {
      question: "Is margin interest deductible?",
      answer: "Yes, margin interest is deductible as investment interest expense if you itemize deductions. Limited to net investment income from margin investments. Brokerage margin accounts charge interest on borrowed funds used to buy stocks. Track margin interest on brokerage statements. Report on Form 4952, then Schedule A."
    },
    {
      question: "Can I deduct interest for tax-exempt investments?",
      answer: "No. Interest expense attributable to tax-exempt investments cannot be deducted. If you borrow to buy municipal bonds, that interest is NOT deductible. Allocation required: if portfolio includes both taxable and tax-exempt investments, only interest attributable to taxable investments qualifies. IRS requires reasonable allocation method."
    },
    {
      question: "What is Form 4952 for investment interest?",
      answer: "Form 4952 (Investment Interest Expense Deduction) calculates allowable investment interest deduction. Shows total investment interest expense, net investment income, deduction limit, carryforward amounts. Required if investment interest expense exceeds investment income or you have carryforward from prior years. Attach to Form 1040 with Schedule A."
    },
    {
      question: "Can I include capital gains in investment income?",
      answer: "Yes, but requires election. Capital gains normally taxed at preferential rates. By electing to include capital gains in investment income, you can deduct more investment interest. However, included capital gains lose preferential rates and are taxed as ordinary income. Election beneficial when interest expense exceeds other investment income and capital gains tax savings less than interest deduction benefit."
    },
    {
      question: "How long can I carryforward disallowed investment interest?",
      answer: "Disallowed investment interest expense carries forward indefinitely with no expiration. Use carryforward in future years when you have sufficient investment income. Each year, use current year interest first, then carryforward. Keep track of carryforward amounts on Form 4952. No limit on how many years you can carry forward."
    },
    {
      question: "Do I need to itemize to deduct investment interest?",
      answer: "Yes. Investment interest expense is an itemized deduction reported on Schedule A. Cannot claim if you take standard deduction. If total itemized deductions (mortgage interest, charitable contributions, investment interest, etc.) exceed standard deduction, itemizing beneficial. Otherwise, investment interest deduction unavailable."
    },
    {
      question: "What investment income counts for the limit?",
      answer: "Qualifying investment income: Interest income, dividend income (qualified and non-qualified), capital gains (if elected), royalty income, passive activity income from investments. Does NOT include tax-exempt income, qualified dividends if not elected to forgo preferential rates. Gross investment income minus directly related investment expenses = net investment income."
    },
    {
      question: "What records should I keep for investment interest?",
      answer: "Keep: Brokerage statements showing margin interest charges, loan statements for investment loans, records of investment purchases with borrowed funds, allocation calculations for mixed portfolios, Form 4952 from prior years showing carryforward. IRS may challenge deduction without proof interest was for investment purposes. Keep records 3-7 years after filing."
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
      <InvestmentInterestExpenseCalculator />
    </>
  )
}