import StockRecommendationCalculator from '@/components/StockRecommendationCalculator'

export default function StockRecommendationCalculatorPage() {
  const faqs = [
    {
      question: 'What is a tranche-based selling strategy?',
      answer: 'Tranche-based selling involves selling portions of your position at specific gain levels. For example: sell 25% at 20% gain, 25% at 50% gain, 25% at 100% gain, and remaining 15% at 150%+. This balances profit protection with continued upside exposure.',
    },
    {
      question: 'What is the risk/reward ratio?',
      answer: 'The risk/reward ratio compares potential upside (to your target price) versus potential downside (to your buy price). A ratio above 1.0 means the upside exceeds the downside. Higher ratios indicate more favorable risk-adjusted potential.',
    },
    {
      question: 'Should I sell immediately when hitting my target gain?',
      answer: 'Not necessarily. Consider your risk tolerance, company fundamentals, and market conditions. Partial selling (selling 25-50%) protects gains while maintaining exposure to continued upside. Full selling eliminates risk but also eliminates potential further gains.',
    },
    {
      question: 'What if my position is showing a loss?',
      answer: 'For small losses (under 10%), evaluate if the decline reflects company issues or market volatility. Consider holding if fundamentals remain strong. For losses exceeding 10%, evaluate tax-loss harvesting opportunities if better investments exist elsewhere.',
    },
    {
      question: 'How do capital gains taxes affect selling decisions?',
      answer: 'Holding over 1 year qualifies for long-term capital gains rates (15-20% for most taxpayers) versus short-term rates (ordinary income tax rates). Consider holding positions longer for tax efficiency, but don\'t let taxes override sound investment decisions.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <StockRecommendationCalculator />
    </>
  )
}