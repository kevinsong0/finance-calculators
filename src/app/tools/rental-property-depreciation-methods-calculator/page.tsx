import RentalPropertyDepreciationMethodsCalculator from '@/components/RentalPropertyDepreciationMethodsCalculator'

export const metadata = {
  title: 'Rental Property Depreciation Methods Calculator | MACRS Straight-Line',
  description: 'Compare depreciation methods for rental real estate. Calculate residential 27.5-year and commercial 39-year MACRS depreciation.',
  openGraph: {
    title: 'Rental Property Depreciation Methods Calculator',
    description: 'Compare depreciation methods for rental real estate properties.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What depreciation methods are available for rental property?',
    answer: 'Rental real estate must use MACRS straight-line depreciation. Residential rental property has a 27.5-year recovery period, while commercial property has a 39-year period. Accelerated depreciation methods are not allowed for rental real estate placed in service after 1986.',
  },
  {
    question: 'Is land depreciable?',
    answer: 'No, land is never depreciable. Only the building value and capital improvements can be depreciated. You must allocate the purchase price between land and building based on fair market values or appraisal.',
  },
  {
    question: 'Can I use Section 179 for rental property?',
    answer: 'No, Section 179 deduction is not allowed for rental property. This is a common mistake. Rental property must use regular MACRS depreciation over 27.5 or 39 years. Section 179 is only for business equipment and certain qualified property.',
  },
  {
    question: 'What is bonus depreciation for rental property?',
    answer: 'Bonus depreciation allows you to deduct a percentage of the cost in the first year. For 2024, the rate is 60%. Bonus depreciation is being phased down: 40% for 2025, 20% for 2026, and 0% after 2026. The remaining basis is depreciated over the recovery period.',
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
      <RentalPropertyDepreciationMethodsCalculator />
    </>
  )
}