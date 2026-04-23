import TaxSettlementTimelineCalculator from '@/components/TaxSettlementTimelineCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Settlement Timeline Calculator | OIC, CNC, IA Timeline',
  description: 'Calculate timeline and milestones for IRS settlement options: Offer in Compromise, Currently Not Collectible, Installment Agreement, Partial Payment.',
  openGraph: {
    title: 'Tax Settlement Timeline Calculator',
    description: 'Calculate timeline for IRS tax settlement options.',
    type: 'website',
  },
}

const faqData = [
  {
    question: 'How long does Offer in Compromise take?',
    answer: 'OIC typically takes 12-24 months from submission to acceptance. Pre-application preparation 2-4 weeks, IRS review 4-12 months, negotiation 2-6 months. Payment period 5-24 months after acceptance.',
  },
  {
    question: 'What is Currently Not Collectible timeline?',
    answer: 'CNC status granted within 2-6 weeks if hardship demonstrated. Collection suspended immediately. Debt remains for 10-year CSED period with annual IRS reviews. Debt expires when collection statute expires.',
  },
  {
    question: 'How long is Installment Agreement?',
    answer: 'IA duration depends on payment amount. Monthly payment divided by total debt equals months needed. Streamlined IA up to 72 months. Formal IA may extend longer based on disposable income.',
  },
  {
    question: 'What is Partial Payment IA timeline?',
    answer: 'PPIA payments continue until CSED expires (10 years from assessment). Remaining debt forgiven upon statute expiration. Requires annual financial review. Duration depends on years remaining on collection statute.',
  },
]

export default function TaxSettlementTimelineCalculatorPage() {
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
      <TaxSettlementTimelineCalculator />
    </>
  )
}