import StateTaxApportionmentCalculator from '@/components/StateTaxApportionmentCalculator'

export const metadata = {
  title: 'State Tax Apportionment Calculator | Multi-State Income',
  description: 'Apportion income between states based on residency, days spent, and source rules. Calculate multi-state tax liability.',
  openGraph: {
    title: 'State Tax Apportionment Calculator',
    description: 'Calculate state tax apportionment for multi-state taxpayers.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is income apportioned between states?',
    answer: 'Income can be apportioned using time-based allocation (days spent in each state), source-based allocation (where income was earned), or domicile rules. Wages are typically taxed where the work is performed. Investment income follows domicile state rules.',
  },
  {
    question: 'What is the 183-day rule?',
    answer: 'Many states use the 183-day rule to determine residency. If you spend 183 or more days in a state, you may be considered a resident for tax purposes and subject to tax on all your income, not just state-source income.',
  },
  {
    question: 'How do credits for taxes paid to other states work?',
    answer: 'If you pay tax to one state on income that is also taxable in your resident state, your resident state typically allows a credit for taxes paid to the other state. This prevents double taxation but you effectively pay the higher of the two state rates.',
  },
  {
    question: 'What is domicile vs residency?',
    answer: 'Domicile is your permanent legal home - the state you intend to return to. Residency is based on physical presence. You can be a resident of multiple states simultaneously, but can have only one domicile. Investment income is taxed at your domicile state.',
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
      <StateTaxApportionmentCalculator />
    </>
  )
}