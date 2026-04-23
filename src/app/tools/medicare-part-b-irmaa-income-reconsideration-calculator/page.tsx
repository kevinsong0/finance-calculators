import MedicarePartBIRMAAIncomeReconsiderationCalculator from '@/components/MedicarePartBIRMAAIncomeReconsiderationCalculator'

export default function MedicarePartBIRMAAIncomeReconsiderationCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is IRMAA reconsideration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IRMAA reconsideration allows you to request a reduction in your Medicare Part B income-related premium if you had a life-changing event that reduced your income. File SSA-44 form with documentation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What life-changing events qualify for IRMAA reconsideration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Qualifying events include: marriage, divorce, death of spouse, retirement/work stoppage, loss of income-producing property, reduction or loss of pension, and natural disasters.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I file for IRMAA reconsideration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Complete SSA-44 form (Medicare Income-Related Premium Adjustment Request), provide evidence of the life-changing event, provide income documentation, and submit to your local Social Security office.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MedicarePartBIRMAAIncomeReconsiderationCalculator />
    </>
  )
}