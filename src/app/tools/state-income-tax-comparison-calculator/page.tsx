import StateIncomeTaxComparisonCalculator from '@/components/StateIncomeTaxComparisonCalculator'

export const metadata = {
  title: 'State Income Tax Comparison Calculator | Compare Tax Burden by State',
  description: 'Compare state income tax between states for relocation decisions. See which states have no income tax and calculate potential savings.',
  openGraph: {
    title: 'State Income Tax Comparison Calculator',
    description: 'Compare state income tax burden for relocation planning.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Which states have no income tax?',
    answer: 'Nine states have no individual income tax: Texas, Florida, Washington, Nevada, South Dakota, Alaska, Wyoming, Tennessee (Hall tax repealed 2021), and New Hampshire (only taxes dividends/interest).',
  },
  {
    question: 'How do state tax rates vary?',
    answer: 'State income tax rates range from 0% (no income tax states) to over 13% (California top rate). Some states have flat rates (PA 3.07%, MI 4.25%), while others have progressive brackets.',
  },
  {
    question: 'Should I move to a low-tax state?',
    answer: 'Consider overall cost of living, property taxes, sales taxes, job market, and quality of life. A state with no income tax may have higher property or sales taxes. Use the SALT deduction ($10K cap) for federal benefit.',
  },
  {
    question: 'How do I establish residency in a new state?',
    answer: 'Follow the 183-day rule: spend more than half the year in your new state. Register vehicles, update voter registration, open local bank accounts, and change mailing address. File part-year returns for the transition year.',
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
      <StateIncomeTaxComparisonCalculator />
    </>
  )
}