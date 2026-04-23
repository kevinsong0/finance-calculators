import SocialSecuritySurvivorBenefitTimingCalculator from '@/components/SocialSecuritySurvivorBenefitTimingCalculator'

export default function SocialSecuritySurvivorBenefitTimingCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When can I claim Social Security survivor benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Widows and widowers can claim survivor benefits as early as age 60 (at 71.5% of the deceased\'s benefit). Disabled survivors can claim at age 50. Those caring for the deceased\'s child under 16 can claim at any age.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much are Social Security survivor benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'At full retirement age, survivors receive 100% of the deceased worker\'s benefit. Claiming early reduces the benefit - minimum 71.5% at age 60. The reduction formula is different from retirement benefits.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I claim survivor benefits or my own retirement benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If survivor benefit is higher than your own, claim survivor first and delay your own to grow with delayed retirement credits (8% per year). If your own is higher, claim survivor if needed and switch to your own at 70.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SocialSecuritySurvivorBenefitTimingCalculator />
    </>
  )
}