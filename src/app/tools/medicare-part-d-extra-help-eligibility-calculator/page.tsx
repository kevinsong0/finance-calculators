import MedicarePartDExtraHelpEligibilityCalculator from '@/components/MedicarePartDExtraHelpEligibilityCalculator'

export default function MedicarePartDExtraHelpEligibilityCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Medicare Part D Extra Help?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Extra Help (Low-Income Subsidy) is a Medicare program that helps people with limited income and resources pay for Part D prescription drug costs, including premiums, deductibles, and copays.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the 2024 income limits for Full Extra Help?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2024, Full Extra Help income limits are $21,850 for singles and $29,580 for married couples living together. Resource limits are $17,150 for singles and $34,300 for couples.',
        },
      },
      {
        '@type': 'Question',
        name: 'What benefits does Full Extra Help provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Full Extra Help provides $0 Part D premium, $0 deductible, and low copays ($4.50 generic, $11.30 brand). You also get continuous coverage through the coverage gap.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MedicarePartDExtraHelpEligibilityCalculator />
    </>
  )
}