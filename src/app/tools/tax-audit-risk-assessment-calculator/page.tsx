import TaxAuditRiskAssessmentCalculator from '@/components/TaxAuditRiskAssessmentCalculator'

export default function TaxAuditRiskAssessmentCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <TaxAuditRiskAssessmentCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What increases the chance of an IRS audit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'High income (especially over $200k), Schedule C business losses, large charitable deductions relative to income, unreported 1099 income, home office deductions, prior audit history, and complex transactions like cryptocurrency increase audit risk.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the average IRS audit rate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The overall audit rate is approximately 0.2% of returns. However, returns with income over $1 million have about 2% audit rate, and business returns face higher scrutiny.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does hiring a CPA reduce audit risk?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Using a professional tax preparer like a CPA can reduce errors and potentially lower audit risk. The IRS views professionally prepared returns as more likely to be accurate.',
                },
              },
              {
                '@type': 'Question',
                name: 'What triggers an automatic IRS review?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Mismatch between reported income and 1099/W-2 forms automatically triggers IRS matching programs. Large deductions disproportionate to income and prior audit adjustments also receive scrutiny.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}