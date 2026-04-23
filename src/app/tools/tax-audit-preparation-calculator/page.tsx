import TaxAuditPreparationCalculator from '@/components/TaxAuditPreparationCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Audit Preparation Calculator | IRS Audit Defense Timeline',
  description: 'Calculate preparation timeline, documentation needs, and defense strategy for IRS audits. Get risk assessment and outcome scenarios.',
  openGraph: {
    title: 'Tax Audit Preparation Calculator',
    description: 'Calculate preparation timeline and defense strategy for IRS audits.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'How should I respond to an IRS audit notice?',
    answer: 'Respond within 30 days of receiving the audit notice. Organize all requested documents before submitting. Keep copies of everything you send. Request an extension if you need more time to gather documentation.',
  },
  {
    question: 'What documents should I prepare for an audit?',
    answer: 'Gather income documentation (W-2s, 1099s), receipts for deductions claimed, bank statements, charitable donation records, medical expense records, and any other documentation supporting items on your return.',
  },
  {
    question: 'Should I hire a professional for my audit?',
    answer: 'Consider professional representation for office or field audits, complex tax situations, business income audits, or if documentation is incomplete. Correspondence audits may be handled independently with good documentation.',
  },
  {
    question: 'What are the different types of IRS audits?',
    answer: 'Correspondence audits are conducted via mail. Office audits require visiting an IRS office. Field audits occur at your location. Each type has different complexity levels and preparation requirements.',
  },
]

export default function TaxAuditPreparationCalculatorPage() {
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
      <TaxAuditPreparationCalculator />
    </>
  )
}