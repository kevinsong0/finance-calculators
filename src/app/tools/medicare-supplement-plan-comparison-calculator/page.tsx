import MedicareSupplementPlanComparisonCalculator from '@/components/MedicareSupplementPlanComparisonCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between Medigap Plan G and Plan N?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Plan G covers Part A deductible, Part B excess charges, skilled nursing coinsurance, and foreign travel emergencies. Plan N has lower premiums but requires copays (up to $20 for ER/doctor visits) and does not cover Part B excess charges. Both require you to pay the Part B deductible ($240 in 2024).',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Plan F not available to new Medicare enrollees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Plan F was closed to new enrollees on January 1, 2020, because it covered the Part B deductible which Congress eliminated for new plans. If you were eligible for Medicare before 2020, you may still enroll in Plan F.',
        },
      },
      {
        '@type': 'Question',
        name: 'When is the best time to buy Medigap insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best time is during Medigap Open Enrollment Period, which starts when you are 65+ and enrolled in Part B. This 6-month window guarantees issuance without medical underwriting at the best available rates.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Medigap premiums increase with age?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Medigap premiums typically increase with age. The age factor ranges from 1.0 (under 70) to 1.45 (80+). Some states use community-rated pricing where everyone pays the same premium regardless of age.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does tobacco use affect Medigap premiums?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tobacco users typically pay about 20% higher premiums for Medigap plans. This surcharge applies during underwriting and may vary by insurer and state regulations.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MedicareSupplementPlanComparisonCalculator />
    </>
  )
}