import TaxDisputeResolutionCalculator from '@/components/TaxDisputeResolutionCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Dispute Resolution Calculator | IRS Appeal Options',
  description: 'Calculate options, timeline, and costs for resolving tax disputes. Understand examination, appeals, and Tax Court procedures.',
  openGraph: {
    title: 'Tax Dispute Resolution Calculator',
    description: 'Calculate options and costs for resolving tax disputes.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What are the stages of resolving a tax dispute?',
    answer: 'Tax disputes typically progress through: 1) Examination/correspondence with IRS agent, 2) IRS Appeals Office, 3) Tax Court or other federal courts. Most disputes resolve at the examination or Appeals stage.',
  },
  {
    question: 'How do I request an IRS appeal?',
    answer: 'File a written protest within 30 days of receiving a 30-day letter. Include: statement of facts, law and arguments, penalties under examination, and statement of taxpayer agreement/disagreement. For collection issues, file Form 12153.',
  },
  {
    question: 'What is the deadline to file Tax Court petition?',
    answer: 'You must file a Tax Court petition within 90 days (150 days if outside the US) from the date of the Statutory Notice of Deficiency (90-day letter). This deadline cannot be extended.',
  },
  {
    question: 'Can I get a penalty removed without going to court?',
    answer: 'Yes. Request first-time penalty abatement if you have 3 years of clean compliance history. Alternatively, argue reasonable cause (serious illness, death, casualty, inability to get records). The IRS Appeals Office can also reduce penalties.',
  },
]

export default function TaxDisputeResolutionCalculatorPage() {
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
      <TaxDisputeResolutionCalculator />
    </>
  )
}