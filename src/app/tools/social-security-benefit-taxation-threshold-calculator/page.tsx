import SocialSecurityBenefitTaxationThresholdCalculator from '@/components/SocialSecurityBenefitTaxationThresholdCalculator'

export default function SocialSecurityBenefitTaxationThresholdCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'At what income level do Social Security benefits become taxable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For single filers, benefits become partially taxable when provisional income exceeds $25,000, and up to 85% taxable above $34,000. For married filing jointly, thresholds are $32,000 and $44,000.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is provisional income for Social Security taxation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Provisional income = Adjusted Gross Income + tax-exempt interest + 50% of Social Security benefits. This formula determines how much of your benefits are taxable.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I reduce taxation of my Social Security benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Strategies include: keeping provisional income below thresholds, using Roth IRA distributions (not counted), delaying Social Security to reduce benefit amount, increasing deductions, and managing other income sources.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SocialSecurityBenefitTaxationThresholdCalculator />
    </>
  )
}