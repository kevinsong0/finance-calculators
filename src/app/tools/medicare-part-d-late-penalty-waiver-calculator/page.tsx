import MedicarePartDLatePenaltyWaiverCalculator from '@/components/MedicarePartDLatePenaltyWaiverCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How is the Medicare Part D late enrollment penalty calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The penalty is 1% of the national base premium ($32 in 2024) for each month you were without creditable drug coverage after age 65. For example, 12 months without coverage adds a $3.84 monthly penalty. This penalty is permanent.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I avoid the Part D late enrollment penalty?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, if you had creditable drug coverage (employer plan, Medicaid, VA, TRICARE) during the gap, the penalty is waived. You can also avoid penalty by enrolling during your Initial Enrollment Period (around age 65) or using a Special Enrollment Period after losing employer coverage.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the Part D penalty last?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Part D late enrollment penalty is permanent - it lasts for as long as you have Part D coverage. There is no end date. However, if you qualify for Extra Help (Low-Income Subsidy), the penalty may be waived.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is creditable coverage for Part D?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Creditable coverage is drug coverage that is at least as good as Part D. Examples include employer group health plans, Medicaid, VA drug coverage, TRICARE, and some state pharmaceutical assistance programs. Ask your plan administrator for a letter confirming creditable status.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I enroll in Part D?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enroll during your Initial Enrollment Period (7 months around age 65) if you do not have other creditable coverage. If you have employer coverage, you can delay until you lose that coverage and use the 2-month Special Enrollment Period.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MedicarePartDLatePenaltyWaiverCalculator />
    </>
  )
}