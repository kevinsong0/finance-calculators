'use client'

import MegaBackdoorRothCalculator from '@/components/MegaBackdoorRothCalculator'

export default function MegaBackdoorRothCalculatorPage() {
  const faqs = [
    {
      question: "What is the mega backdoor Roth?",
      answer: "Mega backdoor Roth is a strategy to contribute after-tax dollars to 401(k) beyond the $23,000 pre-tax/Roth limit, then immediately convert to Roth. Total 401(k) limit is $69,000. After maxing $23K pre-tax, you can contribute up to $46K after-tax and convert to Roth. This creates additional Roth savings beyond IRA limits."
    },
    {
      question: "What are 2024 401(k) contribution limits?",
      answer: "2024 limits: Employee pre-tax/Roth limit $23,000. Catch-up (age 50+) $7,500. Total plan limit $69,000 (employee + employer combined). After-tax contributions allowed after pre-tax/Roth maxed, up to total limit minus employer match. Total with catch-up: $76,500."
    },
    {
      question: "Does my 401(k) plan allow mega backdoor Roth?",
      answer: "Check plan documents or ask HR: 1) Does plan allow after-tax contributions? 2) Does plan allow in-plan Roth conversions? 3) Does plan allow in-service rollovers to Roth IRA? All 401(k) plans are different. Not all allow after-tax contributions or conversions. Mega backdoor requires plan support."
    },
    {
      question: "What is in-plan Roth conversion?",
      answer: "In-plan Roth conversion converts after-tax 401(k) balance directly to Roth 401(k) within the plan. Best option: immediate conversion, no growth before conversion means no tax on gains. All future growth tax-free in Roth 401(k). Many plans offer auto-convert feature for immediate conversion."
    },
    {
      question: "Can I roll after-tax 401(k) to Roth IRA?",
      answer: "Yes, if plan allows in-service rollovers. Roll after-tax balance to Roth IRA. However, any growth before rollover is taxable (only after-tax basis goes to Roth tax-free). In-plan Roth conversion preferred to avoid growth tax. Check if plan allows rollovers while still employed."
    },
    {
      question: "Does employer match apply to after-tax contributions?",
      answer: "Depends on plan. Some plans match after-tax contributions (more employer money!). Some match only pre-tax/Roth contributions. Employer match is part of total $69K limit, reducing after-tax room. Check plan documents for match rules on after-tax contributions."
    },
    {
      question: "Can I do mega backdoor Roth AND backdoor Roth IRA?",
      answer: "Yes! Both strategies can be used together. Backdoor Roth IRA: $7,000 contribution to non-deductible IRA, convert to Roth IRA. Mega backdoor: up to $46,000 after-tax 401(k) converted to Roth. Same year: $7K + $46K = $53K additional Roth savings. No income limits for either."
    },
    {
      question: "What if my plan doesn't allow after-tax contributions?",
      answer: "Cannot do mega backdoor Roth. Limited to $23,000 pre-tax/Roth 401(k) plus $7,000 backdoor Roth IRA. Ask employer to add after-tax option to plan. Some employers willing to amend plan for high-earning employees who want additional retirement savings."
    },
    {
      question: "Are there income limits for mega backdoor Roth?",
      answer: "No income limits. Unlike direct Roth IRA contributions (income limits apply), mega backdoor Roth has no income restriction. High earners can contribute after-tax to 401(k) and convert regardless of income. This makes mega backdoor ideal for high-income individuals."
    },
    {
      question: "When can I withdraw mega backdoor Roth funds?",
      answer: "Roth 401(k): withdrawals follow plan rules, typically age 59.5 or separation from service. Roth IRA (if rolled): contributions (basis) anytime tax-free, conversions 5-year rule, earnings age 59.5 + 5 years. Rolling to Roth IRA gives more withdrawal flexibility than keeping in Roth 401(k)."
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
      <MegaBackdoorRothCalculator />
    </>
  )
}