import SocialSecurityDelayedClaimingBenefitCalculator from '@/components/SocialSecurityDelayedClaimingBenefitCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does my Social Security benefit increase if I delay claiming?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For each year you delay claiming after your Full Retirement Age (FRA), your benefit increases by 8%. This is called Delayed Retirement Credits (DRC). If you delay from age 67 to 70, your benefit increases by 24%.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the maximum age to delay Social Security?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The maximum age to delay Social Security is 70. After age 70, you no longer earn Delayed Retirement Credits, so there is no benefit to waiting beyond 70 to claim.',
        },
      },
      {
        '@type': 'Question',
        name: 'When is the break-even age for delaying Social Security?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The break-even age is typically between 78 and 82 years old. If you delay claiming from FRA to age 70, you need to live past about age 80-82 for the higher monthly benefit to offset the years of foregone payments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do COLA adjustments affect delayed benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, COLA (Cost-of-Living Adjustment) increases are applied to your higher delayed benefit, making it even more valuable over time. The 8% DRC increase compounds with COLA adjustments.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does delaying affect survivor benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, delaying your benefit can increase survivor benefits for your spouse. If you die, your spouse can receive your delayed benefit amount (including DRCs) as a survivor benefit.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SocialSecurityDelayedClaimingBenefitCalculator />
    </>
  )
}