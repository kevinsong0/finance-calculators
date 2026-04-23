import RetirementAccountEarlyWithdrawalCalculator from '@/components/RetirementAccountEarlyWithdrawalCalculator'

export default function RetirementAccountEarlyWithdrawalCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <RetirementAccountEarlyWithdrawalCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the early withdrawal penalty for retirement accounts?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Withdrawals before age 59½ typically incur a 10% federal penalty tax on top of regular income tax. This applies to 401(k), traditional IRA, and Roth IRA earnings.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there exceptions to the early withdrawal penalty?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, exceptions include disability, medical expenses exceeding 7.5% of AGI, first home purchase (IRA $10,000 limit), education expenses (IRA), birth/adoption ($5,000), and 72(t) substantially equal payments.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I withdraw Roth IRA contributions without penalty?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Roth IRA contributions can be withdrawn anytime tax-free and penalty-free. Only earnings are subject to the 5-year rule and age requirement.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the opportunity cost of early withdrawal?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Early withdrawal loses the compounded growth potential. Money withdrawn at age 40 could have grown significantly by retirement age 65, representing a hidden cost beyond taxes and penalties.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}