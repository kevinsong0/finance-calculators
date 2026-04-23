import MedicareMedigapPlanComparisonCalculator from '@/components/MedicareMedigapPlanComparisonCalculator'

export default function MedicareMedigapPlanComparisonCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best Medigap plan for new Medicare enrollees?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Plan G is the most popular for new enrollees because it covers almost everything except the Part B deductible ($240). Plan F is no longer available to those who became eligible after 2020.',
        },
      },
      {
        '@type': 'Question',
        name: 'When is the best time to buy a Medigap policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best time is during your Medigap Open Enrollment Period - the 6 months after you enroll in Part B at age 65. During this period, you have guaranteed issue rights regardless of health status.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Medigap premiums vary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Premiums vary based on age (higher for older), tobacco use (20%+ increase), health status, location (state), and insurance company. Plans are standardized - same coverage from any insurer.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MedicareMedigapPlanComparisonCalculator />
    </>
  )
}