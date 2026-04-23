import SocialSecurityDependentBenefitCalculator from '@/components/SocialSecurityDependentBenefitCalculator'

export default function SocialSecurityDependentBenefitCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Social Security dependent benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dependent benefits are Social Security payments to family members of a worker. This includes spouses (up to 50% of worker\'s benefit), children (up to 50%), and in rare cases, dependent parents.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much can a spouse receive on my Social Security record?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A spouse can receive up to 50% of the worker\'s Primary Insurance Amount at full retirement age. If claimed early at 62, the benefit is reduced by up to 35%. Surviving spouses can receive 100%.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Family Maximum Benefit (FMB)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FMB limits the total benefits paid to a worker and their family. It ranges from 150% to 188% of the worker\'s PIA. If worker plus dependents exceed FMB, each dependent\'s benefit is reduced proportionally.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SocialSecurityDependentBenefitCalculator />
    </>
  )
}