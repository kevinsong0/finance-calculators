import TaxLossHarvestingCalculator from '@/components/TaxLossHarvestingCalculator'

export const metadata = {
  title: 'Tax Loss Harvesting Calculator 2024-2025 | Capital Loss Offset',
  description: 'Calculate tax savings from tax loss harvesting. Estimate how selling losing investments can offset capital gains and reduce your tax liability.',
  keywords: 'tax loss harvesting calculator, capital loss offset, investment tax savings, capital gains tax, wash sale rule, tax optimization, investment loss deduction',
}

const faqData = [
  {
    question: 'What is tax loss harvesting?',
    answer: 'Tax loss harvesting is selling investments at a loss to offset capital gains and reduce taxes. Losses first offset gains of the same type (long-term losses offset long-term gains first), then offset other gains, and finally can offset up to $3,000 of ordinary income per year. Unused losses carry forward indefinitely.',
  },
  {
    question: 'What is the wash sale rule?',
    answer: 'The wash sale rule disallows a loss deduction if you purchase the same or substantially identical security within 30 days before or after the sale. To harvest losses properly, wait 31 days before repurchasing, buy a different but similar security, or use an ETF or mutual fund as an alternative.',
  },
  {
    question: 'How much ordinary income can capital losses offset?',
    answer: 'Capital losses can offset up to $3,000 of ordinary income per year ($1,500 if married filing separately). After offsetting all capital gains, remaining losses first offset this $3,000 limit, then carry forward to future years to offset gains and ordinary income again.',
  },
  {
    question: 'How do long-term vs short-term losses offset gains?',
    answer: 'Long-term losses first offset long-term gains (taxed at 0%, 15%, or 20%). Short-term losses first offset short-term gains (taxed at ordinary rates up to 37%). After offsetting same-type gains, remaining losses offset the other type. This ordering maximizes tax savings since short-term gains are taxed higher.',
  },
  {
    question: 'Can I carry forward unused capital losses?',
    answer: 'Yes, unused capital losses carry forward indefinitely to future tax years. There is no expiration or limit on carryforward. Each year, losses first offset capital gains, then up to $3,000 of ordinary income, with remaining amounts continuing to carry forward.',
  },
]

export default function TaxLossHarvestingCalculatorPage() {
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
      <TaxLossHarvestingCalculator />
    </>
  )
}