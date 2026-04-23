'use client';

import TaxInterestAbatementCalculator from '@/components/TaxInterestAbatementCalculator';

export default function TaxInterestAbatementCalculatorPage() {
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
                name: 'Can IRS interest be removed like penalties?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Interest is statutory and generally cannot be abated. Unlike penalties, reasonable cause does NOT apply to interest. Interest compensates the government for the time value of money and continues accruing until debt is paid.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are the only exceptions for interest abatement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Very limited exceptions: IRS administrative errors causing unreasonable delays, active military service in combat zone, declared disaster area suspensions. Even these require specific circumstances and documentation.'
                }
              },
              {
                '@type': 'Question',
                name: 'Why is interest treated differently than penalties?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Penalties punish noncompliance and may be waived for good cause. Interest compensates for delayed payment - it represents the time value of money. Since it compensates rather than punishes, relief is much more limited.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the IRS interest rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IRS interest rate is determined quarterly based on the federal short-term rate plus 3 percentage points. Currently around 8% (2024). Rate applies to both underpayments and overpayments, though overpayment rate is slightly lower.'
                }
              },
              {
                '@type': 'Question',
                name: 'Should I pay interest while disputing penalties?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Paying interest stops further accrual. If penalty relief is granted, you may also request interest suspension. However, interest itself rarely qualifies for abatement, so paying it reduces total debt.'
                }
              }
            ]
          })
        }}
      />
      <TaxInterestAbatementCalculator />
    </>
  );
}