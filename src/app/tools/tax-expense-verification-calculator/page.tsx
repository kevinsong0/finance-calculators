'use client';

import TaxExpenseVerificationCalculator from '@/components/TaxExpenseVerificationCalculator';

export default function TaxExpenseVerificationCalculatorPage() {
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
                name: 'What documents do I need to verify expenses?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Essential documents include receipts, invoices, bank statements, credit card statements, canceled checks, and written records. For business expenses, you may also need contracts, purchase orders, and expense reports. The IRS recommends keeping all original documents whenever possible.'
                }
              },
              {
                '@type': 'Question',
                name: 'How long should I keep expense records?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Generally, keep records for 3 years from the filing date or 2 years from the tax payment date, whichever is later. For unreported income exceeding 25% of gross income, keep records for 6 years. For fraudulent returns or no return, keep indefinitely. Business records should generally be kept for 7 years.'
                }
              },
              {
                '@type': 'Question',
                name: 'What happens if I cannot verify my expenses?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If you cannot substantiate expenses during an audit, the IRS may disallow the deductions, resulting in additional taxes, penalties (typically 20% accuracy-related penalty), and interest. The Cohan rule may allow estimated deductions if credible evidence exists, but this is discretionary.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I use electronic records instead of paper receipts?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, the IRS accepts electronic records including scanned receipts, digital copies of invoices, and electronic bank statements. Records must be accurate, complete, and available for IRS inspection. They should reproduce the original document clearly and be stored securely.'
                }
              },
              {
                '@type': 'Question',
                name: 'What increases my audit risk for expense verification?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Higher audit risk factors include unusually high deductions relative to income, deductions that exceed industry norms, round numbers or patterns, missing documentation, large cash transactions, mixed personal/business expenses, and expenses claimed without clear business purpose.'
                }
              }
            ]
          })
        }}
      />
      <TaxExpenseVerificationCalculator />
    </>
  );
}