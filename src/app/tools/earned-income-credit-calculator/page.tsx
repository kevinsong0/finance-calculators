import EarnedIncomeCreditCalculator from '@/components/EarnedIncomeCreditCalculator'

export const metadata = {
  title: 'Earned Income Tax Credit Calculator 2024-2025 | EITC Estimator',
  description: 'Calculate your Earned Income Tax Credit (EITC) for 2024-2025. Estimate your refundable credit amount based on income, filing status, and number of qualifying children.',
  keywords: 'earned income tax credit calculator, EITC calculator, earned income credit, EIC calculator, refundable tax credit, low income tax credit, EITC 2024, EITC 2025',
}

const faqData = [
  {
    question: 'What is the maximum Earned Income Tax Credit for 2024-2025?',
    answer: 'The maximum EITC for 2024-2025 is: $632 with no qualifying children, $4,216 with one qualifying child, $6,960 with two qualifying children, and $7,830 with three or more qualifying children.',
  },
  {
    question: 'What are the income limits for the EITC in 2024-2025?',
    answer: 'EITC income limits vary by filing status and number of children. For single filers in 2024: $18,591 (0 children), $49,084 (1 child), $55,768 (2 children), $59,899 (3+ children). For married filing jointly, limits are slightly higher.',
  },
  {
    question: 'Is the Earned Income Tax Credit refundable?',
    answer: 'Yes, the EITC is fully refundable. This means you can receive the full credit amount even if it exceeds your tax liability, resulting in a refund from the IRS.',
  },
  {
    question: 'Who qualifies for the Earned Income Tax Credit?',
    answer: 'To qualify for EITC, you must have earned income, be a U.S. citizen or resident alien, have a valid Social Security number, meet income limits, and not file as married filing separately. Investment income must be under $11,600.',
  },
  {
    question: 'How does the EITC phase-in and phase-out work?',
    answer: 'The EITC phases in at a percentage rate as income increases from $0, reaches a plateau at maximum credit, then phases out as income approaches the limit. The phase-in rate is 7.65% (0 children), 34% (1 child), 40% (2 children), 45% (3+ children).',
  },
]

export default function EarnedIncomeCreditCalculatorPage() {
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
      <EarnedIncomeCreditCalculator />
    </>
  )
}