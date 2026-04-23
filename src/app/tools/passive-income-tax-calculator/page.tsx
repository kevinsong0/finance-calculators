import PassiveIncomeCalculator from '@/components/PassiveIncomeCalculator'

export const metadata = {
  title: 'Passive Income Tax Calculator 2024-2025 | Dividend, Rental, Interest Tax',
  description: 'Calculate tax on passive income sources including qualified dividends, rental income, interest, royalties, and pension. Understand tax treatment for each income type.',
  keywords: 'passive income tax calculator, dividend tax, rental income tax, interest income tax, qualified dividends, passive income taxation, investment income tax',
}

const faqData = [
  {
    question: 'How are qualified dividends taxed?',
    answer: 'Qualified dividends are taxed at preferential long-term capital gains rates: 0% for income below $47,025 (Single), 15% for most taxpayers, and 20% for high-income earners above $518,900. Non-qualified dividends are taxed at ordinary income rates.',
  },
  {
    question: 'What deductions can I take for rental income?',
    answer: 'Rental income deductions include mortgage interest, property taxes, insurance, repairs, maintenance, property management fees, advertising, travel expenses, depreciation, and HOA fees. These reduce your taxable rental income.',
  },
  {
    question: 'How is interest income taxed?',
    answer: 'Interest income from savings accounts, CDs, bonds, and loans is taxed as ordinary income at your marginal tax rate (10% to 37%). Municipal bond interest is generally tax-free at federal level.',
  },
  {
    question: 'What is the passive income ratio?',
    answer: 'Passive income ratio measures the percentage of your total income that comes from passive sources (dividends, rental, interest) versus active work (W-2 wages). Higher ratios indicate greater financial independence progress.',
  },
  {
    question: 'How is Social Security income taxed?',
    answer: 'Social Security benefits are taxed based on combined income. If combined income exceeds $25,000 (Single) or $32,000 (MFJ), up to 50% of benefits are taxable. Above $34,000 (Single) or $44,000 (MFJ), up to 85% is taxable.',
  },
]

export default function PassiveIncomeCalculatorPage() {
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
      <PassiveIncomeCalculator />
    </>
  )
}