import IRSStatuteOfLimitationsCalculator from '@/components/IRSStatuteOfLimitationsCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IRS Statute of Limitations Calculator | ASED & CSED Calculator',
  description: 'Calculate IRS assessment and collection statute expiration dates. Understand ASED (3-6 years) and CSED (10 years) deadlines.',
  openGraph: {
    title: 'IRS Statute of Limitations Calculator',
    description: 'Calculate IRS assessment and collection statute expiration dates.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'What is the IRS assessment statute of limitations (ASED)?',
    answer: 'The ASED is typically 3 years from the date you filed your return. It extends to 6 years if you omit more than 25% of your gross income. If no return is filed or fraud is involved, the statute is unlimited.',
  },
  {
    question: 'What is the collection statute expiration date (CSED)?',
    answer: 'The CSED is 10 years from the date of assessment. The IRS must collect the tax within this period, though certain events like bankruptcy or offer in compromise can extend it.',
  },
  {
    question: 'When does the refund statute expire?',
    answer: 'You must claim a refund within 3 years from the date you filed the return, or 2 years from the date you paid the tax, whichever is later.',
  },
  {
    question: 'How long should I keep tax records?',
    answer: 'Keep records for at least 7 years to cover both the 3-year assessment period and potential 6-year extension for substantial omissions. For fraud or no-return situations, keep indefinitely.',
  },
]

export default function IRSStatuteOfLimitationsCalculatorPage() {
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
      <IRSStatuteOfLimitationsCalculator />
    </>
  )
}