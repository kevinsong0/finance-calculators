import IRSSafeHarborDepositCalculator from '@/components/IRSSafeHarborDepositCalculator'

export default function IRSSafeHarborDepositCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <IRSSafeHarborDepositCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the IRS safe harbor rule for estimated taxes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The safe harbor rule allows you to avoid underpayment penalty by paying either 100% of last year\'s tax (110% if AGI exceeds $150,000) or 90% of this year\'s tax through withholding and estimated payments.',
                },
              },
              {
                '@type': 'Question',
                name: 'When do estimated tax payments need to be made?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Quarterly estimated tax payments are due April 15, June 15, September 15, and January 15 of the following year. Safe harbor payments should be made evenly across these dates.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the penalty for underpayment of estimated taxes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If you underpay by more than $1,000 and don\'t meet safe harbor requirements, the IRS charges interest on the underpayment amount. The rate is approximately 8% annually (2024).',
                },
              },
              {
                '@type': 'Question',
                name: 'Does W-2 withholding count toward safe harbor?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, tax withheld from W-2 wages counts toward safe harbor requirements. The IRS treats withholding as paid evenly throughout the year, regardless of actual timing.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}