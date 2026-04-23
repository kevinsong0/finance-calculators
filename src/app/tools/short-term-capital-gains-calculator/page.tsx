'use client'

import ShortTermCapitalGainsCalculator from '@/components/ShortTermCapitalGainsCalculator'

export default function ShortTermCapitalGainsCalculatorPage() {
  const faqs = [
    {
      question: "What is short-term capital gains tax?",
      answer: "Short-term capital gains tax applies to profits from assets held for less than one year. These gains are taxed as ordinary income at your marginal tax rate (10-37% federal), which is typically higher than long-term capital gains rates (0-20%)."
    },
    {
      question: "How is short-term capital gains tax calculated?",
      answer: "Short-term capital gains are added to your total ordinary income for the year. They're taxed at your marginal federal income tax bracket (10%, 12%, 22%, 24%, 32%, 35%, or 37%) plus your state income tax rate. The gain pushes you into potentially higher brackets."
    },
    {
      question: "What's the difference between short-term and long-term capital gains?",
      answer: "Short-term gains (assets held under 12 months) are taxed as ordinary income at 10-37% federal rates. Long-term gains (held 12+ months) get preferential rates: 0% for income under ~$47K, 15% for most taxpayers, and 20% for high-income earners over ~$500K."
    },
    {
      question: "How can I reduce my short-term capital gains tax?",
      answer: "Strategies include: waiting until assets qualify for long-term rates (12+ months), tax-loss harvesting to offset gains, increasing deductions to lower your taxable income, and timing sales strategically. Short-term losses offset short-term gains first."
    },
    {
      question: "Do states tax short-term capital gains differently?",
      answer: "Most states tax capital gains as ordinary income regardless of holding period. Rates vary: California (up to 13.3%), New York (up to 10.9%), while states like Texas, Florida, and Washington have 0% state income tax. Check your state's rules."
    },
    {
      question: "What is the wash sale rule?",
      answer: "The wash sale rule prevents you from claiming a loss deduction if you repurchase the same or substantially identical security within 30 days before or after selling it for a loss. This applies across all your accounts, including IRA accounts."
    },
    {
      question: "Can short-term gains push me into a higher tax bracket?",
      answer: "Yes, short-term capital gains add to your total income and can push you into a higher marginal bracket. This increases the tax rate not just on the gains, but potentially on other income too. Consider this when timing sales."
    },
    {
      question: "How many days until my gain becomes long-term?",
      answer: "The threshold is exactly 365 days (not 12 calendar months) from purchase date to sale date. If you sell on day 364, it's short-term; day 365 or later, it's long-term. Use our calculator to see potential savings from waiting."
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
      <ShortTermCapitalGainsCalculator />
    </>
  )
}