'use client';

import TaxRecordkeepingCalculator from '@/components/TaxRecordkeepingCalculator';

export default function TaxRecordkeepingCalculatorPage() {
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
                name: 'What is the minimum recordkeeping requirement for taxes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The IRS requires you to keep records that support income, deductions, and credits claimed on your tax return. Basic requirements include records showing income amounts, documented expenses with receipts or other evidence, and records supporting tax credits. Records must be kept for the statute of limitations period (typically 3-7 years).'
                }
              },
              {
                '@type': 'Question',
                name: 'Should I keep digital or paper records?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Digital records are now preferred by most taxpayers and accepted by the IRS. Benefits include easier organization, searchability, backup capability, and space efficiency. Ensure digital copies are clear reproductions of originals, organized by category and date, and stored securely with backup copies.'
                }
              },
              {
                '@type': 'Question',
                name: 'What records should self-employed individuals keep?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Self-employed individuals should maintain: income records (invoices, payment receipts, bank statements), expense documentation (receipts, bills, contracts), asset records for depreciation, business use logs (vehicle mileage, home office usage), retirement contribution records, and health insurance payment records for potential deductions.'
                }
              },
              {
                '@type': 'Question',
                name: 'How does poor recordkeeping affect audit outcomes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Poor recordkeeping significantly increases audit risk and negative outcomes. Without proper documentation, deductions may be disallowed, resulting in additional tax liability plus accuracy-related penalties (typically 20%). The IRS may also reconstruct income using bank deposits or third-party information, potentially overstating actual income.'
                }
              },
              {
                '@type': 'Question',
                name: 'What makes a recordkeeping system audit-ready?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An audit-ready system includes: contemporaneous recording (entries made at time of transaction), clear categorization matching tax return line items, complete documentation for each deduction, consistent business purpose notation, regular review for accuracy, secure storage with backup, and organized retrieval capability. Consistency and contemporaneous entries are most important.'
                }
              }
            ]
          })
        }}
      />
      <TaxRecordkeepingCalculator />
    </>
  );
}