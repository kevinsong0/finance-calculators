'use client'

import Form8949CapitalGainsCalculator from '@/components/Form8949CapitalGainsCalculator'

export default function Form8949CapitalGainsCalculatorPage() {
  const faqs = [
    {
      question: "What is Form 8949?",
      answer: "Form 8949 reports sales and exchanges of capital assets. Lists each transaction: description, date acquired, date sold, proceeds, cost basis, gain/loss. Separates short-term (held less than 1 year) and long-term (held more than 1 year) transactions. Totals flow to Schedule D. Required for stock, bond, mutual fund, real estate, crypto sales. Brokerage 1099-B provides transaction data for Form 8949."
    },
    {
      question: "How do I fill out Form 8949?",
      answer: "Part I: Short-term transactions (held less than 1 year). Part II: Long-term transactions (held more than 1 year). Enter each transaction: description, acquisition date, sale date, proceeds, cost basis, adjustment code if needed, gain/loss. Calculate totals for each part. Totals transfer to Schedule D lines 1b and 8b. Use 1099-B data from brokerage statements. Software and tax preparers automate Form 8949 preparation."
    },
    {
      question: "What are short-term vs long-term capital gains?",
      answer: "Short-term: Asset held less than 1 year. Taxed at ordinary income rates (10%-37%). Same rate as wages, salary. Long-term: Asset held more than 1 year. Taxed at preferential rates (0%, 15%, 20%). Much lower tax burden. Always try to hold investments over 1 year for long-term treatment. Selling before 1 year triggers short-term rates."
    },
    {
      question: "How does Schedule D work with Form 8949?",
      answer: "Schedule D summarizes capital gains/losses. Line 1b: Short-term totals from Form 8949 Part I. Line 8b: Long-term totals from Form 8949 Part II. Schedule D calculates net gain/loss, combines short and long-term, applies loss limits ($3,000 against ordinary income). Final net capital gain/loss flows to Form 1040 line 7. Schedule D is summary, Form 8949 is detail."
    },
    {
      question: "What if I have capital losses?",
      answer: "Capital losses offset capital gains first. Net loss reduces ordinary income up to $3,000 per year ($1,500 married filing separately). Excess loss carries forward indefinitely. Example: $10K loss, $2K gain = $8K net loss. $3K used this year against wages, $5K carries forward. Loss carryforward tracks on Schedule D. Use losses strategically to reduce tax burden."
    },
    {
      question: "Do I need Form 8949 for every stock sale?",
      answer: "Yes, generally. Exception: If 1099-B reports basis to IRS (Box A checked), transactions can be reported directly on Schedule D without Form 8949 (line 1a for short-term, line 8a for long-term). However, most taxpayers use Form 8949 for all transactions. Keeps records organized. Required if basis not reported to IRS or adjustments needed."
    },
    {
      question: "What are adjustment codes on Form 8949?",
      answer: "Adjustment codes modify reported gain/loss: B - basis reported on 1099-B differs from actual basis. C - wash sale disallowed loss. D - short sale gain/loss adjustment. E - multiple transactions aggregated. F - like-kind exchange. G - distribution from partnership. H - other adjustments. See Form 8949 instructions for complete code list. Use when 1099-B data needs correction."
    },
    {
      question: "How do I report cryptocurrency on Form 8949?",
      answer: "Crypto is property, every sale/trade reported on Form 8949. Record: purchase date, cost basis (including fees), sale date, proceeds (minus fees). Track each crypto-to-crypto trade as taxable event. Long-term if held over 1 year. Short-term if less. Crypto exchanges may provide 1099-B, but often incomplete. You must track all transactions yourself. Keep detailed records."
    },
    {
      question: "Can I group transactions on Form 8949?",
      answer: "Limited grouping allowed. Same-day purchases/sales: combine identical transactions. Multiple lots sold together: aggregate if basis reported to IRS. Most transactions reported separately. Cannot group different assets or different holding periods. Keep individual transaction records. Grouping simplifies Form 8949 but not universally allowed."
    },
    {
      question: "What records do I need for Form 8949?",
      answer: "Keep: purchase statements showing date and cost basis, sale statements showing date and proceeds, brokerage confirmation receipts, dividend reinvestment records (DRIP), stock split records, wash sale adjustments, fee/commission records. Records needed for 3 years after filing (6 years if underreported income). Brokerage 1099-B provides much data but verify accuracy. Basis tracking apps help manage records."
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
      <Form8949CapitalGainsCalculator />
    </>
  )
}