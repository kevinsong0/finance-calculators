import InvestmentInterestDeductionCalculator from '@/components/InvestmentInterestDeductionCalculator'

export const metadata = {
  title: 'Investment Interest Deduction Calculator | Form 4952',
  description: 'Calculate deductible investment interest expense. Evaluate election to include qualified dividends and capital gains in net investment income.',
  openGraph: {
    title: 'Investment Interest Deduction Calculator',
    description: 'Calculate investment interest deduction and election impact.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is investment interest expense?',
    answer: 'Investment interest expense is interest paid on loans used to purchase or carry investment property. This includes margin interest, loans to buy stocks, and interest on borrowed funds used for investments.',
  },
  {
    question: 'How is the deduction limited?',
    answer: 'The deduction is limited to your net investment income (investment income minus investment expenses). If your interest exceeds NII, the excess carries forward indefinitely.',
  },
  {
    question: 'Should I elect to include qualified dividends in NII?',
    answer: 'By default, qualified dividends and long-term capital gains are excluded from NII and taxed at preferential rates. You can elect to include them, which allows more interest deduction but makes them taxable at ordinary rates. Calculate the net tax benefit before deciding.',
  },
  {
    question: 'How do I report investment interest?',
    answer: 'File Form 4952 to calculate the deduction. Attach an election statement if you choose to include qualified dividends/LTCG in NII. The deduction is reported on Schedule A as investment interest.',
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
      <InvestmentInterestDeductionCalculator />
    </>
  )
}