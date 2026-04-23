import DepreciationCalculator from '@/components/DepreciationCalculator'

export const metadata = {
  title: 'MACRS Depreciation Calculator 2024-2025 | Section 179 & Bonus Depreciation',
  description: 'Calculate MACRS depreciation, Section 179 expensing, and bonus depreciation for business assets. Compute depreciation schedules for equipment, vehicles, and buildings.',
  keywords: 'depreciation calculator, MACRS depreciation, Section 179 calculator, bonus depreciation, business asset depreciation, depreciation schedule, IRS depreciation',
}

const faqData = [
  {
    question: 'What is MACRS depreciation?',
    answer: 'MACRS (Modified Accelerated Cost Recovery System) is the IRS depreciation method for most business assets. It allows faster depreciation in early years compared to straight-line, using prescribed recovery periods: 5 years for equipment/vehicles, 7 years for furniture/fixtures, 27.5 years for residential property, 39 years for commercial buildings.',
  },
  {
    question: 'What is the Section 179 deduction limit for 2024?',
    answer: 'The Section 179 deduction limit for 2024 is $1,220,000 with a phase-out threshold of $3,050,000. Section 179 allows immediate expensing of qualifying business equipment instead of depreciating over time. The deduction phases out dollar-for-dollar when total assets placed in service exceed $3.05 million.',
  },
  {
    question: 'What is bonus depreciation for 2024-2025?',
    answer: 'Bonus depreciation rates are declining: 60% for 2024, 40% for 2025, 20% for 2026, and 0% after 2026. Bonus depreciation allows immediate deduction of a percentage of asset cost after any Section 179 expense. It applies to remaining basis and can be used even if Section 179 limits are exceeded.',
  },
  {
    question: 'What is the difference between Section 179 and bonus depreciation?',
    answer: 'Section 179 has annual limits ($1.22M for 2024) and phase-out thresholds, applies only to qualifying property, and you elect specific amounts. Bonus depreciation has no limits, applies automatically to all eligible property unless you elect out, and the percentage is fixed by year (60% in 2024). Use Section 179 first, then bonus depreciation on remaining basis.',
  },
  {
    question: 'What recovery period applies to different assets?',
    answer: 'Recovery periods under MACRS: 5-year for equipment, machinery, vehicles, computers; 7-year for office furniture, fixtures; 10-year for qualified leasehold improvements; 15-year for qualified improvement property; 20-year for certain farm buildings; 27.5-year for residential rental property; 39-year for non-residential real property.',
  },
]

export default function DepreciationCalculatorPage() {
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
      <DepreciationCalculator />
    </>
  )
}