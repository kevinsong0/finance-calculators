import TaxBankruptcyCalculator from '@/components/TaxBankruptcyCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Bankruptcy Calculator | Tax Debt Dischargeability',
  description: 'Calculate tax debt dischargeability in bankruptcy. Check 3-year rule, 240-day rule, filing rule. Compare Chapter 7 and Chapter 13 for tax debt.',
  openGraph: {
    title: 'Tax Bankruptcy Calculator',
    description: 'Calculate tax debt dischargeability in bankruptcy.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'Can tax debt be discharged in bankruptcy?',
    answer: 'Income tax debt can be discharged if: return filed at least 3 years before bankruptcy, assessment at least 240 days before bankruptcy, return was actually filed, no fraud or willful evasion.',
  },
  {
    question: 'What is the 3-year rule for tax bankruptcy?',
    answer: 'Tax return must have been filed at least 3 years before filing bankruptcy. Late-filed returns must wait 3 years from filing date (not due date). Extensions extend the 3-year period.',
  },
  {
    question: 'What is the 240-day rule?',
    answer: 'Tax must have been assessed at least 240 days before filing bankruptcy. Assessment date is when IRS officially records the tax liability. Extensions, OIC, and appeals extend the 240-day period.',
  },
  {
    question: 'What tax debt is never dischargeable?',
    answer: 'Tax debt from fraudulent returns, willful tax evasion, unfiled returns, trust fund recovery penalty (payroll taxes), and certain penalties are never dischargeable in bankruptcy.',
  },
]

export default function TaxBankruptcyCalculatorPage() {
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
      <TaxBankruptcyCalculator />
    </>
  )
}