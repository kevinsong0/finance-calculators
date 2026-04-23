import TaxDebtSettlementCalculator from '@/components/TaxDebtSettlementCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Debt Settlement Calculator | OIC, CNC & Payment Options',
  description: 'Compare tax debt settlement options: Offer in Compromise (OIC), Currently Not Collectible (CNC), payment plans. Calculate RCP and settlement amounts.',
  openGraph: {
    title: 'Tax Debt Settlement Calculator',
    description: 'Compare tax debt settlement options.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is an Offer in Compromise (OIC)?',
    answer: 'An OIC allows you to settle your tax debt for less than the full amount. The IRS accepts OICs based on: Doubt as to Collectibility (RCP less than debt), Doubt as to Liability (error in assessment), or Effective Tax Administration (exceptional circumstances). Application fee is $205.',
  },
  {
    question: 'How is RCP calculated for an OIC?',
    answer: 'Reasonable Collection Potential (RCP) = Net Realizable Equity in Assets + Future Income. Net equity = asset value minus encumbrances. Future income = monthly disposable income multiplied by months remaining in the 10-year collection statute.',
  },
  {
    question: 'What is Currently Not Collectible status?',
    answer: 'CNC status means the IRS has determined you cannot pay your tax debt without causing economic hardship. Collection action is suspended, but the debt remains and the 10-year statute continues. Interest and penalties continue accruing. The IRS reviews CNC status annually.',
  },
  {
    question: 'What is a Partial Payment Installment Agreement?',
    answer: 'A Partial Payment IA allows you to make payments based on your ability to pay, with the remaining debt forgiven when the 10-year collection statute expires. This is for taxpayers who can make payments but cannot pay the full debt within the statute period.',
  },
]

export default function TaxDebtSettlementCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <TaxDebtSettlementCalculator />
    </>
  )
}