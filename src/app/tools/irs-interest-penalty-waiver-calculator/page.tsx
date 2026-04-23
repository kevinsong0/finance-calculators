import IRSInterestPenaltyWaiverCalculator from '@/components/IRSInterestPenaltyWaiverCalculator'

export default function IRSInterestPenaltyWaiverCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <IRSInterestPenaltyWaiverCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is First-Time Penalty Abatement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'First-Time Penalty Abatement (FTA) is an automatic waiver for taxpayers with a clean compliance history of 3 years, who are currently compliant with filing and payment requirements. It removes penalties for one tax period.',
                },
              },
              {
                '@type': 'Question',
                name: 'What qualifies as reasonable cause for penalty abatement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Reasonable cause includes serious illness, death in the family, natural disasters, fire or casualty damage, inability to obtain records, or erroneous IRS written advice. You must document the circumstances.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can IRS interest be abated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Interest abatement is very limited. It only applies when there is an IRS error or delay, or when you received erroneous IRS written advice. Interest is generally not abated for reasonable cause.',
                },
              },
              {
                '@type': 'Question',
                name: 'What form do I use to request penalty abatement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'File Form 843 for penalty and interest abatement, or write a detailed letter explaining your reasonable cause circumstances with supporting documentation.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}