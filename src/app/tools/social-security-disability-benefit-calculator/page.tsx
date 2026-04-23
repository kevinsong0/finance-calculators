import SocialSecurityDisabilityBenefitCalculator from '@/components/SocialSecurityDisabilityBenefitCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How is SSDI benefit amount calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SSDI benefits are calculated using the Primary Insurance Amount (PIA) formula based on your Average Indexed Monthly Earnings (AIME). The formula applies different percentages to earnings tiers: 90% of the first $1,174, 32% of earnings between $1,174 and $7,078, and 15% above $7,078 (2024 bend points).',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to get SSDI benefits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is a 5-month waiting period from the onset of disability before SSDI benefits begin. After approval, the first payment arrives in the 6th month. Medicare eligibility begins after 24 months on SSDI.',
        },
      },
      {
        '@type': 'Question',
        name: 'What work credits are needed for SSDI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For ages 31+, you need 20 quarters (5 years) of work in the last 10 years before disability onset. You also need a total of at least 40 quarters (10 years) of work history overall. Younger applicants have reduced requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I work while receiving SSDI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, SSDI offers a Trial Work Period of 9 months where you can earn any amount without affecting benefits. After that, an Extended Period of Eligibility (36 months) allows benefits to continue if earnings stay below the Substantial Gainful Activity level ($1,550/month in 2024 for non-blind).',
        },
      },
      {
        '@type': 'Question',
        name: 'When do SSDI benefits convert to retirement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SSDI benefits automatically convert to Social Security retirement benefits at your Full Retirement Age. For disability recipients, FRA is age 65 (not 66-67 like regular retirees). The benefit amount typically stays the same.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SocialSecurityDisabilityBenefitCalculator />
    </>
  )
}