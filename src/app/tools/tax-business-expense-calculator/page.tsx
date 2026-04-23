'use client';

import TaxBusinessExpenseCalculator from '@/components/TaxBusinessExpenseCalculator';

export default function TaxBusinessExpenseCalculatorPage() {
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
                name: 'What qualifies as a deductible business expense?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A deductible business expense must be ordinary (common and accepted in your trade or business), necessary (helpful and appropriate for your business), and directly related to your business operations. Personal expenses are not deductible, even if they benefit your business indirectly.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I deduct home office expenses?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, if you use a portion of your home regularly and exclusively for business. You can use the simplified method ($5 per square foot, max 300 sq ft) or the regular method (actual expenses prorated by business use percentage). The space must be your principal place of business or used regularly for client meetings.'
                }
              },
              {
                '@type': 'Question',
                name: 'How do I handle mixed business and personal expenses?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Mixed expenses must be allocated between business and personal use. Only the business portion is deductible. Common examples include vehicle expenses (tracked by mileage logs), cell phone bills, and travel costs. Maintain clear documentation showing the business purpose and allocation method.'
                }
              },
              {
                '@type': 'Question',
                name: 'What business expenses are commonly audited?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'High-risk categories include travel and entertainment expenses, meals (limited to 50%), vehicle expenses, home office deductions, large equipment purchases, and employee benefits. These require thorough documentation and clear business purpose. Excessive deductions relative to income increase audit probability.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I deduct startup costs before my business opens?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, you can deduct up to $5,000 in startup costs and $5,000 in organizational costs in your first year of business. Costs exceeding these limits must be amortized over 180 months (15 years). Startup costs include market research, advertising, legal fees, and pre-opening salaries.'
                }
              }
            ]
          })
        }}
      />
      <TaxBusinessExpenseCalculator />
    </>
  );
}