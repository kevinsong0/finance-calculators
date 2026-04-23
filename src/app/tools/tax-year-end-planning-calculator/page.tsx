'use client';

import TaxYearEndPlanningCalculator from '@/components/TaxYearEndPlanningCalculator';

export default function TaxYearEndPlanningCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the key year-end tax planning strategies?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Key strategies include maximizing retirement contributions (401(k) up to $23,000, IRA up to $7,000), making HSA contributions ($4,150 individual, $8,300 family), charitable donations, tax-loss harvesting to offset gains, and Roth conversions if income is lower this year.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the December 31 tax deadline?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'December 31 is the deadline for 401(k) contributions, charitable donations, tax-loss harvesting, and Roth conversions. Missing this deadline means these strategies cannot be applied to the current tax year.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I make IRA and HSA contributions after December 31?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. IRA contributions can be made until April 15 of the following year. HSA contributions also have the April 15 extended deadline. This gives extra time to maximize these tax-advantaged accounts.'
                }
              },
              {
                '@type': 'Question',
                name: 'How does tax-loss harvesting work at year-end?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sell investments at a loss to offset capital gains. Up to $3,000 of excess losses can offset ordinary income annually. Unused losses carry forward indefinitely. Must avoid wash sale rule: wait 31 days before repurchasing same or substantially identical securities.'
                }
              },
              {
                '@type': 'Question',
                name: 'Should I increase withholding if I will owe taxes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. If projected tax owed exceeds $1,000, you may face underpayment penalties. Increase withholding on last paychecks, or make a Q4 estimated tax payment by January 15. Withholding is treated as paid evenly throughout the year regardless of actual timing.'
                }
              }
            ]
          })
        }}
      />
      <TaxYearEndPlanningCalculator />
    </>
  );
}