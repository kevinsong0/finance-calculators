import MedicarePartDCoverageGapCalculator from '@/components/MedicarePartDCoverageGapCalculator'

export default function MedicarePartDCoverageGapCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Medicare Part D coverage gap (donut hole)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The coverage gap, commonly called the donut hole, is a phase in Part D coverage where you pay a higher share of drug costs. In 2024, the gap is mostly closed - you pay 25% for both brand-name and generic drugs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much do I pay in the Part D coverage gap in 2024?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2024, you pay 25% of the cost of both brand-name and generic drugs during the coverage gap. Manufacturer discounts cover 70% of brand-name drug costs in the gap.',
        },
      },
      {
        '@type': 'Question',
        name: 'When do I reach catastrophic coverage in Part D?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You reach catastrophic coverage when your true out-of-pocket (TrOOP) costs reach $8,400 in 2024. After this threshold, you pay only 5% coinsurance or small copays ($4.50 for brand, $0.10 for generic).',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MedicarePartDCoverageGapCalculator />
    </>
  )
}