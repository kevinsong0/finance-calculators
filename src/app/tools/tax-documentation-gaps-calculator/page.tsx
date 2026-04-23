'use client';

import TaxDocumentationGapsCalculator from '@/components/TaxDocumentationGapsCalculator';

export default function TaxDocumentationGapsCalculatorPage() {
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
                name: 'What are the most critical documentation gaps?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The most critical gaps include missing 1099 forms (creates automatic IRS mismatches), no mileage log for vehicle deductions, missing home office documentation, lack of receipts for large expenses, and incomplete investment cost basis records.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do documentation gaps affect audit outcomes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Missing documentation typically results in deductions being disallowed. Without proper evidence, you lose the benefit of legitimate deductions plus face potential accuracy-related penalties of 20% on the additional tax assessed.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I use bank statements instead of receipts?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bank and credit card statements serve as backup evidence but may not fully substantiate deductions. They show payment amounts and dates but lack details like vendor identity, business purpose, or items purchased. Always prefer original receipts when available.'
                }
              },
              {
                '@type': 'Question',
                name: 'What records should self-employed individuals keep?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Self-employed individuals need income records (invoices, payment confirmations), expense receipts, mileage logs for business travel, home office measurements and photos, contracts, asset purchase records for depreciation, and health insurance payment documentation.'
                }
              },
              {
                '@type': 'Question',
                name: 'How long should I maintain tax documentation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Keep records for at least 3 years from filing date (standard statute of limitations). For situations involving 25%+ unreported income, keep 6 years. For fraud or no return filed, keep indefinitely. Best practice is 7 years for comprehensive protection.'
                }
              }
            ]
          })
        }}
      />
      <TaxDocumentationGapsCalculator />
    </>
  );
}