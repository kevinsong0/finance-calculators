import BusinessTaxDeductionCalculator from '@/components/BusinessTaxDeductionCalculator'

export const metadata = {
  title: 'Business Tax Deduction Calculator 2024-2025 | Self-Employed Tax Savings',
  description: 'Calculate tax deductions for self-employed and small business owners. Estimate savings from operating expenses, retirement contributions, health insurance, and QBI deduction.',
  keywords: 'business tax deduction calculator, self-employed deductions, small business tax deductions, Schedule C deductions, QBI deduction, self-employment tax savings',
}

const faqData = [
  {
    question: 'What expenses can self-employed individuals deduct?',
    answer: 'Self-employed individuals can deduct: office rent, equipment, vehicle expenses (standard mileage $0.67/mile or actual), travel, 50% of meals, insurance, professional services, employee wages, retirement contributions (SEP-IRA, Solo 401k), self-employed health insurance, home office ($5/sq ft simplified), and other ordinary business expenses.',
  },
  {
    question: 'How much can I contribute to a SEP-IRA as self-employed?',
    answer: 'SEP-IRA contributions for self-employed individuals are limited to 25% of net self-employment income (after deducting half of SE tax), up to $69,000 for 2024. For a Solo 401k, you can contribute $23,000 as employee plus 25% of net income as employer.',
  },
  {
    question: 'What is the self-employed health insurance deduction?',
    answer: 'Self-employed health insurance premiums are 100% deductible from gross income (not subject to SE tax). This includes premiums for yourself, spouse, and dependents. The deduction reduces income tax but not self-employment tax. Must have net self-employment income.',
  },
  {
    question: 'How does the home office deduction work?',
    answer: 'Home office deduction: Simplified method ($5/sq ft, max 300 sq ft = $1,500) or regular method (actual expenses prorated by business use percentage). Regular method may yield higher deduction but requires more record-keeping and depreciation tracking.',
  },
  {
    question: 'What is the QBI deduction for self-employed?',
    answer: 'The Qualified Business Income (QBI) deduction allows 20% deduction on pass-through business income (sole proprietorship, LLC, S-Corp). No wage/property limits below $191,950 (Single). Above threshold, limited by 50% of W-2 wages or 25% wages + 2.5% property. SSTBs face phase-out.',
  },
]

export default function BusinessTaxDeductionCalculatorPage() {
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
      <BusinessTaxDeductionCalculator />
    </>
  )
}