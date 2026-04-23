'use client';

import TaxPenaltyReliefCalculator from '@/components/TaxPenaltyReliefCalculator';

export default function TaxPenaltyReliefCalculatorPage() {
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
                name: 'What is First-Time Penalty Abatement (FTA)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'FTA provides one-time relief for certain penalties if you have a clean compliance history for the past 3 years (filed all returns, paid or arranged to pay all tax due). Available for failure-to-file, failure-to-pay, and failure-to-deposit penalties.'
                }
              },
              {
                '@type': 'Question',
                name: 'What qualifies as reasonable cause for penalty relief?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Reasonable cause includes circumstances beyond your control: serious illness, death in immediate family, natural disaster, fire, casualty, inability to obtain records, or unavoidable absence. Must provide documentation supporting the circumstances.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can accuracy-related penalties be abated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Accuracy-related penalties (negligence, substantial understatement) can only be abated with reasonable cause, not FTA. You must show you acted with reasonable reliance on a professional or had substantial authority for your tax position.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I request penalty abatement?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Submit written request with Form 843 or correspondence explaining circumstances. Include supporting documentation. FTA requests may be made by phone. IRS reviews each request individually - abatement is discretionary.'
                }
              },
              {
                '@type': 'Question',
                name: 'What documentation do I need for reasonable cause?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Documentation depends on circumstance: medical records for illness, death certificate for family death, FEMA/insurance documentation for disaster, proof of records request. The more compelling evidence, the better your chances.'
                }
              }
            ]
          })
        }}
      />
      <TaxPenaltyReliefCalculator />
    </>
  );
}