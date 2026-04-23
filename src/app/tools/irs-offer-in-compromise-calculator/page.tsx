import IRSOfferInCompromiseCalculator from '@/components/IRSOfferInCompromiseCalculator'

export default function IRSOfferInCompromiseCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <IRSOfferInCompromiseCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is an IRS Offer in Compromise?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An Offer in Compromise (OIC) allows you to settle your tax debt for less than the full amount owed when you cannot pay the full liability or doing so would create financial hardship.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does IRS calculate acceptable offer amount?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IRS calculates Reasonable Collection Potential (RCP): net realizable equity in assets (with 20% quick sale discount) plus future income value (monthly disposable income × allowed payment period months).',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the OIC payment options?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Lump sum: pay within 5 months (lowest offer). Short-term: pay within 24 months. Deferred: pay over remaining statute period (highest offer). Longer payment periods require higher offers.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is low income certification for OIC?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If annual income is $30,000 or less, you may qualify for simplified OIC process: $186 application fee waived, simpler documentation, and IRS may accept $0 offer.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}