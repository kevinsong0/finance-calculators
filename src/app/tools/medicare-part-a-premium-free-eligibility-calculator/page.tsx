import MedicarePartAPremiumFreeEligibilityCalculator from '@/components/MedicarePartAPremiumFreeEligibilityCalculator'

export default function MedicarePartAPremiumFreeEligibilityCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I qualify for premium-free Medicare Part A?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You qualify for premium-free Part A if you have 40 quarters (10 years) of Social Security-covered employment. You earn up to 4 quarters per year based on your earnings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get premium-free Part A through my spouse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can qualify through your spouse if they have 40 quarters of covered employment and you are married 10+ years, or if you are a widowed spouse qualifying on a deceased spouse\'s record.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Part A premium if I do not have enough quarters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In 2024, if you have 30-39 quarters, you pay $278/month. If you have fewer than 30 quarters, you pay the full premium of $505/month. You can still enroll in Part A by paying the premium.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MedicarePartAPremiumFreeEligibilityCalculator />
    </>
  )
}