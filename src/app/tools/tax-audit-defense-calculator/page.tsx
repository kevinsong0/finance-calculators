import TaxAuditDefenseCalculator from '@/components/TaxAuditDefenseCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Audit Defense Calculator | IRS Dispute Success Rate',
  description: 'Calculate defense strategy and likelihood of success for IRS audit disputes. Explore appeal options, costs, and timeline.',
  openGraph: {
    title: 'Tax Audit Defense Calculator',
    description: 'Calculate defense strategy and success likelihood for audit disputes.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is the difference between a 30-day letter and 90-day letter?',
    answer: 'A 30-day letter gives you 30 days to appeal to IRS Appeals Office. A 90-day letter (Statutory Notice of Deficiency) gives you 90 days to file a petition in Tax Court. Missing the 90-day deadline forfeits your appeal rights.',
  },
  {
    question: 'How do I request a penalty abatement?',
    answer: 'Request First-Time Abatement (FTA) if you have a clean compliance history for the past 3 years. Alternatively, argue reasonable cause by documenting circumstances that prevented compliance (death, serious illness, natural disaster).',
  },
  {
    question: 'When should I consider Tax Court versus IRS Appeals?',
    answer: 'IRS Appeals is informal and less costly. Tax Court is formal litigation but allows you to contest the tax before paying. Tax Court is appropriate for larger disputes, complex legal issues, or when Appeals is unsuccessful.',
  },
  {
    question: 'What factors affect audit defense success?',
    answer: 'Documentation strength, IRS position validity, audit stage, professional representation, and penalty circumstances all affect success likelihood. Strong documentation and questionable IRS positions improve outcomes.',
  },
]

export default function TaxAuditDefenseCalculatorPage() {
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
      <TaxAuditDefenseCalculator />
    </>
  )
}