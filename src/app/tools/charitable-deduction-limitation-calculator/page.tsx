import CharitableDeductionLimitationCalculator from '@/components/CharitableDeductionLimitationCalculator'

export const metadata = {
  title: 'Charitable Deduction Limitation Calculator | AGI Percentage Limits',
  description: 'Calculate AGI percentage limits for charitable donations. Compare public charity vs private foundation deduction limits.',
  openGraph: {
    title: 'Charitable Deduction Limitation Calculator',
    description: 'Calculate charitable deduction AGI limits and carryforward.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is the AGI limit for cash donations to public charities?',
    answer: 'For donations to public charities, cash contributions are limited to 60% of your adjusted gross income (AGI). This was increased from 50% by the Tax Cuts and Jobs Act. Any excess carries forward for up to 5 years.',
  },
  {
    question: 'How are appreciated property donations limited?',
    answer: 'Donations of appreciated property (like stocks held more than one year) to public charities are limited to 30% of AGI. You get a deduction for fair market value and avoid paying capital gains tax on the appreciation.',
  },
  {
    question: 'What are private foundation donation limits?',
    answer: 'Private non-operating foundations have lower deduction limits: 30% of AGI for cash donations and only 20% of AGI for appreciated property. Private operating foundations have higher limits similar to public charities.',
  },
  {
    question: 'How long can I carry forward excess charitable donations?',
    answer: 'Charitable donations exceeding AGI limits can be carried forward for up to 5 years. The carryforward retains its character (cash vs property) and is used in order of contribution year when applicable limits allow.',
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
      <CharitableDeductionLimitationCalculator />
    </>
  )
}