import TaxFinancialStatementCalculator from '@/components/TaxFinancialStatementCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Financial Statement Calculator | Form 433-A/B/F Analysis',
  description: 'Calculate IRS Form 433-A/B/F financial analysis. Determine RCP, allowable expenses, payment capacity, and collection options.',
  openGraph: {
    title: 'Tax Financial Statement Calculator',
    description: 'Calculate IRS financial statement analysis for Form 433.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is Form 433-A?',
    answer: 'Form 433-A (Collection Information Statement for Wage Earners and Self-Employed Individuals) is used to report complete financial information to IRS. Includes income, expenses, assets, and liabilities. Required for IA over $50,000, OIC, and CNC determination.',
  },
  {
    question: 'How does IRS determine allowable expenses?',
    answer: 'IRS uses National Standards for food, clothing, miscellaneous. Local Standards for housing and transportation. Actual expenses for health care and other necessary items if documented. Expenses exceeding standards may be disallowed.',
  },
  {
    question: 'What is RCP (Reasonable Collection Potential)?',
    answer: 'RCP = Quick sale value of assets + Future income (disposable income × months remaining in 10-year statute). Determines OIC offer amount and IA payment capacity. Lower RCP than debt suggests OIC viable.',
  },
  {
    question: 'Which retirement accounts are exempt?',
    answer: '401(k), IRA, pension accounts generally exempt from IRS collection. IRS cannot levy qualified retirement plans. However, RCP may include value if early withdrawal possible. Roth IRA may have different treatment.',
  },
]

export default function TaxFinancialStatementCalculatorPage() {
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
      <TaxFinancialStatementCalculator />
    </>
  )
}