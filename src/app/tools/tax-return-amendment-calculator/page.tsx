import TaxReturnAmendmentCalculator from '@/components/TaxReturnAmendmentCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Return Amendment Calculator | Form 1040-X Calculator',
  description: 'Calculate tax impact, interest, and penalties for filing Form 1040-X. Estimate amendment costs and refund claims.',
  openGraph: {
    title: 'Tax Return Amendment Calculator',
    description: 'Calculate tax impact, interest, and penalties for filing Form 1040-X.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'How long do I have to file an amended tax return?',
    answer: 'You must file Form 1040-X within 3 years from the date you filed your original return, or within 2 years from the date you paid the tax, whichever is later.',
  },
  {
    question: 'What interest rate applies to amended returns?',
    answer: 'The IRS interest rate is adjusted quarterly and compounds daily. Interest accrues from the original due date of the return until the date of payment.',
  },
  {
    question: 'When does the accuracy-related penalty apply?',
    answer: 'A 20% accuracy-related penalty applies if there is a substantial understatement of income tax (generally greater than $5,000 or 10% of the tax required to be shown).',
  },
  {
    question: 'Can I e-file Form 1040-X?',
    answer: 'Form 1040-X cannot be e-filed. You must mail the paper form to the appropriate IRS address based on your state of residence.',
  },
]

export default function TaxReturnAmendmentCalculatorPage() {
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
      <TaxReturnAmendmentCalculator />
    </>
  )
}