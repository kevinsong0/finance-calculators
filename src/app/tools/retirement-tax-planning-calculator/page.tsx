'use client'

import RetirementTaxPlanningCalculator from '@/components/RetirementTaxPlanningCalculator'

export default function RetirementTaxPlanningCalculatorPage() {
  const faqs = [
    {
      question: "How is Social Security taxed in retirement?",
      answer: "Social Security taxation based on 'combined income'. Combined income = 50% of SS + adjusted gross income + tax-exempt interest. Thresholds (single): under $25K = 0% taxable. $25K-$34K = 50% taxable. Over $34K = 85% taxable. Thresholds (married): under $32K = 0% taxable. $32K-$44K = 50% taxable. Over $44K = 85% taxable. Maximum: 85% of SS benefits taxable (not 100%). Taxed at ordinary income rates. Manage withdrawals to stay below thresholds. Roth withdrawals do NOT count toward combined income."
    },
    {
      question: "What is the best order to withdraw retirement funds?",
      answer: "Tax-efficient withdrawal order: 1) Required minimum distributions (RMDs) from Traditional IRA/401(k) (mandatory at 73). 2) Taxable accounts (capital gains at favorable rates). 3) Tax-advantaged accounts: Traditional IRA/401(k) (manage bracket). 4) Roth IRA (tax-free, no RMDs). Consider: SS taxation thresholds, bracket management, Medicare IRMAA, estate planning. Roth last: preserves tax-free growth, leaves for heirs. Traditional first: reduces RMD burden, may use lower brackets. Optimize: fill low brackets each year, convert Traditional to Roth in low-income years. Customize based on income sources and tax situation."
    },
    {
      question: "How do RMDs affect retirement taxes?",
      answer: "RMDs (Required Minimum Distributions): mandatory withdrawals from Traditional IRA/401(k) starting age 73. RMD amount = account balance ÷ life expectancy factor. RMDs taxed as ordinary income. Large RMDs can: push into higher bracket, trigger SS taxation (85%), cause Medicare IRMAA surcharge, create large tax bill. Reduce RMDs by: earlier Roth conversions, continuing work (401(k) RMD delay if still employed), QCD (Qualified Charitable Distribution up to $105K after 70.5). RMD penalty for missing: 25% excise tax (SECURE 2.0 reduced from 50%). Plan ahead: convert before RMDs begin."
    },
    {
      question: "Does Roth IRA withdrawal affect Social Security taxation?",
      answer: "Roth IRA withdrawals do NOT affect Social Security taxation. Combined income calculation: excludes Roth withdrawals. Roth distributions: tax-free and NOT counted toward SS thresholds. Benefit: use Roth to supplement income without increasing SS taxable portion. Strategy: use Roth in years where Traditional withdrawal would push SS to 85% taxable. Example: combined income $43K (married), need $5K more. Traditional withdrawal: pushes to $48K, SS 85% taxable. Roth withdrawal: stays at $43K, SS stays in 50% zone. Roth ideal for managing SS taxation."
    },
    {
      question: "What is Medicare IRMAA and how to avoid it?",
      answer: "IRMAA (Income-Related Monthly Adjustment Amount): Medicare Part B/D premium surcharge based on income. Thresholds 2024 (single): under $97K = standard premium. $97K-$129K = +$74.90/month. $129K-$161K = +$209.90. $161K-$193K = +$344.90. Over $193K = +479.90. Married thresholds double. Income used: MAGI from 2 years prior (2022 income affects 2024 IRMAA). Avoid IRMAA: manage income (Traditional withdrawals, capital gains, Roth conversions). Use Roth withdrawals (don't count toward IRMAA). Consider: QCD reduces income, timing of asset sales, Roth conversion timing. Plan 2 years ahead: IRMAA based on prior-year income."
    },
    {
      question: "What is a Qualified Charitable Distribution (QCD)?",
      answer: "QCD: direct transfer from IRA to qualified charity (age 70.5+). Benefits: satisfies RMD requirement, excluded from taxable income, reduces MAGI for SS taxation and IRMAA. Maximum: $105,000 per year (2024). Cannot deduct QCD separately (already excluded from income). Must transfer directly from IRA to charity (no intermediate steps). Works only with Traditional IRA (not 401(k) unless rolled to IRA first). QCD reduces: taxable income, SS combined income, IRMAA MAGI. Strategy: use QCD for charitable giving after 70.5, satisfy RMD while reducing tax impact."
    },
    {
      question: "How to minimize taxes in retirement?",
      answer: "Retirement tax minimization strategies: 1) Manage SS taxation (stay below thresholds). 2) Use Roth withdrawals strategically (tax-free, no SS impact). 3) Convert Traditional to Roth before SS/RMDs. 4) Fill low brackets with Traditional withdrawals. 5) Time capital gains realization (LTCG rates). 6) Use QCD for charitable giving. 7) Manage Medicare IRMAA (income from 2 years prior). 8) Consider tax-loss harvesting. 9) Bunch deductions in high-income years. 10) Strategic asset location (taxable vs tax-advantaged). Plan: create multi-year tax projection, optimize withdrawal sequencing, consider Roth conversions in low-income years."
    },
    {
      question: "What are the tax brackets in retirement?",
      answer: "Same brackets as working years: 10% ($0-$11K single, $0-$22K married), 12% ($11K-$44.7K single, $22K-$89.4K married), 22% ($44.7K-$95.5K single, $89.4K-$190.7K married), 24% ($95.5K-$182K single, $190.7K-$364K married), 32% and higher. Standard deduction available: $14.6K single, $29.2K married. Fill lower brackets: taxable income under $44.7K single = 12% or less. Retirement often in lower bracket than working years. Opportunity: convert Traditional to Roth while in low bracket. SS partially taxable adds to income. Capital gains taxed separately at 0%/15%/20% based on total income."
    },
    {
      question: "How does pension affect retirement taxes?",
      answer: "Pension income: fully taxable as ordinary income (if contributions were pre-tax). Partly taxable: if made after-tax contributions (calculate taxable portion). Pension adds to: taxable income, SS combined income, IRMAA MAGI. Large pension: may push into higher bracket, trigger SS 85% taxable, cause IRMAA. Plan pension impact: know annual amount, factor into bracket planning, consider Roth conversions before pension begins. Military/government pensions: may have special treatment. Pension + SS + Traditional withdrawals can create high tax burden. Strategies: Roth conversions early, manage Traditional withdrawals, use Roth for additional income."
    },
    {
      question: "Can I reduce taxes by moving to a lower-tax state?",
      answer: "Moving to lower-tax state can reduce retirement taxes significantly. No income tax states: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming. Low tax states: some have modest rates. State tax on: pension, SS (some states exempt), IRA withdrawals, capital gains. Consider: state estate/inheritance taxes, property taxes, sales taxes, cost of living. Tax savings: if 5% state tax on $80K income = $4K/year. Establish domicile: spend 183+ days, register car/voter, change address. Some states tax pension income regardless of residence when earned. Research state rules before moving. Tax savings compound over retirement years."
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
      <RetirementTaxPlanningCalculator />
    </>
  )
}