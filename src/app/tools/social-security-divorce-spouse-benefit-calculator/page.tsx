import SocialSecurityDivorceSpouseBenefitCalculator from '@/components/SocialSecurityDivorceSpouseBenefitCalculator'

export default function SocialSecurityDivorceSpouseBenefitCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I get Social Security benefits from my ex-spouse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, if your marriage lasted at least 10 years, you are unmarried, age 62 or older, and your ex-spouse is entitled to Social Security benefits. You can receive up to 50% of their benefit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does my ex-spouse need to be claiming Social Security for me to get divorced spouse benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, if you have been divorced for at least 2 years, you can claim divorced spouse benefits even if your ex-spouse has not yet filed for Social Security.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does remarriage affect divorced spouse benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your remarriage generally disqualifies you from receiving divorced spouse benefits. However, your ex-spouse\'s remarriage has no effect on your eligibility.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SocialSecurityDivorceSpouseBenefitCalculator />
    </>
  )
}