import TaxCreditCarryforwardCalculator from '@/components/TaxCreditCarryforwardCalculator'

export default function TaxCreditCarryforwardCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <TaxCreditCarryforwardCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How long can business tax credits be carried forward?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'General business tax credits can be carried forward for 20 years and carried back 1 year. Credits that are not used within this period expire and are lost.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the foreign tax credit carryforward period?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Foreign tax credits can be carried back 10 years and carried forward only 1 year. This shorter forward period makes timing critical.',
                },
              },
              {
                '@type': 'Question',
                name: 'How should I prioritize using tax credit carryforwards?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Use the oldest credits first to prevent expiration. Credits that are approaching expiration should be prioritized to maximize tax savings before they are lost.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do capital losses have unlimited carryforward?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For corporations, capital losses can be carried forward indefinitely. Individuals can only offset $3,000 per year against ordinary income, with carryforward of excess.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}