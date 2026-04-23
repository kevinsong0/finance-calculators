'use client'

import MedicarePremiumIRMAACalculator from '@/components/MedicarePremiumIRMAACalculator'

export default function MedicarePremiumIRMAACalculatorPage() {
  const faqs = [
    {
      question: "What is IRMAA (Medicare Income-Related Monthly Adjustment Amount)?",
      answer: "IRMAA is an extra charge added to Medicare Part B and Part D premiums for high-income beneficiaries. Based on MAGI from 2 years prior (2022 income affects 2024 IRMAA). Six income tiers with increasing premiums. Single: $103K+ triggers IRMAA. Married: $206K+ triggers IRMAA. IRMAA applies for 2 years unless income decreases."
    },
    {
      question: "What are 2024 IRMAA thresholds?",
      answer: "Single/Married Filing Separately: $103K (no IRMAA), $103K-$129K (+$69.90 Part B, +$12.20 Part D), $129K-$161K, $161K-$193K, $193K-$215K, $215K-$500K, over $500K (maximum). Married Filing Jointly: thresholds are double ($206K, $258K, etc.). IRMAA affects Part B (medical) and Part D (drug) premiums separately."
    },
    {
      question: "How does IRMAA affect Medicare Part B premiums?",
      answer: "Standard Part B premium is $164.90/month (2024). IRMAA adds extra charges: Tier 1 +$69.90, Tier 2 +$139.90, Tier 3 +$209.80, Tier 4 +$279.70, Tier 5 +$349.60, Tier 6 +$419.50. Total monthly premium = standard + IRMAA. Maximum Part B premium with IRMAA: $584.40/month ($7,012.80/year) for highest tier."
    },
    {
      question: "How does IRMAA affect Medicare Part D premiums?",
      answer: "Part D (drug coverage) has separate IRMAA. Standard Part D varies by plan. IRMAA adds: Tier 1 +$12.20, Tier 2 +$24.40, Tier 3 +$36.60, Tier 4 +$48.90, Tier 5 +$61.10, Tier 6 +$73.30. Total Part D IRMAA + plan premium. Maximum Part D IRMAA: $73.30/month ($879.60/year). Part D IRMAA paid separately from Part B IRMAA."
    },
    {
      question: "How can I avoid IRMAA?",
      answer: "Plan ahead: Roth conversions before age 63 (2-year lookback). Manage MAGI through tax-loss harvesting. Delay Social Security to reduce income. Use qualified charitable distributions (QCDs) at age 70.5+. Reduce taxable investment income. Consider timing of large capital gains. Request reconsideration if income decreased due to life-changing event (retirement, divorce, death of spouse)."
    },
    {
      question: "What is IRMAA reconsideration?",
      answer: "If income decreased significantly due to life-changing event, request IRMAA reconsideration. Qualifying events: retirement, work stoppage, divorce, death of spouse, reduction of hours, employer bankruptcy. Submit SSA-44 form with proof of income decrease. Social Security may adjust IRMAA mid-year. File reconsideration promptly when income drops below threshold."
    },
    {
      question: "What income is used for IRMAA?",
      answer: "Modified Adjusted Gross Income (MAGI) from tax return 2 years prior. 2024 IRMAA based on 2022 MAGI. MAGI = AGI + tax-exempt interest (municipal bond income). Includes wages, pensions, Social Security, dividends, capital gains, rental income. Does NOT include Roth IRA withdrawals. Two-year lookback allows planning time."
    },
    {
      question: "Does IRMAA apply to Medicare Advantage plans?",
      answer: "Yes. IRMAA applies to Medicare Advantage (Part C) plans too. Part B IRMAA charged regardless of whether you have Original Medicare or Medicare Advantage. Part D IRMAA also applies if Medicare Advantage includes drug coverage. Medicare Advantage premiums vary by plan, but IRMAA is same regardless of plan choice."
    },
    {
      question: "At what age does IRMAA start?",
      answer: "IRMAA applies once you enroll in Medicare Part B or Part D, typically at age 65. However, IRMAA determination uses income from 2 years prior. First IRMAA assessment occurs when enrolling in Medicare. If you delay Medicare (e.g., still working with employer coverage), IRMAA assessed when you eventually enroll based on prior year income."
    },
    {
      question: "How do I pay IRMAA?",
      answer: "IRMAA billed separately from standard Medicare premium. Part B IRMAA: deducted from Social Security benefit if receiving, or billed quarterly if not. Part D IRMAA: billed separately by Medicare (not Part D plan). Payment due monthly or quarterly. Automatic deduction if Social Security benefit sufficient. Otherwise, receive bill with payment instructions."
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
      <MedicarePremiumIRMAACalculator />
    </>
  )
}