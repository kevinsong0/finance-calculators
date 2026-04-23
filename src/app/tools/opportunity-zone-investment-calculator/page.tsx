import OpportunityZoneInvestmentCalculator from '@/components/OpportunityZoneInvestmentCalculator'

export const metadata = {
  title: 'Opportunity Zone Investment Calculator | Section 1400Z Tax Benefits',
  description: 'Calculate tax benefits of Qualified Opportunity Zone investments. Basis step-up, gain deferral, and appreciation exclusion.',
  openGraph: {
    title: 'Opportunity Zone Investment Calculator',
    description: 'Calculate QOZ tax benefits including basis step-up and exclusion.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What are Opportunity Zones?',
    answer: 'Opportunity Zones are designated census tracts where investments receive special tax treatment. Investing capital gains in a Qualified Opportunity Fund (QOF) allows deferral of original gains and potential exclusion of appreciation.',
  },
  {
    question: 'What are the holding period benefits?',
    answer: '5-year hold: 10% basis step-up (deferred gain reduced by 10%). 7-year hold: additional 5% step-up (15% total). 10+ year hold: complete exclusion of all appreciation on the QOF investment.',
  },
  {
    question: 'When must deferred gains be recognized?',
    answer: 'Deferred gains must be recognized by December 31, 2026, or earlier if you sell the QOF investment. The basis step-up reduces the deferred gain that must be recognized.',
  },
  {
    question: 'What investments qualify?',
    answer: 'You must invest capital gains within 180 days of realizing them. The investment must be in QOZ property (stock, partnership interest, or tangible property in a QOZ). Investment deadline for full 10-year benefit was December 31, 2021.',
  },
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
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
      <OpportunityZoneInvestmentCalculator />
    </>
  )
}