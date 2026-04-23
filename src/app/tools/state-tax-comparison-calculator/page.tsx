import StateTaxComparisonCalculator from '@/components/StateTaxComparisonCalculator'

export const metadata = {
  title: 'State Tax Comparison Calculator 2024-2025 | Relocation Tax Impact',
  description: 'Compare total tax burden between states including income tax, property tax, and capital gains treatment. Estimate annual savings from relocating to lower-tax states.',
  keywords: 'state tax comparison, relocation tax calculator, state income tax comparison, property tax by state, no income tax states, capital gains tax by state',
}

const faqData = [
  {
    question: 'Which states have no income tax?',
    answer: 'Nine states have no individual income tax: Texas, Florida, Washington, Nevada, Alaska, South Dakota, Tennessee, New Hampshire (taxes interest/dividends only), and Wyoming. These states may have higher property or sales taxes to compensate.',
  },
  {
    question: 'How do states treat capital gains?',
    answer: 'Most states tax capital gains the same as ordinary income at their respective state rates. Washington taxes long-term capital gains at 7% on amounts over $262,000. States with no income tax (TX, FL, NV, etc.) do not tax capital gains at the state level.',
  },
  {
    question: 'What is the highest state income tax rate?',
    answer: 'California has the highest top marginal income tax rate at 13.3% for income over $1 million. Other high-tax states include New York (8.82% state, plus NYC tax up to 3.876%), New Jersey (10.75%), and Hawaii (11%).',
  },
  {
    question: 'How do property taxes vary between states?',
    answer: 'Property tax rates vary significantly: Texas (~1.8%), California (~0.7% due to Prop 13), New Jersey (~2.5% highest), Hawaii (~0.28% lowest). No-income-tax states like Texas often have higher property taxes to fund services.',
  },
  {
    question: 'What should I consider when relocating for tax savings?',
    answer: 'Beyond taxes, consider cost of living (housing, groceries, healthcare), job market and salary differences, climate and lifestyle preferences, family considerations, and the need to establish proper residency (183+ days, vehicle registration, voter registration).',
  },
]

export default function StateTaxComparisonCalculatorPage() {
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
      <StateTaxComparisonCalculator />
    </>
  )
}