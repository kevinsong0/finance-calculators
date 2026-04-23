import TaxPenaltyAppealCalculator from '@/components/TaxPenaltyAppealCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Penalty Appeal Calculator | IRS Penalty Abatement Options',
  description: 'Calculate IRS penalty appeal options, success likelihood, and abatement amount. Explore FTA, reasonable cause, and Appeals strategies.',
  openGraph: {
    title: 'Tax Penalty Appeal Calculator',
    description: 'Calculate appeal options and success likelihood for IRS penalty abatement.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is First-Time Abatement (FTA)?',
    answer: 'FTA removes certain penalties if you have a clean compliance history for the past 3 years (no penalties, filed timely, paid taxes). Available for failure-to-file and failure-to-pay penalties. Often granted automatically upon request.',
  },
  {
    question: 'What qualifies as reasonable cause for penalty abatement?',
    answer: 'Reasonable cause includes: death of family member, serious illness, natural disaster, inability to obtain records despite reasonable efforts, or other circumstances beyond your control. Requires thorough documentation.',
  },
  {
    question: 'Can fraud penalties be abated?',
    answer: 'Fraud penalties (75%) are extremely difficult to abate. Requires proving no fraudulent intent existed. Success rate very low. Tax attorney consultation essential.',
  },
  {
    question: 'What is the appeal process for penalty abatement?',
    answer: 'First request FTA or reasonable cause with IRS. If denied, file written protest to Appeals Office within 30 days. Appeals can negotiate settlement. For larger disputes, Tax Court petition within 90 days of SNOD.',
  },
]

export default function TaxPenaltyAppealCalculatorPage() {
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
      <TaxPenaltyAppealCalculator />
    </>
  )
}