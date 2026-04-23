'use client'

import StockOptionExerciseCalculator from '@/components/StockOptionExerciseCalculator'

export default function StockOptionExerciseCalculatorPage() {
  const faqs = [
    {
      question: "What is the difference between ISO and NSO?",
      answer: "ISO (Incentive Stock Option): no regular tax at exercise, potential AMT, LTCG on sale if qualifying. NSO (Non-Qualified Stock Option): ordinary income tax on spread at exercise, W-2/1099 reporting. ISO benefits: tax-deferred growth, LTCG rates on gains. ISO requires: hold 2+ years from grant AND 1+ year from exercise for qualifying. NSO simpler: tax at exercise, no holding requirements for tax treatment. ISO limited to $100K exercisable per year. NSO no limit. ISO for employees only. NSO can go to employees, consultants, directors."
    },
    {
      question: "How is ISO taxed at exercise?",
      answer: "ISO exercise: no regular income tax at exercise (if hold requirements met). Spread (FMV - grant price) added to AMT income. AMT calculation: add ISO spread to regular income, apply 26%/28% AMT rate. AMT exemption $87,800 (2024). AMT tax owed if AMT calculation exceeds regular tax. AMT credit: carry forward indefinitely, recoverable when regular tax exceeds AMT in future years. Form 6251 for AMT calculation. Large ISO exercises can trigger significant AMT."
    },
    {
      question: "How is NSO taxed at exercise?",
      answer: "NSO exercise: spread taxed as ordinary income immediately. Spread = FMV at exercise - grant price. Tax rate: your marginal rate (10-37%). Reported on W-2 if employee, 1099-MISC if consultant. Withholding: supplemental rate 22% (37% above $1M). Employer deducts NSO spread as compensation expense. Cost basis = FMV at exercise (already taxed). Future sale: capital gain taxed at LTCG/STCG rates. No AMT on NSO exercise."
    },
    {
      question: "What are ISO holding requirements?",
      answer: "ISO qualifying disposition requirements: Hold 2+ years from GRANT DATE (when option awarded). AND hold 1+ year from EXERCISE DATE. If sold before both: disqualified disposition, spread taxed as ordinary income. Grant date ≠ exercise date: grant is award date, exercise is when you buy shares. Example: granted Jan 2022, exercise Jan 2023, qualify after Jan 2024 (2 years from grant) AND hold from Jan 2023 (1 year from exercise). ISO status lost if exercise more than 90 days after leaving company."
    },
    {
      question: "What happens if ISO is disqualified?",
      answer: "Disqualified ISO: sold before 2 years from grant OR 1 year from exercise. Spread taxed as ordinary income (like NSO). No AMT adjustment needed (already taxed as ordinary). Cost basis = FMV at exercise. Remaining gain taxed as capital gain (LTCG if 1+ year from exercise). Example: exercise $10, FMV $50, sell $75 after 6 months. Ordinary income $40/share, capital gain $25/share. Disqualification beneficial if: price dropped, or ordinary income rate lower than AMT."
    },
    {
      question: "How does AMT credit work for ISO?",
      answer: "AMT credit: generated when pay AMT on ISO exercise. Credit = AMT paid - regular tax that year. Credit carries forward indefinitely. Recover when: regular tax exceeds AMT in future years. Use Form 8801 to track and claim AMT credit. Limitation: credit limited to AMT differential each year. Large ISO exercise: may take years to recover full credit. Strategy: exercise ISO gradually over multiple years to manage AMT. AMT credit never expires, but recovery depends on future tax situation."
    },
    {
      question: "Should I exercise ISO or NSO first?",
      answer: "Exercise order considerations: ISO first if: early in career, lower current income, can hold for qualifying period, comfortable with AMT. NSO first if: need cash immediately, want to diversify, high current income (avoid AMT), near leaving company. ISO requires holding for tax benefit. NSO can sell immediately (already taxed). Consider: exercise ISO before leaving (90-day deadline), exercise NSO for diversification. AMT planning: exercise ISO in lower income years. NSO exercise increases income (may push into higher bracket)."
    },
    {
      question: "What is the $100K ISO limit?",
      answer: "ISO $100K limit: maximum $100K of ISO shares exercisable in one year based on GRANT DATE FMV. Limit applies to exercisable value (FMV at grant × shares), not spread or gain. Example: granted 2000 shares at $50 FMV = $100K exercisable. Can exercise all 2000 shares in one year. If FMV rose to $100 at exercise: still OK (limit based on $50 grant FMV). Excess over $100K: treated as NSO (ordinary income at exercise). Track exercisable ISOs across all grants per year."
    },
    {
      question: "How to minimize tax on stock options?",
      answer: "ISO strategies: exercise early in grant period (lower FMV = smaller AMT), exercise in low-income years, spread exercises across years to manage AMT, hold for qualifying disposition. NSO strategies: exercise and hold for LTCG on future gains (spread taxed now), exercise in low-income years. Both: diversify holdings (avoid concentration risk), consider charitable donation of appreciated shares, use tax-loss harvesting to offset gains. Cashless exercise: borrow to exercise, sell portion to repay, hold remainder."
    },
    {
      question: "What happens to options when leaving company?",
      answer: "Vested options: exercise within deadline (typically 90 days for ISO, longer for NSO). ISO: lose ISO status after 90 days post-employment, become NSO (ordinary income tax). NSO: longer exercise window (months to years per plan terms). Unvested options: typically forfeited upon leaving. Exception: some plans allow post-termination vesting for certain departures. Check plan document for exercise deadlines. Exercise all vested ISOs before 90-day deadline to preserve tax benefits. Negotiate option terms in exit package if possible."
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
      <StockOptionExerciseCalculator />
    </>
  )
}