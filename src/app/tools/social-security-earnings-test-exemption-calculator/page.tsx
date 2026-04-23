import SocialSecurityEarningsTestExemptionCalculator from '@/components/SocialSecurityEarningsTestExemptionCalculator'

export default function SocialSecurityEarningsTestExemptionCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <SocialSecurityEarningsTestExemptionCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the Social Security earnings test?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The earnings test limits how much you can earn while receiving Social Security benefits before Full Retirement Age. For 2024, the limit is $22,280 under FRA and $59,460 in the year you reach FRA.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are withheld benefits permanently lost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Benefits withheld due to the earnings test are not permanently lost. At Full Retirement Age, SSA recalculates your benefit to credit the withheld months, increasing your monthly payment.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the grace year rule?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The grace year is the first year of retirement. You can use a monthly test instead of the annual test, allowing $1,860/month in earnings for months after retirement (2024).',
                },
              },
              {
                '@type': 'Question',
                name: 'When does the earnings test stop?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The earnings test stops once you reach Full Retirement Age. After FRA, you can earn unlimited income without any benefit withholding.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}