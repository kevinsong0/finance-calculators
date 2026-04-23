'use client'

import RothIRAContributionCalculator from '@/components/RothIRAContributionCalculator'

export default function RothIRAContributionCalculatorPage() {
  const faqs = [
    {
      question: "What are the Roth IRA contribution limits for 2024?",
      answer: "For 2024, the base contribution limit is $7,000. If you're age 50 or older, you can contribute an additional $1,000 catch-up contribution, totaling $8,000. These same limits apply to Traditional IRAs, and the combined limit for both types is $7,000/$8,000."
    },
    {
      question: "What are the Roth IRA income limits for 2024?",
      answer: "For 2024, single filers can make full contributions if income is under $146,000, partial contributions between $146,000-$161,000, and no direct contribution above $161,000. Married filing jointly: full contribution under $230,000, phase-out $230,000-$240,000, no contribution above $240,000."
    },
    {
      question: "What are the Roth IRA income limits for 2025?",
      answer: "For 2025, income limits increase slightly. Single: phase-out starts at $150,000, ends at $165,000. Married filing jointly: phase-out $236,000-$246,000. Married filing separately always has phase-out from $0-$10,000."
    },
    {
      question: "How is the Roth IRA phase-out calculated?",
      answer: "During the phase-out range, your allowed contribution reduces linearly. For example, single filer at $153,500 (midpoint of $146K-$161K range) can contribute half the limit. The IRS requires rounding down to nearest $10 when calculating."
    },
    {
      question: "Can I contribute to both Traditional and Roth IRA?",
      answer: "Yes, but the combined contribution limit is $7,000 (or $8,000 if 50+). You cannot contribute $7,000 to each. Split between both types however you want, but total must stay within the annual limit."
    },
    {
      question: "What is a backdoor Roth IRA?",
      answer: "If income exceeds Roth limits, you can contribute to a non-deductible Traditional IRA (no income limits for contributions) then convert to Roth. However, the pro-rata rule applies if you have other Traditional IRAs with pre-tax money, making the conversion partially taxable."
    },
    {
      question: "What's the penalty for excess Roth IRA contributions?",
      answer: "Excess contributions incur a 6% excise tax each year they remain in the account. To avoid the penalty, withdraw the excess (plus any earnings on it) before the tax filing deadline including extensions, or apply it to a future year's contribution limit."
    },
    {
      question: "At what age can I withdraw from Roth IRA tax-free?",
      answer: "Tax-free withdrawals require two conditions: (1) the account has been open for 5+ years, and (2) you're age 59½ or older, disabled, deceased (for beneficiaries), or using up to $10,000 for first home purchase. Contributions can always be withdrawn tax-free anytime."
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
      <RothIRAContributionCalculator />
    </>
  )
}