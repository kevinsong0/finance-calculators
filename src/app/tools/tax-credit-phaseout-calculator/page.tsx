'use client'

import TaxCreditPhaseoutCalculator from '@/components/TaxCreditPhaseoutCalculator'

export default function TaxCreditPhaseoutCalculatorPage() {
  const faqs = [
    {
      question: "What is tax credit phaseout?",
      answer: "Tax credit phaseout: credit gradually reduced as income rises above threshold. Linear phaseout: constant reduction per dollar of income. When income reaches upper phaseout limit, credit reaches $0. Phaseout ranges vary by credit type and filing status. Plan income to maximize credits before phaseout begins. Some credits refundable (EITC, partial AOTC), others non-refundable (CTC above $1700 per child)."
    },
    {
      question: "How does Child Tax Credit phaseout work?",
      answer: "Child Tax Credit: $2000 per qualifying child. Phaseout begins at $200K (single) or $400K (married). Credit reduced $50 per $1000 income above threshold. Fully phases out at $400K (single) or $600K (married). Example: $220K income (single): $50 reduction per child, credit becomes $1950. Additional CTC (refundable): up to $1700 per child. Must have child under 17, US citizen, claimed as dependent."
    },
    {
      question: "What are the AOTC education credit income limits?",
      answer: "American Opportunity Tax Credit: up to $2500 per student. Phaseout: $80K-$90K (single), $160K-$180K (married). Linear phaseout over $10K range. $2500 maximum, $1000 refundable. 100% of first $2000 expenses + 25% of next $2000. Only for first 4 years of higher education. Cannot claim if full-time student received AOTC before. Income above $90K (single) or $180K (married): no credit."
    },
    {
      question: "What are the Saver's Credit income limits?",
      answer: "Saver's Credit: 10-50% of retirement contributions up to $2000. Income limits 2024 (single): $23K for 50%, $25K for 20%, $32.5K for 10%. Married: $46K for 50%, $50K for 20%, $65K for 10%. Head of household: $34.5K for 50%, $37.5K for 20%, $51.25K for 10%. Maximum credit $1000 ($2000 contribution × 50%). Must be 18+, not full-time student, not dependent. Credit non-refundable."
    },
    {
      question: "How does EITC phaseout work?",
      answer: "Earned Income Tax Credit phaseout depends on filing status and children. Maximum credits: $632 (0 children), $6985 (1), $7830 (2), $9320 (3+). Phaseout begins at threshold, ends at income limit. Income limits (married): $24.6K (0), $54.3K (1), $59.1K (2), $63.7K (3+). Single limits lower. EITC fully refundable. Must have earned income. Investment income limit $11,600. Credit eliminated when income exceeds upper limit."
    },
    {
      question: "Can I plan income to avoid phaseout?",
      answer: "Yes. Strategies: defer bonus to next year, increase pre-tax retirement contributions, delay income from side work, bunch deductions to reduce MAGI, charitable contributions reduce income, HSA contributions reduce MAGI. Plan ahead: know phaseout thresholds for credits you claim. Small income reduction can save hundreds in credits. Consider timing of stock sales (capital gains affect MAGI). Maximize credits by staying below phaseout thresholds."
    },
    {
      question: "What credits are refundable?",
      answer: "Refundable credits: EITC (fully refundable), Additional Child Tax Credit (up to $1700 per child), AOTC (up to $1000 refundable). Non-refundable credits: regular CTC above $1700, Lifetime Learning Credit, Saver's Credit, Foreign Tax Credit. Refundable credits pay even if no tax liability. Non-refundable credits limited to tax owed. Plan to maximize refundable credits first. Refundable credits can increase refund beyond withholding."
    },
    {
      question: "How does filing status affect credit phaseout?",
      answer: "Married filing jointly: higher phaseout thresholds (double or near-double single limits). Married filing separately: usually cannot claim credits (EITC disallowed, most others severely limited). Head of household: intermediate thresholds. Single: lowest thresholds. Choose filing status to maximize credits. MFJ usually best for credits. MFS often eliminates credit eligibility. Calculate credits under both filing statuses."
    },
    {
      question: "What happens if income slightly exceeds phaseout?",
      answer: "Partial credit available in phaseout range. Linear reduction: credit drops steadily as income rises. Example: $85K income (AOTC single): halfway through $80K-$90K phaseout, credit reduced 50%. Small income changes in phaseout range cause proportional credit reduction. Just below threshold = full credit. Just above upper limit = $0. Strategic: reduce income slightly to stay in phaseout range longer."
    },
    {
      question: "How to calculate phaseout impact?",
      answer: "Identify credit type and your filing status. Determine phaseout threshold and upper limit. Calculate excess income over threshold. Calculate reduction per $1000 or dollar. Apply reduction to full credit. Result = actual credit available. Example: $220K income, CTC single: $20K excess × $50/$1K = $1000 reduction per child. Use calculator for precise estimates. Check IRS publications for current year parameters."
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
      <TaxCreditPhaseoutCalculator />
    </>
  )
}