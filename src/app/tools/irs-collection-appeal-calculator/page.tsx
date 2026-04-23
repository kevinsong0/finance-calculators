import IRSCollectionAppealCalculator from '@/components/IRSCollectionAppealCalculator'

export default function IRSCollectionAppealCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <IRSCollectionAppealCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is a Collection Due Process (CDP) hearing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A CDP hearing is your right to appeal IRS collection actions like levies and liens. You have 30 days from the notice to request a hearing, where you can challenge the liability, propose alternatives, or dispute the collection method.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens if I miss the 30-day CDP deadline?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If you miss the 30-day deadline, you can still request an equivalent hearing, but it has limited scope and no right to Tax Court review. Alternatively, use the Collection Appeals Program (CAP) which is available anytime.',
                },
              },
              {
                '@type': 'Question',
                name: 'What forms do I need for an IRS collection appeal?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For a CDP hearing, file Form 12153. For a CAP appeal, file Form 9423. Both should be sent to the IRS address listed on your collection notice.',
                },
              },
              {
                '@type': 'Question',
                name: 'What collection alternatives can I request at a CDP hearing?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can request installment agreements, Currently Not Collectible (CNC) status if you have financial hardship, or an Offer in Compromise. The IRS must consider these alternatives during the hearing.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}