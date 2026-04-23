import NetOperatingLossCarryforwardCalculator from '@/components/NetOperatingLossCarryforwardCalculator'

export default function NetOperatingLossCarryforwardCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <NetOperatingLossCarryforwardCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How long can I carry forward a Net Operating Loss?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For NOLs arising before 2018: 20 years carryforward with 2-year carryback option. For NOLs arising after 2017: indefinite carryforward with no carryback, but limited to 80% of taxable income.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the 80% income limitation for NOLs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Under the Tax Cuts and Jobs Act, NOLs arising after 2017 can only offset up to 80% of taxable income in any given year. Pre-2018 NOLs have no income limitation.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I carry back a Net Operating Loss for a refund?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Only NOLs arising before 2018 can be carried back 2 years for an immediate tax refund by filing amended returns. Post-2017 NOLs cannot be carried back.',
                },
              },
              {
                '@type': 'Question',
                name: 'What form do I file for NOL carryback?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'File Form 1139 (Corporations) or Form 1045 (Individuals) for quick refund of NOL carryback. For regular carryforward, report on the annual tax return.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}