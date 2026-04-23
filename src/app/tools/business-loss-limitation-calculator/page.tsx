import BusinessLossLimitationCalculator from '@/components/BusinessLossLimitationCalculator'

export const metadata = {
  title: 'Business Loss Limitation Calculator | Basis, At-Risk, Passive Limits',
  description: 'Calculate multiple limitations on business losses including basis, at-risk, passive activity, and excess business loss rules.',
  openGraph: {
    title: 'Business Loss Limitation Calculator',
    description: 'Calculate limitations on business loss deductions.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is the excess business loss limitation?',
    answer: 'The excess business loss limitation restricts the amount of business losses an individual can deduct against non-business income. For 2024, the threshold is $305,000 for single filers and $610,000 for joint filers. Excess losses carryforward as NOL.',
  },
  {
    question: 'How does basis limitation work?',
    answer: 'Your deduction for losses from an S corporation or partnership is limited to your basis in the entity. Basis includes your capital contributions, share of income, and allocated debt. Losses exceeding basis are suspended and carryforward until you increase basis.',
  },
  {
    question: 'What is the at-risk limitation?',
    answer: 'The at-risk limitation restricts loss deductions to the amount you have economically at risk in the activity. At-risk includes cash invested, property contributed, and recourse debt. Nonrecourse financing is generally not at-risk.',
  },
  {
    question: 'In what order are limitations applied?',
    answer: 'Loss limitations are applied in a specific hierarchy: first basis limitation, then at-risk limitation, then passive activity limitation, and finally excess business loss limitation. Each limitation may suspend a portion of the loss.',
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
      <BusinessLossLimitationCalculator />
    </>
  )
}