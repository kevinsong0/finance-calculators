'use client'

import RothConversionTimingCalculator from '@/components/RothConversionTimingCalculator'

export default function RothConversionTimingCalculatorPage() {
  const faqs = [
    {
      question: "When is the best time to do Roth conversion?",
      answer: "Best Roth conversion timing: when current marginal rate lower than expected retirement rate. Optimal window: age 55-65, before RMDs begin, potentially lower income (early retirement, semi-retired). Consider: years with lower income (job loss, sabbatical, early retirement), years before SS benefits, before Medicare IRMAA income spike. Avoid: high-income years, years pushing into higher bracket, if need funds within 5 years. Plan partial conversions to stay in favorable bracket. Multi-year conversion strategy spreads tax impact."
    },
    {
      question: "What is Roth conversion ladder strategy?",
      answer: "Roth conversion ladder: convert Traditional IRA/401(k) to Roth over multiple years. Purpose: spread tax impact, stay in lower brackets, create 5-year conversion buckets for early retirement access. Process: convert set amount each year, pay tax at conversion, wait 5 years for tax-free withdrawal. Example: convert $20K/year for 10 years. Year 6 onward: each conversion available tax-free. Ladder provides: early retirement income (before 59.5), tax diversification, RMD reduction. Plan conversions before RMD age (73) and SS income."
    },
    {
      question: "How does Roth conversion affect RMDs?",
      answer: "Roth conversion reduces future RMDs. RMDs apply to Traditional IRA/401(k), NOT to Roth IRA. By converting: reduce Traditional balance, lower future RMDs, avoid RMD tax impact. RMDs begin at age 73 (2024 SECURE Act 2.0). Each conversion reduces Traditional balance by conversion amount. Example: $500K Traditional, convert $100K over 5 years. At 73: $400K Traditional vs $500K. RMD = Traditional balance / life expectancy factor. Lower balance = lower RMD = lower forced taxable income. Roth has NO RMDs during owner's lifetime."
    },
    {
      question: "Should I convert if current rate equals retirement rate?",
      answer: "If current rate equals retirement rate: conversion has no immediate tax advantage. BUT consider other benefits: tax-free growth on converted amount, no RMDs on Roth, tax-free withdrawals for heirs, flexibility (withdraw anytime after 5 years), protection against future tax rate increases. Conversion cost now vs benefit later: 10-20 years of tax-free growth may outweigh equal tax rates. Consider: estate planning (Roth to heirs tax-free), early retirement access (5-year ladder), SS taxation management (Roth doesn't count toward combined income)."
    },
    {
      question: "How to calculate Roth conversion tax?",
      answer: "Roth conversion tax: converted amount × marginal tax rate. Conversion treated as ordinary income (not capital gains). Tax rate: your highest marginal rate (10%, 12%, 22%, 24%, 32%, 35%, 37%). Example: convert $20,000, marginal rate 24% = $4,800 tax. Conversion adds to income for that year: may push into higher bracket. Strategy: partial conversions to stay in lower bracket. Calculate: current income + conversion = new taxable income, find bracket, calculate tax. Consider: state tax, AMT (if high income), Medicare IRMAA (income-based premium)."
    },
    {
      question: "What is the 5-year rule for Roth conversions?",
      answer: "Roth conversion 5-year rule: each conversion must wait 5 years before tax-free withdrawal. Clock starts January 1 of conversion year. Example: convert 2024, available tax-free January 1, 2029. Withdraw before 5 years: 10% early withdrawal penalty (unless exception). Exceptions: age 59.5+, disability, death, substantially equal periodic payments. Each conversion has separate 5-year clock. Track conversion dates carefully. Original Roth contributions: 5-year rule for earnings only. Conversion 5-year rule: applies to converted principal too (but no tax, just penalty before 5 years)."
    },
    {
      question: "How much to convert each year?",
      answer: "Convert amount that stays within target tax bracket. Calculate: current income, bracket thresholds, room before next bracket. Example: single, income $75K, in 12% bracket ($11K-$44.7K). Room before 22% bracket: $95.5K - $75K = $20.5K. Convert up to $20.5K to stay in 12% bracket. Alternative: convert to fill bracket partially, some at 22%. Consider: state tax bracket alignment, Medicare IRMAA thresholds ($97K/$194K single, $194K/$246K married for Part B/D), SS taxation thresholds if applicable. Multi-year strategy: convert gradually to manage bracket impact."
    },
    {
      question: "Does Roth conversion affect Social Security taxation?",
      answer: "Roth conversion affects SS taxation in conversion year only. Conversion income counts toward 'combined income' for SS taxation. Combined income = 50% SS + other income including Roth conversions. May push into higher SS taxable zone (50% or 85%). Solution: convert before SS benefits begin (ages 60-65). After SS begins: manage conversions to avoid SS tax spike. Roth withdrawals (after conversion) do NOT count toward combined income. Benefit: use Roth in retirement without affecting SS taxation. Strategy: convert heavily before SS, use Roth after SS to minimize taxation."
    },
    {
      question: "Can I undo a Roth conversion?",
      answer: "Roth conversion recharacterization: eliminated in 2018 Tax Cuts and Jobs Act. Conversions are now IRREVOCABLE. Cannot undo conversion once completed. Before 2018: could recharacterize (reverse) by October 15 deadline. Now: conversion permanent, tax owed immediately. If stock price drops after conversion: cannot undo, stuck paying tax on higher value. Solution: convert gradually, convert when price stable/low, use multiple conversion dates within year. Recharacterization still available for Traditional to Roth CONTRIBUTIONS (not conversions). Plan conversions carefully - no reversal option."
    },
    {
      question: "Should I convert in early retirement years?",
      answer: "Early retirement years (55-65): ideal for Roth conversions. Benefits: lower income (no wages), before SS benefits, before RMDs, time for 5-year rule before withdrawals. Strategy: convert Traditional/401(k) while in low bracket (10% or 12%). Use taxable savings for living expenses while converting. Create conversion ladder: each year's conversion available after 5 years. Years 6+: Roth provides tax-free early retirement income. Consider: ACA subsidies (MAGI-based), SS income thresholds, Medicare IRMAA (starts 65). Convert strategically to optimize multiple income-based thresholds."
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
      <RothConversionTimingCalculator />
    </>
  )
}