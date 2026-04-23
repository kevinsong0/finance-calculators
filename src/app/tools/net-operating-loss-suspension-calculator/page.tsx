import NetOperatingLossSuspensionCalculator from '@/components/NetOperatingLossSuspensionCalculator'

export const metadata = {
  title: 'Net Operating Loss Suspension Calculator | NOL Carryforward',
  description: 'Calculate NOL carryforward utilization and suspension rules under TCJA. Compare pre-2018 vs post-2017 NOL treatment.',
  openGraph: {
    title: 'Net Operating Loss Suspension Calculator',
    description: 'Calculate NOL carryforward utilization and suspension.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What are the NOL carryforward rules under TCJA?',
    answer: 'Under the Tax Cuts and Jobs Act (TCJA), NOLs arising after 2017 have unlimited carryforward (no 20-year expiration), but can only offset 80% of taxable income. Pre-2018 NOLs retain their 20-year carryforward and can offset 100% of taxable income.',
  },
  {
    question: 'What was the CARES Act impact on NOLs?',
    answer: 'The CARES Act temporarily allowed 5-year carryback for NOLs arising in 2018-2020, and temporarily removed the 80% limitation, allowing 100% offset of taxable income. These provisions expired, and post-2020 NOLs return to the TCJA rules.',
  },
  {
    question: 'How does the 80% limitation work?',
    answer: 'Post-2017 NOLs can only offset 80% of taxable income in any given year. For example, if you have $100,000 taxable income and a $100,000 NOL, you can only use $80,000 of the NOL, leaving $20,000 taxable income. The remaining NOL carries forward.',
  },
  {
    question: 'Do corporations and individuals have different NOL rules?',
    answer: 'C corporations are generally not subject to the excess business loss limitation that applies to individuals. However, both are subject to the 80% limitation on post-2017 NOLs. Individuals may also face basis, at-risk, and passive activity limitations.',
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
      <NetOperatingLossSuspensionCalculator />
    </>
  )
}