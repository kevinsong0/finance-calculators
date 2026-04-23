import SocialSecurityFamilyMaximumBenefitCalculator from '@/components/SocialSecurityFamilyMaximumBenefitCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Social Security Family Maximum Benefit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Family Maximum Benefit (FMB) is a cap on the total benefits payable on one worker\'s record. It ranges from 150% to 188% of the worker\'s Primary Insurance Amount (PIA), depending on the PIA level. The FMB limits benefits for spouse, children, and other dependents.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much can a spouse receive on my Social Security record?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A spouse can receive up to 50% of the worker\'s PIA while the worker is alive (if the spouse doesn\'t have their own higher benefit). As a survivor, the spouse can receive 100% of the worker\'s PIA at full retirement age.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much can children receive on my Social Security record?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Children under 18 (or disabled) can receive up to 50% of the worker\'s PIA while the worker is alive, and 75% if the worker is deceased. These benefits are subject to the Family Maximum Benefit cap.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if family benefits exceed the Family Maximum?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If total family benefits exceed the FMB, each auxiliary benefit (spouse, children) is reduced proportionally. The worker\'s own benefit is NOT reduced - only the benefits paid to family members are lowered to stay within the FMB.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is the Family Maximum Benefit calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FMB uses a formula: 150% of first $1,174 of PIA, 272% from $1,174-$1,778, 134% from $1,778-$2,372, and 175% above $2,372. This results in FMB ranging from 150% to 188% of PIA, capped at 188%.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SocialSecurityFamilyMaximumBenefitCalculator />
    </>
  )
}