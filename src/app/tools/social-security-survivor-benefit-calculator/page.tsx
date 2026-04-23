import SocialSecuritySurvivorBenefitCalculator from '@/components/SocialSecuritySurvivorBenefitCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'At what age can I claim Social Security survivor benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Widows and widowers can claim survivor benefits as early as age 60. If you are disabled, you can claim as early as age 50. Full survivor benefits are available at age 65 (or your full retirement age, depending on birth year).',
        },
      },
      {
        '@type': 'Question',
        name: 'How much are Social Security survivor benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'At full survivor age (65), you receive 100% of your deceased spouse\'s Primary Insurance Amount. If claimed at age 60, you receive approximately 71.5% of their benefit. If your spouse had delayed retirement credits, your survivor benefit increases.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I claim both my own and survivor benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can switch between benefits. A common strategy is to take survivor benefits early while letting your own benefit grow, then switch to your own higher benefit at age 70. You cannot receive both simultaneously.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if I remarry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you remarry before age 60 (or 50 if disabled), you generally cannot receive survivor benefits from your deceased spouse. Remarriage after age 60 does not affect survivor benefits.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the lump-sum death benefit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Social Security pays a one-time lump-sum death benefit of $255 to a surviving spouse who was living with the deceased at the time of death. If there is no surviving spouse, it may be paid to a eligible child.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SocialSecuritySurvivorBenefitCalculator />
    </>
  )
}