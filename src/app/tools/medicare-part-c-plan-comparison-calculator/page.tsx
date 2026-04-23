import MedicarePartCPlanComparisonCalculator from '@/components/MedicarePartCPlanComparisonCalculator'

export default function MedicarePartCPlanComparisonCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between Medicare Advantage and Original Medicare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Medicare Advantage (Part C) bundles Part A, B, and usually D into one plan with network restrictions but lower premiums and extra benefits. Original Medicare allows nationwide provider access but requires separate Part D and Medigap for comprehensive coverage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which is better for frequent travelers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Original Medicare is better for frequent travelers because it works with any Medicare-certified provider nationwide. Medicare Advantage plans are network-based and may have limited coverage outside your area.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Medicare Advantage have an out-of-pocket maximum?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Medicare Advantage plans have a maximum out-of-pocket limit of $8,850 in 2024. Original Medicare has no cap unless you have a Medigap policy that covers most costs.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MedicarePartCPlanComparisonCalculator />
    </>
  )
}