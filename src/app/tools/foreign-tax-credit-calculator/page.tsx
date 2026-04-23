'use client'

import ForeignTaxCreditCalculator from '@/components/ForeignTaxCreditCalculator'

export default function ForeignTaxCreditCalculatorPage() {
  const faqs = [
    {
      question: "What is the foreign tax credit?",
      answer: "Foreign tax credit allows US taxpayers to claim a credit for income taxes paid to foreign countries, avoiding double taxation. Credit reduces US tax dollar-for-dollar. Limited to US tax on foreign-source income. Excess credit can be carried back 1 year and forward 10 years. Available for taxes paid on foreign dividends, rental income, business income."
    },
    {
      question: "What taxes qualify for foreign tax credit?",
      answer: "Qualifying taxes: Income taxes, war profits taxes, excess profits taxes paid to foreign country or US possession. Must be compulsory tax (not voluntary payment). Cannot claim credit for foreign taxes on income excluded from US tax (foreign earned income exclusion). VAT, sales taxes, property taxes do NOT qualify. Only income-type taxes qualify."
    },
    {
      question: "What is the foreign tax credit limit?",
      answer: "Credit limit = US tax before credit × (foreign source income / total taxable income). Cannot exceed US tax attributable to foreign income. Example: $10K foreign income, $100K total income, $30K US tax. Limit = $30K × ($10K/$100K) = $3K. If you paid $4K foreign tax, credit limited to $3K. $1K excess carries forward."
    },
    {
      question: "Can I claim foreign tax credit for foreign dividends?",
      answer: "Yes. Foreign dividends subject to withholding tax qualify for foreign tax credit. Most countries withhold 15-30% on dividends paid to foreign investors. You can claim credit for withheld amount. Report on Form 1116 (individuals) or Form 1118 (corporations). Many brokerage statements show foreign tax paid on dividends."
    },
    {
      question: "What if my foreign tax exceeds the credit limit?",
      answer: "Excess foreign tax carries back 1 year (amend prior return to claim credit) and carries forward 10 years. Use carryback first, then carryforward. Must use earliest carryforward year before later years. No credit is wasted - you can use it eventually as long as you have foreign income in carryover years."
    },
    {
      question: "Foreign tax credit vs foreign tax deduction?",
      answer: "Credit reduces US tax dollar-for-dollar (usually better). Deduction reduces taxable income (itemized deduction). Credit saves more tax when foreign tax rate equals or exceeds US rate. Deduction may be better if foreign tax rate much higher than US rate and you cannot use carryovers. Cannot claim both for same tax - choose one."
    },
    {
      question: "Do I need Form 1116 for foreign tax credit?",
      answer: "Yes, most taxpayers must file Form 1116 to claim foreign tax credit. Form calculates credit limit by income category (passive, general, etc.). Exception: If foreign taxes paid are $300 or less ($600 married filing jointly) and all from same country, you can claim credit directly on Form 1040 without Form 1116."
    },
    {
      question: "Can I claim foreign tax credit on tax-exempt income?",
      answer: "No. Foreign taxes paid on income excluded from US tax cannot be claimed as credit. Foreign earned income exclusion (Form 2555) excludes foreign wages from US tax - foreign taxes on that income cannot be credited. Housing exclusion also prevents credit claim. You cannot double benefit: exclude income AND credit foreign tax."
    },
    {
      question: "What countries qualify for foreign tax credit?",
      answer: "Any foreign country, US possession, or political subdivision qualifies. Includes Canada, UK, Germany, Japan, China, all other nations. Even taxes paid to recognized foreign governments that US does not formally recognize may qualify. Does NOT include taxes paid to terrorist organizations or illegal foreign governments."
    },
    {
      question: "How do I report foreign tax credit on my tax return?",
      answer: "Report on Form 1116 (Foreign Tax Credit) attached to Form 1040. Enter foreign income, foreign taxes paid, calculate credit limit. Credit flows to Schedule 3, then Form 1040 line 20. If eligible for simplified method ($300/$600 threshold), enter credit directly on Form 1040. Keep records of foreign tax payments (brokerage statements, foreign tax receipts)."
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
      <ForeignTaxCreditCalculator />
    </>
  )
}