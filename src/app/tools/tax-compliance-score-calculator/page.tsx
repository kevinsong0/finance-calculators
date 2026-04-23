'use client';

import TaxComplianceScoreCalculator from '@/components/TaxComplianceScoreCalculator';

export default function TaxComplianceScoreCalculatorPage() {
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
                name: 'What factors affect my tax compliance score?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Key factors include timely filing and payment, accurate recordkeeping, reporting all income sources, deduction-to-income ratio, and credit-to-income ratio. Higher deduction ratios (above 35%) and high credit claims can negatively impact your score.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is a good tax compliance score?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A score above 80 indicates low audit risk with strong compliance practices. Scores between 60-80 represent moderate risk, 40-60 indicates high risk requiring attention, and below 40 signals very high risk with significant compliance issues.'
                }
              },
              {
                '@type': 'Question',
                name: 'How can I improve my compliance score?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Improve by filing returns on time or requesting extensions, setting up estimated tax payments, implementing comprehensive recordkeeping, reporting all income including freelance and foreign income, and reviewing deduction claims to ensure they are reasonable and well-documented.'
                }
              },
              {
                '@type': 'Question',
                name: 'Does a high compliance score guarantee no audit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No, a high score reduces risk but does not guarantee audit avoidance. The IRS uses statistical models and random selection processes. However, strong compliance practices significantly reduce likelihood of negative audit outcomes.'
                }
              },
              {
                '@type': 'Question',
                name: 'What deduction ratio is considered risky?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Deduction ratios above 35% of income typically trigger increased scrutiny. Industry-standard ratios vary, so comparing your deductions to similar businesses or professions can help identify if your claims appear unusual to IRS examiners.'
                }
              }
            ]
          })
        }}
      />
      <TaxComplianceScoreCalculator />
    </>
  );
}