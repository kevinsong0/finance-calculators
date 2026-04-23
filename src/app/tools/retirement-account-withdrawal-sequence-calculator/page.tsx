import RetirementAccountWithdrawalSequenceCalculator from '@/components/RetirementAccountWithdrawalSequenceCalculator'

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the optimal order to withdraw from retirement accounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A common strategy is: (1) Taxable accounts first - they\'re already taxed and reduce estate taxes, (2) Traditional 401k/IRA - taxed at withdrawal but grow tax-deferred, (3) Roth IRA last - tax-free growth and no RMDs. However, the optimal order depends on your tax bracket, RMD timing, and estate goals.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do RMDs affect withdrawal strategy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Required Minimum Distributions (RMDs) from Traditional accounts start at age 73 under SECURE 2.0. You must withdraw a minimum amount each year, taxed as ordinary income. Some strategies involve spending down Traditional accounts before RMDs start to avoid large forced withdrawals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I withdraw from Roth IRA first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Generally, no. Roth IRAs have tax-free growth and no RMDs, making them ideal for late retirement or inheritance. However, if you\'re in a high tax bracket or want to reduce future RMDs, withdrawing Roth first can lower your taxable income.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does tax bracket affect withdrawal order?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you\'re in a low tax bracket early in retirement, consider withdrawing from Traditional accounts to fill up the bracket. If you\'re in a high bracket, use Roth withdrawals to stay tax-free. Consider Roth conversions in low-income years.',
        },
      },
      {
        '@type': 'Question',
        name: 'What about coordinating with Social Security?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Social Security benefits can be taxed based on provisional income. Withdrawals from Traditional accounts increase provisional income and may trigger Social Security taxation. Roth withdrawals don\'t count toward provisional income, helping keep Social Security tax-free.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RetirementAccountWithdrawalSequenceCalculator />
    </>
  )
}