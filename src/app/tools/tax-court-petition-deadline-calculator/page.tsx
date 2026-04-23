import TaxCourtPetitionDeadlineCalculator from '@/components/TaxCourtPetitionDeadlineCalculator'

export default function TaxCourtPetitionDeadlineCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <TaxCourtPetitionDeadlineCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How long do I have to file a Tax Court petition?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'After receiving a Notice of Deficiency (90-day letter), you have 90 days to file a petition with the Tax Court. For Collection Due Process notices, you have 30 days.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a Small Tax Case?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A Small Tax Case is for disputes of $50,000 or less. It has simplified procedures, informal hearings, faster resolution (6-12 months), but the decision cannot be appealed by the taxpayer.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I have to pay the tax before going to Tax Court?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Tax Court is a pre-payment forum. You can dispute the tax without paying first. However, if you lose, you must pay. District Court and Claims Court require payment before suing.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens if I miss the Tax Court deadline?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If you miss the deadline, you lose Tax Court rights permanently. You must pay the tax and then sue for refund in District Court or Claims Court, or negotiate with IRS.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}