import RothConversionLadderStrategyCalculator from '@/components/RothConversionLadderStrategyCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a Roth conversion ladder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Roth conversion ladder is a strategy of converting Traditional IRA/401k funds to Roth over several years, creating a stream of tax-free income for early retirement. Each conversion must wait 5 years before withdrawal, creating a "ladder" of available funds.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long must I wait before withdrawing converted Roth funds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each Roth conversion must wait 5 years before tax-free withdrawal. This 5-year period starts on January 1 of the year of conversion. After 5 years, the converted amount can be withdrawn tax-free and penalty-free, regardless of age.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I start Roth conversions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start conversions at least 5 years before you need the income, ideally in lower-income years when you\'re in a lower tax bracket. Common timing is during early retirement before Social Security, or during years with reduced income.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why convert to Roth instead of keeping Traditional?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Roth conversions offer: tax-free growth, tax-free withdrawals after 5 years, no Required Minimum Distributions (RMDs), and better estate planning benefits. Converting in lower brackets can save taxes versus withdrawing at higher brackets later.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Roth conversions affect ACA subsidies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Roth conversions count as taxable income and may reduce ACA premium subsidies. Plan conversions carefully if you rely on ACA coverage. Consider smaller conversions to stay below subsidy thresholds.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RothConversionLadderStrategyCalculator />
    </>
  )
}