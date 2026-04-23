import PassiveActivityGroupingCalculator from '@/components/PassiveActivityGroupingCalculator'

export const metadata = {
  title: 'Passive Activity Grouping Calculator | Group Activities for Tax Benefits',
  description: 'Evaluate grouping passive activities to maximize loss utilization. Understand REPS status, material participation, and Form 8582 reporting.',
  openGraph: {
    title: 'Passive Activity Grouping Calculator',
    description: 'Group passive activities to optimize tax loss utilization.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is passive activity grouping?',
    answer: 'Grouping is an election that treats multiple passive activities as one single activity. This allows pooling income and losses, and combining hours for material participation tests. The election is filed with your tax return and is irrevocable.',
  },
  {
    question: 'What activities can be grouped together?',
    answer: 'You can group rental activities with other rental activities, and business activities with other business activities. You generally cannot group rental with non-rental activities unless you qualify as a Real Estate Professional (REPS).',
  },
  {
    question: 'How does REPS affect grouping?',
    answer: 'Real Estate Professional Status (REPS) allows grouping rental activities with non-rental passive activities. If you materially participate in the grouped activity (750+ hours, more than half of personal service time), all rental income becomes non-passive.',
  },
  {
    question: 'What happens to suspended passive losses?',
    answer: 'Suspended passive losses carry forward indefinitely. They can be used in future years when you have passive income, or when you dispose of your entire interest in the passive activity in a fully taxable transaction.',
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
      <PassiveActivityGroupingCalculator />
    </>
  )
}