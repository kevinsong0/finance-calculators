'use client';

import TaxHardshipAssessmentCalculator from '@/components/TaxHardshipAssessmentCalculator';

export default function TaxHardshipAssessmentCalculatorPage() {
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
                name: 'What qualifies as IRS financial hardship?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Financial hardship means paying the tax debt would prevent you from meeting basic living expenses (food, housing, transportation, medical care). IRS considers disposable income, health status, age, dependents, and employment situation.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is Currently Not Collectible (CNC) status?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CNC status suspends IRS collection activity when hardship prevents payment. The debt remains but IRS stops levy, garnishment, and other collection actions. Status is reviewed periodically and may resume if financial situation improves.'
                }
              },
              {
                '@type': 'Question',
                name: 'How does IRS determine allowable living expenses?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IRS uses Collection Financial Standards that set national and local allowances for housing, transportation, food, clothing, and other necessities. Expenses exceeding standards may not be fully allowed, affecting hardship determination.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I get hardship relief without filing Form 433?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Generally, hardship determination requires Form 433-A (individuals) or 433-F (simplified). The form discloses all income, assets, and expenses. IRS uses this to determine reasonable collection potential and hardship eligibility.'
                }
              },
              {
                '@type': 'Question',
                name: 'Does hardship status expire?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'CNC status is reviewed annually by IRS. If your income increases or circumstances change, IRS may reassess and resume collection. The 10-year collection statute continues running during CNC status.'
                }
              }
            ]
          })
        }}
      />
      <TaxHardshipAssessmentCalculator />
    </>
  );
}