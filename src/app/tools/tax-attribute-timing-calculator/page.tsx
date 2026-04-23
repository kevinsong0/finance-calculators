import TaxAttributeTimingCalculator from '@/components/TaxAttributeTimingCalculator'

export const metadata = {
  title: 'Tax Attribute Timing Calculator | Income & Deduction Timing',
  description: 'Compare tax impact of timing strategies for income recognition and deduction claims. Accelerate or defer based on rate differences.',
  openGraph: {
    title: 'Tax Attribute Timing Calculator',
    description: 'Compare tax impact of income and deduction timing strategies.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'When should I accelerate income recognition?',
    answer: 'Accelerate income when your current tax rate is lower than your expected future tax rate. For example, if you expect to move to a higher tax bracket next year, recognize income this year at the lower rate. This saves the difference between the two rates.',
  },
  {
    question: 'When should I defer deductions?',
    answer: 'Defer deductions to a future year when you expect your tax rate to be higher. A deduction worth $10,000 at 24% saves $2,400, but at 32% it saves $3,200. Deferring the deduction increases the tax benefit.',
  },
  {
    question: 'What is the time value of money consideration?',
    answer: 'Tax savings today are worth more than tax savings in the future due to the time value of money. Use a discount rate (typically 5%) to calculate the present value benefit. A $1,000 tax savings next year has a present value of about $952.',
  },
  {
    question: 'How does bunching deductions work?',
    answer: 'Bunching involves timing deductions to maximize benefit. If your deductions alternate between below and above the standard deduction threshold, bunch multiple years of deductions into one year to exceed the threshold and itemize, then use standard deduction in alternate years.',
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
      <TaxAttributeTimingCalculator />
    </>
  )
}