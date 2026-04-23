import SocialSecurityWEPReductionTableCalculator from '@/components/SocialSecurityWEPReductionTableCalculator'

export default function SocialSecurityWEPReductionTableCalculatorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Windfall Elimination Provision (WEP)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WEP is a Social Security rule that reduces benefits for workers who receive a pension from non-covered employment (like government or teaching jobs). It affects those who did not pay Social Security taxes on that employment.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the WEP reduction table work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The WEP reduction decreases based on years of substantial earnings. 20 years = 50% of max WEP. Each additional year reduces WEP by 5%. 30+ years of substantial earnings eliminates WEP entirely.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the maximum WEP reduction in 2024?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The maximum WEP reduction is $614 per month in 2024 (half of the first bend point factor). However, WEP cannot reduce your benefit by more than half of your monthly non-covered pension amount.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SocialSecurityWEPReductionTableCalculator />
    </>
  )
}