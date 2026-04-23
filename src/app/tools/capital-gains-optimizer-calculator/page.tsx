import CapitalGainsOptimizerCalculator from '@/components/CapitalGainsOptimizerCalculator'

export const metadata = {
  title: 'Capital Gains Tax Optimizer Calculator 2024-2025 | Loss Harvesting Strategy',
  description: 'Optimize your capital gains tax strategy. Calculate optimal loss harvesting amounts to minimize taxes through bracket optimization and timing decisions.',
  keywords: 'capital gains optimizer, tax loss harvesting strategy, capital gains bracket, 0% capital gains rate, tax optimization calculator, investment tax planning',
}

const faqData = [
  {
    question: 'How can I achieve 0% long-term capital gains tax rate?',
    answer: 'You qualify for 0% long-term capital gains rate if your total taxable income (including long-term gains) falls below $47,025 for single filers or $94,050 for married filing jointly in 2024. Harvesting losses can reduce your total income to qualify for this bracket.',
  },
  {
    question: 'What is bracket optimization for capital gains?',
    answer: 'Bracket optimization involves harvesting losses strategically to push your total income below threshold levels. By reducing gains, you may drop from the 15% or 20% bracket to the 0% bracket, saving thousands in capital gains taxes.',
  },
  {
    question: 'Should I prioritize offsetting short-term or long-term gains?',
    answer: 'Prioritize offsetting short-term gains first. Short-term gains are taxed at ordinary income rates (up to 37%), while long-term gains are taxed at preferential rates (0%, 15%, 20%). Using losses to offset short-term gains yields higher tax savings per dollar of loss.',
  },
  {
    question: 'How does the wash sale rule affect loss harvesting?',
    answer: 'The wash sale rule disallows loss deductions if you repurchase the same or substantially identical security within 30 days before or after selling at a loss. Wait 31+ days before repurchasing, or use a similar but different security as an alternative.',
  },
  {
    question: 'Can capital losses offset ordinary income?',
    answer: 'Yes, after offsetting all capital gains, remaining losses can offset up to $3,000 of ordinary income per year ($1,500 if married filing separately). Unused losses carry forward indefinitely to future years.',
  },
]

export default function CapitalGainsOptimizerCalculatorPage() {
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
      <CapitalGainsOptimizerCalculator />
    </>
  )
}