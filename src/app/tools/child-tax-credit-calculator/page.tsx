import ChildTaxCreditCalculator from '@/components/ChildTaxCreditCalculator'

export const metadata = {
  title: 'Child Tax Credit Calculator 2024-2025 | Estimate Your CTC',
  description: 'Calculate your Child Tax Credit amount for 2024-2025. Estimate refundable Additional Child Tax Credit (ACTC) and Other Dependent Credit based on income and qualifying children.',
  keywords: 'child tax credit calculator, CTC calculator, additional child tax credit, ACTC calculator, dependent credit, tax credit calculator, child tax credit 2024, child tax credit 2025',
}

const faqData = [
  {
    question: 'What is the Child Tax Credit amount for 2024-2025?',
    answer: 'The Child Tax Credit is $2,000 per qualifying child under age 17. Of this, up to $1,700 is refundable as the Additional Child Tax Credit (ACTC), meaning you can receive it even if you owe no taxes. The remaining $300 is non-refundable.',
  },
  {
    question: 'What are the income limits for the Child Tax Credit phase-out?',
    answer: 'The Child Tax Credit begins to phase out when your modified adjusted gross income exceeds $200,000 for single filers or $400,000 for married filing jointly. The credit reduces by $50 for each $1,000 above these thresholds.',
  },
  {
    question: 'What is the Additional Child Tax Credit (ACTC)?',
    answer: 'The Additional Child Tax Credit (ACTC) is the refundable portion of the Child Tax Credit, worth up to $1,700 per qualifying child. You can claim the ACTC if your CTC exceeds your tax liability, even if you owe no taxes.',
  },
  {
    question: 'What is the Other Dependent Credit?',
    answer: 'The Other Dependent Credit is a $500 non-refundable credit for dependents who do not qualify for the Child Tax Credit. This includes dependents age 17 or older, or other qualifying relatives.',
  },
  {
    question: 'Who qualifies for the Child Tax Credit?',
    answer: 'To qualify for the Child Tax Credit, a child must be: under age 17 at the end of the year, a U.S. citizen, national, or resident alien, claimed as your dependent, lived with you for more than half the year, and not provided more than half of their own support.',
  },
]

export default function ChildTaxCreditCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
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
      <ChildTaxCreditCalculator />
    </>
  )
}