import InterestExpenseDeductionTimingCalculator from '@/components/InterestExpenseDeductionTimingCalculator'

export const metadata = {
  title: 'Interest Expense Deduction Timing Calculator | Investment Interest',
  description: 'Calculate deduction limits and carryforward for investment, business, and mortgage interest expenses.',
  openGraph: {
    title: 'Interest Expense Deduction Timing Calculator',
    description: 'Calculate interest expense deduction limits and carryforward.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is the limit on investment interest deduction?',
    answer: 'Investment interest expense is limited to your net investment income (investment income minus investment expenses). Any excess carries forward indefinitely to future years. You must file Form 4952 to claim this deduction.',
  },
  {
    question: 'How does the business interest limitation work?',
    answer: 'Under the Tax Cuts and Jobs Act, business interest expense is limited to 30% of adjusted taxable income. Small businesses with average gross receipts under $27 million are exempt from this limitation. Excess interest carries forward indefinitely.',
  },
  {
    question: 'What mortgage interest is deductible?',
    answer: 'Interest on acquisition debt (mortgage used to buy, build, or substantially improve your home) is deductible up to a $750,000 loan limit. Home equity loan interest is no longer deductible under TCJA unless used for home acquisition or improvement.',
  },
  {
    question: 'Can I carry forward unused interest deductions?',
    answer: 'Investment and business interest deductions that exceed the annual limit can be carried forward indefinitely. Mortgage interest that exceeds the limit or is not deductible because you take the standard deduction cannot be carried forward.',
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
      <InterestExpenseDeductionTimingCalculator />
    </>
  )
}