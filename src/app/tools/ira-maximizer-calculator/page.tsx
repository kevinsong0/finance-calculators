'use client'

import IRAMaximizerCalculator from '@/components/IRAMaximizerCalculator'

export default function IRAMaximizerCalculatorPage() {
  const faqs = [
    {
      question: "How much can I contribute to IRA in 2024?",
      answer: "IRA contribution limit 2024: $7,000 per person. Catch-up (age 50+): additional $1,000, total $8,000. Spousal IRA: each spouse can contribute up to limit (married couples: $14,000-$16,000 total). Deadline: April 15 of following year. Traditional IRA: deduction limits if covered by employer plan. Roth IRA: income limits apply ($161K-$176K single, $230K-$240K married). Backdoor Roth available if exceed Roth income limits. Maximize contributions each year for compound growth benefit."
    },
    {
      question: "Should I contribute to IRA before 401(k)?",
      answer: "Contribution order: 1) 401(k) up to employer match (free money). 2) IRA (more investment options, lower fees). 3) 401(k) remainder up to limit ($23,000). Employer match typically 50-100% return. IRA offers: broader investment selection, potentially lower costs, Roth option available. 401(k) benefits: higher limit, payroll deduction convenience, Roth 401(k) available, no income limits. If no employer match: IRA first for flexibility. If employer match: maximize match first, then IRA, then remaining 401(k)."
    },
    {
      question: "What is the backdoor Roth IRA strategy?",
      answer: "Backdoor Roth IRA: for high-income earners who exceed Roth contribution limits. Step 1: contribute to Traditional IRA (non-deductible due to income). Step 2: convert Traditional to Roth IRA. File Form 8606 to track basis. Pro-rata rule: existing Traditional IRA balances affect taxability. Solution: roll existing Traditional IRA to 401(k) first, removing from pro-rata calculation. Then backdoor works with minimal tax. Repeat annually. No income limit for conversion. Consider mega backdoor Roth 401(k) if employer allows after-tax contributions."
    },
    {
      question: "What are Traditional IRA deduction limits?",
      answer: "Traditional IRA deduction depends on employer plan coverage and income. Covered by employer plan (401(k)): Single: full deduction under $77K, phaseout $77K-$87K, no deduction over $87K. Married: full deduction under $123K, phaseout $123K-$143K, no deduction over $143K. NOT covered by employer plan: full deduction regardless of income. Spouse covered: phaseout $230K-$240K for your deduction. Deduction reduces taxable income now, taxed at withdrawal in retirement. Consider Roth if non-deductible (backdoor strategy)."
    },
    {
      question: "What are Roth IRA income limits?",
      answer: "Roth IRA income limits 2024: Single: full contribution under $161K, phaseout $161K-$176K, no contribution over $176K. Married filing jointly: full contribution under $230K, phaseout $230K-$240K, no contribution over $240K. Married filing separately: phaseout $0-$10K, essentially no Roth contribution. Phaseout: calculate reduced contribution limit. Income = MAGI (modified adjusted gross income). Backdoor Roth available above limits. Roth 401(k) has NO income limits. No income limits for Roth conversion."
    },
    {
      question: "What is spousal IRA and how does it work?",
      answer: "Spousal IRA: allows non-working spouse to contribute based on working spouse's earned income. Requirements: married filing jointly, working spouse has earned income covering both contributions. Each spouse: $7,000 limit ($8,000 if 50+). Example: husband works, wife doesn't. Couple can contribute $14,000 to two separate IRAs. Working spouse income must exceed total contributions. Spousal IRA owned by spouse, not joint. Doubles couple's retirement savings. Traditional or Roth options. Same income limits apply to spousal Roth. Backdoor Roth available for spousal IRA too."
    },
    {
      question: "How to maximize retirement contributions?",
      answer: "Maximize retirement contributions: 1) 401(k) to employer match (mandatory). 2) IRA ($7,000-$8,000). 3) 401(k) remainder ($23,000-$30,500). Total capacity: $30,000-$38,500 per person. Married couples: up to $60,000-$77,000. Strategies: contribute early in year (more growth), automate contributions, increase with raises. HSA: additional $4,150-$8,300 triple tax-advantaged. Mega backdoor Roth 401(k): up to $69,000 total (if employer allows). IRA deadline: April 15. 401(k): December 31. Spousal IRA: doubles capacity."
    },
    {
      question: "Should I choose Roth or Traditional IRA?",
      answer: "Roth vs Traditional IRA decision factors: Current tax rate vs expected retirement rate. Roth: better if current rate lower than future rate, tax-free growth, no RMDs, tax-free withdrawals, flexible for heirs. Traditional: better if current rate higher, immediate deduction, taxed at withdrawal. Consider: tax bracket trajectory, retirement income sources, Roth conversion ladder strategy. Mix both for diversification: some funds taxed now, some later. Roth income limits may force Traditional. Backdoor Roth if exceed Roth limits but want Roth benefits."
    },
    {
      question: "What is catch-up contribution for IRA?",
      answer: "IRA catch-up contribution: additional $1,000 for age 50+. Total limit: $7,000 (under 50) vs $8,000 (50+). Available to both Traditional and Roth IRA. No income test for catch-up eligibility (only age 50+). Spousal IRA: each spouse eligible for catch-up, married couples 50+: $16,000 total. 401(k) catch-up: $7,500 additional, total $30,500. Combined IRA + 401(k) catch-up capacity: $38,500 per person (50+). Start catch-ups as soon as eligible (year you turn 50). Extra contributions compound significantly over 15-20 years to retirement."
    },
    {
      question: "Can I contribute to both 401(k) and IRA?",
      answer: "Yes, contribute to both 401(k) and IRA simultaneously. No restriction on having both. 401(k) limit: $23,000 ($30,500 if 50+). IRA limit: $7,000 ($8,000 if 50+). Combined: $30,000 ($38,500 if 50+). Traditional IRA deduction limited if covered by 401(k) and income above threshold. Roth IRA has income limits regardless of 401(k) coverage. Strategy: maximize 401(k) match, then IRA (more flexibility), then remaining 401(k). Roth 401(k) available at work: no income limits, combine with Roth IRA. Total retirement capacity: IRA + 401(k) + HSA + mega backdoor (if available)."
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
      <IRAMaximizerCalculator />
    </>
  )
}