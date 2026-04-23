import IRSCurrentlyNotCollectibleCalculator from '@/components/IRSCurrentlyNotCollectibleCalculator'

export default function IRSCurrentlyNotCollectibleCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <IRSCurrentlyNotCollectibleCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is Currently Not Collectible (CNC) status?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CNC status means the IRS has determined you cannot pay your tax debt without causing economic hardship. Collection activities are suspended but the debt remains legally owed.',
                },
              },
              {
                '@type': 'Question',
                name: 'What qualifies for CNC status?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You qualify if your income equals or barely exceeds necessary living expenses, you have no significant assets beyond exempt amounts, and collection would cause documented economic hardship.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does CNC status eliminate the tax debt?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. CNC status suspends collection but does not forgive the debt. Interest and penalties continue accruing, the 10-year statute runs, and IRS reviews your finances annually.',
                },
              },
              {
                '@type': 'Question',
                name: 'What form do I need for CNC request?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Submit Form 433-A (Collection Information Statement for Individuals) with proof of income, expenses, assets, and hardship documentation. IRS evaluates your complete financial situation.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}