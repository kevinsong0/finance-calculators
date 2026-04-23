import EstimatedTaxCalculator from '@/components/EstimatedTaxCalculator'

export const metadata = {
  title: 'Estimated Tax Payments Calculator 2024-2025 | Quarterly Tax Estimator',
  description: 'Calculate quarterly estimated tax payments for self-employed income. Estimate federal income tax and self-employment tax to determine your quarterly payment amounts.',
  keywords: 'estimated tax calculator, quarterly tax payments, self-employment tax, Form 1040-ES, estimated tax payments, IRS quarterly payments, freelance tax calculator',
}

const faqData = [
  {
    question: 'Who must pay estimated tax payments?',
    answer: 'You must pay estimated taxes if you expect to owe at least $1,000 in tax after subtracting withholding and credits, and your withholding and credits will be less than 90% of your current year tax or 100% of your prior year tax. This applies to self-employed individuals, freelancers, contractors, and those with significant income not subject to withholding.',
  },
  {
    question: 'What are the quarterly estimated tax due dates?',
    answer: 'Quarterly estimated tax payment due dates are: Q1 - April 15, Q2 - June 15, Q3 - September 15, Q4 - January 15 of the following year. If the due date falls on a weekend or holiday, the deadline is the next business day. Each payment covers income earned in the preceding quarter.',
  },
  {
    question: 'What is the self-employment tax rate?',
    answer: 'The self-employment tax rate is 15.3%: 12.4% for Social Security (up to $168,600 income limit for 2024) and 2.9% for Medicare (no income limit). High earners pay an additional 0.9% Medicare tax on income over $200,000 (single) or $250,000 (married). Only 92.35% of self-employment income is subject to SE tax.',
  },
  {
    question: 'What is the safe harbor rule for estimated taxes?',
    answer: 'The safe harbor rule protects you from underpayment penalties if you pay at least 90% of your current year tax liability or 100% of your prior year tax liability (110% if AGI exceeded $150,000). Meeting either threshold eliminates penalties even if your actual tax is higher.',
  },
  {
    question: 'How is the QBI deduction calculated for estimated taxes?',
    answer: 'The Qualified Business Income (QBI) deduction allows a 20% deduction on qualified business income from sole proprietorships, partnerships, and S-corporations. This reduces your taxable income, lowering your estimated tax payments. The maximum deduction is limited to 20% of taxable income (before the QBI deduction itself).',
  },
]

export default function EstimatedTaxCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <EstimatedTaxCalculator />
    </>
  )
}